// Boton para tomar la foto
var btnCapture = document.getElementById("btn-capture");

// Relacion de los elementos
var snapshot = document.getElementById("snapshot");

// Variable para el stream del video
var cameraStream = null;

// Agregar los Listeners
btnCapture.addEventListener("click", captureSnapshot);

//Abrir la camara al iniciar la pagina
window.onload = (event) => {
    startStreaming();
};

// Comenzar a visualizar la camara
function startStreaming() {

    var mediaSupport = 'mediaDevices' in navigator;

    if (mediaSupport && null == cameraStream) {

        navigator.mediaDevices.getUserMedia({ video: true })
            .then(function(mediaStream) {

                cameraStream = mediaStream;

                stream.srcObject = mediaStream;

                stream.play();
            })
            .catch(function(err) {

                console.log("No se puede acceder la camara: " + err);
            });
    } else {

        alert('Su navegador no soporta la funcionalidad de camara.');

        return;
    }
}

// Parar la camara
function stopStreaming() {

    if (null != cameraStream) {

        var track = cameraStream.getTracks()[0];

        track.stop();
        stream.load();

        cameraStream = null;
    }
}

//Capturar una foto, llamar al API y analizar respuesta
function captureSnapshot() {

    snap();

}

function snap() {
    if (null != cameraStream) {
        var ctx = capture.getContext('2d');
        var img = new Image();

        ctx.drawImage(stream, 0, 0, capture.width, capture.height);

        img.src = capture.toDataURL("image/png");
        img.width = 240;

        snapshot.innerHTML = '';
        snapshot.appendChild(img);
        llamadoApi(img.src);
    }

}


function llamadoApi(imagen) {
    //Pon aqui el api key y el api secret de tu cuenta
    var facepp = new FACEPP("APIKEY", "APISECRET", 1);
    var imageData = facepp.dataURItoBlob(imagen);
    //Escoge los paramatros que deseas obtener
    var attributes = 'emotion,age,gender';
    var dataDic = { 'image_file': imageData, 'return_landmark': 2, 'return_attributes': attributes };
    facepp.detectFace(dataDic);
}