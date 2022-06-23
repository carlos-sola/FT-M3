// const bodyParser = require("body-parser");
const express = require("express");

const STATUS_USER_ERROR = 422;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
const posts = [];

const server = express();
// to enable parsing of json bodies for post requests
server.use(express.json());

// TODO: your code to handle requests
const PATH = '/posts';
let id= 1;
//---------------POST /posts --------------------------------------
server.post(PATH,(req,res)=>{
    const {author,title,contents}= req.body 
    if(!author || !title || !contents){
        return res.status(STATUS_USER_ERROR).json({error: "No se recibieron los parámetros necesarios para crear el Post"})
     }
    const post = {author,title,contents,id:id++};

    posts.push(post);
    res.status(200).json(post);
});
//--------------POST /posts/author/:author -------------------------
server.post(`${PATH}/author/:author`,(req,res)=>{
    let {author} = req.params;
    let{title,contents} = req.body;
    if(!author || !title || !contents){
        return res.status(STATUS_USER_ERROR).json({error: "No se recibieron los parámetros necesarios para crear el Post"})
    }
    const post = {
        author,title,contents, id: id++
    };
    posts.push(post);
    res.status(200).json(post);
});

//-------------------------GET /posts/:author/:title------------------------------------
server.get(`${PATH}/:author/:title`,(req,res)=>{
    let {author, title} = req.params;
    const newPost= posts.filter(p=>{
      return  p.author===author && p.title===title
    });
    if (newPost.length > 0){
        return res.json(newPost)
    } else {
        return res.status(STATUS_USER_ERROR).json({error:"No existe ningun post con dicho titulo y autor indicado"})
    }
})

//-------------------------GET /post/:author--------------------------------------------

server.get(`${PATH}/:author`,(req,res)=>{
    let {author} = req.params ;
    let authorPost = posts.filter(p=>{
       return p.author === author 
    });
    if (authorPost.length > 0){
        return res.json(authorPost)
    }else{
        res.status(STATUS_USER_ERROR).json({error: "No se recibieron los parámetros necesarios para crear el Post"})
    }
})

//-------------------------GET /posts---------------------------------------------------
server.get(`${PATH}`,(req,res)=>{
    
    if (req.query.term){
        let filterPost= posts.filter(p=>{
            if (p.title.includes(req.query.term) || p.contents.includes(req.query.term)){
                return true
            }
        })
        return res.json(filterPost)
    }else{
        return res.json(posts);
    }
});



module.exports = { posts, server };
