import React, { useEffect, useState } from 'react'
import Header from '../component/Header'
import axios from 'axios';
import { NavLink } from 'react-router-dom';
function Home() {
    const [Blog, setBlog] = useState([]);
    useEffect( ()=>{
      const  fetchBlog= async ()=>{
        try {
            const response= await axios.get('http://localhost:8000/api/blogs');
            setBlog(response.data);
        } catch (error) {
            console.log("Error:", error);
        };
      };
      fetchBlog();
    },[]);
    console.log(Blog);
    return (
        <>
        <Header/>
        <div className="container mt-4">
          <h2 className="mb-4 text-center">All Blogs</h2>
          
          {Blog.length === 0 ? (
            <p>No blogs available</p>
          ) : (
            <div className="row">
              {Blog.map((Blog) => (
                <div key={Blog.id} className="col-md-4 col-lg-4 mb-4"> {/* 3 columns per row */}
                  <div className="card shadow h-100">
                    <div className="card-body d-flex flex-column justify-content-between h-100">
                      <h5 className="card-title" style={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        }}>{Blog.title}</h5>
                      <p className="card-text flex-grow-1">
                        {Blog.content? (Blog.content.length > 100)
                          ? (Blog.content.substring(0, 100) + "...")
                          : (Blog.content):(<p>No content available </p>)}
                      </p>
                      <p className='text-muted'>
                        <strong>Author:</strong> {Blog.author} <br />
                        <strong>Date:</strong> {Blog.publication_date}
                      </p>
                      <NavLink to={`/blog/${Blog.id}`} className="btn btn-secondary " style={{alignSelf: "flex-start"}}>
                        Read More
                      </NavLink>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        </>
      );
    }

export default Home
