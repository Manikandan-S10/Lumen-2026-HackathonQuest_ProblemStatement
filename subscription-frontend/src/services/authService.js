// Mock authentication service
const STORAGE_KEYS = {
  USERS: 'subscription_users',
  CURRENT_USER: 'current_user'
};

// Default users (admin and demo user)
const DEFAULT_USERS = [
  { 
    id: 1, 
    username: 'admin', 
    password: 'admin', 
    role: 'admin', 
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@broadband.com',
    phone: '+1234567890',
    createdAt: new Date().toISOString()
  },
  { 
    id: 2, 
    username: 'user', 
    password: 'user', 
    role: 'user', 
    firstName: 'Demo',
    lastName: 'User',
    email: 'user@example.com',
    phone: '+1234567891',
    createdAt: new Date().toISOString()
  }
];

// Helper functions
const getUsers = () => {
  const users = localStorage.getItem(STORAGE_KEYS.USERS);
  return users ? JSON.parse(users) : DEFAULT_USERS;
};

const saveUsers = (users) => {
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
};

const generateUserId = () => {
  const users = getUsers();
  return Math.max(...users.map(u => u.id), 0) + 1;
};

export const authService = {
  login: (username, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users = getUsers();
        const user = users.find(u => u.username === username && u.password === password);
        
        if (user) {
          // Store current user in localStorage for persistence
          localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
          resolve(user);
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 500); // Simulate API delay
    });
  },

  register: (userData) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          console.log('AuthService: Starting registration with data:', userData);
          const users = getUsers();
          console.log('AuthService: Current users:', users);
          
          // Check if username already exists
          if (users.find(u => u.username === userData.username)) {
            console.log('AuthService: Username already exists');
            reject(new Error('Username already exists'));
            return;
          }
          
          // Check if email already exists
          if (users.find(u => u.email === userData.email)) {
            console.log('AuthService: Email already exists');
            reject(new Error('Email already exists'));
            return;
          }
          
          // Create new user
          const newUser = {
            id: generateUserId(),
            username: userData.username,
            password: userData.password,
            role: 'user', // All new registrations are regular users
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            phone: userData.phone,
            createdAt: new Date().toISOString()
          };
          
          console.log('AuthService: Created new user:', newUser);
          
          // Add user to storage
          users.push(newUser);
          saveUsers(users);
          console.log('AuthService: Saved users to storage');
          
          // Auto-login the new user
          localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(newUser));
          console.log('AuthService: Set current user in localStorage');
          
          resolve(newUser);
        } catch (error) {
          console.error('AuthService: Registration error:', error);
          reject(new Error('Registration failed. Please try again.'));
        }
      }, 800); // Simulate API delay
    });
  },

  logout: () => {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  },

  getCurrentUser: () => {
    const user = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    return user ? JSON.parse(user) : null;
  },

  isAuthenticated: () => {
    return !!localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
  },

  // Admin functions
  getAllUsers: () => {
    return getUsers();
  },

  deleteUser: (userId) => {
    const users = getUsers();
    const updatedUsers = users.filter(u => u.id !== userId);
    saveUsers(updatedUsers);
    return updatedUsers;
  },

  updateUser: (userId, userData) => {
    const users = getUsers();
    const updatedUsers = users.map(u => 
      u.id === userId ? { ...u, ...userData } : u
    );
    saveUsers(updatedUsers);
    return updatedUsers.find(u => u.id === userId);
  }
};
