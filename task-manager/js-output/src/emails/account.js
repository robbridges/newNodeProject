"use strict";
const sgMail = require('@sendgrid/mail');
const sendGridAPIkey = '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';
sgMail.setApiKey(sendGridAPIkey);
sgMail.send({
    to: 'Rmb101187@gmail.com',
    from: 'Rmb101187@gmail.com',
    subject: 'Test email',
    text: 'Just a test!',
});
