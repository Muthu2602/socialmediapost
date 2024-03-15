import React from "react";
import {Link} from "react-router-dom"

const Navbar = ({search,setSearch}) => {
  return (
    <nav className="Nav">
      <from className="searchForm" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="search">Search Posts</label>
        <input
          id="search"
          type="text"
          placeholder="Search Posts"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </from>
      <ul>
       <li><Link to="/">Home</Link></li>
       <li><Link to="/post">Post</Link></li>
       <li><Link to="/about">About</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
