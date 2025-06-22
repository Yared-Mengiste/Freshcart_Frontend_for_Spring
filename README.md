# 🛒 FreshCart Frontend

**FreshCart** is a full-featured grocery delivery web application frontend built with **React.js**. It connects users to nearby supermarkets offering fresh plant- and animal-based products like fruits, vegetables, grains, and dairy. The frontend enables both customer and admin interactions such as ordering, managing products, and tracking deliveries.

---

## 🌐 What This Project Does

This web frontend allows:

- Customers to:

  - 🛍️ Browse and filter products by category (vegetables, fruits, cereals, animal products)
  - 🔍 Search for products
  - 🛒 Add items to cart and proceed to checkout
  - 💳 Pay using **Chapa** or **Telebirr**
  - 🚚 View delivery info and past orders
  - 📬 Submit suggestions or feedback via contact form
  - 👤 Edit their profile
  - 🍪 Stay logged in and keep cart items via cookies

- Admins to:
  - ➕ Add, update, or delete products
  - 👥 View users and their details
  - 🔑 Reset user passwords (with future email-based update support)
  - 📦 View all orders

---

## ⚙️ Tech Stack

- **React.js** — frontend library
- **React Router** — page routing
- **Context API** — for global state management (user, cart, search, and product data)
- **Axios** — for HTTP requests
- **Blueimp MD5** — for hashing passwords
- **React Icons / Ionicons** — for visual elements
- **CSS Modules** — component styling
- **Vite** — fast development server and build tool

---

## 📁 Folder Structure (Simplified)

```
src/
├── components/       # Reusable UI components (NavBar, Footer, Product)
├── pages/            # All page components (Home, Admin, Products, etc.)
├── context/          # Context providers (UserContext, CartContext, etc.)
├── json/             # Temporary mock data source (data.json)
├── assets/           # Static images and icons
├── App.jsx           # Main component with routing
├── main.jsx          # React DOM entry point
```

---

## 🛠 Features Overview

| Feature              | Description                                                |
| -------------------- | ---------------------------------------------------------- |
| 🛍 Product Categories | Filter by Vegetables, Fruits, Cereals, or Animal Products  |
| 🔍 Search Bar        | Live filtering of products using search term               |
| 🛒 Cart System       | Add/remove items, calculate total, and store using cookies |
| 🧾 Order Checkout    | Submit cart with payment number via Chapa or Telebirr      |
| 📦 Order Tracking    | Track your delivery status from the user dashboard         |
| 👤 Profile Editing   | Change user details easily from the profile page           |
| 🧑‍💼 Admin Panel       | Admin access to add/update/delete products, manage users   |
| 🔐 Authentication    | Simple hashed login system using email and MD5             |

---

## 🔄 Future Improvements

- Replace `data.json` with real-time database integration
- Improve authentication with secure token-based login
- Enable email-based password recovery
- Implement pagination and performance optimizations

---
