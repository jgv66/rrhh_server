// console.log("hola mundo");
var express = require('express');
var app = express();
var dbconex = require('./conexion_mssql.js');
var reg = require('./registrar.js');
var nodemailer = require('nodemailer');
var mailId = require('./direcciones_mail.js');
var base642pdf = require('base64topdf');
var path = require('path');
var wkhtmltopdf = require('wkhtmltopdf');
var node_wkhtmltopdf = require('node-wkhtmltopdf');
var fs = require("fs");
var fileExist = require('file-exists');
//
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,OPTIONS,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept');
    // intercept OPTIONS method
    if ('OPTIONS' == req.method)
        res.sendStatus(204);
    else
        next();
});
//
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// carpeta de imagenes: desde donde se levanta el servidor es esta ruta -> /root/trial-server-001/public
// app.use(express.static('public'));
app.use('/static', express.static('public'));

publicpath = path.resolve(__dirname, 'public');
CARPETA_PDF = publicpath + '/pdf/';

app.set('port', 3070);
var server = app.listen(3070, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Escuchando http-server en el puerto: %s", port);
});

// dejare el server myssql siempre activo
var sql = require('mssql');
var conex = sql.connect(dbconex);

app.post('/newUser',
    function(req, res) {
        console.log("/newUser ", req.body);
        reg.newUser(sql, req.body)
            .then(function(data) {
                res.json({ resultado: 'ok', datos: data });
            })
            .catch(function(err) {
                console.log("/newUser ", err);
                res.json({ resultado: 'error', datos: error });
            });
    });

app.post('/validarUser',
    function(req, res) {
        console.log("/validarUser ", req.body);
        reg.validarUser(sql, req.body)
            .then(function(data) {
                //
                if (data[0].resultado === true) {
                    res.json({ resultado: 'ok', datos: data });
                } else {
                    res.json({ resultado: 'error', datos: data[0].mensaje });
                }
            })
            .catch(function(err) {
                console.log("/validarUser ", err);
                res.json({ resultado: 'error', datos: err });
            });
    });

app.post('/leerFicha',
    function(req, res) {
        console.log("/leerFicha ", req.body);
        reg.leerFicha(sql, req.body)
            .then(function(data) {
                res.json({ resultado: 'ok', datos: data });
            })
            .catch(function(err) {
                console.log("/leerFicha ", err);
                res.json({ resultado: 'error', datos: error });
            });
    });

app.post('/liquidaciones',
    function(req, res) {
        console.log("/liquidaciones ", req.body);
        reg.leerLiquidaciones(sql, req.body)
            .then(function(data) {
                res.json({ resultado: 'ok', datos: data });
            })
            .catch(function(err) {
                console.log("/leerFicha ", err);
                res.json({ resultado: 'error', datos: error });
            });
    });
app.post('/leerPDFLiquidacion',
    function(req, res) {
        console.log("/leerPDFLiquidacion ", req.body);
        reg.getBase64(sql, req.body.idpdf)
            .then(function(data) {
                //
                var filename = `liq_${req.body.ficha.trim()}_${req.body.filename }.pdf`;
                var fullpath = path.join(CARPETA_PDF, filename);
                // 
                var base64_pdf = base642pdf.base64Decode(data, fullpath);
                res.json({ resultado: 'ok', datos: filename, base64: base64_pdf });
                //
            })
            .catch(function(err) {
                console.log("/leerPDFLiquidacion ", err);
                res.json({ resultado: 'error', datos: err });
            });
    });

/*  sudo apt-get install wkhtmltopdf
    npm install wkhtmltopdf 
*/
app.post('/leerCertAntiguedad',
    function(req, res) {
        //
        console.log("/leerCertAntiguedad >>> ", req.body);
        //
        reg.getBase64Cert(sql, req.body.key, req.body.ficha)
            .then(function(data) {
                //
                var filenamePDF = `cert_antig_${req.body.ficha.trim()}.pdf`;
                var filenameHTM = `cert_antig_${req.body.ficha.trim()}.html`;
                var fullpathPDF = path.join(CARPETA_PDF, filenamePDF);
                var fullpathHTM = path.join(CARPETA_PDF, filenameHTM);
                //
                contruyeHTML(data, fullpathHTM)
                    .then(htmlContent => {
                        //    
                        try {
                            // xHTML = fs.readFileSync(htmlContent);
                            // console.log(htmlContent);
                            // wkhtmltopdf('http://apple.com/', { output: path.join(CARPETA_PDF, 'out.pdf') });
                            //
                            wkhtmltopdf(htmlContent, { output: fullpathPDF });
                            //
                            var options = [
                                '--quiet',
                                '--no-background',
                                '--margin-bottom 1',
                                '--margin-left 1',
                                '--margin-right 1',
                                '--margin-top 1'
                            ];
                            node_wkhtmltopdf(options, htmlContent, fullpathPDF);
                            //
                            res.json({ resultado: 'ok', datos: filenamePDF, base64: fullpathPDF });
                            //
                        } catch (error) {
                            console.log('Error!', error);
                            console.log('/leerCertAntiguedad ', error);
                            res.json({ resultado: 'error', datos: error });
                        }
                        //
                    }, (err) => {
                        console.log(err);
                    });
            })
            .catch(function(err) {
                console.log("/leerCertAntiguedad cath() >>>", err);
                res.json({ resultado: 'error', datos: err });
            });
    });
