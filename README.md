# AniTV Tracker 🎌

AniTV Tracker is a **full-stack anime tracking and social media web application** where users can track the anime they watch, share posts, interact with other users, and manage their profiles.

This project is built as a **LAUNCHED GLOBAL INTERNSHIP** using modern web development technologies.

---

## 🚀 Project Overview

AniTV Tracker allows users to:
- Track anime they are watching, completed, or planning to watch
- Share posts related to anime
- Like and comment on posts
- Follow other users
- View a social feed
- Manage their profile and account settings

The application consists of a **backend API** and a **frontend user interface**, running independently.

---

## 🛠️ Tech Stack

### Frontend
- HTML
- CSS
- JavaScript
- React (Vite)
- Context API (Authentication state)

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Multer (Image Uploads)

**Cors** is used to connect backend with frontend

---

## ✨ Features

### 🔐 Authentication
- User Signup
- User Login
- JWT-based authentication
- Secure logout

---

### 👤 User Profile
- View profile
- Edit profile details
- Upload profile picture
- View followers and following

---

### 🎬 Anime Tracker
- Add anime to personal list
- Track anime status:
  - Watching
  - Completed
  - Plan to Watch
  - On Hold
  - Dropped
- Update anime progress and ratings

---

### 📰 Social Feed
- Create posts
- Like and unlike posts
- Comment on posts
- Follow and unfollow users
- Feed showing posts from other users

---

### 📊 Dashboard
- Overview of tracked anime
- Followers and following count

---

## 📂 Project Structure

```bash
AniTV_Tracker/
├── backend/
│   ├── src/
│   │   ├── config/        # Database & environment configuration
│   │   ├── models/        # Mongoose / DB models
│   │   ├── controllers/  # Business logic
│   │   ├── routes/       # API routes
│   │   ├── middleware/   # Auth & upload middleware
│   │   ├── app.js        # Express app setup
│   │   └── server.js     # Server entry point
│   ├── uploads/          # Uploaded images/files
│   ├── .env              # Environment variables
│   └── package.json
│
├── frontend/
│   ├── src/              # React source code
│   ├── public/           # Static assets
│   └── package.json
│
├── Host.md              # Hosting to see in moblie phone
│
└── README.md             # Project overview
```

---

## ▶️ How to Run the Project


Follow the steps below to run **AniTV Tracker** on your local machine.

---

## 1. Open Project in Code Editor
- Open the folder **`AniTV_Tracker`** in a code editor (recommended: **VS Code**).

---

## 2. Start the Backend Server
1. Open the terminal.
2. Run the following commands:

```bash
cd backend
npm install
npm run dev
```

* The backend server will start on **port 5000**.

---

## 3. Start the Frontend Server

1. Open **one more terminal**.
2. Run the following commands:

```bash
cd frontend
npm install
npm run dev
```

---

## 4. Open the App in Browser

Open your browser and go to:

```
http://localhost:5173/
```

### OR

From the **frontend terminal**:

* Enter **`o`**
* Then press **Enter**

(This will automatically open the browser.)

---

## 5. Use the Application

* You will land on the **Landing Page**.
* From there, you can **Sign In** or **Sign Up**.
* After logging in, start exploring:

  * Track anime
  * Create posts
  * Like & comment
  * Follow users
  * Edit your profile
  * Use the dashboard

---

## ⚠️ Important Notes

- Internet connection is required
- Backend runs on **port 5000**
- Frontend runs on **port 5173**
- Do not modify the code

---

## 🎯 Project Purpose

This project demonstrates:
- Full-stack development skills
- API design
- Authentication and authorization
- Database modeling
- Social media features
- Real-world application structure

---

## 👨‍💻 Author

**Vishnu Chandak**  
BCA (2*nd* year) Student  
Full-Stack Web Development Project  
18 December 2025 - 28 January 2026

---

## 📌 Conclusion

AniTV Tracker is a complete full-stack web application that combines anime tracking with social interaction, making it both practical and engaging for users.