//Elementos para mostrar
var emocion = document.getElementById("emocion");

const FACE_FACEPP = "facepp/v3/";
const FACE_DETECT = FACE_FACEPP + "detect";

function FACEPP(apikey, apisecret) {

    this.apikey = apikey;
    this.apisecret = apisecret;
    this.baseurl = "https://api-us.faceplusplus.com/";


    this.detectFace = function(param) {
        var url = this.baseurl + FACE_DETECT;;
        this.request(url, param);
    };

    /* base64
     *
     */
    this.dataURItoBlob = function(dataURI) {
        const byteString = atob(dataURI.split(',')[1]);
        const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ab], { type: mimeString });
    }

    //POST

    this.request = function(url, dic) {

        const formData = new FormData();

        formData.append('api_key', this.apikey);
        formData.append('api_secret', this.apisecret);

        for (var key in dic) {
            formData.append(key, dic[key]);
        }

        $.ajax({
            url: url,
            type: 'POST',
            cache: false,
            data: formData,
            processData: false,
            contentType: false,
            timeout: 20000,
        }).done(AnalizarRespuestaAPI).fail();
    }
}

function AnalizarRespuestaAPI(respuesta) {;
    var rostros = respuesta.faces;
    rostros.forEach(element => emocion.innerHTML = interpretarEmociones(element.attributes.emotion));
    rostros.forEach(element => edad.innerHTML = element.attributes.age.value);
    rostros.forEach(element => genero.innerHTML = generoesp(element.attributes.gender.value));
}

function generoesp(gender) {

    if (gender == "Male") {
        return "Hombre";
    } else if (gender == "Female") {
        return "Mujer";
    } else {
        return "No es posible establecer el género";
    };

}


function interpretarEmociones(emociones) {

    var ira = emociones.anger;
    var asco = emociones.disgust;
    var temor = emociones.fear;
    var felicidad = emociones.happiness;
    var neutral = emociones.neutral;
    var tristeza = emociones.sadness;
    var sorpresa = emociones.surprise;

    return (
        "Ira: " + ira + "%, " +
        "Asco: " + asco + "%, " +
        "Temor: " + temor + "%, " +
        "Felicidad: " + felicidad + "%, " +
        "Neutral: " + neutral + "%, " +
        "Tristeza: " + tristeza + "%, " +
        "Sorpresa: " + sorpresa + "%, "
    );

}