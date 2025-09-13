# Broadband Subscription Management System

A modern, responsive web application for managing broadband subscription plans with role-based access control for both end-users and administrators.

## 🚀 Features

### For End Users
- **Browse Plans**: View available broadband plans (Fibernet & Copper)
- **Subscribe**: Subscribe to plans with one-click
- **Manage Subscriptions**: Cancel, renew, upgrade, or downgrade subscriptions
- **Personalized Recommendations**: Get smart recommendations based on usage patterns
- **Discount Alerts**: Stay updated on limited-time offers

### For Administrators
- **Plan Management**: Create, edit, and delete subscription plans
- **Analytics Dashboard**: View key metrics and insights
- **Pricing Insights**: Analyze pricing trends and recommendations
- **User Management**: Monitor subscription patterns

## 🛠️ Technology Stack

- **Frontend**: React 19.1.1
- **Build Tool**: Vite 7.1.2
- **Styling**: Custom CSS with modern design principles
- **State Management**: React Hooks (useState, useEffect)
- **Data Persistence**: Local Storage
- **Authentication**: Role-based access control

## 📁 Project Structure

```
src/
├── components/
│   ├── Login.jsx                 # Authentication component
│   ├── UserDashboard.jsx        # Main user interface
│   ├── AdminDashboard.jsx       # Admin interface
│   ├── PlanCard.jsx            # Plan display component
│   ├── SubscriptionCard.jsx    # Subscription management
│   ├── Recommendations.jsx     # Smart recommendations
│   ├── PlanManagement.jsx      # Admin plan CRUD
│   ├── PlanTable.jsx           # Plans data table
│   ├── PlanForm.jsx            # Plan creation/editing
│   └── Analytics.jsx           # Admin analytics dashboard
├── services/
│   ├── authService.js          # Authentication logic
│   └── subscriptionService.js  # Subscription management
├── App.jsx                     # Main application component
├── App.css                     # Global styles
└── index.css                   # Base styles
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd frontend/subscription-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Demo Credentials

**Admin Account:**
- Username: `admin`
- Password: `admin`

**User Account:**
- Username: `user`
- Password: `user`

## 🎯 Usage

### For End Users

1. **Login** with your credentials
2. **Browse Plans** to see available broadband options
3. **Subscribe** to plans that interest you
4. **Manage Subscriptions** from the "My Subscriptions" tab
5. **View Recommendations** for personalized suggestions

### For Administrators

1. **Login** with admin credentials
2. **Manage Plans** - Add, edit, or delete subscription plans
3. **View Analytics** - Monitor key metrics and insights
4. **Set Discounts** - Create promotional offers

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📱 Responsive Design

The application is fully responsive and works seamlessly on:
- Desktop computers
- Tablets
- Mobile phones

## 🎨 Design Features

- **Modern UI**: Clean, professional interface
- **Color-coded Plans**: Visual distinction between Fibernet and Copper plans
- **Interactive Elements**: Hover effects and smooth transitions
- **Accessibility**: Proper focus management and keyboard navigation
- **Loading States**: Smooth loading indicators

## 🔐 Security Features

- **Role-based Access**: Separate interfaces for users and admins
- **Input Validation**: Form validation with error messages
- **Secure Authentication**: Password-based login system
- **Data Persistence**: Secure local storage management

## 📊 Analytics & Insights

### Key Metrics
- Total plans and subscriptions
- Revenue tracking
- Plan popularity
- Connection type distribution
- Pricing insights

### Smart Recommendations
- Discounted plans
- Upgrade suggestions
- Cross-selling opportunities
- Usage-based recommendations

## 🚀 Future Enhancements

- [ ] Payment integration
- [ ] Email notifications
- [ ] Advanced analytics with charts
- [ ] Multi-language support
- [ ] API integration
- [ ] Real-time updates
- [ ] Mobile app

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support or questions, please contact the development team or create an issue in the repository.

---

**Built with ❤️ using React and modern web technologies**