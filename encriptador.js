const d = document;
const textarea = d.getElementById("miTextarea");
const muneco = d.getElementById("resultImg");
const carga = d.getElementById("carga");
const resultadotext = d.getElementById("result__text");
const resulttitle = d.getElementById("result__title");
const buttonencrip = d.getElementById("encriptarBtn");
const buttondesencrip = d.getElementById("desencriptarBtn");
const buttoncopiar = d.getElementById("copiarBtn");
const darkModeToggle = d.getElementById("darkModeToggle");

// Definición de las llaves de encriptación y desencriptación
const llaves = [
    ["e", "enter"],
    ["i", "imes"],
    ["a", "ai"],
    ["o", "ober"],
    ["u", "ufat"],
];

// Función para encriptar el mensaje
function encriptarMensaje(mensaje) {
    let mensajeEncriptado = "";
    for (let i = 0; i < mensaje.length; i++) {
        let letra = mensaje[i];
        let encriptada = letra;
        for (let j = 0; j < llaves.length; j++) {
            if (letra === llaves[j][0]) {
                encriptada = llaves[j][1];
                break;
            }
        }
        mensajeEncriptado += encriptada;
    }
    return mensajeEncriptado;
}

// Función para desencriptar el mensaje
function desencriptarMensaje(mensaje) {
    let mensajeDesencriptado = mensaje;
    for (let i = 0; i < llaves.length; i++) {
        let regex = new RegExp(llaves[i][1], "g");
        mensajeDesencriptado = mensajeDesencriptado.replace(regex, llaves[i][0]);
    }
    return mensajeDesencriptado;
}

// Maneja el evento 'input' en el textarea
textarea.addEventListener("input", () => {
    if (textarea.value.trim() !== "") {
        muneco.style.display = "none"; // Oculta la imagen
        carga.classList.remove("hidden"); // Muestra el loader
        resulttitle.textContent = "Capturando mensaje";
        resultadotext.textContent = "";
    } else {
        // Si el textarea está vacío, muestra la imagen y oculta el loader
        muneco.style.display = "block";
        carga.classList.add("hidden");
        resulttitle.textContent = "Ningún mensaje fue encontrado";
        resultadotext.textContent = "Ingresa el texto que deseas encriptar o desencriptar.";
        buttoncopiar.classList.add("hidden");
    }
});

// Maneja el evento 'click' en el botón de encriptar
buttonencrip.addEventListener("click", (e) => {
    e.preventDefault();
    let mensaje = textarea.value.toLowerCase().trim();
    if (mensaje) {
        let mensajeEncriptado = encriptarMensaje(mensaje);
        resultadotext.textContent = mensajeEncriptado;
        resulttitle.textContent = "El resultado es:";
        buttoncopiar.classList.remove("hidden");
        muneco.style.display = "none";
        carga.classList.add("hidden");
    } else {
        resulttitle.textContent = "Ningún mensaje fue encontrado";
        resultadotext.textContent = "Ingresa el texto que deseas encriptar o desencriptar.";
    }
});

// Maneja el evento 'click' en el botón de desencriptar
buttondesencrip.addEventListener("click", (e) => {
    e.preventDefault();
    let mensaje = textarea.value.toLowerCase().trim();
    if (mensaje) {
        let mensajeDesencriptado = desencriptarMensaje(mensaje);
        resultadotext.textContent = mensajeDesencriptado;
        resulttitle.textContent = "El resultado es:";
        buttoncopiar.classList.remove("hidden");
        muneco.style.display = "none";
        carga.classList.add("hidden");
    } else {
        resulttitle.textContent = "Ningún mensaje fue encontrado";
        resultadotext.textContent = "Ingresa el texto que deseas encriptar o desencriptar.";
    }
});

// Maneja el evento 'click' en el botón de copiar
buttoncopiar.addEventListener("click", () => {
    let textoCopiado = resultadotext.textContent;
    navigator.clipboard.writeText(textoCopiado).then(() => {
        resulttitle.textContent = "El texto se copió";
        muneco.style.display = "block";
        carga.classList.add("hidden");
    });
});

// Maneja el evento 'click' en el botón de modo oscuro
darkModeToggle.addEventListener("click", () => {
    d.body.classList.toggle("dark-mode");
});

