

module.exports = {

    // cada funncion se separa por comas  
    conQuiebre: function( sql, empresa ) { 
        //  
        var request = new sql.Request();
        //
        return request.query("exec ksp_revisaQuiebres_resumen '"+empresa+"' ;")
    },

}