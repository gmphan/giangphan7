'use strict';

const Hapi = require('hapi');
const path = require('path');
const Inert = require('inert');
const dir = require('node-dir');
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
    host: '0.0.0.0', //this is a holder ip address, and will replace with any ip address when the port number kick off
    port: 8080
});

function registerPlugin(){
  return new Promise(function(resolve, reject){
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
        /**serve static lasso-marko in static folder**/
        server.route({
              method: 'GET',
              path: '/static/{param*}',
              handler: {
                directory: {
                  path: 'static'
                }
              }
            })
        /** serve static file in assert folder**/
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
    /**--------- end register inert --------------**/



    /******** auth-cookie ****************/
    const CookieAuth = require('hapi-auth-cookie');
    server.register(CookieAuth, (err)=>{
      if(err){
        throw err;
      }
      if (err) {
        throw err;
    }
      //to issolate the auth cookie sessions from the rest of the cache
      //by server.cache segment/name as 'sessions', expire in a day
      //all this then add to server.app.cache along with what added from
      //the login page.
      //The parameter will go from order if they are not well define based on
      //hapi-auth-cookie document
      const cache = server.cache({ segment: 'sessions', expiresIn: 3 * 24 * 60 * 60 * 1000 });
      //save the cache into a cache inside server.app storage box
      server.app.cache = cache;
      server.auth.strategy('base', 'cookie', {
        password: 'supersecretpasswordqqqqqqqqqqqqqq', //must be 32 or more characters
        cookie: 'app-cookie', // Cookie name
        redirectTo:'/login', //if session is not set, yet, it will be redirect to '/login'
        isSecure:false, //without this cookie can't be transfer between routes
        validateFunc: function(req, session, callback){
          /*
          I understood callback from here: https://hapijs.com/api

          const cache = server.cache({ segment: 'countries', expiresIn: 60 * 60 * 1000 });
          cache.set('norway', { capital: 'oslo' }, null, (err) => {

              cache.get('norway', (err, value, cached, log) => {

                  // value === { capital: 'oslo' };
              });
          });

          */
          cache.get(session.sid, (err, value) => {

              if (err) {
                  return callback(err, false);
              }
              //if the value/credential is empty then false
              if (!value) {
                  return callback(null, false);
              }
              //or else continue on the page and console out the session on console
              return callback(null, true, value.credentials);
          });

        }
      });
    });

    /**------- end auth-cookie --------**/
    resolve();
  });

}


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
        //const moduleExportArray = require(filePathArray[i]);
        routes = routes.concat(require(filePathArray[i]))
        if(i === filePathArray.length - 1){
          resolve(routes)
          //console.log(routes) //to check all routes
        }
      }
  });
}
/**------- end of concat routes together ---------**/


/**++++ insert the route array into the server ++++++**/
function serverGetRoutes(routes){
  return new Promise((resolve,reject)=>{
    server.route(routes)
    resolve()
  })
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
      registerPlugin()
      .then(getRouteFilePaths)
        .then(concatRoutes)
          .then(serverGetRoutes)
            .then(startServer)
    })
  }
}
