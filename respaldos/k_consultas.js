
module.exports = {
    
    Usuario: function( sql, body ) {   
        //  
        let query   = '';
        let email   = body.email;
        let rut     = body.rut;
        let request = new sql.Request();
        //
        query +="exec ksp_buscarUsuario '"+email+"','"+rut+"' ; ";
        //
        console.log( "query -> ", query );
        //
        return request.query( query ).then( function(results) { return results.recordset; } )
        //
    },

    entregaPermisos: function( sql, body ) {   
        //  
        let monto   = body.valordoc || 0;
        let query   = '';
        let request = new sql.Request();
        //
        query +="exec ksp_entregaPermiso '"+body.dar+"','"+body.quienpide+"','"+body.permiso+"','"+body.numero+"','"+body.otorga+"',"+monto.toString()+" ; ";
        console.log( "query -> ", query );
        //
        return request.query( query ).then( function(results) { return results.recordset; } )
    },

    entregaPermisosKasi: function( sql, body ) {   
        //  
        let query   = '';
        let request = new sql.Request();
        //
        query +="exec ksp_entregaPermisoKasi '"+body.dar+"','"+body.id+"','"+body.quienpide+"','"+body.numero+"','"+body.otorga+"' ; ";
        console.log( "query -> ", query );
        //
        return request.query( query ).then( function(results) { return results.recordset; } )
    },

    BuscarDocumentoKasi: function( sql, body ) {   
        //  
        let query   = '';
        let request = new sql.Request();
        //
        query +="exec ksp_buscarKasiDocumento "+body.id.toString()+",'"+body.otorga+"' ; ";
        //
        console.log( "query -> ", query );
        //
        return request.query( query ).then( function(results) { return results.recordset; } )
        //
    },

}
  