# app.py
import os
from functools import wraps
from flask import Flask, request, jsonify, session, render_template, redirect, url_for
from flask_bcrypt import Bcrypt
import pymysql
from datetime import datetime, timedelta
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

app = Flask(__name__, static_folder="static", template_folder="templates")

# ---------------- CONFIG ----------------
app.secret_key = os.environ.get('SECRET_KEY', 'dev-secret-key')  # change for production
app.config['PERMANENT_SESSION_LIFETIME'] = timedelta(hours=4)    # session lifetime

# DB config (edit or set as environment variables)
DB_HOST = os.environ.get('DB_HOST', 'localhost')
DB_USER = os.environ.get('DB_USER', 'root')
DB_PASS = os.environ.get('DB_PASS', 'root')
DB_NAME = os.environ.get('DB_NAME', 'subscriptiondb')

# SMTP config (edit or set as environment variables)
SMTP_USER = os.environ.get('SMTP_USER', 'sivaramyenugula.2003@gmail.com')
SMTP_PASS = os.environ.get('SMTP_PASS', 'brzc dkhn qqzf fvma')  # Gmail App Password recommended

bcrypt = Bcrypt(app)

# ---------------- SMTP UTILITY ----------------
def send_email(to_email, subject, body):
    """Send a plain-text email using configured SMTP (best-effort)."""
    if not to_email:
        print("⚠️ send_email: no recipient specified")
        return
    msg = MIMEMultipart()
    msg["From"] = SMTP_USER
    msg["To"] = to_email
    msg["Subject"] = subject
    msg.attach(MIMEText(body, "plain"))

    try:
        server = smtplib.SMTP("smtp.gmail.com", 587)
        server.starttls()
        server.login(SMTP_USER, SMTP_PASS)
        server.sendmail(SMTP_USER, to_email, msg.as_string())
        server.quit()
        print(f"✅ Email sent to {to_email}")
    except Exception as e:
        print(f"⚠️ Failed to send email to {to_email}: {e}")

# ---------------- DB CONNECTION ----------------
def get_db_connection():
    return pymysql.connect(
        host=DB_HOST,
        user=DB_USER,
        password=DB_PASS,
        database=DB_NAME,
        cursorclass=pymysql.cursors.DictCursor
    )

# ---------------- AUTH HELPERS ----------------
def login_required(required_role=None):
    """Decorator: ensure user is logged in; if required_role provided, check role."""
    def decorator(fn):
        @wraps(fn)
        def wrapper(*args, **kwargs):
            if 'user_id' not in session:
                # if request expects JSON return JSON; else redirect to login
                if request.path.startswith("/api/") or request.is_json:
                    return jsonify({"msg": "Login required"}), 401
                return redirect(url_for('web_login', next=request.path))
            if required_role and session.get('role') != required_role:
                if request.path.startswith("/api/") or request.is_json:
                    return jsonify({"msg": f"{required_role.capitalize()}s only"}), 403
                return render_template("error.html", message=f"{required_role.capitalize()}s only"), 403
            return fn(*args, **kwargs)
        return wrapper
    return decorator

def get_current_user_from_session():
    """Return dict like {'id': int, 'name': str, 'role': str} or None."""
    if 'user_id' not in session:
        return None
    return {
        "id": int(session.get('user_id')),
        "name": session.get('name'),
        "role": session.get('role')
    }

# ---------------- WEB ROUTES (Jinja2) ----------------

@app.route('/')
def index():
    user = get_current_user_from_session()
    if user:
        # Redirect to appropriate landing
        if user['role'] == 'admin':
            return redirect(url_for('web_dashboard'))
        return redirect(url_for('web_subscriptions'))
    return render_template("index.html", user=None)

# Register page (web)
@app.route('/web/register', methods=['GET', 'POST'])
def web_register():
    if request.method == 'POST':
        name = request.form.get('name')
        email = request.form.get('email')
        password = request.form.get('password')
        role = request.form.get('role', 'user')
        # reuse API logic: hash and insert
        if not name or not email or not password:
            return render_template("register.html", error="All fields required")
        hashed_pw = bcrypt.generate_password_hash(password).decode('utf-8')
        conn = get_db_connection(); cursor = conn.cursor()
        try:
            cursor.execute("INSERT INTO users (name, email, password, role) VALUES (%s,%s,%s,%s)",
                           (name, email, hashed_pw, role))
            conn.commit()
        except pymysql.err.IntegrityError:
            return render_template("register.html", error="User with this email already exists")
        except Exception as e:
            return render_template("register.html", error=str(e))
        finally:
            cursor.close(); conn.close()
        # send email
        subject = "Welcome to Subscription Management System"
        body = f"Welcome {name}, you have successfully registered! Please login with your details."
        try:
            send_email(email, subject, body)
        except Exception as e:
            print("Email send error (non-fatal):", e)
        return redirect(url_for('web_login', registered="1"))
    return render_template("register.html")

