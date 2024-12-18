const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

router.post('/send-email', async (req, res) =>{
    const {name, lastname, email, title, description, number} = req.body;

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // true para puerto 465, false para otros
        auth: {
        user: 'isotermtesting@gmail.com',
        pass: 'fcid ljnn scpv vsnp',
    },
    });

    const mailOptionsToSender = {
        from: 'isotermtesting@gmail.com',
        to: email,
        subject: 'Confirmacion de contacto',
        text: `Hola ${name}, hemos recibido tu solicitud de contacto titulada "${title}. Te responderemos lo más rápido posible."`
    };

    const mailOptionsToYou = {
        from: 'isotermtesting@gmail.com',
        to: 'isotermtesting@gmail.com',
        subject: 'Nueva solicitud de contacto',
        text: `Has recibido una solicitud de ${name} ${lastname}. Detalles:\n
               Email: ${email}\n
               Teléfono: ${number}\n
               Título: ${title}\n
               Descripción: ${description}`
    };

    try{
        await transporter.sendMail(mailOptionsToSender);
        await transporter.sendMail(mailOptionsToYou);
        res.status(200).send({ message: 'Correos enviados exitosamente'});
    }catch(error){
        console.error('Error al enviar correos: ', error);
        res.status(500).send({ error: 'Error al enviar correos' });
    }
});

module.exports = router;