import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {  NavLink, useNavigate, useParams } from 'react-router-dom'
import Header from '../component/Header';

function ReadBlog() {
    const [blog, setblog] = useState();
    const [comments, setcomments] = useState([]);
    //for addcomment
    const [addcomment, setaddcomment] = useState("");
    
    const {id}= useParams();
    const navigate = useNavigate();
    useEffect(() => {
      const singleBlog = async ()=>{
        try {
            const response = await axios.get(`http://localhost:8000/api/blogs/${id}`);
            const post_comment = await axios.get(`http://localhost:8000/api/comments/${id}`);
            setblog(response.data.data);
            setcomments(post_comment.data.data.data ?? []);
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
    // here comment submission sre done 
    const commentSubmit = async ()=>{
        if(!addcomment.trim()){
            alert("comment are not empty");
            return;
        }
        try {
            const response = await axios.post('http://localhost:8000/api/comments',{
                'comment':addcomment,
                "post_id": id
            },{
                headers:{
                    "Content-Type": "application/json"
                }
            });
            if(response.status === 200 ){
                const reponseMsg = response.data.message;
                alert(reponseMsg);
                setcomments(prevComments => [
                    { id: Date.now(), content: addcomment }, // Add new comment
                    ...prevComments // Keep old comments
                ]);
                setaddcomment("");

            }
            console.log(response);
        } catch (error) {
            console.error("❌ Add Comment Error:", error.response?.data || error.message);
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
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-10 p-4  rounded ">
                    {/* Blog Title */}
                    <h2 className="fw-bold">{blog.title}</h2>

                    {/* Blog Content */}
                    <p className="mt-3 text-wrap" style={{ wordWrap: "break-word", overflowWrap: "break-word", whiteSpace: "pre-line" }}>{blog.content}</p>

                    {/* Author and Date */}
                    <p className="text-muted">
                        <strong>Author:</strong> {blog.author} <br />
                        <strong>Published on:</strong>{" "}
                        {new Date(blog.publication_date).toLocaleDateString()}
                    </p>

                    {/* Update & Delete Buttons */}
                    <div className="d-flex gap-3 my-4">
                        <NavLink to={`/update/${id}`} state={{ blog }} className="btn btn-primary">
                            Update
                        </NavLink>
                        <button  className="btn btn-danger" onClick={deleatBlog}>
                            Delete
                        </button>
                    </div>

                    {/* Comment Section */}
                    <div className="mt-5">
                        <h4>Comments</h4>
                        {Array.isArray(comments)  && comments.length > 0 ?  ( comments.map((comments)=>(
                            <p className='text-muted box rounded '>
                                {comments.content}
                            </p> 
                                
                        ))): (<p>
                            no comments
                            </p>)
                        }
                        

                        {/* Add Comment Input */}
                        <div className="mt-3">
                            <textarea className="form-control rounded" value={addcomment} onChange={(e)=>{ setaddcomment(e.target.value)}} rows="2" placeholder="Add a comment..."></textarea>
                            <button  onClick ={commentSubmit} className="btn btn-success mt-2">Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default ReadBlog