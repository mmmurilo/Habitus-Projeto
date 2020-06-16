const express = require('express');
const routes = require('./routes');

require('./database');

const app = express();

app.use(express.json()); //para reconhecer json
app.use(routes); //para usar as rotas
app.listen(3333); //porta