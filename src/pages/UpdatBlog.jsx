import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import Header from '../component/Header';
import axios from 'axios';

function UpdatBlog() {
    const navigate = useNavigate();
    const {id}= useParams();
    const location =useLocation();
    const initialBlog  =location.state?.blog || null;
    console.log(initialBlog);
    const [updateBlog, setupdateBlog] = useState(initialBlog);
    console.log("here is the usesatte :" ,updateBlog);
    const [loading, setloading] = useState(false);
    const handleChange = (e)=>{
    setupdateBlog({...updateBlog,[e.target.name]:e.target.value});
  }
  // handle the condition if the blog is not present in the uselocation();
  
  useEffect(() => {
    if (!initialBlog) {
      const fetchBlogData = async () => {
        try {
          const response = await axios.get(`http://localhost:8000/api/blogs/${id}`);
          setupdateBlog(response.data.data);
          //setLoading(false);
        } catch (error) {
          console.error("Error fetching blog:", error);
          alert("Blog not found!");
          navigate("/"); // Redirect to home if blog not found
        }
      };
      fetchBlogData();
    }
  }, [id]);
   // handle the update form 
   const handleSubmit = async (e)=>{
    e.preventDefault();
    setloading(true);
    try {
        const response =await axios.put(`http://localhost:8000/api/blogs/${id}`,updateBlog, {
        headers:{
            "Content-Type":"application/json"
        }
        });
        if(response.status==200 || response.status==201){
            alert(response.data.message);
            navigate(`/blog/${id}`);
        }else{
            alert("There is an error to update the Post");
        }
    } catch (error) {
        console.log(error);
    }finally{
      setloading(false);
    }
   }
 
  if (!updateBlog) {
    return <h3 className="text-center mt-5">Loading...</h3>;
  }
  return (
    <>
    <Header/>
        <div className=" shadow container mt-4">
      <h3 className='mt-3'>Update Blog</h3>
      {loading && (
        <div className="text-center my-3">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Updating...</span>
          </div>
          <p className="mt-2">Updating Blog, Please Wait...</p>
        </div>
        )}

      <form onSubmit={handleSubmit}  className='mt-4'>
        {/* Title Input */}
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            name="title"
            className="form-control"
            value={updateBlog.title}
            onChange={handleChange}
            required
          />
        </div>

        {/* Content Input */}
        <div className="mb-3">
          <label className="form-label">Content</label>
          <textarea
            name="content"
            className="form-control"
            rows="7"
            value={updateBlog.content}
             onChange={handleChange}
            required
          ></textarea>
        </div>

        {/* Author Input */}
        <div className="mb-3">
          <label className="form-label">Author</label>
          <input
            type="text"
            name="author"
            className="form-control"
           value={updateBlog.author}
            onChange={handleChange}
            required
          />
        </div>

        {/* Publication Date Input */}
        <div className="mb-3">
          <label className="form-label">Publication Date</label>
          <input
            type="date"
            name="publication_date"
            className="form-control"
            value={updateBlog.publication_date}
             onChange={handleChange}
            required
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary my-3">
          Update
        </button>
      </form>
    </div>
    </>
  )
}

export default UpdatBlog