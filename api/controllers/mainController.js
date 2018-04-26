let nodeMailer = require('nodemailer');

let transport = nodeMailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    type: 'OAuth2',
    user: "harsh@techpay.in",
    clientId: "584681151358-o564nrerbqh6nfpm9h3g95h62uq02njc.apps.googleusercontent.com",
    clientSecret: "YzOlCVV-I5XPElLoJFEsTWUp",
    refreshToken: "1/EWBb5_VXkN7rWsc6vwddb6nXshZzYr1b8R5vkiADbJ0",
    accessToken: "ya29.Glt-BUb6LDv3pRROs6KXnDvgYvsZe_Lr-jWZ3A5TqpgBur_iDq4G9d9eG7PV_DiS7TOjg08CmaLYNOIyA1fC0VEeCF8QBuTz_Xx-3fVSd6SGgU0AB7tmi7CNjzZX",
    expires: 1484314697598
  }
})

let sendMail = (to, subject, text, html) => {
  transport.sendMail({
    from: 'TechPay <sales@techpay.in>',
    to: to,
    subject: subject,
    text: text,
    html: html
  },function(err, success){
      if(err){
        console.log(err)
        //res.status(500).send('Cannot do any thing');
      }
      else
        console.log("Ho gya");
  })
}

module.exports = {
  sendMail
}