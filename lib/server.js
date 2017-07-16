'use strict';

const Hapi = require('hapi');
const path = require('path');
const dir = require('node-dir');



require('marko/node-require').install()
require('marko/compiler').defaultOptions.writeToDisk = false

//this is to register lasso-marko through out the application
const lasso = require('lasso')
lasso.configure({
  //when lasso execute, the result will be output to static folder
  //static folder will be automatically created when lasso executed for the 1st time
  outputDir: path.join(__dirname, '..', 'static'),
  plugins: [
    'lasso-marko'
  ]
})


const server = new Hapi.Server();
server.connection({
    host: 'localhost',
    port: 8080
});

function getRouteFiles(){
  return new Promise(
    (resolve, reject)=>{
      dir.files(path.join(__dirname, '..', 'controller'),
        (err, files)=>{
          if(err){
            return reject(err)
          }
          resolve(files)
        });
  });
}


function concatRoutes(files){
  return new Promise(
    (resolve, reject)=>{
      let routes = []
      for(let i=0; i<files.length; i++){
        routes = routes.concat(require(files[i]))
        if(i === files.length - 1){
          resolve(routes)
        }
      }
  });
}


function startServer(routes){
  server.register(require('inert'), (err)=>{
    if(err){
      return reject(err)
    }

    //register the route with all the files in static folder.
    server.route({
      method: 'GET',
      path: '/static/{param*}',
      handler: {
        directory: {
          path: 'static'
        }
      }
    })

    server.route({
      method:'GET',
      path:'/assets/{param*}',
      handler:{
        directory:{
          path:'assets'
        }
      }
    })

    setImmediate(function(){
      server.route(routes)
      console.log(routes)
    });

    server.start((err) => {
       if (err) {
           throw err;
       }
       console.log('Server running at:', server.info.uri);
   });

  })
}


module.exports={
  init: function(){
    return new Promise((resolve, reject) => {
      getRouteFiles().then(concatRoutes)
        .then(startServer)
    });
  }
}