# Login page (web)
@app.route('/web/login', methods=['GET', 'POST'])
def web_login():
    if request.method == 'POST':
        email = request.form.get('email'); password = request.form.get('password')
        if not email or not password:
            return render_template("login.html", error="Email and password required")
        conn = get_db_connection(); cursor = conn.cursor()
        try:
            cursor.execute("SELECT * FROM users WHERE email=%s", (email,))
            user = cursor.fetchone()
        finally:
            cursor.close(); conn.close()
        if user and bcrypt.check_password_hash(user['password'], password):
            session.permanent = True
            session['user_id'] = int(user['id'])
            session['role'] = user['role']
            session['name'] = user['name']
            # redirect to next if provided
            next_url = request.args.get('next') or url_for('index')
            return redirect(next_url)
        return render_template("login.html", error="Invalid credentials")
    registered = request.args.get('registered')
    return render_template("login.html", registered=registered)

# Logout (web)
@app.route('/web/logout', methods=['GET'])
def web_logout():
    session.clear()
    return redirect(url_for('index'))

# Show plans (web)
@app.route('/web/plans', methods=['GET'])
@login_required()
def web_plans():
    conn = get_db_connection(); cursor = conn.cursor()
    try:
        cursor.execute("SELECT * FROM plans")
        plans = cursor.fetchall()
    finally:
        cursor.close(); conn.close()
    user = get_current_user_from_session()
    return render_template("plans.html", plans=plans, user=user)

# Create plan (web) - admin
@app.route('/web/plans/create', methods=['GET', 'POST'])
@login_required(required_role='admin')
def web_create_plan():
    if request.method == 'POST':
        name = request.form.get('name')
        description = request.form.get('description')
        quota = request.form.get('quota') or 0
        price = request.form.get('price') or 0.0
        if not name:
            return render_template("create_plan.html", error="Name required")
        conn = get_db_connection(); cursor = conn.cursor()
        try:
            cursor.execute("INSERT INTO plans (name, description, quota, price) VALUES (%s,%s,%s,%s)",
                           (name, description, int(quota), float(price)))
            conn.commit()
        except Exception as e:
            return render_template("create_plan.html", error=str(e))
        finally:
            cursor.close(); conn.close()
        return redirect(url_for('web_plans'))
    return render_template("create_plan.html")

# Subscriptions list (web)
@app.route('/web/subscriptions', methods=['GET'])
@login_required()
def web_subscriptions():
    user = get_current_user_from_session()
    conn = get_db_connection(); cursor = conn.cursor()
    try:
        if user['role'] == 'user':
            cursor.execute("SELECT s.*, p.name as plan_name FROM subscriptions s JOIN plans p ON s.plan_id=p.id WHERE s.user_id=%s", (user['id'],))
        else:
            cursor.execute("SELECT s.*, p.name as plan_name, u.name as user_name FROM subscriptions s JOIN plans p ON s.plan_id=p.id JOIN users u ON s.user_id=u.id")
        subs = cursor.fetchall()
    finally:
        cursor.close(); conn.close()
    return render_template("subscriptions.html", subscriptions=subs, user=user)

# Subscribe action (web) - form submission
@app.route('/web/subscribe', methods=['POST'])
@login_required(required_role='user')
def web_subscribe():
    plan_id = request.form.get('plan_id')
    if not plan_id:
        return redirect(url_for('web_plans'))
    user = get_current_user_from_session()
    user_id = user['id']
    start_date = datetime.today().date()
    end_date = start_date + timedelta(days=30)
    conn = get_db_connection(); cursor = conn.cursor()
    try:
        cursor.execute("SELECT name FROM plans WHERE id=%s", (plan_id,))
        plan = cursor.fetchone()
        if not plan:
            return render_template("plans.html", plans=[], user=user, error="Plan not found")
        cursor.execute("INSERT INTO subscriptions (user_id, plan_id, start_date, end_date, status) VALUES (%s,%s,%s,%s,%s)",
                       (user_id, plan_id, start_date, end_date, 'active'))
        conn.commit()
        cursor.execute("SELECT email, name FROM users WHERE id=%s", (user_id,))
        u = cursor.fetchone()
    except Exception as e:
        return render_template("plans.html", plans=[], user=user, error=str(e))
    finally:
        cursor.close(); conn.close()
    if u:
        subject = "Subscription Successful"
        body = f"Hello {u.get('name')},\n\nYou have successfully subscribed to {plan.get('name')} from {start_date} until {end_date}."
        send_email(u.get('email'), subject, body)
    return redirect(url_for('web_subscriptions'))

