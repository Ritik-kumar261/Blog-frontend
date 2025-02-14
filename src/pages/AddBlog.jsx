import React, { useState } from 'react'
import Header from '../component/Header'
import axios from 'axios';

function AddBlog() {

    const [blog, setBlog] = useState({
        title:"",
        content:"",
        author:"",
        publication_date:""
    });
    const handleChange = (e) => {
        setBlog({ ...blog, [e.target.name]: e.target.value });
      };
      console.log(blog);
    
      const formSubmit= async (e)=>{
        e.preventDefault();
        try {
            const response =await axios.post('http://localhost:8000/api/blogs',blog, {
            headers:{
                "Content-Type":"application/json"
            }
            });
            console.log(response);
            if(response.status==200 || response.status==201){
                alert(response.data.message);
                setBlog({title:"",content:"",author:"",publication_date:""});

            }else{
                alert("There is an error to add the Post");
            }
        } catch (error) {
            console.log(error);
        }
      }
  return (
    <>
    <Header/>
        <div className=" shadow container mt-4">
      <h2 className='mt-3'>Add New Blog</h2>
      <form onSubmit={formSubmit} >
        {/* Title Input */}
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            name="title"
            className="form-control"
            value={blog.title}
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
            rows="4"
            value={blog.content}
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
           value={blog.author}
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
            value={blog.publication_date}
             onChange={handleChange}
            required
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary my-3">
          Add Blog
        </button>
      </form>
    </div>
    </>
  )
}

export default AddBlog