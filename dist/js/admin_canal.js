let hasChanged = false;
const db = firebase.firestore();

function loadCategorias() {
  $("#select-categoria").html(`
    <option value="ninguna">Ninguna</option>
  `)
  const colRef = db.collection("categorias").where("tipo", "==", 1).orderBy("nombre", "asc");
  colRef.get()
    .then((querySnapshot) => {
      if (querySnapshot.docs && querySnapshot.docs.length) {
        for (let j = 0; j < querySnapshot.docs.length; j++) {
          let doc = querySnapshot.docs[j];
          $("#select-categoria").append(
            `
            <option value="${doc.id}">${doc.data().nombre}</option>
            `
          )
        }
      }
      loadDataCanal();
    });
}

$(document).ready(function () {
  loadCategorias();

  $("#link-canal").on("keypress paste", function (e) {
    hasChanged = true;
    $("#btn-guardarcambios").css({ "display": "inline-block" });
    return true;
  });

  $("#nombre-canal").on("keypress paste", function (e) {
    const regex = new RegExp("^[a-zA-Z0-9ñÑ'áéíóúÁÉÍÓÚüÜ ]+$");
    const str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
    if (regex.test(str)) {
      hasChanged = true;
      $("#btn-guardarcambios").css({ "display": "inline-block" });
      return true;
    }
  
    e.preventDefault();
    return false;
  });

  $("#select-categoria").on("change", function(e) {
    hasChanged = true;
    $("#btn-guardarcambios").css({ "display": "inline-block" });
  })
  
  $('#btn-guardarcambios').on('click', function (e) {
    if (hasChanged == true) {
      e.preventDefault();
      $(this).attr("disabled", true);
      guardarCambios();
    }
  });
  
  window.onbeforeunload = function () {
    return hasChanged ? "Realizaste cambios. Continuar?" : null;
  }
});

function loadDataCanal() {
  const canalID = getQueryVariable("id").trim();
  if (canalID != null) {
    const canalRef = db.collection("canales").doc(canalID);
    canalRef.get().then((doc) => {
      if (doc.exists) {
        $("#nombre-canal").val(doc.data().nombre);

        const link = doc.data().stream;
        if (link && link.toString().length) {
          $("#link-canal").val(link);
        }

        if (doc.data().categoria) {
          $("#select-categoria").val([doc.data().categoria]);
        }

        const activo = doc.data().activo;
        if (activo == true) {
          $("#switch-canal").attr("checked", "checked").prop("checked", true);
          $("#label-canal-activo").html("Canal Activo");
          $("#label-canal-activo").addClass("text-success");
          $("#span-slider").addClass("activo");
        }
        else {
          $("#label-canal-activo").html("Canal Inactivo");
          $("#label-canal-activo").removeClass("text-success").addClass("text-danger");
        }

        $("#container-tiendactiva").css({ "display": "block" });

        $("#switch-canal").click(function (e) {
          toggleCanalActivo($(this).is(':checked') == true ? true : false, doc.id);
          return false;
        });
        $("#eliminar-btn-container").show();

        $("#eliminar-btn").on("click", function (e) {
          e.preventDefault();
          funcEliminar(canalRef);
        });

        let imageUrl = doc.data().thumbnail;
        if (imageUrl && imageUrl.toString().length) {
          $("#img-canal").attr("src", imageUrl);
        }

        $(".loading-wrapper").remove();
      }
      else {
        window.location.href = "./inicio.php";
      }

      $("#img-canal").on('click', function () {
        $("#logo-upload").click();
      });

      $("#logo-upload").on('change', function () {
        readURL(this);
      });

      $(".btn-transmitir").on('click', function () {
        location.href = "transmitir.php?id="+doc.id;
      });


    });
  }
}

function funcEliminar(canalRef) {
  swal("¿Estás seguro/a de eliminar este Canal permanentemente?", "Esta acción no puede deshacerse.", {
    icon: "warning",
    buttons: {
      cancel: "Cancelar",
      catch: {
        text: "ELIMINAR",
        value: "catch",
      }
    },
  })
    .then((value) => {
      switch (value) {
        case "catch":
          canalRef.delete().then(() => {
            location.href = "inicio.php";
          }).catch((error) => {
            swal("Ocurrió un error. Intentá nuevamente", "Revisá tu conexión", "error");
          });
          break;

        default:
          break;
      }
    });
}


function guardarCambios() {
  const nombre = $("#nombre-canal").val().trim();
  const link = $("#link-canal").val().trim();
  const categoria = $("#select-categoria option:selected").val();
  const canalID = getQueryVariable("id").replace("'", "");
  if (nombre.length < 2) {
    swal("Ingresá el Nombre del Canal!", "", "error");
    $("#btn-guardarcambios").attr("disabled", false);
  }
  else if (!link.length || !link.includes(".m3u8")) {
    swal("Ingresá el Link del Streaming!", "Debe ser de formato .m3u8", "error");
  }
  else {
    $.ajaxSetup({ cache: false })
    $.get('get_session_variable.php', { requested: "tipo_usuario" }, function (data) {

      if (data.trim() == "admin") {
        let canalRef = db.collection('canales').doc(canalID);
        canalRef.get().then((doc) => {
          if (doc.exists) {
            canalRef.update(
              {
                "nombre": nombre,
                "stream": link,
                "categoria": categoria
              }
            ).then(function () {
              hasChanged = false;
              $("#btn-guardarcambios").css({ "display": "none" });
              $("#btn-guardarcambios").attr("disabled", false);
              swal("Los cambios se guardaron correctamente!", "", "success");
            }).catch((error) => {
              swal("Ocurrió un error al guardar los cambios", "", "error");
              $("#btn-guardarcambios").attr("disabled", false);
              console.log(error);
            });
          }
        });
      }
    });
  }
}