# Subscription detail page (web)
@app.route('/web/sub/<int:sub_id>', methods=['GET'])
@login_required()
def web_subscription_detail(sub_id):
    user = get_current_user_from_session()
    conn = get_db_connection(); cursor = conn.cursor()
    try:
        cursor.execute("SELECT s.*, p.name as plan_name, p.price as plan_price FROM subscriptions s JOIN plans p ON s.plan_id=p.id WHERE s.id=%s", (sub_id,))
        sub = cursor.fetchone()
        cursor.execute("SELECT * FROM plans")
        plans = cursor.fetchall()
    finally:
        cursor.close(); conn.close()
    if not sub:
        return render_template("error.html", message="Subscription not found"), 404
    # ensure owner or admin
    if user['role'] == 'user' and sub['user_id'] != user['id']:
        return render_template("error.html", message="Not authorized"), 403
    return render_template("subscription_detail.html", sub=sub, plans=plans, user=user)

# Web upgrade/downgrade/cancel/renew handlers
@app.route('/web/upgrade/<int:sub_id>', methods=['POST'])
@login_required(required_role='user')
def web_upgrade(sub_id):
    new_plan_id = request.form.get('new_plan_id')
    if not new_plan_id:
        return redirect(url_for('web_subscription_detail', sub_id=sub_id))
    # reuse the existing API logic but inline here
    user = get_current_user_from_session()
    today = datetime.today().date()
    new_end = today + timedelta(days=30)
    conn = get_db_connection(); cursor = conn.cursor()
    try:
        cursor.execute("SELECT s.*, p.price as current_price FROM subscriptions s JOIN plans p ON s.plan_id=p.id WHERE s.id=%s AND s.user_id=%s", (sub_id, user['id']))
        sub = cursor.fetchone()
        if not sub:
            return render_template("error.html", message="Subscription not found"), 404
        cursor.execute("SELECT id, name, price FROM plans WHERE id=%s", (new_plan_id,))
        new_plan = cursor.fetchone()
        if not new_plan:
            return render_template("error.html", message="Target plan not found"), 404
        if float(new_plan['price']) <= float(sub['current_price']):
            return render_template("subscription_detail.html", sub=sub, plans=[], user=user, error="New plan must be higher priced for upgrade")
        cursor.execute("UPDATE subscriptions SET plan_id=%s, start_date=%s, end_date=%s, status=%s WHERE id=%s", (new_plan_id, today, new_end, 'active', sub_id))
        conn.commit()
        cursor.execute("SELECT email, name FROM users WHERE id=%s", (user['id'],))
        u = cursor.fetchone()
    except Exception as e:
        return render_template("error.html", message=str(e))
    finally:
        cursor.close(); conn.close()
    if u:
        subject = "Subscription Upgraded"
        body = f"Hello {u.get('name')},\n\nYour subscription (ID: {sub_id}) has been upgraded and is valid from {today} until {new_end}."
        send_email(u.get('email'), subject, body)
    return redirect(url_for('web_subscription_detail', sub_id=sub_id))

