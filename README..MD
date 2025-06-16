# 🚀 User Journey App

A full-stack web application built with **Node.js/Express** and **React + Material UI** that allows users to upload `.xlsx` marketing data, process it, and visualize user journeys grouped by session.

Processed data is saved in `.json` format — no database required.

---

## ✨ Features

### 🖥️ Backend (Node.js + Express)

* `GET /ping`: Health check.
* `POST /upload`: Upload and parse `.xlsx` files.
* `GET /journeys`: Returns processed journeys grouped by session ID, including touchpoint counts.
* Excel data is automatically transformed into structured JSON.
* Unified error response format:

  ```json
  { "success": false, "message": "Descriptive error message" }
  ```

### 🌐 Frontend (React + Material UI)

* Upload Excel files via a drag-and-drop interface.
* `/ping` page to test connection with the backend.
* Displays journeys in a responsive table:

  * **Session ID (Journey)**
  * **Number of Touchpoints**

---

## 🐳 Getting Started with Docker

This project uses **Docker Compose** to run both the frontend and backend.

### ⚙️ Prerequisites

* [Docker](https://www.docker.com/)
* [Docker Compose](https://docs.docker.com/compose/)

---

## 📄 Environment Setup

Before building the containers, you **must** create a `.env` file inside the frontend project directory:

```
frontend/userJourney/.env
```

With the following content:

```env
VITE_API_URL=http://backend:3000
```

This allows the frontend to correctly connect to the backend API during runtime.

---

### ▶️ Running the App

Once the `.env` file is created, run:

```bash
docker-compose up --build
```

After startup:

* Backend: [http://localhost:3000](http://localhost:3000)
* Frontend: [http://localhost:4000](http://localhost:4000)

### 🛑 Stopping the App

```bash
docker-compose down
```

---

## 📂 Project Structure

```
/userJourney
├── backend/
│   ├── src/
│   │   ├── userJourney/
│   │   │   ├── store/
│   │   │   ├── types/
│   │   │   └── utils/
│   │   ├── index.ts
│   │   └── route.ts
│   ├── Dockerfile
│   └── package.json
├── frontend/
│   └── userJourney/
│       ├── src/
│       ├── .env        <-- Create this!
│       ├── Dockerfile
│       ├── vite.config.ts
│       └── nginx.conf
```

---

## 🌍 API Endpoints

| Method | Route       | Description                         |
| ------ | ----------- | ----------------------------------- |
| GET    | `/ping`     | Health check                        |
| POST   | `/upload`   | Upload `.xlsx` file and process it  |
| GET    | `/journeys` | Returns sessions grouped by journey |

---

## 🧪 UI Example: Journey Table

After uploading a file, the frontend displays a table like:

| Journey (Session ID) | Number of Touchpoints |
| -------------------- | --------------------- |
| abc123               | 4                     |
| xyz789               | 7                     |

The table updates automatically upon successful upload and processing.

---

## ⚠️ Notes

* Ensure Docker is running before starting.
* The `.env` file is **mandatory** before building the frontend.
* JSON files are stored locally on the server — no database is required.
* Frontend proxies API calls to the backend via `VITE_API_URL`.

---

## 🛠 Tech Stack

* **Backend**: Node.js, Express
* **Frontend**: React, Material UI
* **DevOps**: Docker, Docker Compose

---

Made with ❤️ using **Node.js**, **React**, and **Material UI**

