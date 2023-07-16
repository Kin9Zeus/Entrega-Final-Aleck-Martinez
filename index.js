class Moto {
    constructor(nombre, marca, precio, cilindraje, cilindros, torque, potencia) {
      this.nombre = nombre;
      this.marca = marca;
      this.precio = precio;
      this.cilindraje = cilindraje;
      this.cilindros = cilindros;
      this.torque = torque;
      this.potencia = potencia;
    }
}
  
const motos = [
    new Moto("MT07", "Yamaha", 57000000, "689 cc", 2, "67.0 Nm", "73.4 hp"),
    new Moto("Duke 890R", "KTM", 80000000, "889 cc", 2, "92.2 Nm", "119.3 hp"),
    new Moto("Monster", "Ducati", 98000000, "937 cc", 2, "93 Nm", "111 hp")
];
  
function mostrarInformacionMoto() {
    let motoSelect = document.getElementById("motoSelect");
    let precioContainer = document.getElementById("precioContainer");
    let caracteristicasContainer = document.getElementById("caracteristicasContainer");
    let motoSeleccionada = motoSelect.options[motoSelect.selectedIndex].text;
    let precio = obtenerPrecio(motoSeleccionada);
  
    precioContainer.innerHTML = "El precio de la moto seleccionada es: " + precio;
  
    mostrarCaracteristicas(motoSeleccionada, caracteristicasContainer);
}
  
function obtenerPrecio(motoSeleccionada) {
    let precio = 0;
    for (let i = 0; i < motos.length; i++) {
        if (motoSeleccionada.includes(motos[i].nombre)) {
            precio = motos[i].precio;
            break;
        }
    }
    return precio;
}
  
function mostrarCaracteristicas(motoSeleccionada, caracteristicasContainer) {
    caracteristicasContainer.innerHTML = "";
  
    for (let i = 0; i < motos.length; i++) {
        if (motoSeleccionada.includes(motos[i].nombre)) {
            let caracteristicas = document.createElement("ul");
            caracteristicas.innerHTML = `
                <li>Marca: ${motos[i].marca}</li>
                <li>Precio: ${motos[i].precio}</li>
                <li>Cilindraje: ${motos[i].cilindraje}</li>
                <li>Cilindros: ${motos[i].cilindros}</li>
                <li>Torque: ${motos[i].torque}</li>
                <li>Potencia: ${motos[i].potencia}</li>
            `;
            caracteristicasContainer.appendChild(caracteristicas);
            break;
        }
    }
}
  
function mostrarFormulario() {
    let formularioContainer = document.getElementById("formularioContainer");
    formularioContainer.innerHTML = `
        <h3 class="form-header">Completa tus datos personales:</h3>
        <form id="formulario" onsubmit="return validarFormulario()">
            <label for="nombre" class="form-label">Nombre completo:</label>
            <input type="text" id="nombre" required><br>
  
            <label for="email" class="form-label">Correo electrónico:</label>
            <input type="email" id="email" required><br>
  
            <label for="id" class="form-label">ID:</label>
            <input type="text" id="id" required minlength="10" pattern="[0-9]+"><br>
  
            <label for="edad" class="form-label">Edad:</label>
            <input type="number" id="edad" required min="18"><br>
  
            <label for="cuotas" class="form-label">Cuotas:</label>
            <select id="cuotas" class="form-select">
                <option value="6">6 cuotas</option>
                <option value="12">12 cuotas</option>
                <option value="24">24 cuotas</option>
                <option value="48">48 cuotas</option>
            </select><br>
  
            <input type="submit" value="Enviar" class="form-submit">
        </form>
    `;
}
  
function validarFormulario() {

    let nombreInput = document.getElementById("nombre");
    let emailInput = document.getElementById("email");
    let idInput = document.getElementById("id");
    let edadInput = document.getElementById("edad");
  
    let nombre = nombreInput.value.trim();
    let email = emailInput.value.trim();
    let id = idInput.value.trim();
    let edad = parseInt(edadInput.value);
  
    if (nombre === "" || email === "" || id === "" || isNaN(edad)) {
        alert("Por favor, completa todos los campos correctamente.");
        return false;
    }

    guardarDatosEnLocalStorage(nombre, email, id, edad);

    mostrarMensaje();

    console.log("Datos del formulario:");
    console.log(`Nombre: ${nombre}`);
    console.log(`Email: ${email}`);
    console.log(`ID: ${id}`);
    console.log(`Edad: ${edad}`);
    console.log("----");

    setTimeout(function() {
        location.reload();
    }, 5000);

    return true;
}

function mostrarMensaje() {
    let formularioContainer = document.getElementById("formularioContainer");
    formularioContainer.innerHTML = `
        <p>¡Datos enviados correctamente!</p>
    `;
}


function guardarDatosEnLocalStorage(nombre, email, id, edad) {
    localStorage.setItem('nombre', nombre);
    localStorage.setItem('email', email);
    localStorage.setItem('id', id);
    localStorage.setItem('edad', edad.toString());
}

const API_URL = "http://jsonplaceholder.typicode.com";

fetch(`${API_URL}/users`)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((data) => {
    console.log("Datos de la API:");
    for (const user of data) {
      console.log(`Nombre: ${user.name}`);
      console.log(`Usuario: ${user.username}`);
      console.log(`Email: ${user.email}`);
      console.log("----");
    }
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });