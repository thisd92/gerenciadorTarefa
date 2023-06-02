const express = require('express');
const app = express();
const cors = require('cors');
const port = 8090;

const mongoose = require('mongoose');

main().catch(err => { console.log(err) })

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


async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/userdb', { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log('Conexão com MongoDB realizada com sucesso!');
        }).catch(() => {
            console.log('Erro: Conexão com MongoDB não foi realizada com sucesso!');
        })
}

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    birth: String,
    tel: String,
})

const User = mongoose.model('users', userSchema);

app.post('/user', (req, res) => {
    const newUser = new User(req.body)
    newUser.save()
        .then((newUser) => {
            return res.json(newUser)
        }).catch((erro) => {
            return res.json({
                error: true,
                message: "Erro no cadastro."
            })
        })

})

app.get("/user", (req, res) => {
    User.find().then((user) => {
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
    const newUser = User.findOne(req.body)
    newUser.updateOne(res.json)
        .then((newUser) => {
            //Retornar sucesso quando o user foi editado com sucesso
            return res.json(newUser)
        })
        .catch((err) => {
            return res.status(400).json({
                error: true,
                message: "Error: user não foi editado com sucesso!"
            });
        })
});

app.delete("/user/:id", (req, res) => {
    //Apagar o registro no banco de dados MongoDB
    User.deleteOne({ _id: req.params.id })
        .then(() => {
            return res.status(200).send("Usuário deletado!")
        })
        .catch((err) => {
            return res.status(400).json({
                error: true,
                message: "Erro ao deletar usuário"
            })
        })
});

const userLoginSchema = new mongoose.Schema({
    username: String,
    password: String,
})

const UserLogin = mongoose.model('usersLogin', userLoginSchema)

app.post('/usersLogin', (req, res) => {
    const newUserLogin = new UserLogin(req.body)
    newUserLogin.save()
        .then((newUserLogin) => {
            return res.json(newUserLogin)
        }).catch((err) => {
            return res.status(400).json({
                error: true,
                message: "Não foi possível fazer o POST"
            })
        })
})


app.get("/usersLogin", (req, res) => {
    UserLogin.find().then((userLogin) => {
        return res.json(userLogin);
    }).catch((erro) => {
        return res.status(400).json({
            error: true,
            message: "Nenhum usuário encontrado!"
        })
    })
});

//Criar a rota "/user/:id" para ver os detalhes do user
app.get("/usersLogin/:id", (req, res) => {
    //Buscar no banco de dados o user conforme o ID enviado pela URL usando o findOne 
    UserLogin.findOne({ _id: req.params.id }).then((userLogin) => {
        //retornar as informações do user para o aplicativo que fez a requisição
        return res.json(userLogin);
    }).catch((erro) => {
        //Retornar erro ao aplicativo que fez a requisição informando que não encontrou nenhum user
        return res.status(400).json({
            error: true,
            message: "Nenhum user encontrado!"
        })
    })
})

//Cria a rota do tipo PUT para editar
app.put("/usersLogin/:id", (req, res) => {
    //Realizar alteração no banco de dados utilizando updateOne
    //Receber o ID do user a ser editado: req.params.id
    //Receber as insformações a serem editadas no banco de dados: req.body
    UserLogin.updateOne({ _id: req.params.id }, req.body, (err) => {
        //Retornar erro quando não conseguir editar com sucesso
        if (err) return res.status(400).json({
            error: true,
            message: "Error: user não foi editado com sucesso!"
        });

        //Retornar sucesso quando o user foi editado com sucesso
        return res.send("User editado com sucesso!");
    });
});

app.delete("/usersLogin/:id", (req, res) => {
    //Apagar o registro no banco de dados MongoDB
    UserLogin.deleteOne({ _id: req.params.id })
        .then(() => {
            return res.status(200).send("Usuário deletado!")
        })
        .catch((err) => {
            return res.status(400).json({
                error: true,
                message: "Erro ao deletar usuário"
            })
        })
});

function verifyPass(User, UserLogin) {
    if (User.username == UserLogin.username && User.password == UserLogin.password) {
        return true
    }
}

app.post('/usersSignin', (req, res) => {
    const newUserLogin = new UserLogin(req.body)
    const userUsername = new User(User.findOne({ name: newUserLogin.username }))
    verifyPass(newUserLogin, userUsername)
    res.status(200).json({
        usuario: newUserLogin,
        message: "Logado"
    })
})