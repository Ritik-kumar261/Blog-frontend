import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {  NavLink, useNavigate, useParams } from 'react-router-dom'
import Header from '../component/Header';

function ReadBlog() {
    const [blog, setblog] = useState();
    const {id}= useParams();
    const navigate = useNavigate();
    useEffect(() => {
      const singleBlog = async ()=>{
        try {
            const response = await axios(`http://localhost:8000/api/blogs/${id}`);
            setblog(response.data.data);
        } catch (error) {
            console.log('Error msg :',error);
        }
      }
      singleBlog();
    }, [id]);
    const deleatBlog = async ()=>{
        const confirmDelete = window.confirm("Are you sure you want to delete this post?");
        if(!confirmDelete){
            return;
        }

        try {
            const response= await axios.delete(`http://localhost:8000/api/blogs/${id}`)
            if(response.status===200|| response.status === 201){
                alert(response.data.message );
                navigate("/");
            }

        } catch (error) {
            console.log("error ", error);
                
        }
    }
    if(!blog){
        return
        <div className="text-center mt-5">
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
        
    }
    
    return (
        <>
        <Header/>
        <div className=" mt-5">
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    <div className="card shadow-lg">
                        <div className="card-header  text-muted">
                            <h4>{blog.title}</h4>
                        </div>
                        
                        <div className="card-body">
                            <p>{blog.content}</p>
                            <p className="text-muted">
                                <strong>Author:</strong> {blog.author} <br />
                                <strong>Published on:</strong> {new Date(blog.publication_date).toLocaleDateString()}
                            </p>
                            
                        </div>
                        <div className="card-footer">
                        <div className="row">
                                <div className="col-md-2 my-2">
                                    <NavLink to={`/update/${id}`} state={{blog}} className="btn btn-secondary" >update</NavLink>
                                </div>
                                <div className="col-md-2 my-2">
                                    <button onClick={deleatBlog} className="btn btn-secondary" >delete</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default ReadBlog