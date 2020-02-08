// debo cambiarlo por ksp_

module.exports = {
  
  // cada funncion se separa por comas  
  generaQuery: function( carro, modalidad, hora, tipodoc, xObs, xOcc, xFechaDesp ) { 
    //
    // console.log( carro, modalidad, hora, tipodoc, xOcc, xFechaDesp );
    let query = '';
    let occ   = ( xOcc != null || xOcc != undefined ) ? xOcc.trim() : "" ; 
    let obs   = ( xObs != null || xObs != undefined ) ? xObs.trim() : "" ; 
    let fdesp = ( xFechaDesp != null || xFechaDesp != undefined ) ? "'"+xFechaDesp.toString()+"'" : "getdate()" ; 
    //
    query  = "declare @id     int      = 0 ; ";
    query += "declare @nrodoc char(10) = ''; ";
    query += "declare @Error nvarchar(250) ; ";
    query += "begin transaction ;";
    query += "insert into ktp_encabezado (empresa,cliente,suc_cliente,vendedor,fechaemision,";
    query +=                             "monto,observacion,ordendecompra,modalidad,valido,fechaentrega,horainicio,horafinal) ";
    query += "values ('"+carro[0].empresa+"','"+carro[0].cliente+"','"+carro[0].suc_cliente+"','"+carro[0].vendedor+"',getdate(),";
    query +=          "0,'"+obs+"','"+occ+"','"+modalidad+"','',"+fdesp+",'"+hora+"','"+hora+"') ;";
    query += "set @Error = @@ERROR ; if (@Error<>0) goto TratarError ; ";
    query += "select @id = @@IDENTITY ;"
    query += "set @Error = @@ERROR ; if (@Error<>0) goto TratarError ; ";
    //
    for ( var i = 0; i < carro.length ; i++ ) {
        //
        query += "insert into ktp_detalle (id_preventa,linea,sucursal,bodega,codigo,unidad_tr,unidad1,unidad2,cantidad1,cantidad2,";
        query +=                          "listaprecio,metodolista,precio,";
        query +=                          "porcedes,descuentos,porcerec,recargos,observacion,valido)"; 
        query += " values ";
        query += "(@id,"+(i+1).toString()+",'"+carro[i].sucursal+"','"+carro[i].bodega+"','"+carro[i].codigo+"',";
        query += "1,'','',"+carro[i].cantidad.toString()+", 0,'"+carro[i].listapre+"','"+carro[i].metodolista+"',"+carro[i].precio.toString()+",";
        query += carro[i].dsctovend.toString()+","+((carro[i].precio-carro[i].preciomayor)*carro[i].cantidad).toString()+",0,0,'', '' ) ; ";
        query += "set @Error = @@ERROR ; if (@Error<>0) goto TratarError ; ";
        //
    }
    //    
    query += "update ktp_encabezado set monto=( select sum((d.cantidad1*d.precio)-d.descuentos) from ktp_detalle as d where d.id_preventa=ktp_encabezado.id_preventa ) ";
    query += " where id_preventa=@id ;";
    query += "set @Error = @@ERROR ; if (@Error<>0) goto TratarError ; ";
    //
    if      ( tipodoc =='PRE' )                     { query += "exec ksp_grabaDocumentoPre_v1 'Pendiente', 'NVV', @id, @nrodoc output ;";   }
    else if ( tipodoc =='NVV' || tipodoc == 'COV' ) { query += "exec ksp_grabaDocumentoDef_v1 '"+tipodoc+"', @id, @nrodoc output ;";        }
    //
    query += "set @Error = @@ERROR ; if (@Error<>0) goto TratarError ; ";
    query += "commit transaction ;";
    query += "select @nrodoc as numero, @id as id ;";
    query += "TratarError: ";
    query += "if @@Error<>0 ";
    query += "    BEGIN ";
    query += "    ROLLBACK TRANSACTION ";
    query += "    END ;";
    //
    return query;
  },

  stock: function( sql, body ) { 
    //
    console.log(body);
    //
    query = "exec ksp_stockprod_caltex ";
    //
    const xdatos  = body.datos;
    //
    if ( xdatos.codproducto   === undefined  ) { xdatos.codproducto   = ''; } else { xdatos.codproducto = xdatos.codproducto.trim(); }
		if ( xdatos.descripcion   === undefined  ) { xdatos.descripcion   = ''; } else { xdatos.descripcion = xdatos.descripcion.trim(); }
    if ( xdatos.superfamilias === undefined  )   xdatos.superfamilias = '';
    if ( xdatos.rubros        === undefined  )   xdatos.rubros        = '';
    if ( xdatos.marcas        === undefined  )   xdatos.marcas        = '';
    if ( xdatos.soloconstock  === undefined  ) { xdatos.soloconstock  = 'false'; }
    if ( xdatos.ordenar       === undefined  ) { xdatos.ordenar = ''; }       else { xdatos.ordenar     = xdatos.ordenar.trim();     }
    //
    query += "'";
    query += xdatos.codproducto+"','"+xdatos.descripcion+"','"+xdatos.superfamilias+"','"+xdatos.rubros+"','"+xdatos.marcas+"','";
    query += xdatos.ordenar+"',"+xdatos.offset+",";
		query += xdatos.soloconstock+",'"+xdatos.usuario+"' ; "; 
    //
    console.log('desde strock->',query);
    //
    var request = new sql.Request();
    return request.query( query )
            .then( function(results) { 
              return results.recordset; 
            });

  },

}
