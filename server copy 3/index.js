const express = require('express')
const app = express()
const port = 8888
const articlehandler = require('./handler/article')

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/admin/saveArticle', articlehandler.saveArticle)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})