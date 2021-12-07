$("#btnLogout").click(function() {
    localStorage.clear();
    window.location.href = "../index.html";
});

function getUser() {
    var id = localStorage.getItem('idUser');
    $.ajax({
        type: 'GET',
        //url: 'http://localhost:8080/api/user/' + id,
        //url: 'http://localhost:8080/api/user/all',    129.151.110.23
        url: 'http://129.151.110.23:8080/api/user/all',   
        dataType: 'json',
        success: function(data) {
            var $row = $('<tr>');
            $row.append($('<td>').text(data.identification));
            $row.append($('<td>').text(data.name));
            //$row.append($('<td>').text(data.address));
            //$row.append($('<td>').text(data.description));
            //$row.append($('<td>').text(data.cellPhone));
            $row.append($('<td>').text(data.email));
            //$row.append($('<td>').text(data.zone));
            switch (data.type) {
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
            $("#contenidoUsuarioLogueado").append($row);
        }
    });
}

function gethairproducts() {
    var id = localStorage.getItem('idUser');
    $.ajax({
        type: 'GET',
        //url: 'http://localhost:8080/api/hairproducts/all',    129.151.110.23
        url: 'http://129.151.110.23:8080/api/hairproducts/all', 
        dataType: 'json',
        success: function(data) {
            var $row = $('<tr>');
            $row.append($('<td>').text(data.brand));
            $row.append($('<td>').text(data.category));
            $row.append($('<td>').text(data.name));
            $row.append($('<td>').text(data.description));
            $row.append($('<td>').text(data.availability));
            $row.append($('<td>').text(data.price));
            $row.append($('<td>').text(data.quantity));
            $row.append($('<td>').text(data.photography));
            $row.append($('<td>').text(data.zone));
            $("#contenidoUsuarioLogueado").append($row);
        }
    });
}
$(document).ready(function() {
    getUser();
    var myModalUsuario = document.getElementById('administrarUsuarios');

    myModalUsuario.addEventListener('shown.bs.modal', function(e) {
        $.ajax({
            type: 'GET',
            //url: 'http://localhost:8080/api/user/all',     129.151.110.23
            url: 'http://129.151.110.23:8080/api/user/all',  
            dataType: 'json',
            success: function(data) {

                for (let i = 0; i < data.length; i++) {
                    let filas = $('<tr>');
                    filas.append($('<td>').text(data[i].identification));
                    filas.append($('<td>').text(data[i].name));
                    filas.append($('<td>').text(data[i].address));
                    filas.append($('<td>').text(data[i].description));
                    filas.append($('<td>').text(data[i].cellPhone));
                    filas.append($('<td>').text(data[i].email));
                    filas.append($('<td>').text(data[i].zone));
                    filas.append($('<td>').text(data[i].type));
                    filas.append($('<td>').append("<input type='number' id='cantidad" + data[i].id + "' name='cantidad' min='0' max='" + data[i].quantity + "' />"));
                    filas.append($("<td class='text-center no-padding'>").append('<button type="button" class="btn btn-outline-success btn-block w-100" onclick="agregarProductoOrden(' + data[i].id + ')">Agregar</button>'));
                    filas.append($("<td class='text-center'>").append('<button type="button" class="btn btn-outline-danger btn-block w-100" onclick="eliminarProductoOrden(' + data[i].id + ',\'' + data[i].name + '\')">Eliminar</button>'));
                    $("#listaUsuarios").append(filas);
                }
            }
        });
    });
    gethairproducts();

    var myModal = document.getElementById('administrarProductos');
    myModal.addEventListener('shown.bs.modal', function(e) {
        $.ajax({
            type: 'GET',
            //url: 'http://localhost:8080/api/hairproducts/all',    129.151.110.23
            url: 'http://129.151.110.23:8080/api/hairproducts/all', 
            dataType: 'json',
            success: function(data) {
                for (let i = 0; i < data.length; i++) {
                    let filas = $('<tr>');
                    filas.append($('<td>').append("<img src='" + data[i].photography + "' width='50%' height='50px'>"));
                    filas.append($('<td>').text(data[i].name));
                    filas.append($('<td>').text(data[i].category));
                    filas.append($('<td>').text(data[i].description));
                    filas.append($('<td>').text(data[i].price));
                    filas.append($('<td>').append("<input type='number' id='cantidad" + data[i].id + "' name='cantidad' min='0' max='" + data[i].quantity + "' />"));
                    filas.append($("<td class='text-center no-padding'>").append('<button type="button" class="btn btn-outline-success btn-block w-100" onclick="agregarProductoOrden(' + data[i].id + ')">Agregar</button>'));
                    filas.append($("<td class='text-center'>").append('<button type="button" class="btn btn-outline-danger btn-block w-100" onclick="eliminarProductoOrden(' + data[i].id + ',\'' + data[i].name + '\')">Eliminar</button>'));
                    $("#listaProductos").append(filas);
                }
            }
        });
    });

});