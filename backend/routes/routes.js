const cors = require('cors');
const router = require('express').Router()
const User = require('../models/user')
const Task = require('../models/task');

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
        res.status(500).json({
            error: true,
            message: "Erro no servidor"
        });
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
        res.status(500).json({
            error: true,
            message: "Erro no servidor"
        });
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
        res.status(500).json({
            error: true,
            message: "Erro no servidor"
        });
    }
});

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
        res.status(500).json({
            error: true,
            message: "Erro no servidor"
        });
    }
});

router.get("/tasks", (req, res) => {
    Task.find().then((task) => {
        return res.json(task);
    }).catch((erro) => {
        return res.status(400).json({
            error: true,
            message: "Nenhuma task encontrada!"
        })
    })
});

router.post('/tasks', async (req, res) => {
    const newTask = new Task(req.body)
    newTask.save()
        .then((task) => {
            res.status(200)
            return res.json(task)
        }).catch((erro) => {
            res.status(400)
            return res.json({
                error: true,
                message: erro
            })
        })

})

router.put("/tasks/:id", async (req, res) => {
    try {
        const { params: { id }, body: updatedTask } = req;
        const task = await Task.findByIdAndUpdate(id, updatedTask, { new: true });

        if (task) {
            res.status(200).json(task);
        } else {
            res.status(404).json({
                error: true,
                message: "Task não encontrada"
            });
        }
    } catch (error) {
        res.status(500).json({
            error: true,
            message: "Erro no servidor"
        });
    }
});

router.delete("/tasks/:id", async (req, res) => {
    try {
        const { params: { id } } = req;
        const task = await Task.findByIdAndDelete(id);

        if (task) {
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
        res.status(500).json({
            error: true,
            message: "Erro no servidor"
        });
    }
});

module.exports = router