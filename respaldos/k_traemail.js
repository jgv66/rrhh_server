
// debo cambiarlo por ksp_

module.exports = {  

  eStock: function() { 
    var correo = "msilva@disa.cl";
    console.log("estuve aqui, retornando correo", correo);
    return correo; 
  },
  
  // cada funncion se separa por comas  
  delVendedor: function( sql, cVendedor ) { 
    //  
    var reg     = undefined;
    var request = new sql.Request();
    //
    //return request.query("select TOP 1 'jogv66@gmail.com' as correo, 'contacto@albaspa.cl,p.salinascorvalan81@gmail.com' as copiasadic, 'correo-para-pruebas' as nombre from TABFU where KOFU='"+cVendedor.trim()+"' ;")
    return request.query("select TOP 1 EMAIL as correo, EMAILSUP as copiasadic, NOKOFU as nombre from TABFU where KOFU='"+cVendedor.trim()+"' ;")
    .then( function(results) { 
        return results.recordset; 
      } )
  },
  //
  delCliente: function( sql, cCodigo, cSucursal ) { 
    //  
    var reg     = undefined;
    var request = new sql.Request();
    //
    return request.query("select TOP 1 EMAILCOMER as correo, NOKOEN as rs, KOEN as rut from MAEEN where KOEN='"+cCodigo.trim()+"' AND SUEN='"+cSucursal.trim()+"' ;")
    .then( function(results) { 
        return results.recordset; 
      } )
  }
}
