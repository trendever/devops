"use strict";
const gulp = require("gulp"),
    commandLineArgs = require('command-line-args'),
    tasks = require('require-dir')('./tasks');

const cli = commandLineArgs([
    //git repository
    { name: "repo", type: String},
    //project name
    { name: "name", type: String},
    //image tag
    { name: "tag", type: String},
    //docker registry user
    { name: "user", type: String},
    //git branch
    { name: "branch", type: String}
]),
    options = cli.parse();

gulp.task("git:fetch", ()=>{
    return tasks.fetch(options.name, options.repo, options.branch);
});

gulp.task("gb:restore", ["git:fetch"] ,()=>{
    return tasks.gb.restore(options.name);

});

gulp.task("gb:test", ["gb:restore"] ,()=>{
    return tasks.gb.test(options.name);

});

gulp.task("gb:build", ["gb:restore", "gb:test"] ,()=>{
    return tasks.gb.build(options.name);

});

gulp.task("build:src", ["gb:restore", "gb:test", "gb:build"]);

gulp.task("build:image", ["build:src"], ()=>{
    return tasks.docker.build(options.name, options.tag, options.user);
});

gulp.task("push:image", ["build:image"], ()=>{
    return tasks.docker.push(options.name, options.tag, options.user);
});


gulp.task("build", ["git:fetch", "build:src", "build:image", "push:image"]);

gulp.task("default", ["build"]);