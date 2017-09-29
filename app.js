'use strict';
// this module allows one to refer to the project root with ~,
//really helpful with super nested files, and it would only need to
//be required one time through out the whole project
require('require-self-ref');
(async function main(){
  await require('~/lib/server').init();
})()
.catch((err)=>{
  throw err;
  //log.console.error(err.message);
});
