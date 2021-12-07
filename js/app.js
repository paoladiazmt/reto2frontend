$("#btnLogin").click(function() {
    if ($("#email").val() == "" || $.trim($("#contrasena").val()) == "") {
        alert("Por favor ingrese el correo y/o la contraseña");
    } else {
        let data = {
            email: $("#email").val(),
            password: $("#contrasena").val()
        };
        $.ajax({
            //url: "http://localhost:8080/api/user/" + data.email + "/" + data.password,
            url: "http://129.151.110.23:8080/api/user/" + data.email + "/" + data.password,
            method: "GET",
            dataType: "json",
            success: function(response) {
                if (response.id != null) {
                    localStorage.setItem("idUser", response.id);
                    //window.location.href = "./pages/inicial.html";
                    //window.location.href = "./pages/ordenes.html"; **
                    window.location.href = "./pages/usuario.html";
                } else {
                    alert("Usuario o contraseña incorrectos");
                }

            },
            error: function(error) {
                alert("Usuario o contraseña incorrectos");
            }
        });
    }
});

$("#btnRegistrar").click(function() {
    if ($("#emailRegistro").val() == "" || $.trim($("#contrasenaRegistro").val()) == "" || $.trim($("#userRegistro").val()) == "" || $.trim($("#contrasenaRegistro2").val()) == "") {
        alert("Por favor complete todos los campos");
    } else {
        if ($("#contrasenaRegistro").val() != $("#contrasenaRegistro2").val()) {
            alert("Las contraseñas no coinciden");
        } else {
            let datos = {
                email: $("#emailRegistro").val(),
                password: $("#contrasenaRegistro").val(),
                name: $("#userRegistro").val()
            };
            $.ajax({
                // url: "http://localhost:8080/api/user/new",   129.151.110.23
                url: "http://129.151.110.23:8080/api/user/new",
                method: "POST",
                dataType: "json",
                data: JSON.stringify(datos),
                contentType: "application/json",
                Headers: {
                    "Content-Type": "application/json"
                },
                statusCode: {
                    201: function(response) {
                        console.log(response);
                        window.location.href = "./pages/inicial.html";
                    },
                    400: function(response) {
                        console.log("Bad Request");
                    }
                }
            });
        }
    }
});

$("#contrasenaRegistro2").change(function() {
    if ($("#contrasenaRegistro").val() != $("#contrasenaRegistro2").val()) {
        $("#contrasenaRegistro2").css("border-color", "red");
        $("#contrasenaRegistro").css("border-color", "red");
    } else {
        $("#contrasenaRegistro2").css("border-color", "");
        $("#contrasenaRegistro").css("border-color", "");
    }
});

$(document).ready(function() {
    //$("#perfilSection").hide();
});
$("#btnRegistrarUsuario1").click(function() {
    if ($("#identificacionRegistro").val() == 0 ||
        $("#userRegistro").val() == '' ||
        $("#direccionRegistro").val() == '' ||
        $("#telefonoRegistro").val() == 0 ||
        $("#emailRegistro").val() == "" ||
        $.trim($("#contrasenaRegistro").val()) == "" ||
        $.trim($("#contrasenaRegistro2").val()) == "") {
        alert("Por favor complete todos los campos");
    } else {
        if ($("#contrasenaRegistro").val() != $("#contrasenaRegistro2").val()) {
            alert("Las contraseñas no coinciden");
        } else {
            let datos = {
                id: 2,
                identificacion: $("#identificacionRegistro").val(),
                name: $("#userRegistro").val(),
                direccion: $("#direccionRegistro").val(),
                telefono: $("#telefonoRegistro").val(),
                email: $("#emailRegistro").val(),
                password: $("#contrasenaRegistro").val(),
                zona: $("#zonaRegistro").val(),
                tipousuario: $("#tipoUsuarioRegistro").val(),

            };
            console.log(datos);
            $.ajax({
                //url: "http://localhost:8080/api/user/new",   129.151.110.23
                url: "http://129.151.110.23:8080/api/user/new",
                method: "POST",
                dataType: "json",
                data: JSON.stringify(datos),
                contentType: "application/json",
                //Headers: {
                //             "Content-Type": "application/json"
                //},

                statusCode: {
                    201: function(response) {
                        console.log(response);
                        console.log(datos);
                        //window.location.href = "./pages/inicial.html";
                        window.location.href = "./pages/usuario.html";
                    },
                    400: function(response) {
                        console.log(datos);
                        console.log("Bad Request");
                    }
                }
            });
        }
    }
});