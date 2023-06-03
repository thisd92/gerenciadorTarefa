const cors = require('cors');
const router = require('express').Router()
const User = require('../models/user')
const UserLogin = require('../models/userLogin')

router.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    router.use(cors());
    next();
});

router.post('/user', async (req, res) => {
    const newUser = new User(req.body)
    const user = await User(User.findOne({ email: newUser.email }))
    newUser.save()
        .then((newUser) => {
            res.status(200)
            return res.json(newUser)
        }).catch((erro) => {
            res.status(400)
            return res.json({
                error: true,
                message: "Email já utilizado."
            })
        })

})

router.get("/user", (req, res) => {
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
router.get("/user/:id", (req, res) => {
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
router.put("/user/:id", (req, res) => {
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

router.delete("/user/:id", (req, res) => {
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

router.get("/usersLogin", (req, res) => {
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
router.get("/usersLogin/:id", (req, res) => {
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
router.put("/usersLogin/:id", (req, res) => {
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

router.delete("/usersLogin/:id", (req, res) => {
    //Apagar o registro no banco de dados MongoDB
    UserLogin.deleteOne({ _id: req.params.id })
        .then(() => {
            return res.status(200).send("Deleted User!")
        })
        .catch((err) => {
            return res.status(400).json({
                error: true,
                message: "Erro ao deletar usuário"
            })
        })
});

function verifyPass(User, UserLogin) {
    if (User.email == UserLogin.email && User.password == UserLogin.password) {
        return true
    }
}

router.post('/usersLogin', async (req, res) => {
    const newUserLogin = await UserLogin(req.body)
    const userUsername = await User(User.findOne({ email: newUserLogin.email }))
    if(verifyPass(newUserLogin, userUsername)){
        res.status(200).json({
            usuario: newUserLogin,
            message: "Logado"
        })
    }else {
        res.status(400).send("Invalid email or password")
    }
})

module.exports = router