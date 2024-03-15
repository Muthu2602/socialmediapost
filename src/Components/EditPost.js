import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

const EditPost = (
 {posts,
  handleEdit,
  editTitle,
  setEditTitle,
  editBody,
  setEditBody}
) => {
  const { id } = useParams();
  const post = posts.find(post => (post.id).toString() === id);

  useEffect(() => {
    setEditTitle(post.title);
    setEditBody(post.body);
  }, [post, setEditBody, setEditTitle]);

  return (
    <main className="NewPost">
      <h2>Edit Post</h2>
      <form className="newPostForm" onSubmit={(event)=>event.preventDefault()}>
        <label htmlFor="editTitle">Title:</label>
        <input
          id="editTitle"
          type="text"
          value={editTitle}
          onChange={(event) => setEditTitle(event.target.value)}
          required
        />

        <label htmlFor="editBody">Post:</label>
        <textarea
          id="editBody"
          type="text"
          value={editBody}
          onChange={(event) => setEditBody(event.target.value)}
          required
        />

         <button type="submit" onClick={() => handleEdit(post.id)}>
          Submit
        </button>
      </form>
    </main>
  );
};

export default EditPost;
