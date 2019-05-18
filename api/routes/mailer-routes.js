require('dotenv').config()
const express = require("express");
const MailRouter = express.Router();
const nodemailer = require('nodemailer')

MailRouter.route('/').post((req, res) => {
  let data = req.body

  let smtpTransport = nodemailer.createTransport({
    service: 'Gmail',
    port: 465,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  let mailOptions = {
    from: '3017productions@gmail.com',
    to: '3017productions@gmail.com',
    subject: 'Message from Contact Form',
    html: `<p>Message from: ${data.name}</p>
          <p>Reply to: ${data.email}</p>
          <p>Message: ${data.message}</p>`
  }

  smtpTransport.sendMail(mailOptions,
    (error, response)=> {
      if(error) {
        res.send(error)
      } else {
        res.send('Success')
      }
      smtpTransport.close()
    })
})

module.exports = MailRouter