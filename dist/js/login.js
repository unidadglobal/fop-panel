const db = firebase.firestore();
const signup_form = document.querySelector("#form-login");

$(document).ready(function () {
    $("#recuperar-pass").on("click", function (e) {
        if ($(this).attr("href") != "javascript:;") return false;

        const email = $("#username").val();

        let regexEmail = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;

        if (!regexEmail.test(email)) {
            swal("Ingresá un E-Mail válido!", "", "error");
            $("#username").focus();
        }
        else {
            $(this).removeAttr("href");
            auth.languageCode = 'es';
            auth.sendPasswordResetEmail(email).then(function () {
                // Email sent.
                swal("Te enviamos un e-mail para reestablecer tu contraseña", "Ingresá a tu correo " + email, "success");
            }).catch(function (error) {
                // An error happened.
                $(this).attr("href", "javascript:;");
            });
        }
    });
});

signup_form.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = $("#username").val();
    const pass = $("#pass").val().trim();

    let regexEmail = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;

    if (!regexEmail.test(email)) {
        swal("Ingresá un E-Mail válido!", "", "error");
        $("#username").focus();
    }
    else if (pass.includes(" ")) {
        swal("La contraseña no puede tener espacios!", "", "error");
    }
    else if (pass.length == 0) {
        swal("Ingresá tu contraseña!", "", "error");
    }
    else {
        auth.signInWithEmailAndPassword(email, pass).then(userCredential => {
            db
                .collection("usuarios")
                .doc(userCredential["user"]["uid"])
                .get()
                .then((doc) => {
                    if (doc.exists) {
                        let imageUrl = null;

                        if (doc.data().imageUrl != undefined && doc.data().imageUrl != null && doc.data().imageUrl.length > 0) {
                            imageUrl = doc.data().imageUrl.toString();
                        }
                        if (doc.data().tipoUsuario == "admin") {
                            setLogged(
                                email,
                                pass,
                                userCredential["user"]["uid"],
                                doc.data().tipoUsuario,
                                doc.data().nombre,
                                null,
                                null,
                                imageUrl
                            );
                        }
                    }
                    else {
                        swal("Ocurrió un error al Iniciar Sesión", "El usuario ingresado no existe", "error");
                    }
                }).catch((error) => {
                    console.log(error);
                    swal("Ocurrió un error al Iniciar Sesión", "Intentá de nuevo", "error");
                    $("#btn-registrar").attr("disabled", false);
                });
        }).catch((error) => {
            console.log(error);
            if (error["code"].includes("wrong") || error["code"].includes("not-found")) {
                swal("El E-mail o contraseña ingresados son incorrectos", "", "error");
            }
        });
    }
});

function setLogged(usuario, pass, uid, tipoUsuario, nombre, idTienda, shortName, imageUrl) {
    $(document).ready(function () {
       $.ajax({
            beforeSend: function () {
            },
            url: 'valida_usr.php',
            type: 'POST',
            data: { usuario: usuario, pass: pass, uid: uid, tipousuario: tipoUsuario, nombre: nombre, idTienda: idTienda, shortName: shortName, imagen: imageUrl },
            success: function (x) {
                $("body").html(x);
            },
            error: function (jqXHR, estado, error) {
            }
        });
    });
}