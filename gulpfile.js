"use strict";
var gulp = require("gulp"),
    tasks = require('require-dir')('./tasks');

gulp.task("default", ()=>{
    //tasks.fetch("mail.service", "git@github.com:trendever/service.mail.git");
    //tasks.gb("mail.service");
    tasks.build_image("mail.service");
});