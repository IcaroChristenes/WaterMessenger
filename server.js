const fs = require('fs');
const path = require('path');
const express = require('express');
// const session = require('express-session');
const low = require('lowdb');
const fileSync = require('lowdb/adapters/FileSync');
const cors = require('cors');

const app = express();
app.locals.db = low(new fileSync('db.json')).defaults({ reports: '' });

app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: true }));
// app.engine('html', require('ejs').renderFile)
// app.set('view engine', 'html');
// app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));


fs.readdirSync('./routes').filter((file) => file.endsWith('.js')).forEach((route) => {
    app.use(`/${route.split('.')[0]}`, require(`./routes/${route}`));
});

app.set('port', process.env.PORT || 8080);
app.listen(app.get('port'), '0.0.0.0', async () => {
    // const response = await fetch('http://ip-api.com/json');
    // const { status, query } = await response.json();
    // console.log(`Rodando na porta ${status === 'success' ? query : ip.address()}:${app.get('port')}`);
});