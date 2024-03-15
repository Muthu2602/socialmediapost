import React from "react";

const NewPost = ({
  handleSubmit,
  postTitle,
  setpostTitle,
  postBody,
  setpostBody,
}) => {
  return (
    <main className="NewPost">
      <h2>New Post</h2>

      <form className="newPostForm" onSubmit={handleSubmit}>
        <label htmlFor="postTitle">Title:</label>
        <input
          id="postTitle"
          type="text"
          value={postTitle}
          onChange={(e) => setpostTitle(e.target.value)}
          required
        />
        <label htmlFor="postBody">Post:</label>
        <textarea
          id="postBody"
          type="text"
          value={postBody}
          onChange={(e) => setpostBody(e.target.value)}
          required
        />
        <button type="submit">Submit</button>
      </form>
    </main>
  );
};

export default NewPost;
