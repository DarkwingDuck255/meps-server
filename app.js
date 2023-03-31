const express = require('express');
const bodyParser = require('body-parser');
const mailer = require('./nodemailer')
const cors = require('./cors.js')

const { PORT = 3001 } = process.env;
const app = express();
let user

app.use(bodyParser.json());
app.use(cors);

app.listen(PORT, () => {
    console.log(`серв запущен на ${PORT} порту`);
});

app.post('/', (req, res) => {

    if(!req.body.email && !req.body.name && !req.body.tel) return res.sendStatus(400)

    const message = {        
        to: `ars081190@yandex.ru`,
        subject: 'Сообщение с сайта',
        html: `
        <h2>Мы получили данные с сайта.</h2>
        
        <p>Имя: ${req.body.name}</p>
        <p>Компания: ${req.body.company}</p>
        <p>Телефон: ${req.body.tel}</p>
        <p>Email: ${req.body.email}</p>
        <p>Сообщение: ${req.body.text}</p>`
    }
    mailer(message)
    user = req.body
    res.sendStatus(200)
})


app.get('/', (req, res) => {
    res.send(
        `<html>
          <body>
              <p>Ответ на сигнал из далёкого космоса!</p>
          </body>
          </html>`
    );
}); 