function getUser(){
    var id = localStorage.getItem('idUser');
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/api/user/'+id,
        dataType: 'json',
        success: function(data){
            var $row = $('<tr>');
            $row.append($('<td>').text(data.identification));
            $row.append($('<td>').text(data.name));
            $row.append($('<td>').text(data.email));
            switch(data.type){
                case 'COORD':
                    $row.append($('<td>').text('Cordinador de zona'));
                    break;
                case 'ADM':
                    $row.append($('<td>').text('Administrador'));
                    break;
                case 'ASE':
                    $row.append($('<td>').text('Asesor comercial'));
                    break;
                default:
                    $row.append($('<td>').text('Perfil no definido'));
                    break;
            }
            $row.append($('<td>').text(data.zone));
            $("#contenidoPerfil").append($row);
        }
    });
}


function getOrders(){
    var id = localStorage.getItem('idUser');
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/api/orders/'+id,
        dataType: 'json',
        success: function(data){
            var $row = $('<tr>');
            $row.append($('<td>').text(data.id));
            $row.append($('<td>').text(data.date));
            $row.append($('<td>').text(data.status));
            $row.append($('<td>').text(data.total));
            $("#contenidoOrdenes").append($row);
        }, error: function(data){
            var $row = $('<tr>');
            $row.append($('<td colspan="7" class="text-center">').text('No hay ordenes'));
            $("#contenidoOrdenes").append($row);
        }
    });
}

$("#btnLogout").click(function(){
    localStorage.clear();
    window.location.href = "../index.html";
});

$(document).ready(function(){
    getUser();
    getOrders();

    var myModal = document.getElementById('registrarOrden');

    myModal.addEventListener('shown.bs.modal', function(e){
        $.ajax({
            type: 'GET',
            url: 'http://localhost:8080/api/hairproducts/all',
            dataType: 'json',
            success: function(data){
                for(let i = 0; i < data.length; i++){
                    let filas = $('<tr>');
                    filas.append($('<td>').append("<img src='"+data[i].photography+"' width='50%' height='50px'>"));
                    filas.append($('<td>').text(data[i].name));
                    filas.append($('<td>').text(data[i].category));
                    filas.append($('<td>').text(data[i].description));
                    filas.append($('<td>').text(data[i].price));
                    filas.append($('<td>').append("<input type='number' id='cantidad"+data[i].id+"' name='cantidad' min='0' max='"+data[i].quantity+"' />"));
                    filas.append($("<td class='text-center no-padding'>").append('<button type="button" class="btn btn-outline-success btn-block w-100" onclick="agregarProductoOrden('+data[i].id+')">Agregar</button>'));
                    filas.append($("<td class='text-center'>").append('<button type="button" class="btn btn-outline-danger btn-block w-100" onclick="eliminarProductoOrden('+data[i].id+',\''+data[i].name+'\')">Eliminar</button>'));
                    $("#listaProductos").append(filas);
                }
            }
        });
    });
});