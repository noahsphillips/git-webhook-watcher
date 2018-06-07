const express = require('express'),
    app = express(),
    router = express.Router(),
    bodyParser = require('body-parser'),
    port = process.env.PORT || 3000,
    GitHooker = require('./classes/GitHooker')

app.use(bodyParser.urlencoded({
    limit: '500mb',
    extended: true,
    type: 'application/x-www-form-urlencoded'
}))

app.use(bodyParser.json({
    limit: '500mb',
    type: 'application/*'
}))

router.post('/bitbucket', (req, res) => {
    var body = req.body
    var commits = body.push.changes//[0].new.name
    
    for(var i = 0; i < commits.length; i++) {
        var commit = commits[i]
        console.log(commit.new.name === 'master')
        if (!commit || !commit.new || commit.new.name !== 'master') {
            return res.status(200).send('No')
        }

    }

    return res.status(200).send('Yes')

})

app.use(router)

app.listen(port, () => {
    console.log(`Server active at http://localhost:${port}`)
})