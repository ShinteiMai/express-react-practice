const express = require('express');

const router = express.Router();


// * NGAMBIL POSTS
router.get('/', (req, res, next) => {
    // * req = request
    // * res = response
    // * next = lanjutin request/response
    
    // * kita harus kirim json yang strukturnya ada title sama content

    const data = {
        title: 'Purpletart new blog',
        content: 'Blog baru'
    }
    res.json(data);
});

// * KIRIM POSTS (http://localhost:3003/post)
router.post('/post', (req, res, next) => {
    // * berkat bodyParser() kita tinggal akses req.body
    console.log(req.body);
    const title = req.body.title;
    const content = req.body.content;
    console.log('Title: ' + title);
    console.log('Content: ' + content);
    const newPost = {
        title: title,
        content: content
    }
    res.status(200).json({
        message: 'Post created successfully',
        post: newPost
    })
});


module.exports = router;
