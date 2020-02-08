
module.exports = {
    
    ventas: function( sql, empresa, caso, sucursal, vendedor ) { 
        //  
        let query   = '';
        var xhoy    = new Date();
        var anno    = xhoy.getFullYear();    
        var mes     = xhoy.getMonth()+1;    
        var request = new sql.Request();
        //            
        console.log( xhoy, vendedor, caso );
        //
        if ( caso == 777 ) {
            query +="select EMPRESA,RAZON FROM CONFIGP ; ";
            //console.log( "query -> ", query );
            return request.query( query ).then( function(results) { return results.recordset; } )
        } else if ( caso == 1 ) {
            query +="exec ksp_rpt_vtas_ven_tot '"+empresa+"',"+anno+","+mes+" ; ";
            //console.log( "query -> ", query );
            return request.query( query ).then( function(results) { return results.recordset; } )
        } else if ( caso == 2 ) {
            query +="exec ksp_visita_4_semanas ; ";
            console.log( "query -> ", query );
            return request.query( query ).then( function(results) { return results.recordset; } )
            //                    
        } else if ( caso == 3 ) {
            query +="exec ksp_venta_4_semanas ; ";
            console.log( "query -> ", query );
            return request.query( query ).then( function(results) { return results.recordset; } )
            //                    
        } else if ( caso == 4 ) {
            query +="exec ksp_kilos_4_semanas ; ";
            console.log( "query -> ", query );
            return request.query( query ).then( function(results) { return results.recordset; } )
            //                    
        } else if ( caso == 5 ) {
            query +="exec ksp_sinvisita_ultima_semana ; ";
            console.log( "query -> ", query );
            return request.query( query ).then( function(results) { return results.recordset; } )
            //                    
        }
    },

    verificar: function( sql, datos ) {   // ventas sucursal, mes actual
        //  
        var xhoy    = new Date();
        var anno    = xhoy.getFullYear();    
        var mes     = xhoy.getMonth()+1;    
        var request = new sql.Request();
        
        var caso    = datos.reporte;
        //            
        console.log( 'verificar ->', xhoy, datos );
        //
        if ( caso == 'usuario' ) {
            //console.log( datos[0] );
            var email   = datos.email;
            var pssw    = datos.pssw;
            var empresa = datos.empresa;
            //
            const consulta = "exec ksp_buscarUsuario '"+email+"','"+pssw+"','"+empresa+"' ; ";
            // console.log( "query -> ", consulta );
            return request.query( consulta ).then( function(results) { return results.recordset; } )
            //            
        } 
    },
}
  