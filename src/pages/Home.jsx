import React, { useEffect, useState } from 'react'
import Header from '../component/Header'
import axios from 'axios';
import { NavLink } from 'react-router-dom';
function Home() {
    const [Blog, setBlog] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    useEffect( ()=>{
      fetchBlog(currentPage);
    },[currentPage]);
    const  fetchBlog= async (page)=>{
      try {
          const response= await axios.get(`http://localhost:8000/api/blogs?page=${page}`);
          setBlog(response.data.data);
          setTotalPages(response.data.last_page)
      } catch (error) {
          console.log("Error:", error);
      };
    };
    console.log(Blog);
    const handlePageChange = (newPage) => {
      if (newPage > 0 && newPage <= totalPages) {
          setCurrentPage(newPage);
      }
  };
    return (
        <>
        <Header/>
        <div className="container mt-4">
          <h2 className="mb-4 text-center">All Blogs</h2>
          
          {Blog.length === 0 ? (
            <div className="row">
              <h1 className='text-muted mt-4 '>No blogs available</h1>
            </div>
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
           {Blog.length ===0?"":(
            <div className="pagination my-3">
            <button className='btn btn-secondary mx-3' onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                Previous
            </button>
            <span>
                Page {currentPage} of {totalPages}
            </span>
            <button className='btn btn-secondary mx-3' onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                Next
            </button>
        </div>
           )}
        </div>
        </>
      );
    }

export default Home
