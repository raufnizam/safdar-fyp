
```markdown
# MERN Stack with MySQL

A full-stack web application using React (Frontend), Express.js (Backend), and MySQL (Database).

## 📁 Project Structure

```
CareerConnect/
├── backend/       # Express.js + MySQL server
│   ├── config/    # Database configuration
│   ├── routes/    # API endpoints
│   └── server.js  # Main server file
└── frontend/      # React application
    ├── public/
    └── src/       # React components
```

## 🚀 Quick Start

### 1. Backend Setup
```bash
cd backend
npm install
```

#### Configure Database:
1. Create `.env` file:
```env
DB_HOST=localhost
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=your_database
JWT_SECRET=your_random_secret_key
PORT=3000
```

### 2. Frontend Setup
```bash
cd frontend
npm install
```

#### Start React App:
```bash
npm start
```

## 🌐 API Routes

### Authentication
| Method | Endpoint          | Description           |
|--------|-------------------|-----------------------|
| POST   | /api/auth/register | Register new user     |
| POST   | /api/auth/login    | Login existing user   |
| GET    | /api/auth/me       | Get current user data |

## 🔧 Environment Variables

### Backend (`.env`)
- `DB_HOST`: MySQL host
- `DB_USER`: MySQL username  
- `DB_PASSWORD`: MySQL password
- `DB_NAME`: Database name
- `JWT_SECRET`: Secret for JWT tokens
- `PORT`: Server port (default: 3000)

## 📦 Dependencies

### Backend
- Express.js
- MySQL2
- bcryptjs
- jsonwebtoken
- dotenv
- cors

### Frontend
- React
- React Router
- Axios
- Framer Motion
- React Icons
