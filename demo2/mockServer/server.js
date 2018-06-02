const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', req.headers.origin)
    res.header('Access-Control-Allow-Headers', 'Content-Type')
    res.header('Access-Control-Allow-Credentials', true)
    next()
})

let baseRoot = './mockData' // mock数据文件夹路径

// 获取楼盘信息
app.get('/wap/getTaskList', (req, res) => {
    console.log('method:', req.originalUrl)
    console.log('params:', req.query, '\n')
    setTimeout(() => {
        res.send(require(`${baseRoot}/wap/getTaskList`)())
    }, 1500)
})

let server = app.listen(9991, () => {
    let port = server.address().port
    console.log('Mock Server Running Successfully...')
    console.log(`server listening at http://localhost:${port}`)
})
