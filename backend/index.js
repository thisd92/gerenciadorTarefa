const express = require('express');
const app = express();
const cors = require('cors');
const port = 8090;

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/dbuser', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Conexão com MongoDB realizada com sucesso!');
}).catch(() => {
    console.log('Erro: Conexão com MongoDB não foi realizada com sucesso!');
})

app.use(express.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    app.use(cors());
    next();
});

app.listen(port, () => {
    console.log(`Listening app on port ${port}`)
})

app.post('/login', (req, res) => {
    if(err) return res.status(400).json({
        error: true,
        message: "Error: Usuário ou senha inválida!"
    });

    return res.status(200).json({
        error: false,
        message: "Login efetuado"
    })
})

app.get("/users", (req, res) => {
   User.find({}).then((user) => {
        return res.json(user);
    }).catch((erro) => {
        return res.status(400).json({
            error: true,
            message: "Nenhum usuário encontrado!"
        })
    })
});

//Criar a rota "/user/:id" para ver os detalhes do user
app.get("/user/:id", (req, res) => {
	//Buscar no banco de dados o user conforme o ID enviado pela URL usando o findOne 
    User.findOne({ _id: req.params.id }).then((user) => {
		//retornar as informações do user para o aplicativo que fez a requisição
        return res.json(user);
    }).catch((erro) => {
		//Retornar erro ao aplicativo que fez a requisição informando que não encontrou nenhum user
        return res.status(400).json({
            error: true,
            message: "Nenhum user encontrado!"
        })
    })
})

//Cria a rota do tipo PUT para editar
app.put("/user/:id", (req, res) => {
	//Realizar alteração no banco de dados utilizando updateOne
	//Receber o ID do user a ser editado: req.params.id
	//Receber as insformações a serem editadas no banco de dados: req.body
    const user = User.updateOne({ _id: req.params.id}, req.body, (err) => {
		//Retornar erro quando não conseguir editar com sucesso
        if(err) return res.status(400).json({
            error: true,
            message: "Error: user não foi editado com sucesso!"
        });

		//Retornar sucesso quando o user foi editado com sucesso
        return res.json({
            error: false,
            message: "User editado com sucesso!"
        });
    });
});

app.delete("/user/:id", (req, res) => {
	//Apagar o registro no banco de dados MongoDB
    const user = User.deleteOne({_id: req.params.id}, (err) => {
		//Retornar erro quando não conseguir apagar no banco de dados
        if(err) return res.status(400).json({
            error: true,
            message: "Error: User não foi apagado com sucesso!"
        });

		//Retornar mensagem de sucesso quando excluir o registro com sucesso no banco de dados
        return res.json({
            error: false,
            message: "User apagado com sucesso!"
        });
    });
});