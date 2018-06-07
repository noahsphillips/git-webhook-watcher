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

router.post('/bitbucket', async (req, res) => {

    var hooker = new GitHooker()
    var body = req.body

    try {
        await hooker.fetchConfig()
    } catch (error) {
        console.log(error)
        return res.json({error})
    }

    var theRepo = hooker.fetchRepo(body.repository.links.html.href)

    if (!theRepo) {
        console.log('no repo exists.')
        return res.status(404).json({message:'This repo does not exist in config.json'})
    }

    var branches = hooker.setBranches(body.push.changes)

    if (!branches) {
        return res.send('No valid branches in the commits.')
    }

    try {
        var result = await hooker.gitPull()
    } catch (error) {
        console.error(error)
        res.status(500).json({error})
    }

    console.log(result)

    return res.status(200).send(branches)

})

app.use(router)

app.listen(port, () => {
    console.log(`Server active at http://localhost:${port}`)
})