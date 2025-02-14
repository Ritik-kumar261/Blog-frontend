import logo from './logo.svg';
import './App.css';
import Home from './pages/Home';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddBlog from './pages/AddBlog';
import ReadBlog from './pages/ReadBlog';



function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/ad-blog" element={<AddBlog />} />
      <Route path="/blog/:id" element={<ReadBlog />} />

    </Routes>
  </Router>
  );
}

export default App;
