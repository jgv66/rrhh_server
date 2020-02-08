// conexion a la base de jgv
module.exports = {
    sender: 'jogv66@gmail.com',
    sender_psw: 'murielybelen',
    //
    anticipos: 'alex.rivas@priority.cl',
    anticipos_cc: 'jogv66@gmail.com',
    vacaciones: 'alex.rivas@priority.cl',
    vacaciones_cc: 'jogv66@gmail.com',
    licencias: 'alex.rivas@priority.cl',
    licencias_cc: 'jogv66@gmail.com',
    certificados: 'alex.rivas@priority.cl',
    certificados_cc: 'jogv66@gmail.com',
    cambios: 'jogv66@gmail.com', // 'alex.rivas@priority.cl'
    cambios_cc: 'jogv66@gmail.com',
    // 
    anticipos_body: `
        <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml">
        <head>
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
            <meta name="viewport" content="width=device-width" />
        
            <style type="text/css">
                * { margin: 0; padding: 0; font-size: 100%; font-family: 'Avenir Next', "Helvetica Neue", "Helvetica", Helvetica, Arial, sans-serif; line-height: 1.65; }
                img { max-width: 100%; margin: 0 auto; display: block; }
                body, .body-wrap { width: 100% !important; height: 100%; background: #efefef; -webkit-font-smoothing: antialiased; -webkit-text-size-adjust: none; }
                a { color: #71bc37; text-decoration: none; }
                .text-center { text-align: center; }
                .text-right { text-align: right; }
                .text-left { text-align: left; }
                .button { display: inline-block; color: white; background: #71bc37; border: solid #71bc37; border-width: 10px 20px 8px; font-weight: bold; border-radius: 4px; }
                h1, h2, h3, h4, h5, h6 { margin-bottom: 20px; line-height: 1.25; }
                h1 { font-size: 32px; }
                h2 { font-size: 28px; }
                h3 { font-size: 24px; }
                h4 { font-size: 20px; }
                h5 { font-size: 16px; }
                p, ul, ol { font-size: 16px; font-weight: normal; margin-bottom: 20px; }
                .container { display: block !important; clear: both !important; margin: 0 auto !important; max-width: 980px !important; }
                .container table { width: 100% !important; border-collapse: collapse; }
                .container .masthead { padding: 40px 0; background: #C3C3C3; color: white; }
                .container .masthead h1 { margin: 0 auto !important; max-width: 90%; text-transform: uppercase; }
                .container .content { background: white; padding: 30px 35px; }
                .container .content.footer { background: none; }
                .container .content.footer p { margin-bottom: 0; color: #888;  text-align: center; font-size: 10px; }
                .container .content.footer a { color: #888; text-decoration: none; font-weight: bold; }
            </style>
        </head>
        
        <body>
            <table class="body-wrap">
                <tr>
                    <td class="container">
        
                        <!-- Message start -->
                        <table>
                            <!-- CORTAR JULIO -->
                            <tr>
                                <td class="content">
        
                                    <p>Srs. Recursos Humanos: Mi solicitud de anticipo para este mes corresponde a:.</p>
                                    <p>Ficha : ##ficha## </p>
                                    <p>Rut : ##rut##</p>
                                    <p>Nombres : ##nombres## </p>
                                    <p>Monto requerido: ##monto## </p>
                                    <p>Fecha solicitada: ##fecha##</p>

                                </td>
                            </tr>
                        <!--  KINETIK -->
                        </table>
                        
                    </td>
                </tr>
                <tr>
                    <td class="container">
            
                        <!-- Message start -->
                        <table>
                            <tr>
                                <td class="content footer" align="center">
                                    <p>Desarrollado por Kinetik - Soluciones Móviles</p>
                                </td>
                            </tr>
                        </table>
                        
                    </td>
                </tr>
            </table>
        </body>
        </html>`,
    cambios_body: function(caso) {
        return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml">
        <head>
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
            <meta name="viewport" content="width=device-width" />
            <style type="text/css">
                * { margin: 0; padding: 0; font-size: 100%; font-family: 'Avenir Next', "Helvetica Neue", "Helvetica", Helvetica, Arial, sans-serif; line-height: 1.65; }
                img { max-width: 100%; margin: 0 auto; display: block; }
                body, .body-wrap { width: 100% !important; height: 100%; background: #efefef; -webkit-font-smoothing: antialiased; -webkit-text-size-adjust: none; }
                a { color: #71bc37; text-decoration: none; }
                .text-center { text-align: center; }
                .text-right { text-align: right; }
                .text-left { text-align: left; }
                .button { display: inline-block; color: white; background: #71bc37; border: solid #71bc37; border-width: 10px 20px 8px; font-weight: bold; border-radius: 4px; }
                h1, h2, h3, h4, h5, h6 { margin-bottom: 20px; line-height: 1.25; }
                h1 { font-size: 32px; }
                h2 { font-size: 28px; }
                h3 { font-size: 24px; }
                h4 { font-size: 20px; }
                h5 { font-size: 16px; }
                p, ul, ol { font-size: 16px; font-weight: normal; margin-bottom: 20px; }
                .container { display: block !important; clear: both !important; margin: 0 auto !important; max-width: 980px !important; }
                .container table { width: 100% !important; border-collapse: collapse; }
                .container .masthead { padding: 40px 0; background: #C3C3C3; color: white; }
                .container .masthead h1 { margin: 0 auto !important; max-width: 90%; text-transform: uppercase; }
                .container .content { background: white; padding: 30px 35px; }
                .container .content.footer { background: none; }
                .container .content.footer p { margin-bottom: 0; color: #888;  text-align: center; font-size: 10px; }
                .container .content.footer a { color: #888; text-decoration: none; font-weight: bold; }
            </style>
        </head>
        <body>
            <table class="body-wrap">
                <tr>
                    <td class="container">
        
                        <!-- Message start -->
                        <table>
                            <!-- CORTAR JULIO -->
                            <tr>
                                <td class="content">
                                    <p>Srs. Recursos Humanos: Solicito actualizar mis datos personales:.</p>
                                    <p>Ficha : ##ficha## </p>
                                    <p>Rut : ##rut##</p>
                                    <p>Nombres : ##nombres## </p>
                                    ` + (caso === 'domicilio' ? '<p>Nueva dirección : ##direccion## </p>' : '') + `
                                    ` + (caso === 'domicilio' ? '<p>Nueva comuna : ##comuna##</p>' : '') + `
                                    ` + (caso === 'domicilio' ? '<p>Nueva ciudad : ##ciudad##</p>' : '') + `
                                    ` + (caso === 'numero' ? '<p>Nuevo número telefónico : ##numero##</p>' : '') + `
                                    ` + (caso === 'afp' ? '<p>Nueva AFP : ##afp##</p>' : '') + `
                                    ` + (caso === 'isapre' ? '<p>Nueva ISAPRE : ##isapre##</p>' : '') + `
                                </td>
                            </tr>
                        <!--  KINETIK -->
                        </table>
                        
                    </td>
                </tr>
                <tr>
                    <td class="container">
            
                        <!-- Message start -->
                        <table>
                            <tr>
                                <td class="content footer" align="center">
                                    <p>Desarrollado por Kinetik - Soluciones Móviles</p>
                                </td>
                            </tr>
                        </table>
                        
                    </td>
                </tr>
            </table>
        </body>
        </html>`;
    },
    PDF_body: `
        <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml">
        <head>
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
            <meta name="viewport" content="width=device-width" />
            <style type="text/css">
                * { margin: 0; padding: 0; font-size: 100%; font-family: 'Avenir Next', "Helvetica Neue", "Helvetica", Helvetica, Arial, sans-serif; line-height: 1.65; }
                img { max-width: 100%; margin: 0 auto; display: block; }
                body, .body-wrap { width: 100% !important; height: 100%; background: #efefef; -webkit-font-smoothing: antialiased; -webkit-text-size-adjust: none; }
                a { color: #71bc37; text-decoration: none; }
                .text-center { text-align: center; }
                .text-right { text-align: right; }
                .text-left { text-align: left; }
                .button { display: inline-block; color: white; background: #71bc37; border: solid #71bc37; border-width: 10px 20px 8px; font-weight: bold; border-radius: 4px; }
                h1, h2, h3, h4, h5, h6 { margin-bottom: 20px; line-height: 1.25; }
                h1 { font-size: 32px; }
                h2 { font-size: 28px; }
                h3 { font-size: 24px; }
                h4 { font-size: 20px; }
                h5 { font-size: 16px; }
                p, ul, ol { font-size: 16px; font-weight: normal; margin-bottom: 20px; }
                .container { display: block !important; clear: both !important; margin: 0 auto !important; max-width: 980px !important; }
                .container table { width: 100% !important; border-collapse: collapse; }
                .container .masthead { padding: 40px 0; background: #C3C3C3; color: white; }
                .container .masthead h1 { margin: 0 auto !important; max-width: 90%; text-transform: uppercase; }
                .container .content { background: white; padding: 30px 35px; }
                .container .content.footer { background: none; }
                .container .content.footer p { margin-bottom: 0; color: #888;  text-align: center; font-size: 10px; }
                .container .content.footer a { color: #888; text-decoration: none; font-weight: bold; }
            </style>
        </head>
        <body>
            <table class="body-wrap">
                <tr>
                    <td class="container">
        
                        <!-- Message start -->
                        <table>
                            <!-- CORTAR JULIO -->
                            <tr>
                                <td class="content">
                                    <p>Sirvase recibir archivo adjunto con información solicitada a través de miPortal </p>
                                    <p>Ficha : ##ficha## </p>
                                    <p>Nombre : ##nombres## </p>
                                </td>
                            </tr>
                        <!--  KINETIK -->
                        </table>
                        
                    </td>
                </tr>
                <tr>
                    <td class="container">
                        <!-- Message start -->
                        <table>
                            <tr>
                                <td class="content footer" align="center">
                                    <p>Desarrollado por Kinetik - Soluciones Móviles</p>
                                </td>
                            </tr>
                        </table>
                        
                    </td>
                </tr>
            </table>
        </body>
        </html>`

};