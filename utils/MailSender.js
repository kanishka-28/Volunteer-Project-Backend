var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'thevolint@gmail.com',
    pass: 'Varanasi@123'
  }
});

var mailOptions = {
  from: 'thevolint@gmail.com',
  to: 'kanishkagour28@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});