function readURL(input) {
  if (input.files && input.files[0]) {
    const reader = new FileReader();

    reader.onload = function (e) {
      $('#verificar-subida-logo').attr('src', e.target.result);
      $("#verificar-subida-logo").cropper("destroy");
      $("#verificar-subida-logo").cropper({
        dragMode: "move",
        minContainerWidth: 300,
        minContainerHeight: 300,
        minCanvasWidth: 250,
        minCanvasHeight: 250,
        minCropBoxWidth: 250,
        minCropBoxHeight: 200,
        cropBoxResizable: false,
        ready: function () {
          $("#img-logo").cropper("setCropBoxData", { width: 250, height: 200 });
        },
      });

      $("#modalUploadLogo").modal("show");

      $("#btn-subir-logo").on("click", function (e) {
        e.preventDefault();
        canvas = $("#verificar-subida-logo").data("cropper").getCroppedCanvas({
          fillColor: "#000000",
          width: 250,
          height: 200,
        }).toDataURL();

        let idobj = "#logo-upload";
        const canalID = getQueryVariable("id").replace("'", "");
        if ($(idobj).prop('files')[0]) {
          $("#btn-subir-logo").removeClass("btn-success").addClass("btn-danger").attr("disabled", true).html("SUBIENDO...");
          $(".btn-cerrar").attr("disabled", true);
          const storageRef = firebase.storage().ref();
          const ref = storageRef.child('canales/' + canalID + '.png');

          ref.putString(canvas, 'data_url', { contentType: "image/png" }).then(function (snapshot) {
            snapshot.ref.getDownloadURL().then(function (imageUrl) {
              const canalRef = db.collection('canales').doc(canalID);
              canalRef.update(
                {
                  "thumbnail": imageUrl
                }
              ).then(() => {
                $("#modalUploadLogo").modal("hide");
                location.reload()
              }).catch((error) => {
                $("#modalUploadLogo").modal("hide");
                swal("Ocurrió un error al subir la imagen!", error.toString(), "error");
                console.log(error);
              });
            });

          }).catch((error) => {
            $("#modalUploadLogo").modal("hide");
            swal("Ocurrió un error al subir la imagen!", "", "error");
            console.log(error);
          });
        }
      });
    }
    reader.readAsDataURL(input.files[0]);
  }
}

function getQueryVariable(variable) {
  const query = window.location.href.substring(window.location.href.indexOf(".php") + 5).replace("#", "&");
  if (query != undefined && query != null && query.trim().length > 0 && query.includes("=")) {
    let vars = query.split("&");
    if (vars.length > 0 && vars[0] != "") {
      for (var i = 0; i < vars.length; i++) {
        let pair = vars[i].split("=");
        if (pair[0] == variable) {
          return pair[1];
        }
      }
    }
  }
  return null;
}

function toggleCanalActivo(activar, canalID) {
  if (activar == false) {
    swal("¿Estás seguro/a de desactivar el Canal?", "", {
      icon: "warning",
      buttons: {
        cancel: "Cancelar",
        catch: {
          text: "Desactivar",
          value: "catch",
        }
      },
    })
      .then((value) => {
        switch (value) {
          case "catch":
            db.collection("canales").
              doc(canalID).
              update(
                {
                  activo: false
                }
              ).then(() => {
                swal("Desactivaste el Canal correctamente!", "", "success");
                $("#label-canal-activo").html("Canal Inactivo");
                $("#label-canal-activo").removeClass("text-success").addClass("text-danger");
                $("#switch-canal").removeAttr("checked").prop("checked", false);
              }).catch((error) => {
                $("#switch-canal").attr("checked", "checked").prop("checked", true);
                swal("Ocurrió un error al desactivar el Canal", "", "error");
                console.log(error);
              });

            break;

          default:
            $("#switch-canal").attr("checked", "checked").prop("checked", true);
            break;
        }
      });
  }
  else {
      swal("¿Estás seguro/a?", "El Canal será público y visible para todos.", {
        icon: "warning",
        buttons: {
          cancel: "Cancelar",
          catch: {
            text: "ACTIVAR",
            value: "catch",
          }
        },
      })
        .then((value) => {
          switch (value) {
            case "catch":
              db.collection("canales").
                doc(canalID).
                update(
                  {
                    activo: true
                  }
                ).then(() => {
                  swal("Activaste el Canal correctamente!", "", "success");
                  $("#label-canal-activo").html("Canal Activo");
                  $("#label-canal-activo").removeClass("text-danger").addClass("text-success");
                  $("#switch-canal").attr("checked", "checked").prop("checked", true);
                }).catch((error) => {
                  swal("Ocurrió un error al activar el Canal", "", "error");
                  $("#switch-canal").removeAttr("checked").prop("checked", false);
                  console.log(error);
                });
              break;
            default:
              $("#switch-canal").attr("checked", "checked").prop("checked", true);
              break;
          }
        });
    }
}