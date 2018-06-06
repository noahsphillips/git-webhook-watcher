'use strict'
import fs from 'fs'

module.exports = class GitHooker {

    constructor() {
        this.classVars = {
            jsonObject: null
        }
    }

    async fetchConfig() {
        try {
            this.jsonObject = await fs.readFile('myjsonfile.json', 'utf8')
        } catch (error) {
            console.log(error)
            return error
        }
        this.jsonObject = JSON.parse(this.jsonObject)
    }

    fetchBranches() {
        
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