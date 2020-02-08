

module.exports = {

    // cada funncion se separa por comas  
    haySolicitudesPendientes: function( sql, empresa ) { 
        //  
        var request = new sql.Request();
        let query   = "exec ksp_permisos 'c','','' ;"
        //
        //console.log('haySolicitudesPendientes()',query);
        return request.query( query );
        //
    },

    // cada funncion se separa por comas  
    rescataSolicitudesPendientes: function( sql, body ) { 
        //  
        var request = new sql.Request();
        let query   = "exec ksp_permisos 'r','"+body.empresa+"','"+body.usuario+"' ;";
        //
        console.log( 'rescataSolicitudesPendientes()', query );
        return request.query( query );
        //
    },

}