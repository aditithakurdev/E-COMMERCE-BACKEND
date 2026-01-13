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
    -NestJS
    -Database: PostgreSQL
    -Authentication: JWT
    -Password Encryption: bcrypt        

*PROJECT STRUCTURE*:
src/
│── auth/
│   ├── auth.module.ts
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   ├── jwt.strategy.ts
│   ├── guards/
│   │   └── jwt-auth.guard.ts
│   └── dto/
│       ├── register.dto.ts
│       └── login.dto.ts
│
│── users/
│   ├── user.entity.ts
│   ├── users.service.ts
│   └── users.module.ts
│── products/
│   ├── product.entity.ts
│   ├── products.controller.ts
│   └── products.module.ts
│── orders/
│   ├── order.entity.ts
│   ├── orders.controller.ts
│   └── orders.module.ts
│── app.module.ts
│── package.json
│── .env
