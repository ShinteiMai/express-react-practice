import React, { useState } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [posts, setPosts] = useState([]);
  const [currentPost, setCurrentPost] = useState({
    title: "",
    content: "",
  });

  const fetchPostHandler = () => {
    // console.log('I was clicked');
    axios({
      method: "GET",
      url: "http://localhost:3003/",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        const newPost = response.data;
        // * newPost = {content: "asd", title: "asd"};
        setPosts(posts.concat(newPost));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  let transformedPosts = [];
  for (let post of posts) {
    transformedPosts.push(
      <div>
        <p>Title: {post.title}</p>
        <p>Content: {post.content}</p>
      </div>
    );
  }

  const currentPostHandler = (event, selector) => {
    // * ada let sama const
    // * let = variable biasa
    // * const = constant variable jadi ga bisa di ganti
    const newInput = event.target.value;
    if (selector === "title") {
      setCurrentPost({
        ...currentPost,
        title: newInput,
      });
    } else if (selector === "content") {
      setCurrentPost({
        ...currentPost,
        content: newInput,
      });
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    axios({
      method: "POST",
      url: "http://localhost:3003/post",
      headers: {
        "Content-Type": "application/json",
      },
      data: currentPost
    })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div>
        <h1>Make a post</h1>
        <form>
          <div>
            <label>Title</label>
            <input
              value={currentPost.title}
              onChange={(event) => currentPostHandler(event, "title")}
              type="text"
            />
          </div>
          <div>
            <label>Content</label>
            <input
              value={currentPost.content}
              onChange={(event) => currentPostHandler(event, "content")}
              type="text"
            />
          </div>
          <button type="submit" onClick={(e) => submitHandler(e)}>
            Submit Post
          </button>
        </form>
      </div>
      <div
        style={{
          width: "100%",
          height: "500px",
          border: "1px solid orangered",
        }}
      >
        {transformedPosts}
      </div>
      <button onClick={fetchPostHandler}>Fetch Post</button>
    </div>
  );
};

export default App;