contruyeHTML = function(data, fullpathHTM) {
    //
    return new Promise(resolve => {
        //
        var buff = new Buffer(data[0].archivo, 'base64');
        var xHTML = buff.toString('ascii');
        //
        xHTML = xHTML.replace('##logo##', 'https://kinetik.cl/rrhh01/img/varso_logo.png');
        xHTML = xHTML.replace('##firma##', 'https://kinetik.cl/rrhh01/img/varso_firma.png');
        xHTML = xHTML.replace('##nombres##', data[0].nombres);
        xHTML = xHTML.replace('##rut##', data[0].rut);
        xHTML = xHTML.replace('##fecha_ingreso##', data[0].fechaingreso);
        xHTML = xHTML.replace('##labor##', data[0].labor);
        xHTML = xHTML.replace('##dia_hoy##', data[0].dia_hoy);
        xHTML = xHTML.replace('##mes_hoy##', data[0].mes_hoy);
        xHTML = xHTML.replace('##anno_hoy##', data[0].anno_hoy);
        //
        fs.writeFileSync(fullpathHTM, xHTML);
        //
        if (fileExist.sync(fullpathHTM)) {
            console.log('archivo existe ', fullpathHTM);
            resolve(xHTML);
        }
        //
    });
    //
};

app.post('/enviarPDF',
    function(req, res) {
        console.log("/enviarPDF ", req.body);
        //
        var delBody = mailId.PDF_body;
        delBody = delBody.replace('##ficha##', req.body.codigo);
        delBody = delBody.replace('##nombres##', req.body.nombres);
        delBody = delBody.replace('##periodo##', req.body.periodo);
        // datos del enviador
        var transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: mailId.sender,
                pass: mailId.sender_psw
            }
        });
        // opciones del correo
        var mailOptions = {
            from: { name: "KINETIK 👻", address: mailId.sender },
            to: req.body.to,
            cc: req.body.cc,
            subject: (req.body.subject) ? 'Envío de archivo PDF' : '(Envío de archivo PDF) ' + req.body.subject,
            html: delBody,
            attachments: [{
                filename: req.body.filename,
                path: path.join(CARPETA_PDF, req.body.filename)
            }]
        };
        // enviar el correo
        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                console.log('error en sendmail->', error);
                res.json({ resultado: 'error', mensaje: error.message });
            } else {
                console.log("Email PDF a -> ", req.body.to);
                console.log("Email PDF con copia -> ", req.body.cc);
                reg.guardaSolicitud(sql, req.body.ficha, 'PDF', 'PDF: ' + req.body.periodo, req.body.to, req.body.cc, true);
                res.json({ resultado: 'ok', mensaje: 'Correo ya se envió a ' + req.body.to });
            }
        });
    });

app.post('/pedirAnticipo',
    function(req, res) {
        console.log('/pedirAnticipo', req.body);
        reg.leerFicha(sql, req.body)
            .then(function(data) {
                enviarCorreoAnticipo(req, res, data);
            })
            .catch(function(err) {
                console.log("/pedirAnticipo ", err);
                res.json({ resultado: 'error', datos: err });
            });
    });
enviarCorreoAnticipo = function(req, res, data) {
    //
    sender = mailId.sender;
    psswrd = mailId.sender_psw;
    //
    cTo = mailId.anticipos;
    cCc = mailId.anticipos_cc;
    cSu = 'Solicitud de Anticipo : ' + data[0].nombres;
    //
    var delBody = mailId.anticipos_body;
    delBody = delBody.replace('##ficha##', data[0].codigo);
    delBody = delBody.replace('##rut##', data[0].rut);
    delBody = delBody.replace('##nombres##', data[0].nombres);
    delBody = delBody.replace('##monto##', req.body.monto.toString());
    delBody = delBody.replace('##fecha##', req.body.fecha);
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
        from: { name: "GESTORIA 👻", address: sender },
        to: cTo,
        cc: cCc,
        subject: cSu,
        html: delBody
    };
    // enviar el correo
    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log('error en sendmail->', error);
            res.json({ resultado: 'error', mensaje: error.message });
        } else {
            console.log("Email anticipo a -> ", cTo);
            console.log("Email anticipo con copia -> ", cCc);
            reg.guardaSolicitud(sql, data[0].codigo, 'Anticipo', 'anticipo: ' + req.body.monto.toString() + ', para el dia ' + req.body.fecha.toISOString(), cTo, cCc);
            res.json({ resultado: 'ok', mensaje: 'Correo ya se envió a ' + cTo });
        }
    });
};

