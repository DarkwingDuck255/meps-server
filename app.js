const express = require('express');
const bodyParser = require('body-parser');
const mailer = require('./nodemailer')
const cors = require('./cors.js')

const { PORT = 3000 } = process.env;
const app = express();
let user

app.use(bodyParser.json());
app.use(cors);

app.listen(PORT, () => {
    console.log(`серв запущен на ${PORT} порту`);
});

app.post('/api/send-email', (req, res) => {

    if (!req.body.email && !req.body.name && !req.body.tel) return res.sendStatus(400)

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


app.get('/api/send-email', (req, res) => {
    res.send(
        `<html>
          <body>
              <p>Ответ на сигнал из далёкого космоса!</p>
          </body>
          </html>`
    );
});

// отправка в телегу данных формы
const TelegramBot = require('node-telegram-bot-api');
const token = 'YOUR_TOKEN';
const bot = new TelegramBot(token, { polling: true });

app.post('/api/send-msg', (req, res) => {
    const name = req.body.name;
    const tel = req.body.tel;
    const email = req.body.email;
    const company = req.body.company;
    const message = req.body.message;

    const text = `Сообщение от ${name}, 
Компания: ${company}, 
Tel: ${tel}, 
Email: ${email},
Сообщение: 
${message}`;
    console.log(text)
    // bot.sendMessage(chatId, text);
    sendToRecipients(text)

    res.sendStatus(200);
});

bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, "Приветствую, я - бот, который будет отправлять данные с формы обратной связи с сайта meps.uz.");
});

function sendToRecipients(text) {
    const chatId = [`82205113`, ``]
    chatId.forEach((recipient) => {
      bot.sendMessage(recipient, text);
    });
  }

bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const message = msg.text;

    bot.sendMessage(chatId, message);
});
