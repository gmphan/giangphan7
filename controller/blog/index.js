'use strict'

const api = require('~/lib/api');



/*******handleBlog****************/
const blogPage = require('~/view/blog/index.marko');
function handleBlog(req, reply){
  (async function(){
    const results=await api.get('/all-post');
    const postId=[];
    const postName=[];
    const postDate=[];
    for(let i=0; i<results.length; i++){
        postId[i]=results[i].id,
        postName[i]=results[i].post_name,
        postDate[i]=results[i].created_date
    }

    //console.log(postDate);
    const dataOfPost={
      postId:postId,
      postName:postName,
      postDate:postDate
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
