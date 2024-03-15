import "./App.css";
import Header from "./Components/Header";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import NewPost from "./Components/NewPost";
import PostPage from "./Components/PostPage";
import Missing from "./Components/Missing";
import About from "./Components/About";
import Footer from "./Components/Footer";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useState } from "react";
import { format } from "date-fns";
import { useEffect } from "react";
import axios from "axios";
import EditPost from "./Components/EditPost";

function App() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [postBody, setpostBody] = useState("");
  const [postTitle, setpostTitle] = useState("");
  const [editBody, setEditBody] = useState("");
  const [editTitle, setEditTitle] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:8080/getPost");
        setPosts(response.data);
      } catch (err) {
        console.log(`Error: ${err.message}`);
      }
    };
    fetchPosts();
  }, []);

  useEffect(() => {
    const fillteredResults = posts.filter(
      (post) =>
        post.body.toLowerCase().includes(search.toLowerCase()) ||
        post.title.toLowerCase().includes(search.toLowerCase())
    );

    setSearchResults(fillteredResults.reverse());
  }, [posts, search]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), "mmmm dd, yyyy pp");
    const newpost = { id, title: postTitle, datetime, body: postBody };
    try {
      const response = await axios.post(
        "http://localhost:8080/updatePost",
        newpost
      );
      const allposts = [...posts, response.data];
      setPosts(allposts);
      setpostTitle("");
      setpostBody("");
      navigate("/");
    } catch (err) {
      console.log(`Error Message : ${err.message}`);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/deletePost/${id}`);
      const postList = posts.filter((post) => post.id !== id);
      setPosts(postList);
      navigate("/");
    } catch (err) {
      console.log(`Error Message : ${err.message}`);
    }
  };

  const handleEdit = async (id) => {
    const datetime = format(new Date(), "mmmm dd, yyyy pp");
    const updatedPost= {id,title:editTitle,datetime,body:editBody};
    try {
      const response= await axios.put(`http://localhost:8080/editPost/${id}`,updatedPost);
      setPosts(posts.map(post=>post.id===id?{...response.data}:post));
      setEditTitle("");
      setEditBody("");
      navigate("/");
    } catch (err) {
      console.log(`Error Message : ${err.message}`);
    }
  };

  return (
    <div className="App">
      <Header title=" Social Media App" />
      <Navbar search={search} setSearch={setSearch} />

      <Routes>
        <Route path="/" element={<Home posts={searchResults} />} />
        <Route path="/post">
          <Route
            index
            element={
              <NewPost
                handleSubmit={handleSubmit}
                postTitle={postTitle}
                setpostTitle={setpostTitle}
                postBody={postBody}
                setpostBody={setpostBody}
              />
            }
          />
          <Route
            path=":id"
            element={
              <PostPage
                posts={posts}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
              />
            }
          />
        </Route>
        <Route
          path="/edit/:id"
          element={
            <EditPost
              posts={posts}
              handleEdit={handleEdit}
              editTitle={editTitle}
              setEditTitle={setEditTitle}
              editBody={editBody}
              setEditBody={setEditBody}
            />
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Missing />} />
      </Routes>
      <Footer />
    </div>
  );
}
export default App;
