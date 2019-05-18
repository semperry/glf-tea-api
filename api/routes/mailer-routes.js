const express = require("express");
const MailRouter = express.Router();
const nodemailer = require('nodemailer')

MailRouter.route('/mailer').post((req, res) => {
  let data = req.data

  let smtpTransport = nodemailer.createTransport({
    service: 'Gmail',
    port: 465,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  let mailOptions = {
    from: data.email,
    to: '3017productions@gmail.com',
    subject: 'Message from Contact Form',
    html: `<p>${data.name}</p>
          <p>${data.email}</p>
          <p>${data.message}</p>`
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