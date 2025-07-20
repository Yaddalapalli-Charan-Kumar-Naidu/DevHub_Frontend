# DevHub

A full-stack developer-centric networking app for connecting, chatting, and collaborating with other developers & tech professionals.

---

## 🚀 Features

- **Modern, responsive, glassy UI** for devs & techies
- **User authentication:** Login & Signup flows with protected routes
- **Profile editing & live preview:** Skills, bio, avatar
- **Feed:** Suggests relevant users to connect with
- **Connections:** List and manage your tech network
- **Requests:** Accept or refuse connection requests
- **1:1 chatting:** Real-time chat with dev-friendly bubbles and history
- **Beautiful, accessible Navbar and Footer**
- **Mobile-first, works great everywhere**

## 🖥️ Tech Stack

- **Frontend:** React, Redux, Tailwind CSS, React Router, Axios, react-icons
## 🛠️ Backend Stack

- **Express.js API:** RESTful endpoints (e.g., `/auth/*`, `/user/*`, `/chat/*`, etc) power authentication, profiles, connection requests, and messaging.
- **MongoDB:** Primary database for storing user data, messages, requests, profiles, and all persistent app data.
- **Redis:** In-memory store for fast session management, caching, and optimizing real-time features.
- **JWT (JSON Web Tokens):** Secure, stateless authentication and route protection for users.
- **bcrypt:** Securely hashing passwords and verifying user credentials.
- **Cron Jobs:** Scheduled background tasks (e.g., cleanup, notifications, analytics).
- **Nodemailer:** Sending transactional/system-generated emails (verifications, invites, password resets, etc).

### Backend Highlights

- **Robust authentication:** Sign up, login, and JWT-protected endpoints with secure password management.
- **Session & rate limiting:** Redis is leveraged for scalable session storage and implementing security.
- **Email workflows:** Nodemailer powers all platform emails.
- **Scheduled tasks:** Cron jobs automate repetitive backend work (cleanup, reminders).
- **Production-ready configuration:** Environment variables, centralized error handling, and security best practices.
- **API-first approach:** Clean REST routes and well-defined JSON responses for easy frontend integration.

- **WebSocket:** Socket.io for real-time chat

## 🚀 DevHub Frontend Setup Guide

Follow these steps to get the frontend running locally:

---

### 1. **Clone and Install**

```bash
git clone https://github.com/Yaddalapalli-Charan-Kumar-Naidu/DevHub_Frontend.git
cd DevHub_Frontend
npm install
```



2. **Environment Variables:**  
Create a `.env` file at the root with:
```bash
VITE_BASE_URL=http://localhost:5000
```



3. **Start Frontend:**

```bash
npm run dev
```

4. **Backend:**  
Point `VITE_BASE_URL` to your running backend API (not included in this repo).

5. **Sockets:**  
Socket.io is auto-connected using `VITE_BASE_URL`. Backend must serve socket endpoint.

## ✨ Major Components

- **Navbar / Footer:**  
Beautiful, glassy, responsive dev-themed navigation.

- **Login / Signup:**  
Modern forms with error handling, developer flavor, animated transitions.

- **Feed:**  
Discover users with skill chips, connect/ignore actions.

- **Connections:**  
Your dev network, live overview, chat links.

- **Requests:**  
Handle incoming connection requests with accept/reject.

- **EditProfile:**  
Form with skills, bio, avatar, and live card preview.

- **Chat:**  
Real-time, mobile-ready, accessible chat with sticky input, bubble animations, and auto-scroll.

## 🌗 Design

- **Colors:**  
Deep blues, slates, glass effects, highlighted with mono fonts.
- **UX:**  
Keyboard accessible, focus rings, a11y-minded.
- **Animations:**  
Cards, dropdowns, chips, etc. animate in for a pleasant, modern feel.

## 🔒 Security

- **Auth:**  
Uses HTTP-only cookies/session via backend.
- **User Info:**  
Only authenticated users can access profiles, chat, feed.
- **Socket rooms:**  
Chat rooms are joined with user IDs - don’t expose sensitive info!


## 👨‍💻 Author

- [Charan Kumar Naidu Yaddalapalli - LinkedIn](https://www.linkedin.com/in/charan-kumar-naidu-yaddalapalli)
- [Charan Kumar Naidu Yaddalapalli - GitHub](https://github.com/Yaddalapalli-Charan-Kumar-Naidu)

---

## ⭐️ Enjoy building your developer network with DevHub!

> _This project is handcrafted for coders. Feel free to fork and power up your own dev democracy._
