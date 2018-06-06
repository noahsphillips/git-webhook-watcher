const express = require('express'),
    app = express(),
    router = express.Router(),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    port = process.env.PORT || 3000,
    git = require('simple-git')

app.listen(port, () => {
    console.log(`Server active at http://localhost:${port}`)
})