const express = require("express");
const router = express.Router();

const postController = require('../controllers/post');

// * NGAMBIL POSTS (http://localhost:3003/)
router.get("/", postController.getPosts);

// * CREATE POST (http://localhost:3003/post)
router.post("/post", postController.createPost);

// * UPDATE POST (http://localhost:3003/post/:postId)
router.put("/post/:id", postController.updatePost);

// * DELETE POST (http://localhost:3003/post/:postId)
router.delete("/post/:postId", postController.deletePost);

module.exports = router;
