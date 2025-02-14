import logo from './logo.svg';
import './App.css';
import Home from './pages/Home';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddBlog from './pages/AddBlog';



function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/ad-blog" element={<AddBlog />} />
      <Route path="/blogs/{id}" element={<AddBlog />} />

    </Routes>
  </Router>
  );
}

export default App;