app.post('/leerMensajes',
    function(req, res) {
        //
        reg.leermensajes(sql, req.body.ficha)
            .then(function(data) {
                // console.log("/validarUser ",data); 
                res.json({ resultado: 'ok', datos: data });
            })
            .catch(function(err) {
                console.log("/leerMensajes ", err);
                res.json({ resultado: 'error', datos: error });
            });
    });

app.post('/cierraMensaje',
    function(req, res) {
        //
        reg.cerrarmensaje(sql, req.body.id)
            .then(function(data) {
                // console.log("/validarUser ",data); 
                res.json({ resultado: 'ok', datos: data });
            })
            .catch(function(err) {
                console.log("/cerrarmensaje ", err);
                res.json({ resultado: 'error', datos: error });
            });
    });

app.post('/cambiarDatosFicha',
    function(req, res) {
        //
        console.log(req.body);
        reg.leerFicha(sql, req.body)
            .then(function(data) {
                console.log("/cambiarDatosFicha ", data[0]);
                enviarCorreoCambio(req, res, data);
            })
            .catch(function(err) {
                console.log("/cambiarDatosFicha ", err);
                res.json({ resultado: 'error', datos: err });
            });
    });
enviarCorreoCambio = function(req, res, data) {
    //
    sender = mailId.sender;
    psswrd = mailId.sender_psw;
    //
    cTo = mailId.cambios;
    cCc = mailId.cambios_cc;
    cSu = 'Solicitud de Actualizacion de datos personales : ' + data[0].nombres;
    //
    var delBody = mailId.cambios_body(req.body.caso);
    // console.log( delBody );
    delBody = delBody.replace('##ficha##', data[0].codigo);
    delBody = delBody.replace('##rut##', data[0].rut);
    delBody = delBody.replace('##nombres##', data[0].nombres);
    if (req.body.caso === 'domicilio') {
        delBody = delBody.replace('##direccion##', req.body.dato1);
        delBody = delBody.replace('##ciudad##', req.body.dato2);
        delBody = delBody.replace('##comuna##', req.body.dato3);
    } else if (req.body.caso === 'numero') {
        delBody = delBody.replace('##numero##', req.body.dato1);
    } else if (req.body.caso === 'afp') {
        delBody = delBody.replace('##afp##', req.body.dato1);
    } else if (req.body.caso === 'isapre') {
        delBody = delBody.replace('##isapre##', req.body.dato1);
    }
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
        from: { name: "GESTORIA 👻", address: sender },
        to: cTo,
        cc: cCc,
        subject: cSu,
        html: delBody
    };
    // enviar el correo
    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log('error en sendmail->', error);
            res.json({ resultado: 'error', mensaje: error.message });
        } else {
            console.log("Email cambio a -> ", cTo);
            console.log("Email cambio con copia -> ", cCc);
            reg.guardaSolicitud(sql,
                data[0].codigo,
                'Cambio',
                'Cambiar: ' + req.body.dato1 + (req.body.dato2 ? ', ' + req.body.dato2 : '') + (req.body.dato3 ? ', ' + req.body.dato3 : ''),
                cTo, cCc);
            res.json({ resultado: 'ok', mensaje: 'Correo ya se envió a ' + cTo });
        }
    });
};

app.post('/leerRegiones',
    function(req, res) {
        //
        reg.regiones(sql)
            .then(function(data) {
                // console.log("/leerRegiones ",data); 
                res.json({ resultado: 'ok', datos: data });
            })
            .catch(function(err) {
                console.log("/leerRegiones ", err);
                res.json({ resultado: 'error', datos: error });
            });
    });
app.post('/leerCiudades',
    function(req, res) {
        //
        reg.ciudades(sql, req.body.region)
            .then(function(data) {
                // console.log("/leerCiudades ",data); 
                res.json({ resultado: 'ok', datos: data });
            })
            .catch(function(err) {
                console.log("/leerCiudades ", err);
                res.json({ resultado: 'error', datos: error });
            });
    });
app.post('/leerComunas',
    function(req, res) {
        //
        reg.comunas(sql, req.body.region)
            .then(function(data) {
                // console.log("/leerComunas ",data); 
                res.json({ resultado: 'ok', datos: data });
            })
            .catch(function(err) {
                console.log("/leerComunas ", err);
                res.json({ resultado: 'error', datos: error });
            });
    });
app.post('/leerIsapres',
    function(req, res) {
        //
        reg.isapres(sql)
            .then(function(data) {
                console.log("/leerIsapres ", data);
                res.json({ resultado: 'ok', datos: data });
            })
            .catch(function(err) {
                console.log("/leerIsapres ", err);
                res.json({ resultado: 'error', datos: error });
            });
    });
app.post('/leerAfps',
    function(req, res) {
        //
        reg.afps(sql)
            .then(function(data) {
                console.log("/leerAfps ", data);
                res.json({ resultado: 'ok', datos: data });
            })
            .catch(function(err) {
                console.log("/leerAfps ", err);
                res.json({ resultado: 'error', datos: error });
            });
    });

//