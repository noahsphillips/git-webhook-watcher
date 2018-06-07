'use strict'
const fs = require('fs'),
    git = require('simple-git'),
    util = require('util'),
    _ = require('lodash'),
    path = require('path')

const readFile = util.promisify(fs.readFile)

module.exports = class GitHooker {

    constructor() {
        this.classVars = {
            jsonObject: null,
            currentRepo: null,
            branches: null
        }
    }

    fetchConfig() {
        return new Promise(async (res, rej) => {
            try {
                this.jsonObject = await readFile('./config.json', 'utf8')
            } catch (error) {
                console.log(error)
                rej(error)
            }
            this.jsonObject = JSON.parse(this.jsonObject)
            res(this.jsonObject)
        })
    }

    fetchBranches(url, repo) {
        if (url) {
            return this.fetchRepo(url).branches
        } else if (repo) {
            return repo.branches
        } else {
            return null
        }

    }

    fetchRepo(url) {
        if (!url) {
            if (this.currentRepo) {
                return this.currentRepo
            }
            return null
        }

        this.currentRepo = this.jsonObject.repos.find(repo => repo.url === url)

        return this.currentRepo
    }

    filterBranches(commits) {
        if (!commits.length || commits.length < 1) { return null }

        var branchesToUpdate = []

        var branches = this.fetchBranches(null, this.currentRepo)

        for (var i = 0; i < commits.length; i++) {
            var commit = commits[i]
            if (!commit || !commit.new || branches.indexOf(commit.new.name) === -1) {
                continue
            } else {
                branchesToUpdate.push(commit.new.name)
            }
        }

        return _.uniq(branchesToUpdate)
    }

    setBranches(commits) {
        return this.branches = this.filterBranches(commits)
    }

    gitPull() {
        return new Promise(async (res, rej) => {
            var repo = this.currentRepo
            var branches = this.branches
            var promises = []
            console.log('dir', __dirname)
            for (var branch in branches) {
                promises.push(git(path.join(__dirname, '../')).status((res, err) => {
                    console.log(res, err)
                }))
            }

            try {
                var results = await Promise.all(promises)
            } catch (error) {
                console.log(error)
                rej(error)
            }

            console.log(results)

            res(true)
        })
    }
}


// fs.readFile('myjsonfile.json', 'utf8', function readFileCallback(err, data){
//     if (err){
//         console.log(err);
//     } else {
//     obj = JSON.parse(data); //now it an object
//     obj.table.push({id: 2, square:3}); //add some data
//     json = JSON.stringify(obj); //convert it back to json
//     fs.writeFile('myjsonfile.json', json, 'utf8', callback); // write it back 
// }});