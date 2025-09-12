# services/notification_service.py
def send_email(to: str, subject: str, body: str):
    # integrate with SMTP or third-party
    print("send email:", to, subject)
