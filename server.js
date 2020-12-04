//importar as dependências
const express = require('express')
const bodyParser = require('body-parser')

//importando as rotas do aviso
const routerNotices = require('./components/notices/NoticesController')

//inicializando o express
const app = express()

//configurar a view engine e configurar a pasta pública
app.set('view engine', 'ejs')
app.use(express.static('public'))

app.locals.moment = require('moment')

//configurar o body-parser
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

//rotas
app.use(routerNotices)

//escutar a porta
app.listen(3000)
