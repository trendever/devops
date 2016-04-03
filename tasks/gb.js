"use strict";
const child_process = require("child_process"),
    co = require("co"),
    path = require("path"),
    thunkify = require("thunkify"),
    exec = thunkify(child_process.exec);

const reposDir = require("../config").reposPath;

module.exports = function(name){
    const pathToRepo = path.join(reposDir, name);
    co(function*(){
        yield exec("gb vendor restore", {cwd:pathToRepo});
    }).catch(function(err){
        console.trace(err);
    })
};