"use strict";
const child_process = require("child_process"),
    co = require("co"),
    path = require("path"),
    thunkify = require("thunkify"),
    exec = thunkify(child_process.exec);

const reposDir = require("../config").reposPath,
        dockerRegistry = require("../config").dockerRegistry
    ;


module.exports = {
    "build" : function(name, tag, user){
        const pathToRepo = path.join(reposDir, name);
        tag = tag || "latest";
        user = user || "microserivce";
        return co(function*(){
            yield exec(`docker build -t ${dockerRegistry}/${user}/${name}:${tag} .`, {cwd:pathToRepo});
        });
    },
    "push": function(name, tag, user){
        const pathToRepo = path.join(reposDir, name);
        tag = tag || "latest";
        user = user || "microserivce";
        return co(function*(){
            yield exec(`docker push ${dockerRegistry}/${user}/${name}:${tag}`);
        });
    }
};