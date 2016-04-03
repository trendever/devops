"use strict";
const git = require("gulp-git"),
    co = require("co"),
    thunkify = require("thunkify"),
    fsStat = thunkify(require("fs").stat),
    gitClone = thunkify(git.clone),
    gitFetch = thunkify(git.fetch),
    gitCheckout = thunkify(git.checkout),
    path = require("path");
const reposDir = require("../config").reposPath;


module.exports = function (name, remote, branch) {
    const pathToRepo = path.join(reposDir, name);
    branch = branch || "master";
    co(function*() {

        try {
            yield fsStat(pathToRepo);
        } catch (err) {
            yield gitClone(remote, {args: pathToRepo})
        }
        yield gitFetch("", "", {args: " --all", cwd: pathToRepo});
        yield gitCheckout(branch, {cwd: pathToRepo})

    }).catch(function (err) {
        console.trace(err)
    });
};

