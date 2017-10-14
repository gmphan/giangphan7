'use strict'

const api = require('~/lib/api');

/********handlePost*******************/
const postPage = require('~/view/post/index.marko');
function handlePost(req, reply){
  (async function(){
    const results=await api.get('/post/'+req.params.id)
    const postData={
      postId:results[0].id,
      postContent:results[0].post_content
    }
    reply(postPage.stream(postData));
  })()
  .catch((err)=>{
    throw err;
  })
}
/***-----End handlePost--------------**/

/****** handlePostEditor *******************/
const postEditorPage = require('~/view/post-editor/index.marko');
function handlePostEditor(req, reply){
  (async function(){
    const results=await api.get('/post/'+req.params.id)
    const postData={
      postContent:results[0].post_content
    }
    //console.log(postData.postContent)
    reply(postEditorPage.stream(postData))
  })()
  .catch((err)=>{
    throw err;
  })
}

/**---- End handlePostEditor -------------**/


/******* handleUpdatePost ***************/
function handleUpdatePost(req, reply){
  (async function(){
    const {postId, postContent} = req.payload;
    await api.post('/update/post/'+postId, {postContent});
    reply()
  })()
  .catch((err)=>{
    throw err;
  });
}
/***------ End handleUpdatePost -----***/


module.exports=[
  {
    method:'GET',
    path:'/post/{id}',
    handler:handlePost
  },
  {
    method:'GET',
    path:'/post-editor/{id}',
    handler:handlePostEditor
  },
  {
    method:'POST',
    path:'/update/post',
    handler:handleUpdatePost
  }
]
