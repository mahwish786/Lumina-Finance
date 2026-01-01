# 💸 Lumina Finance – Intelligent Expense Tracker

> **A modern, full-stack solution to master your personal finances.**

Welcome to **Lumina Finance**! This isn't just a standard expense tracker; it's a fully responsive, full-stack web application designed to make financial management intuitive, secure, and visually engaging.

[cite_start]This project was built to fulfill the **Unified Mentor** assignment requirements[cite: 6], upgrading the challenge to an Enterprise-grade **MERN Stack** application with **Next.js**.

---

## 🌟 Key Features

Lumina Finance goes beyond basic tracking. Here is what you can do:

* [cite_start]**📊 Smart Dashboard:** View your Total Income, Total Expenses, and Net Balance at a glance[cite: 18, 24].
* **🔐 Secure Authentication:** User registration and login protected by JWT (JSON Web Tokens) and password hashing.
* [cite_start]**📝 Transaction Management:** Easily Add, Edit, and Delete income or expenses[cite: 13, 38].
* [cite_start]**🏷️ Categorization:** Organize transactions by categories (Food, Transport, Salary, etc.).
* [cite_start]**📈 Data Visualization:** A dynamic Doughnut chart visualizes your cash flow distribution[cite: 37].
* [cite_start]**🖨️ Export Reports:** Download a professional PDF report of your transaction history with one click[cite: 39].
* **🧾 Receipt Uploads:** Upload and store images/PDFs of your receipts using Cloudinary cloud storage.
* **🎨 UI/UX Excellence:**
    * **Dark/Light Mode** toggle.
    * **Glassmorphism** design elements.
    * **Smooth Animations** powered by Framer Motion.
    * [cite_start]**Fully Responsive** for mobile, tablet, and desktop[cite: 28].

---

## 🛠️ Tech Stack

This project uses a modern **Next.js + MERN** architecture:

**Frontend:**
* **Framework:** Next.js (React)
* **Styling:** Bootstrap 5, Custom CSS Variables
* **Animations:** Framer Motion
* **HTTP Client:** Axios
* **Extras:** Chart.js (Visuals), jsPDF (Export), React Toastify (Notifications)

**Backend:**
* **Runtime:** Node.js & Express.js
* **Database:** MongoDB & Mongoose
* **Auth:** JSON Web Tokens (JWT) & Bcryptjs
* **Storage:** Multer & Cloudinary (File Uploads)

---

## 🚀 Getting Started

Follow these steps to run Lumina Finance locally on your machine.

### 1. Prerequisites
Make sure you have the following installed:
* [Node.js](https://nodejs.org/)
* [MongoDB](https://www.mongodb.com/) (Locally or use MongoDB Atlas)

### 2. Clone the Repository
```bash
git clone <your-repo-link-here>
cd expense-tracker


Configuration: Create a .env file in the backend/ folder and add the following keys:

Code snippet

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key
# Optional: For Receipt Uploads
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
Start the Server:

Bash

npm start
# The server will run on http://localhost:5000
3. Frontend Setup
Open a new terminal, navigate to the frontend folder, and install dependencies:

Bash

cd frontend
npm install
Start the Client:

Bash

npm run dev
# The app will run on http://localhost:3000
📖 How to Use
Sign Up: Open the app and create a new account. Your data is private to you!

Add a Transaction:

Click the "New Entry" form on the dashboard.

Enter details (Description, Amount, Date).

Select Type (Income/Expense) and Category.

(Optional) Upload a receipt file.

Analyze: Watch the "Cash Flow" chart update in real-time as you add data.

Manage: Scroll through "Recent Activity" to Edit or Delete incorrect entries.

Filter: Use the filter dropdown to see only specific categories (e.g., "Food").

Export: Click "Export PDF" to save a copy of your financial report.

📂 Project Structure
Plaintext

EXPENSE TRACKER/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── node_modules/
│   ├── routes/
│   ├── views/
│   ├── .env
│   ├── package-lock.json
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── .next/
│   ├── app/
│   ├── components/
│   ├── node_modules/
│   ├── public/
│   ├── .gitignore
│   ├── eslint.config.mjs
│   ├── jsconfig.json
│   ├── next.config.mjs
│   ├── package-lock.json
│   ├── package.json
│   └── README.md
└── README.md


👤 Author
[Your Name]

Full Stack Developer

Project Difficulty Level: Hard

Built with ❤️ for the Unified Mentor skill assessment.