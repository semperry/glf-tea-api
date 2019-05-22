require('dotenv').config()
const express = require("express");
const MailRouter = express.Router();
const nodemailer = require('nodemailer')

const user = process.env.EMAIL_USER
const pass = process.env.EMAIL_PASS

MailRouter.route('/').post((req, res) => {
  let data = req.body

  let smtpTransport = nodemailer.createTransport({
    service: 'Gmail',
    port: 465,
    auth: {
      user: user,
      pass: pass
    },
    tls: {
      // do not fail on invalid certs
      rejectUnauthorized: false
    }
  });

  let mailOptions = {
    from: data.email,
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