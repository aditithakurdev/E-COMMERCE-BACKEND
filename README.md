# E-COMMERCE-BACKEND

*COMPANY*: CODETECH IT SOLUTIONS

*NAME*: ADITI

*INTERN ID: CTISO800

*DOMAIN*: BACKEND WEB DEVELOPEMENT

*DURATION*: 4 WEEKS

*MENTOR*: NEELA SANTOSH

*DESCRIPTION*: This project focuses on building an E-Commerce Backend System using Node.js (Express.js).
The application provides restful APIs for user authentication, product management, and order processing.
The system supports secure user registration and login, admin-controlled product operations, and order placement with status tracking. Authentication and authorization ensure that only authorized users can access protected resources.
The backend is integrated with a relational database (PostgreSQL), making it a scalable and production-ready server-side application suitable for real-world e-commerce platforms.

*FEATURES*:
    -User Registration and Login
    -JWT - based Authentication & Authorization
    -Role - based Access (Admin / Customer)
    -Product Management (Create, Update, Delete, View)
    -Order Creation and Order History
    -Order Status Tracking
    -Secure API Endpoints

*TECH STACK*:
    -Node.js
    -Express.js
    -Database: PostgreSQL
    -Authentication: JWT
    -Password Encryption: bcrypt        

*PROJECT STRUCTURE*:
    ecommerce-backend/
│── src/
│   ├── config/
│   │   └── database.js
│   ├── models/
│   │   ├── user.js
│   │   ├── product.js
│   │   └── order.js
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── product.routes.js
│   │   └── order.routes.js
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── product.controller.js
│   │   └── order.controller.js
│   ├── middleware/
│   │   └── auth.middleware.js
│   ├── app.js
│── index.js
│── package.json
│── .env
