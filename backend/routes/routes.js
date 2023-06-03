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

router.get("/user/:id", async (req, res) => {
    try {
        const { params: { id }, body: user } = req;
        const usuario = await User.findById(id)
        if (usuario) {
            res.json(usuario)
        } else {
            res.status(404).json({
                error: true,
                message: "Usuário não encontrado"
            });
        }
    } catch (error) {
        res.status(500).send("Erro de servidor");
    }
})


router.put("/user/:id", async (req, res) => {
    try {
        const { params: { id }, body: updatedUser } = req;
        const user = await User.findByIdAndUpdate(id, updatedUser, { new: true });

        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({
                error: true,
                message: "Usuário não encontrado"
            });
        }
    } catch (error) {
        res.status(500).send("Erro de servidor");
    }
});

router.delete("/user/:id", async (req, res) => {
    try {
        const { params: { id } } = req;
        const user = await User.findByIdAndDelete(id);

        if (user) {
            res.status(200).json({
                message: "Usuário deletado com sucesso"
            });
        } else {
            res.status(404).json({
                error: true,
                message: "Usuário não encontrado"
            });
        }
    } catch (error) {
        res.status(500).send("Erro de servidor");
    }
});

function verifyPass(user, userLogin) {
    if (user.email === userLogin.email && user.password === userLogin.password) {
        return true
    }
}

router.post('/usersLogin', async (req, res) => {
    try {
        const { body: userLogin } = req;
        const user = await User.findOne({ email: userLogin.email });

        if (user && user.password === userLogin.password) {
            res.status(200).json({
                usuario: user,
                message: "Logado"
            });
        } else {
            res.status(400).send("Email ou senha inválidos");
        }
    } catch (error) {
        res.status(500).send("Erro de servidor");
    }
});

module.exports = router