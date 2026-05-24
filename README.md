---

# 🚀 ✅ FULL README.md

```md
# 🕌 DeenSeries

A modern fullstack platform to stream Islamic series and movies with a clean, distraction-free experience.

---

## ✨ Features

### 🎬 Public Platform
- Browse Islamic series & movies
- Watch episodes with embedded player
- Clean, minimal UI (no login required)
- Responsive design (mobile-first)

### 🛠️ Admin Panel
- Secure admin login (JWT auth)
- Create / Edit / Delete Series
- Manage Episodes dynamically
- Upload media via Cloudinary
- Movie management system
- Modern dashboard UI

---

## 🔐 Security

- JWT Authentication (Access + Refresh Token)
- Password hashing (bcrypt)
- Rate limiting (brute-force protection)
- Helmet security headers
- DTO validation (class-validator)
- Secure Cloudinary upload (signature-based)

---

## 🧱 Tech Stack

### 🖥️ Frontend (Next.js)
- Next.js App Router
- Tailwind CSS
- Framer Motion
- Lucide Icons

### ⚙️ Backend (NestJS)
- NestJS (Modular architecture)
- MongoDB + Mongoose
- JWT Authentication
- Cloudinary Integration
- Swagger API Docs

---

## 📁 Project Structure

```

client/   → Next.js frontend
server/   → NestJS backend

```

---

## ⚙️ Environment Variables

### 🔹 Backend (.env)

```

MONGO_URI=
ADMIN_PASSWORD_HASH=

JWT_ACCESS_SECRET=
JWT_ACCESS_EXPIRES_IN=10m

JWT_REFRESH_SECRET=
JWT_REFRESH_EXPIRES_IN=7d

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

````

---

## 🚀 Getting Started

### 1️⃣ Clone repo

```bash
git clone https://github.com/tarikul3639/deenseries.git
cd deenseries
````

---

### 2️⃣ Setup Backend

```bash
cd server
npm install
npm run start:dev
```

---

### 3️⃣ Setup Frontend

```bash
cd client
npm install
npm run dev
```

---

## 🌱 Seed Database

```bash
npm run seed
```

---

## 🔗 API Docs

Swagger available at:

```
http://localhost:3000/api
```

---

## 📸 Media Upload

* Direct upload from frontend
* Cloudinary signed upload
* Secure & scalable

---

## 🔮 Future Improvements

* User accounts & profiles
* Watch history / continue watching
* Favorites / watchlist
* Search & filtering
* Analytics dashboard

---

## 🤝 Contributing

Pull requests are welcome. For major changes, open an issue first.

---

## 📄 License

MIT License

---

## 👨‍💻 Author

Built with ❤️ by Tarikul

````

---

# 🔥 Bonus (optional but powerful)

👉 GitHub-এ add করো:

```md
## 🌍 Live Demo
https://your-site.com
````

---