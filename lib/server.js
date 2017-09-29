'use strict';

const Hapi = require('hapi');
const path = require('path');
const Inert = require('inert');
const dir = require('node-dir');
const Bcrypt = require('bcrypt')
const CookieAuth = require('hapi-auth-cookie')
const Good = require('good');

require('marko/node-require').install()
require('marko/compiler').defaultOptions.writeToDisk = false

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
    host: 'localhost', //need to  remove this for the server
    port: 8080
});


/**++++++++ Register Good+++++++++++++++++++++++**/
server.register({
  register:Good,
  options:{
    reporters:{
      console:[
        {
          module: 'good-squeeze',
          name: 'Squeeze',
          args:[
            {
              response:'*',
              log:'*'
            }
          ]
        },
        {
          module: 'good-console'
        },
        'stdout'
      ]
    }
  }
},
  (err)=>{
    if (err) {
        throw err; // something bad happened loading the plugin
    }
  })

/**--------end Register Good--------------------**/

/**+++++++++ register inert to serve static file +++**/
server.register(Inert, (err)=>{
  if(err){
    return reject(err)
  }else{
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
  }
});
  // server.register(require('inert'), (err)=>{
  //
  //     server.route({
  //       method:'GET',
  //       path:'/assets/{param*}',
  //       handler:{
  //         directory:{
  //           path:'assets'
  //         }
  //       }
  //     })
  //   }
  // })
/**--------- end register inert --------------**/

/**+++++++++ get controller' folder paths ++++++**/
function getRouteFilePaths(){
  return new Promise(
    (resolve, reject)=>{
      const controllerPath = path.join(__dirname, '..', 'controller')
      dir.files(controllerPath, (err, filePathArray)=>{
          if(err){
            return reject(err)
          }
          //console.log(filePathArray)
          resolve(filePathArray)
        });
  });
}
/**--------- end get folder path -------------**/

/**++++ get each route, and concat them together in an array +++++**/
function concatRoutes(filePathArray){
  return new Promise(
    (resolve, reject)=>{
      let routes = []
      for(let i=0; i<filePathArray.length; i++){
        const moduleExportArray = require(filePathArray[i]);
        routes = routes.concat(moduleExportArray)
        if(i === filePathArray.length - 1){
          resolve(routes)
        }
      }
  });
}
/**------- end of concat routes together ---------**/


/**++++ insert the route array into the server ++++++**/
function serverGetRoutes(routes){
  server.route(routes)
}
/***---- End Inserting  ----------------**/

/**+++++ after all I would start my server +++**/
function startServer(){
  server.start((err) => {
      if (err) {
          throw err;
      }
      console.log(`Server running at: ${server.info.uri}`);
  });
}
/**----- end starting server -----**/

module.exports={
  init:function(){
    return new Promise((resolve, reject)=>{
      getRouteFilePaths()
        .then(concatRoutes)
          .then(serverGetRoutes)
            .then(startServer)
    })
  }
}



// function startServer(routes){
//
// /**++++++++++ easy session +++++++++++++++++++++**/
//
//   const sessionPluginOptions={
//     cache:{segment:'easy-cache'},
//     cookie:{isSecure:false},
//     key:'super-secret-cookie-encryption-key'
//   }
//   server.register(
//     {register:require('hapi-easy-session'), options:sessionPluginOptions},
//     (err)=>{if(err){throw err}}
//   )
//
//   function mySuperAwesomeAuthPlugin(server, options, next){
//     const myAuthScheme={
//       authenticate:(req, reply)=>{
//         //console.log(req)
//         if(!req.session.authorized){
//           console.log('in authenticate '+req.session.authorized)
//           //console.log(req.url.path)
//           return reply().redirect('/sign-in'+req.url.path)
//         }else {
//           console.log('in authenticate true: '+req.session.authorized)
//           const credentials=req.session.credentials || {
//             username: 'none',
//             password: 'none'
//           }
//           return reply.continue({credentials:credentials})
//         }
//       }
//     }
//     server.auth.scheme('my-auth', (server, options)=>{
//       return myAuthScheme
//     })
//     next()
//   }
//   mySuperAwesomeAuthPlugin.attributes={
//     name:'my super awesome auth plugin'
//   }
//   server.register(mySuperAwesomeAuthPlugin, (err)=>{
//     if(err){
//       throw err
//     }else{
//       server.auth.strategy('default', 'my-auth')
//     }
//   })
//   /**---------- end easy-session -------------------**/
//
// /**+++++++++++++ register inert ++++++++++++++++**/
//   server.register(require('inert'), (err)=>{
//     if(err){
//       return reject(err)
//     }else{
//       //register the route with all the files in static folder.
//       server.route({
//         method: 'GET',
//         path: '/static/{param*}',
//         handler: {
//           directory: {
//             path: 'static'
//           }
//         }
//       })
//       server.route({
//         method:'GET',
//         path:'/assets/{param*}',
//         handler:{
//           directory:{
//             path:'assets'
//           }
//         }
//       })
//     }
//   })
// /**------------ end register inert -------------**/
//
//
//
//     setImmediate(function(){
//       server.route(routes)
//       console.log(routes)
//     });
//
//     server.start((err) => {
//        if (err) {
//            throw err;
//        }
//        console.log('Server running at:', server.info.uri);
//    });
// }
//
//
//
//
// module.exports={
//   init: function(){
//     return new Promise((resolve, reject) => {
//       getRouteFiles().then(concatRoutes)
//         .then(startServer)
//     });
//   }
// }
