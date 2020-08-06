const express = require('express')

const app = express()

app.all("*", function(req, res, next) {
  //设置允许跨域的域名，*代表允许任意域名跨域
  res.header("Access-Control-Allow-Origin", "*")
  //允许的header类型
  res.header("Access-Control-Allow-Headers", "content-type")
  //跨域允许的请求方式
  res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS")
  if (req.method.toLowerCase() == 'options')
    res.send(200); //让options尝试请求快速结束
  else
    next()
})

const appData = require('./data.json')
const seller = appData.seller
const goods = appData.goods
const ratings = appData.ratings

const router = express.Router()

router.get('/seller', function(req, res) {
  res.json({
    errno: 0,
    data: seller
  })
})

router.get('/goods', function(req, res) {
  res.json({
    errno: 0,
    data: goods
  })
})

router.get('/ratings', function(req, res) {
  res.json({
    errno: 0,
    data: ratings
  })
})

app.use('/api', router)
app.use(express.static('./dist'))

const port = process.env.PORT || 8900

module.exports = app.listen(port, function(err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at http://localhost:' + port + '\n')
})
