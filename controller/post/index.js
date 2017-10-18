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


/****** handleNewPostEditor ****************/
const postNewEditorPage=require('~/view/post-new-editor/index.marko');
function handlePostNewEditor(req, reply){
  (async function(){
    reply(postNewEditorPage.stream())
  })()
  .catch((err)=>{
    throw err;
  })
}
/**----- End handleNewPostEditor --------***/


/********** handleInsertPost **********/
function handleInsertPost(req, reply){
  (async function(){
    const {post_name, post_content} = req.payload;
    //console.log(post_name);
    await api.post('/insert/post', {post_name, post_content});

    reply(1);
  })()
  .catch((err)=>{
    throw err;
  })
}
/**------- End handleInsertPost -------**/

module.exports=[
  {
    method:'GET',
    path:'/post/{id}',
    handler:handlePost
  },
  {
    method:'GET',
    path:'/post-editor/{id}',
    config: {
      auth: {
        strategy: 'base'
      },
        handler:handlePostEditor
    }
  },
  {
    method:'POST',
    path:'/update/post',
    config: {
      auth: {
        strategy: 'base'
      },
        handler:handleUpdatePost
    }
  },
  {
    method:'GET',
    path:'/post-new-editor',
    config: {
      auth: {
        strategy: 'base'
      },
        handler:handlePostNewEditor
    }
  },
  {
    method:'POST',
    path:'/insert/post',
    config: {
      auth: {
        strategy: 'base'
      },
        handler:handleInsertPost
    }       
  }
]
