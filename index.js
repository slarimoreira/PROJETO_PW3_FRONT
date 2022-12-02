const express = require('express');

const app = express();
const axios = require('axios').default;
const bodyParser = require('body-parser');

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/listagem', (req, res)=>{
    
    const urlListagemAnotacao = 'http://localhost:3000/listarAnotacao';

    axios.get(urlListagemAnotacao)
        .then(
            (response)=>{

                let anotacao = response.data;
                res.render('anotacao/listagem', {anotacao});
                
        }); 
});

    app.get('/alterar/:id', (req, res)=>{

        let {id} = req.params;

        console.log(id)

        const urlListagemAnotacao = `http://localhost:3000/listarNota/${id}`;
        
        axios.get(urlListagemAnotacao)
        .then(
            (response)=>{   

                let anotacao = response.data;
                res.render('anotacao/alterarNotas', {anotacao});

            }
        )
    });

    app.post('/alterarAnotacao', (req, res)=>{
        
        const urlListagemAnotacao = 'http://localhost:3000/alterarAnotacao';

        axios.put(urlListagemAnotacao, req.body)
        .then(
            res.redirect('http://localhost:8070/listagem')
        )

    });


    app.post('/inserirAnotacao', (req, res)=>{
        const urlListagemAnotacao = 'http://localhost:3000/inserirAnotacao';
        
        

        axios.post(urlListagemAnotacao, req.body)
        .then(
            res.redirect('http://localhost:8070/listagem')
        )

    });

    app.get('/deletarListagem/:id', (req, res)=>{

        let {id} = req.params;

        const deleteAnotacao = `http://localhost:3000/excluirNota/${id}`;
        
        axios.delete(deleteAnotacao)
        .then(
            (response)=>{   
                res.redirect('http://localhost:8070/listagem')

            }
        )
    });

app.listen(8070, ()=>{
    console.log('SERVIDOR RODANDO EM: http://localhost:8070');
});