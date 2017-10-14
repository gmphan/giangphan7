'use strict'

const api = require('~/lib/api');



/*******handleBlog****************/
const blogPage = require('~/view/blog/index.marko');
function handleBlog(req, reply){
  (async function(){
    const results=await api.get('/blog');
    const postId=[];
    const postName=[];
    for(let i=0; i<results.length; i++){
        postId[i]=results[i].id,
        postName[i]=results[i].post_name
    }
    const dataOfPost={
      postId:postId,
      postName:postName
    }
    reply(blogPage.stream(dataOfPost))
  })()
  .catch((err)=>{
    throw err;
  })
}
/**-----end handleBlog---------***/






module.exports=[
  {
    method:'GET',
    path:'/blog',
    handler:handleBlog
  }
]
