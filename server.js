const express = require('express'),
    app = express(),
    router = express.Router(),
    bodyParser = require('body-parser'),
    port = process.env.PORT || 3000,
    git = require('simple-git')

app.use(bodyParser.urlencoded({
    limit: '500mb',
    extended: true,
    type: 'application/x-www-form-urlencoded'
}))

app.use(bodyParser.json({
    limit: '500mb',
    type: 'application/*'
}))

router.get('/webooks', (req, res) => {
    
})

app.use(router)

app.listen(port, () => {
    console.log(`Server active at http://localhost:${port}`)
})