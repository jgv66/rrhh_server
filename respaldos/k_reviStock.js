
// debo cambiarlo por ksp_

module.exports = {  
  
    // cada funncion se separa por comas  
    analizar: function( sql, recset, elmail, correos, nodemailer, xObs, carro, numero, tipodoc ) { 
        //  
        var lineas     = '',
            htmlBody   = '',
            nombreVend = ''
            rsocial    = '', 
            emailStock = elmail.eStock(),
            mailList   = [],
            request    = new sql.Request();
        // recuperar el nombre del vendedor
        elmail.delVendedor( sql, carro[0].vendedor ).then( function(data) { nombreVend = data[0].nombre; });
        // recuperar la razon social del cliente
        elmail.delCliente( sql, carro[0].cliente, carro[0].suc_cliente ).then( function(data) { rsocial = data[0].rs; });
        //
        request.input('id', sql.Int, recset[0].id );
        request.execute("ksp_revisaStockDetalleK" )
            .then( function(results) { 
                console.log( 'enviar correo->', emailStock, results.recordset ); 
                /*
                codigo	        cantidad	unidad	cod_unidad	stock	descripcion
                BCIM-005     	1.00000	    1	    PQ	        0	    CAPSULAS IMPRESAS Nº 1  1 COLOR x1000un.          
                BCIM-006     	1.00000	    1	    PQ	        0	    CAPSULAS IMPRESAS Nº 1  2 COLOR x1000un.          
                */
                results.recordset.forEach(element => {
                    lineas += '<tr>';
                    lineas += '<td align="center">'+element.codigo+'</td>';
                    lineas += '<td align="center">'+element.cantidad.toString()+'</td>';
                    lineas += '<td align="center">'+element.cod_unidad+'</td>';
                    lineas += '<td align="center">'+element.stock.toString()+'</td>';
                    lineas += '<td align="center">'+element.descripcion+'</td>';
                    lineas += '</tr>';
                });
                // 
                htmlBody = correos.quiebreDeStock( xObs, nombreVend, rsocial, carro[0].cliente, carro[0].suc_cliente, numero, tipodoc, carro[0].bodega ) + lineas + correos.segundaParte();
                //
                mailList.push( { to: emailStock } ); 
                correos.enviarCorreoQuiebre( nodemailer, mailList, htmlBody );  
            });                                                    
        //
        return null;
    }
}
  