# onebox-todo

A simple fullstack Todo app built with **React**, **Express**, and **JSON file storage**, designed to demonstrate the foundation of a modern fullstack app without using high-level frameworks or databases.
This project **serves the static frontend built from React** and exposes **API routes via Express**, simulating a production setup similar to how frameworks like Next.js operate behind the scenes — but all done manually for learning purposes.

## 🔧 Features

- 🧠 Explore how a single Express server can serve both frontend and backend
- 📁 JSON file used for lightweight storage (no database needed)
- ⚛️ React frontend (served as static files)
- 🌐 RESTful API using Express
- 🐳 Docker-ready setup for local deployment

## 📁 Folder Structure
```
onebox-todo/
├── client/           # React frontend app
│   ├── public/
│   ├── src/
│   └── ...
├── server/           # Express backend
│   ├── api/          # API routes
│   ├── utils/        # File utilities, etc.
│   ├── data/         # JSON file storage
│   └── server.js     # Entry point
├── Dockerfile
├── README.md
└── ...
```

## 🚀 Getting Started

### 1. Install dependencies

```bash
# From root, install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
````

### 2. Build React app

```bash
cd client
npm run build
```

### 3. Run the server

```bash
cd ../server
node server.js
```

Express will serve:

* Static files from `client/build`
* API under `/api/*`

### 4. Open in browser

```
http://localhost:3000
```

---

## 🐳 Docker (Optional)

To run using Docker:

```bash
docker build -t onebox-todo .
docker run -p 3000:3000 onebox-todo
```

---

## 📚 Learning Goals

This project is ideal if you're learning:

* How static frontends are served by Node/Express
* How React and Express communicate via API
* How to deploy a fullstack app manually
* How frameworks like Next.js automate these steps for you
