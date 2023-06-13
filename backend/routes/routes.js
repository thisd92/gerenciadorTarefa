const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cors = require('cors');
const cookieParser = require('cookie-parser')

const User = require('../models/user')
const Task = require('../models/task');
const Company = require('../models/company');

require('dotenv').config()

const SECRET = process.env.JWT_SECRET

const router = express.Router()

router.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'PUT', 'POST', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}));

router.use(cookieParser())

function createToken(user) {
    return jwt.sign({ company: user.company, email: user.email, name: user.name }, SECRET)
}

function readToken(token) {
    try {
        return jwt.verify(token, SECRET)
    } catch (error) {
        throw new Error('Token inválido')
    }
}

// Middleware de autenticação
function authenticate(req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: 'Token inválido' });
    }
    try {
        const decodedToken = readToken(token);
        req.user = decodedToken;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token inválido' });
    }
}

// Middleware de tratamento de erros
function errorHandler(err, req, res, next) {
    console.error(err.stack);
    res.status(500).json({ error: true, message: 'Erro no servidor' });
}

router.get('/protected', authenticate, (req, res) => {
    res.json({ mensagem: 'Bem-vindo à página protegida!' });
});

router.post('/company', async (req, res) => {
    try {
        const company = new Company(req.body);
        await company.save();
        res.status(201).json(company);
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({
                error: true,
                message: "Companhia já cadastrada."
            });
        }
        res.status(500).json({ error: error.message });
    }
})

router.get("/company", async (req, res, next) => {
    try {
        const companys = await Company.find()
        res.json(companys);
    } catch {
        next(error)
    }
});

router.post('/user', async (req, res) => {
    try {
        const companyName = req.body.companyName;
        const company = await Company.findOne({ name: companyName });
        if (!company) {
            return res.status(400).json({
                error: true,
                message: "Empresa não encontrada.",
            });
        }
        const user = new User(req.body);
        user.company = String(company._id);
        const hashedPassword = await bcrypt.hash(user.password, 10);
        user.password = hashedPassword;
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({
                error: true,
                message: "Email já utilizado."
            });
        }
        res.status(500).json({ error: error.message });
    }
});

router.get("/user", async (req, res, next) => {
    try {
        const users = await User.find()
        res.json(users);
    } catch {
        next(error)
    }
});

router.get("/user/:id", async (req, res, next) => {
    try {
        const { params: { id } } = req;
        const user = await User.findById(id)
        if (!user) {
            res.status(404).json({
                error: true,
                message: "Usuário não encontrado"
            });
        }
        res.json(user)
    } catch (error) {
        next(error)
    }
})


router.put("/user/:id", async (req, res, next) => {
    try {
        const { params: { id }, body: updatedUser } = req;
        const user = await User.findByIdAndUpdate(id, updatedUser, { new: true });

        if (!user) {
            res.status(404).json({
                error: true,
                message: "Usuário não encontrado"
            });
        }
        res.status(200).json(user);
    } catch (error) {
        next(error)
    }
});

router.delete("/user/:id", async (req, res, next) => {
    try {
        const { params: { id } } = req;
        const user = await User.findByIdAndDelete(id);

        if (!user) {
            res.status(404).json({
                error: true,
                message: "Usuário não encontrado"
            });
        };
        res.status(200).json({
            message: "Usuário deletado com sucesso"
        })
    } catch (error) {
        next(error)
    }
});

router.post('/usersLogin', async (req, res, next) => {
    try {
        const { body: userLogin } = req;
        const company = await Company.findOne({ name: userLogin.companyName });
        if (!company) {
            return res.status(401).json({ message: 'Empresa inválida' });
        }

        const user = await User.findOne({ email: userLogin.email });

        if (!user) {
            return res.status(401).json({ message: 'Email ou senha inválidos' });
        }

        const isPasswordValid = await bcrypt.compare(userLogin.password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Email ou senha inválidos' });
        }

        if (String(company._id) !== String(user.company)) {
            return res.status(401).json({ message: 'Empresa inválida' });
        }

        const token = createToken(user);

        res.status(200)
            .cookie('authorization', token, {
                httpOnly: false,
                secure: true,
                sameSite: 'strict'
            })
            .json(token);
    } catch (error) {
        next(error);
    }
});

router.get('/usersLogin/:email', async (req, res, next) => {
    try {
        const { params: { email } } = req;
        const user = await User.findOne({ email: email });

        if (!user) {
            res.status(400).send("Email inválido");
        }
        res.status(200).json(user);
    } catch (error) {
        next(error)
    }
});

router.get("/tasks", authenticate, async (req, res, next) => {
    try {
        const token = req.headers.authorization
        const decodedToken = readToken(token)
        const { company, email, name } = decodedToken
        const tasks = await Task.find({ createdBy: company }); // Filtra as tarefas pelo ID do usuário
        res.status(200).json(tasks);
    } catch (error) {
        next(error);
    }
});

router.post('/tasks', authenticate, async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        const decodedToken = readToken(token);
        const { company, email, name } = decodedToken;
        if (!company) {
            return res.status(401).json({ message: 'Empresa inválida' });
        }

        const newTask = new Task({
            ...req.body,
            createdBy: company
        });
        await newTask.save();
        res.status(201).json(newTask);
    } catch (error) {
        next(error);
    }
});

router.put("/tasks/:id", authenticate, async (req, res, next) => {
    try {
        const { params: { id }, body: updatedTask } = req;
        const task = await Task.findByIdAndUpdate(id, updatedTask, { new: true });

        if (!task) {
            res.status(404).json({
                error: true,
                message: "Task não encontrada"
            });
        }
        res.status(200).json(task);
    } catch (error) {
        next(error)
    }
});

router.delete("/tasks/:id", authenticate, async (req, res, next) => {
    try {
        const { params: { id } } = req;
        const task = await Task.findByIdAndDelete(id);

        if (!task) {
            return res.status(404).json({
                error: true,
                message: "Task não encontrada"
            });
        }

        res.status(200).json({
            message: "Task deletada com sucesso"
        });
    } catch (error) {
        next(error)
    }
});

router.get("/tasks/:id", authenticate, async (req, res, next) => {
    try {
        const { params: { id } } = req;
        const token = req.headers.authorization
        const decodedToken = readToken(token)
        const { company, email, name } = decodedToken
        const task = await Task.findOne({ _id: id, createdBy: company })
        if (!task) {
            res.status(404).json({
                error: true,
                message: "Tarefa não encontrada"
            })
        }
        res.status(200).json(task)
    } catch (error) {
        next(error)
    }
})

router.use(errorHandler)

module.exports = router