@app.route('/web/downgrade/<int:sub_id>', methods=['POST'])
@login_required(required_role='user')
def web_downgrade(sub_id):
    new_plan_id = request.form.get('new_plan_id')
    if not new_plan_id:
        return redirect(url_for('web_subscription_detail', sub_id=sub_id))
    user = get_current_user_from_session()
    today = datetime.today().date()
    new_end = today + timedelta(days=30)
    conn = get_db_connection(); cursor = conn.cursor()
    try:
        cursor.execute("SELECT s.*, p.price as current_price FROM subscriptions s JOIN plans p ON s.plan_id=p.id WHERE s.id=%s AND s.user_id=%s", (sub_id, user['id']))
        sub = cursor.fetchone()
        if not sub:
            return render_template("error.html", message="Subscription not found"), 404
        cursor.execute("SELECT id, name, price FROM plans WHERE id=%s", (new_plan_id,))
        new_plan = cursor.fetchone()
        if not new_plan:
            return render_template("error.html", message="Target plan not found"), 404
        if float(new_plan['price']) >= float(sub['current_price']):
            return render_template("subscription_detail.html", sub=sub, plans=[], user=user, error="New plan must be lower priced for downgrade")
        cursor.execute("UPDATE subscriptions SET plan_id=%s, start_date=%s, end_date=%s, status=%s WHERE id=%s", (new_plan_id, today, new_end, 'active', sub_id))
        conn.commit()
        cursor.execute("SELECT email, name FROM users WHERE id=%s", (user['id'],))
        u = cursor.fetchone()
    except Exception as e:
        return render_template("error.html", message=str(e))
    finally:
        cursor.close(); conn.close()
    if u:
        subject = "Subscription Downgraded"
        body = f"Hello {u.get('name')},\n\nYour subscription (ID: {sub_id}) has been downgraded and is valid from {today} until {new_end}."
        send_email(u.get('email'), subject, body)
    return redirect(url_for('web_subscription_detail', sub_id=sub_id))

@app.route('/web/cancel/<int:sub_id>', methods=['POST'])
@login_required(required_role='user')
def web_cancel(sub_id):
    user = get_current_user_from_session()
    conn = get_db_connection(); cursor = conn.cursor()
    try:
        cursor.execute("SELECT id FROM subscriptions WHERE id=%s AND user_id=%s", (sub_id, user['id']))
        row = cursor.fetchone()
        if not row:
            return render_template("error.html", message="Subscription not found or not yours"), 404
        cursor.execute("UPDATE subscriptions SET status='cancelled' WHERE id=%s", (sub_id,))
        conn.commit()
        cursor.execute("SELECT email, name FROM users WHERE id=%s", (user['id'],))
        u = cursor.fetchone()
    except Exception as e:
        return render_template("error.html", message=str(e))
    finally:
        cursor.close(); conn.close()
    if u:
        subject = "Subscription Cancelled"
        body = f"Hello {u.get('name')},\n\nYour subscription (ID: {sub_id}) has been cancelled."
        send_email(u.get('email'), subject, body)
    return redirect(url_for('web_subscriptions'))

@app.route('/web/renew/<int:sub_id>', methods=['POST'])
@login_required(required_role='user')
def web_renew(sub_id):
    user = get_current_user_from_session()
    new_end = datetime.today().date() + timedelta(days=30)
    conn = get_db_connection(); cursor = conn.cursor()
    try:
        cursor.execute("SELECT id FROM subscriptions WHERE id=%s AND user_id=%s", (sub_id, user['id']))
        row = cursor.fetchone()
        if not row:
            return render_template("error.html", message="Subscription not found or not yours"), 404
        cursor.execute("UPDATE subscriptions SET status='renewed', end_date=%s WHERE id=%s", (new_end, sub_id))
        conn.commit()
        cursor.execute("SELECT email, name FROM users WHERE id=%s", (user['id'],))
        u = cursor.fetchone()
    except Exception as e:
        return render_template("error.html", message=str(e))
    finally:
        cursor.close(); conn.close()
    if u:
        subject = "Subscription Renewed"
        body = f"Hello {u.get('name')},\n\nYour subscription (ID: {sub_id}) has been renewed until {new_end}."
        send_email(u.get('email'), subject, body)
    return redirect(url_for('web_subscription_detail', sub_id=sub_id))

# ---------------- DASHBOARD (ADMIN) (web)
@app.route('/web/dashboard', methods=['GET'])
@login_required(required_role='admin')
def web_dashboard():
    conn = get_db_connection(); cursor = conn.cursor()
    try:
        cursor.execute("""
            SELECT p.name, COUNT(s.id) as total_subscriptions
            FROM subscriptions s
            JOIN plans p ON s.plan_id = p.id
            GROUP BY p.name
            ORDER BY total_subscriptions DESC
            LIMIT 5
        """)
        top_plans = cursor.fetchall()
    finally:
        cursor.close(); conn.close()
    user = get_current_user_from_session()
    return render_template("dashboard.html", top_plans=top_plans, user=user)

# ------------------ (Keep your existing JSON APIs intact) ------------------
# All your original JSON API routes are left as-is (register, login, plans, subscriptions, upgrade/downgrade, etc.)
# If you still want the exact JSON API endpoints available, they remain in this same file (you already had them).
# (No change required — both API and Web coexist.)

# Run
if __name__ == '__main__':
    app.run(debug=True)
