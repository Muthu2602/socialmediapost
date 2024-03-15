import React from "react";
import { Link, useParams } from "react-router-dom";

const PostPage = ({posts,handleDelete,handleEdit}) => {
  const {id} =useParams();
  const post =posts.find(post=>(post.id).toString()===id);
  return (
    <main className="PostPage">
      <article className="post">
            <h2>{post.title}</h2>
            <p className="postDate">{post.datetime}</p>
            <p className="postBody">{post.body}</p>
            <Link to={`/edit/${post.id}`}><button className="editbutton" >Edit Post</button></Link>
            <button className="deletebutton" onClick={()=>handleDelete(post.id)}>Delete Post</button>
      </article>
    </main>
  );
};

export default PostPage;
