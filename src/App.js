import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [posts, setPosts] = useState([]);
  const [currentPost, setCurrentPost] = useState({
    _id: "",
    title: "",
    content: "",
  });
  const [currentEditPost, setCurrentEditPost] = useState({
    _id: "",
    title: "",
    content: "",
  });

  useEffect(() => {
    axios({
      method: "GET",
      url: "http://localhost:3003/",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        const newPost = response.data.posts;
        setPosts(posts.concat(newPost));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const deletePostHandler = (postId) => {
    // * DELETE DI BACKEND
    axios({
      method: "DELETE",
      url: "http://localhost:3003/post/" + postId,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((result) => {
        console.log(result);
        setPosts(
          posts.filter((post) => {
            return post._id !== postId;
          })
        );
        // * DELETE DI FRONTEND
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
      data: currentPost,
    })
      .then((response) => {
        return axios({
          method: "GET",
          url: "http://localhost:3003/",
          headers: {
            "Content-Type": "application/json",
          },
        });
      })
      .then((response) => {
        const newPosts = response.data.posts;
        setPosts(newPosts);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const editPostHandler = (postId) => {
    const post = posts.find((post) => {
      return post._id === postId;
    });
    setCurrentEditPost(post);
  };

  const updateEditPostHandler = (event, selector) => {
    if (selector === "title") {
      setCurrentEditPost({
        ...currentEditPost,
        title: event.target.value,
      });
    } else if (selector === "content") {
      setCurrentEditPost({
        ...currentEditPost,
        content: event.target.value,
      });
    }
  };

  const updatePostHandler = (event) => {
    event.preventDefault();
    axios({
      method: "PUT",
      url: "http://localhost:3003/post/" + currentEditPost._id,
      headers: {
        "Content-Type": "application/json",
      },
      data: currentEditPost
    })
      .then(response => {
        return axios({
          method: "GET",
          url: "http://localhost:3003/",
          headers: {
            "Content-Type": "application/json"
          }
        })
      })
      .then(response => {
        setPosts(response.data.posts);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  let transformedPosts = [];
  for (let post of posts) {
    transformedPosts.push(
      <div
        key={post._id}
        style={{ border: "1px solid blue", textAlign: "center" }}
      >
        <p>Title: {post.title}</p>
        <p>Content: {post.content}</p>
        <button onClick={() => deletePostHandler(post._id)}>Delete Post</button>
        <button onClick={() => editPostHandler(post._id)}>Edit Post</button>
      </div>
    );
  }

  return (
    <div>
      <div
        style={{
          textAlign: "center",
          margin: "16px auto",
        }}
      >
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

      <div
        style={{
          textAlign: "center",
          margin: "16px auto",
        }}
      >
        <h1>Edit a Post</h1>
        <h3>
          You are editing:{" "}
          {currentEditPost.title ? currentEditPost.title : "None"}
        </h3>
        <div>
          <form>
            <div>
              <label>Title</label>
              <input
                value={currentEditPost.title}
                onChange={(event) => updateEditPostHandler(event, "title")}
                type="text"
              />
            </div>
            <div>
              <label>Content</label>
              <input
                value={currentEditPost.content}
                onChange={(event) => updateEditPostHandler(event, "content")}
                type="text"
              />
            </div>
            <button type="submit" onClick={(event) => updatePostHandler(event)}>
              Update Post
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default App;
