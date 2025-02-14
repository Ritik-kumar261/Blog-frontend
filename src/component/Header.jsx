import React from 'react'
import { NavLink } from 'react-router-dom'

function Header() {
  return (
    <>
        <nav className=" shadow navbar navbar-expand-lg navbar-light bg-light px-4">
            <div className=" d-flex justify-content-between align-items-center">
                {/* Logo */}
                <a className="navbar-brand fw-bold my-3" href="/">
                    Blog Web
                </a>

                {/* Add Blog Button */}
                <NavLink to="/" className="btn  my-3 ">Home</NavLink>
                <NavLink to="/ad-blog" className="btn  my-3">Add Blog</NavLink>
            </div>
        </nav>
  
    </>
  )
}

export default Header