const express = require('express');
const resend = require('resend');

const app = express();
const port = 3000; // You can change this to your desired port


const resendClient = new resend.Resend('YOUR API KEY FROM https://resend.com/');


app.get('/api/email/:email/:text/:subject1', (req, res) => {
    const { email, text , subject1} = req.params;


    const emailMessage = {
        from: 'onboarding@resend.dev',
        to: email,
        subject: subject1,
        html: `<p>${text}</p>`
    };


    resendClient.emails.send(emailMessage)
        .then(response => {
            console.log('Email sent:', response);
            res.send('Email sent successfully!');
        })
        .catch(error => {
            console.error('Error sending email:', error);
            res.status(500).send('Failed to send email');
        });
});


app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
