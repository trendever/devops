"use strict";
const child_process = require("child_process"),
    co = require("co"),
    path = require("path"),
    thunkify = require("thunkify"),
    exec = thunkify(child_process.exec);

const reposDir = require("../config").reposPath,
        dockerRegistry = require("../config").dockerRegistry
    ;


module.exports = function(name){
    const pathToRepo = path.join(reposDir, name);
    co(function*(){
        yield exec(`docker build -t ${name}:base  ${pathToRepo}`);
        yield exec(`docker run --name ${name}:run ${name}:base echo`);
        yield exec(`docker export ${name}:run | docker import - ${dockerRegistry}/${name}:latest`);
        yield exec(`docker rm ${name}:run`);
    }).catch(function(err){
        console.trace(err);
    })
};