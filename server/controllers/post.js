const Post = require("../models/post");

exports.getPosts = (req, res, next) => {
  // * req = request
  // * res = response
  // * next = lanjutin request/response

  // * kita harus kirim json yang strukturnya ada title sama content
  Post.find()
    .then((posts) => {
      res.status(200).json({
        message: "Posts succcesfully fetched",
        posts: posts,
      });
    })
    .catch((err) => console.log(err));
};

exports.createPost =  (req, res, next) => {
  // * berkat bodyParser() kita tinggal akses req.body
  const newTitle = req.body.title;
  const newContent = req.body.content;

  const newPost = new Post({
    title: newTitle,
    content: newContent,
  });

  newPost
    .save()
    .then((result) => {
      console.log(result);

      // * MASUKIN KE DATABASE
      res.status(201).json({
        message: "Post created successfully",
        post: newPost,
      });
    })
    .catch((err) => console.log(err));
};

exports.updatePost =  (req, res, next) => {
  const postId = req.params.id;

  const newTitle = req.body.title;
  const newContent = req.body.content;

  const newPost = {
    title: newTitle,
    content: newContent,
  };
  console.log(newPost);
  Post.findByIdAndUpdate(postId, newPost)
    .then((result) => {
        res.status(200).json({
            message: 'Post successfully updated',
            updatedPost: newPost
        })
    })
    .catch((err) => console.log(err));
};

exports.deletePost = (req, res, next) => {
  console.log(req.params.postId);
  const postId = req.params.postId;

  Post.findByIdAndDelete(postId)
    .then((result) => {
      res.status(200).json({
        message: "Post successfully deleted",
        postId: postId,
      });
    })
    .catch((err) => console.log(err));
};