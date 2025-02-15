# 🖥️ Blog Application (Frontend) - React.js

This is the frontend of the blog application built using React.js. It interacts with the Laravel backend via REST API and provides a responsive UI for managing blog posts.

---

## 🚀 Features

✅ Display blog posts with pagination  
✅ Create, update, and delete blogs  
✅ Responsive UI with React & Bootstrap  
✅ API integration using Axios  
✅ Loader on form submission  

---

## 📂 Folder Structure

```bash
blog_project/
│── frontend/ # React App (Frontend)
│   ├── src/ # React components & pages
│   ├── public/ # Public assets (index.html, favicon, etc.)
│   ├── .env # API URL configuration
│   ├── package.json # Dependencies & scripts
│   ├── README.md # Documentation
```

---

## 🚀 Frontend Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Ritik-kumar261/Blog-frontend.git
cd blog_frontend
```

---

### 2️⃣ Install Dependencies

```bash
npm install
```

---

### 3️⃣ Configure Environment

Create a `.env` file in the root directory and set your backend API URL:

```bash
REACT_APP_API_URL=http://localhost:8000/api
```

---

### 4️⃣ Start the Development Server

```bash
npm start
```

---

## 📡 API Integration (Axios)

The frontend uses Axios to interact with the backend API. Example usage:

```javascript
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const fetchBlogs = async () => {
  try {
    const response = await axios.get(`${API_URL}/blogs`);
    return response.data;
  } catch (error) {
    console.error("Error fetching blogs", error);
    return [];
  }
};
```

---

## 📜 Available Scripts

| Command         | Description                       |
|----------------|-----------------------------------|
| `npm start`    | Run the development server       |
| `npm build`    | Build the project for production |
| `npm test`     | Run unit tests                   |

---

## 📜 Technologies Used

✅ React.js - Component-based UI  
✅ React Router - Page navigation  
✅ Axios - API calls  
✅ Bootstrap - Responsive design  
✅ React Hooks - State management  

---

## 🎯 Contributing

Contributions are welcome! Feel free to submit a pull request.

---

## 📜 License

This project is open-source under the MIT License.
