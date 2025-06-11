# 🛒 Product List & Management App (Admin Only)

A full-stack product management application built with **React**, **Node.js**, **Express**, **MongoDB**, and **JWT Authentication**. This app allows an admin user to manage (Create, Read, Update, Delete) products with optional image upload.

---

## 📁 Tech Stack

- **Frontend**: React.js, Axios, Tailwind CSS (optional), React Router
- **Backend**: Node.js, Express.js, Multer (for image upload), JWT Auth
- **Database**: MongoDB
- **Auth**: JSON Web Token (JWT), stored in `localStorage`

---

## 🔐 Features

### Admin Panel (Requires Login)
- Admin login with JWT
- Create product with image upload
- Edit and delete product
- Form validation 

### Public Access
- View all products

---

## 📦 Product Schema

Each product contains:

```js
{
  name: String,         // required
  price: Number,        // required, must be positive
  category: String,     // required
  inStock: Boolean,     // default: true
  image: String         // optional (file path)
}
