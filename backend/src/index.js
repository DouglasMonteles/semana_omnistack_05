const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const routes = require('./routes');

const app = express();

// necessario p/ o server entender as req em tempo real
const server = require('http').Server(app);
const io = require('socket.io')(server);

mongoose.connect('mongodb+srv://goweek:goweek@cluster0-5eznv.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use((req, res, next) => {
    req.io = io; // var io acessivel em qualquer parte do codigo

    return next(); // continuar com as proximas req
});

app.use(cors()); // habilita req http, deve ser usado antes das rotas
app.use(express.json()); // informa ao express que as req serão feitas através de json
app.use(routes);
app.listen(3000)
io.listen(3002);