const db = firebase.firestore();
const DT = 1000; // 2 seconds per file
const HOST = 'http://192.168.0.15:8005'//'http://localhost:8005';
var isLive = false;
var mediaRecorder;
var stopped = false;
var linkUpdated = false;
var count = 0;

$(document).ready(function () {
    $(".loading-wrapper").remove();
});

var StopWebCam = function () {
    var stream = video.srcObject;
    if (stream) {
        var tracks = stream.getTracks();

        for (var i = 0; i < tracks.length; i++) {
            var track = tracks[i];
            track.stop();
        }
        $(".no-video-container").removeClass("d-none").addClass("d-block")
        $(".video-outer").removeClass("d-block").addClass("d-none")
        $(".btn-start").removeClass("d-none").addClass("d-flex");
        $(".btn-transmitir").removeClass("d-flex").addClass("d-none");
        $(".btn-transmitir").prop("disabled", false);

        video.srcObject = null;
        isLive = false;
        stopped = true;
        mediaRecorder.stop();

        updateLink(false)
    }
}

var start = function () {
    if (navigator.mediaDevices.getUserMedia) {
        var mediaConstraints = {
            //audio: !!navigator.mozGetUserMedia, // ffox-only
            audio: false,
            video: true // chrome too
        };
        navigator.getUserMedia(mediaConstraints, onMediaSuccess, onMediaError);
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


// LA MAGIA EMPIEZA ACA


function zeroPad(n, chars) {
    var s = '' + n;
    var l = s.length;
    return new Array(chars - l + 1).join('0') + s;
}

function send(url, blob) {
    try {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', url, true);
        xhr.responseType = 'text';
        xhr.setRequestHeader('Content-Type', 'video/webm');
        xhr.onload = function (e) {
            if (this.status === 200) {
                console.log(this.response);
                if (this.response.includes("got") && !$(".live-msg").hasClass("d-block")) {
                    if (isLive) {
                        if (!linkUpdated) {
                            updateLink(true);
                        }
                        else {
                            setStatus("live")
                        }
                    }
                    else
                        setStatus("novideo")
                }
            }
        };
        xhr.send(blob);
        xhr.onerror = function (e) {
            if (isLive)
                setStatus("error")
            else
                setStatus("novideo")
        }
    } catch (error) {
        if (isLive)
            setStatus("error")
        else
            setStatus("novideo")
    }
}

function updateLink(value) {
    const canalID = getQueryVariable("id");
    db.collection("canales").doc(canalID).update({
        cameraStream: value == true ? HOST + "/videos/" + canalID + "/playlist.m3u8" : null
    }).then(() => {
        if (value) {
            setStatus("live")
        }
        else {
            setStatus("novideo")
        }
    });
}

function makeABlob(text, blob) {
    var blobURL = URL.createObjectURL(blob);
    var aEl = document.createElement('a');
    aEl.appendChild(document.createTextNode(text));
    aEl.href = blobURL;
    document.body.appendChild(aEl);
}

function onMediaSuccess(stream) {
    var video = document.getElementById("video"),
        vendorURL = window.URL || window.webkitURL;
    video.srcObject = stream;

    $(".no-video-container").removeClass("d-block").addClass("d-none")
    $(".video-outer").removeClass("d-none").addClass("d-block")
    $(".btn-start").removeClass("d-flex").addClass("d-none");
    $(".btn-transmitir").removeClass("d-none").addClass("d-flex");

    $(".btn-transmitir").on("click", function (e) {
        if (!isLive) {
            const canalID = getQueryVariable("id");
            $(".btn-transmitir").prop("disabled", true);
            db.collection("canales").doc(canalID).get().then((doc) => {
                if (doc.exists && doc.data().cameraStream && doc.data().cameraStream.toString().length) {
                    swal("Hay una transmisión previa en curso. Asegurate de que no haya otra persona transmitiendo", "Click en ELIMINAR para comenzar una nueva transmisión.", {
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
                                    db.collection("canales").doc(canalID).update({
                                        cameraStream: null
                                    }).then(() => {
                                        swal("Eliminaste la transmisión!", "Clickeá de nuevo en TRANSMITIR", "success")
                                        $(".btn-transmitir").prop("disabled", false);
                                    }).catch((error) => {
                                        swal("Ocurrió un error. Intentá nuevamente", "Revisá tu conexión", "error");
                                        $(".btn-transmitir").prop("disabled", false);
                                    });
                                    break;

                                default:
                                    break;
                            }
                        });
                }
                else {
                    console.log('will start capturing and sending ' + (DT / 1000) + 's videos when you press start');
                    //document.body.className = 'authorized';
                    mediaRecorder = new MediaStreamRecorder(stream);
                    mediaRecorder.mimeType = 'video/webm';
                    mediaRecorder.start(DT);
                    var nombre = getQueryVariable("id");
                    mediaRecorder.ondataavailable = function (blob) {
                        var count2 = zeroPad(count, 5);
                        console.log('sending chunk ' + nombre + ' #' + count2 + '...');
                        send(HOST + '/chunk/' + nombre + '/' + count2 + (stopped ? '/finish' : ''), blob);
                        ++count;
                    };
                    if (!isLive) isLive = true;
                }
            })
        }
    });
}

function onMediaError(e) {
    $(".no-video-container").removeClass("d-none").addClass("d-block")
    $(".video-outer").removeClass("d-block").addClass("d-none")
    $(".btn-start").removeClass("d-none").addClass("d-flex");
    $(".btn-transmitir").removeClass("d-flex").addClass("d-none");
    console.log(e);
}

function setStatus(value) {
    if (value == "novideo") {
        $(".live-msg").removeClass("d-block").addClass("d-none");
        $(".novideo-msg").removeClass("d-none").addClass("d-block");
        $(".error-msg").removeClass("d-block").addClass("d-none");
    }
    else if (value == "live") {
        $(".live-msg").removeClass("d-none").addClass("d-block");
        $(".novideo-msg").removeClass("d-block").addClass("d-none");
        $(".error-msg").removeClass("d-block").addClass("d-none");
    }
    else if (value == "error") {
        $(".live-msg").removeClass("d-block").addClass("d-none");
        $(".novideo-msg").removeClass("d-block").addClass("d-none");
        $(".error-msg").removeClass("d-none").addClass("d-block");
    }

}