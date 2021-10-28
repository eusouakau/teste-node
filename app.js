const { response } = require("express")
const express = require("express")
const app = express()
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const Post = require('./models/Post')




//config
  // template engine
  app.engine('handlebars', handlebars({
    defaultLayout: 'main',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    },
}))
    app.set('view engine', 'handlebars') 
  //body-parser
    app.use(bodyParser.urlencoded({extended: false}))
    app.use(bodyParser.json())
  

//rotas   

app.get('/', function(req, res){
    Post.findAll({order: [['id', 'DESC']]}).then(function(posts){
       // console.log(posts)
        res.render('home', {posts: posts})
    })
})
    
app.get('/cad', function(req, res){
    res.render('formulario')
})

app.post('/add', function(req, res){
    Post.create({
        titulo: req.body.titulo,
        conteudo: req.body.conteudo
    }).then(function(){
        res.redirect('/')
    }).catch(function(erro){
        res.send("Houve um erro: " + erro)
    })
})

app.get('/deletar/:id', (req, res) => {
    Post.destroy({ where: {'id': req.params.id}}).then((id) => {
        res.send('Postagem apagada com sucesso')
    }).catch((erro) => {
        res.send('Esta postagem na existe!' + erro)
    })
})


app.listen(8081, function(){
    console.log("Servidor rodando na url http://localhost:8081")
})

