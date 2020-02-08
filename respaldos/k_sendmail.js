// envio de _correos 
module.exports = {

    enviarCorreo: function( res, body ) {
        //
        sender = 'jogv66@gmail.com';
        psswrd = 'murielybelen';
        //
        cTo = mailList[0].to;
        cCc = mailList[0].cc;
        cSu = 'Solicitud de Anticipo : ';
        // datos del enviador
        var transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: sender,
                pass: psswrd
            }
            });
        // opciones del correo
        var mailOptions = {
            from:       { name: "GESTORIA 👻", address: sender },    
            to:         cTo,
            cc:         cCc,
            subject:    cSu,
            html:       htmlBody 
        };
        // enviar el correo
        transporter.sendMail( mailOptions, function( error, info ) {
            if ( error ) {
                console.log('error en sendmail->',error);
                // res.status( 500 ).send( error.message );
            } else {
                console.log("Email enviado a -> ", cTo );
                console.log("Email con copia -> ", cCc );
                // res.status(200).send(req.body);
            }
        }); 
    },

};
