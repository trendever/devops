"use strict";
const child_process = require("child_process"),
    co = require("co"),
    path = require("path"),
    thunkify = require("thunkify"),
    exec = thunkify(child_process.exec);

const reposDir = require("../config").reposPath;

module.exports = {
    "restore": function(name){
        const pathToRepo = path.join(reposDir, name);
        return co(function*(){
            yield exec("gb vendor restore", {cwd:pathToRepo});
        });
    },
    "test":function(name){
        const pathToRepo = path.join(reposDir, name);
        return co(function*(){
            yield exec("gb test", {cwd:pathToRepo});
        });
    },
    "build":function(name){
        const pathToRepo = path.join(reposDir, name);
        return co(function*(){
            yield exec("gb build all", {cwd:pathToRepo});
        });
    }
};