# Shipify - Full-Stack E-Commerce Platform 🛒

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)

Shipify is a complete, scalable, and responsive Full-Stack E-Commerce platform built using the MERN stack (MongoDB, Express, React, Node.js). 

Designed with modern architectural patterns, it features a global authentication context, a dedicated admin dashboard, and secure cloud image storage.

## ✨ Key Features

- **Robust Authentication:** Secure JWT-based authentication system with OTP verification and centralized global React Context for session management.
- **Role-Based Access Control:** Dedicated protected routes. Admin users have access to an exclusive dashboard to manage inventory and orders, while standard users are restricted to the storefront.
- **Product & Inventory Management:** Full CRUD operations for products. Admins can seamlessly create, update, and delete products.
- **Cloud Integration:** Integrated with **Cloudinary** and `multer` for efficient and secure product image uploads and cloud storage.
- **Modern State Management:** Utilizes **TanStack React Query** for highly optimized, cached, and asynchronous server-state management.
- **Sleek UI:** Fully responsive frontend styled entirely with **Tailwind CSS**.

## 🛠️ Tech Stack

### Frontend
- **Framework:** React (Vite)
- **Styling:** Tailwind CSS
- **State Management:** React Query (@tanstack/react-query), React Context API
- **Routing:** React Router DOM (Protected Routes architecture)
- **Forms:** React Hook Form

### Backend
- **Runtime & Framework:** Node.js, Express.js
- **Database:** MongoDB (Mongoose ODM)
- **Authentication:** JSON Web Tokens (JWT), bcrypt
- **File Storage:** Cloudinary, Multer

## 🚀 Run Locally

1. **Clone the project**
   ```bash
   git clone https://github.com/your-username/project-e-commerce.git
   ```

2. **Setup the Backend**
   ```bash
   cd server
   npm install
   ```
   Create a `.env` file in the `server` directory and add your keys:
   ```env
   PORT=3000
   MONGO_URI=your_mongo_uri
   FRONTEND_URL=http://localhost:5173
   CLOUDINARY_CLOUD_NAME=your_name
   CLOUDINARY_API_KEY=your_key
   CLOUDINARY_API_SECRET=your_secret
   ```
   Start the backend:
   ```bash
   npm run dev
   ```

3. **Setup the Frontend**
   ```bash
   cd Frontend/E-commerce
   npm install
   npm run dev
   ```

## 👨‍💻 About the Developer
Built by a dedicated 1st-year Computer Science student actively seeking fresher internships. This project demonstrates proficiency in RESTful API design, modern React hooks, cloud integration, and database management.
