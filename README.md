# DeskFlow – Internal IT Service Request Portal

DeskFlow is a full-stack Internal IT Service Request Portal that enables employees to report IT issues and allows administrators to manage and resolve service requests through a secure role-based dashboard.

This project was developed as part of a Full-Stack Software Development assessment to demonstrate proficiency in building secure REST APIs, implementing authentication and authorization, integrating databases, and developing responsive React applications.

## Live Demo : [desk-flow-mauve.vercel.app ](https://desk-flow-bj7pibhl7-tshegofatsoselahle.vercel.app/)
Backend link: https://deskflow-eieo.onrender.com
---

# Features

## Authentication
- Secure JWT Authentication
- Role-Based Access Control (RBAC)
- Password hashing using bcrypt
- Protected API routes
- Logout functionality

---

## Employee Features

- Login securely
- Create IT support tickets
- View personal tickets only
- Track ticket status
- View ticket priority
- Responsive dashboard

---

## Admin Features

- Login securely
- View all tickets
- Manage employee requests
- Update ticket status
- Monitor all submitted issues
- Responsive admin dashboard

---

## Ticket Management

Employees can create tickets containing:

- Title
- Description
- Priority
  - Low
  - Medium
  - High

Admins can update ticket status:

- Open
- In Progress
- Resolved

---

# Tech Stack

## Frontend

- React
- React Router
- Axios
- CSS3
- React Hooks

---

## Backend

- Node.js
- Express.js

---

## Database

- MongoDB Atlas
- Mongoose ODM

---

## Authentication

- JSON Web Tokens (JWT)
- bcrypt

---

## API Testing

- Postman

---

## Version Control

- Git
- GitHub

---

# 📂 Project Structure

```
DeskFlow
│
├── backend
│   ├── src
│   │   ├── config
│   │   ├── controllers
│   │   ├── middleware
│   │   ├── models
│   │   ├── routes
│   │   ├── services
│   │   ├── utils
│   │   └── server.js
│   │
│   ├── package.json
│   └── .env
│
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── services
│   │   ├── context
│   │   ├── assets
│   │   └── App.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

# Getting Started

## Clone the Repository

```bash
git clone https://github.com/Tshego1108/DeskFlow.git
```

Navigate into the project:

```bash
cd DeskFlow
```

---

# Backend Setup

Navigate to the backend folder.

```bash
cd backend
```

Install dependencies.

```bash
npm install
```

Create a `.env` file.

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

EMAIL_USER=your_email

EMAIL_PASS=your_email_password
```

Start the backend server.

```bash
npm run dev
```

---

# Frontend Setup

Navigate to the frontend folder.

```bash
cd frontend
```

Install dependencies.

```bash
npm install
```

Start the React application.

```bash
npm run dev
```

---

# API Endpoints

## Authentication

| Method | Endpoint | Description |
|----------|------------------|-----------------------------|
| POST | /api/auth/login | Login user |

---

## Tickets

| Method | Endpoint | Description |
|----------|--------------------|--------------------------|
| POST | /api/tickets | Create ticket |
| GET | /api/tickets | Retrieve tickets |
| PUT | /api/tickets/:id | Update ticket status |

---

# Demo Accounts

## Administrator

```
Email:
p.mabelane@deskflow.com

Password:
Admin@123
```

---

## Employee

```
Email:
tshego.selahle@deskflow.com

Password:
Employee@123
```

---

# Authentication Flow

```
User Login
      │
      ▼
JWT Generated
      │
      ▼
Protected Routes
      │
      ▼
Role Verification
      │
      ▼
Employee Dashboard
or
Admin Dashboard
```

---

# Validation

The application validates:

- Required fields
- Email format
- Password authentication
- Ticket priority
- Ticket status
- User authorization

---

# Error Handling

The API returns appropriate HTTP status codes:

- 200 OK
- 201 Created
- 400 Bad Request
- 401 Unauthorized
- 403 Forbidden
- 404 Not Found
- 500 Internal Server Error

---

# Postman Testing

The API was tested using Postman.

Tested endpoints include:

- Login
- Create Ticket
- Retrieve Tickets
- Update Ticket Status

---

# Deployment

## Frontend

Vercel

## Backend

Render

## Database

MongoDB Atlas

---

# Future Improvements

- Email notifications
- Password reset via email
- File attachments for tickets
- Ticket comments
- Search and filtering
- Ticket categories
- Dashboard analytics
- Dark mode
- User profile management
- Audit logs
- Pagination
- Real-time updates using Socket.io

---

# Learning Outcomes

Through this project, I gained practical experience with:

- Full-Stack Development
- React
- Node.js
- Express
- MongoDB
- RESTful API Design
- JWT Authentication
- Role-Based Authorization
- CRUD Operations
- API Testing with Postman
- Git & GitHub
- Professional Project Structure

---

# Author

**Phina Tshegofatso Selahle**

Software Developer | Data Analytics Enthusiast

**LinkedIn:** www.linkedin.com/in/phina-tshegofatso-selahle-294a5a334

**GitHub:** https://github.com/Tshego1108

---

# License

This project was developed for educational and portfolio purposes.
