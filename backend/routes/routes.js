const cors = require('cors');
const router = require('express').Router()
const User = require('../models/user')
const Task = require('../models/task');
const jwt = require('jsonwebtoken')
require('dotenv').config()
const cookieParser = require('cookie-parser')
const SECRET = process.env.JWT_SECRET

router.use(cookieParser())

function createToken(user) {
    return jwt.sign({ email: user.email, name: user.name }, SECRET)
}

function readToken(token) {
    try {
        return jwt.verify(token, SECRET)
    } catch (error) {
        throw new Error('Token inválido')
    }
}

// function validateToken(token) {
//     return readToken(token)
// }

router.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'PUT', 'POST', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}));

router.get('/home', (req, res) => {
    const token = req.headers.authorization
    if (!token) {
        return res.status(401).json({ mensagem: 'Token Inválido!' });
    }
    try {
        readToken(token);
        res.json({ mensagem: 'Bem-vindo à página protegida!' });
    } catch (error) {
        res.status(401).json({ mensagem: 'Token inválido' });
    }
})

router.post('/user', async (req, res) => {
    const newUser = new User(req.body)
    newUser.save()
        .then((newUser) => {
            res.status(201)
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
            const token = createToken(user)

            res.status(200)
                .cookie('authorization', token, {
                    httpOnly: false,
                    secure: true,
                    sameSite: 'strict'
                }).json(token)
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

router.get('/usersLogin/:email', async (req, res) => {
    try {
        const { params: { email } } = req;
        const user = await User.findOne({ email: email });

        if (user) {
            res.status(200).json(user);
        } else {
            res.status(400).send("Email inválido");
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
            res.status(201)
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
                message: "Task deletada com sucesso"
            });
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

router.get("/tasks/:id", async (req, res) => {
    try {
        const { params: { id }, body: task } = req;
        const tarefa = await Task.findById(id)
        if (tarefa) {
            res.json(tarefa)
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

module.exports = router