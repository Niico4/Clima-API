const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const form = document.querySelector('#formulario');

window.addEventListener('load', () => {
  form.addEventListener('submit', buscarClima);
});

function buscarClima(e) {
  e.preventDefault();

  // Validar
  const ciudad = document.querySelector('#ciudad').value;
  const pais = document.querySelector('#pais').value;

  if (ciudad === '' || pais === '') {
    // Hubo un error
    mostrarError('Ambos campos son obligatorios');
    return;
  }

  // Consultar API
  consultarAPI(ciudad, pais);
}

function mostrarError(mensaje) {
  const alerta = document.querySelector('.bg-red-100');
  if (!alerta) {
    // Crear Alerta
    const alerta = document.createElement('DIV');

    alerta.classList.add(
      'bg-red-100',
      'border-red-400',
      'text-red-700',
      'px-4',
      'py-3',
      'rounded',
      'max-w-md',
      'mx-auto',
      'mt-6',
      'text-center'
    );

    alerta.innerHTML = `
      <strong class="font-bold">Error!</strong>
      <span class="block">${mensaje}</span>
    `;

    container.appendChild(alerta);

    // Eliminar alerta despues de 5s
    setTimeout(() => {
      alerta.remove();
    }, 5000);
  }
}

function consultarAPI(ciudad, pais) {
  const appId = 'cd7dfe6b89c19cfc10823a6181f5523b';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&units=metric&appid=${appId}`;

  Spinner(); // Mostrar el Spinner de carga

  fetch(url)
    .then((respuesta) => respuesta.json())
    .then((datos) => {
      // Limpiar el HTML previo
      limpiarHTML();

      if (datos.cod === '404') {
        mostrarError('Ciudad no encontrada');
        return;
      }

      // Imprime respuesta en HTML
      mostrarClima(datos);
    });
}

function mostrarClima(datos) {
  const {
    name,
    main: { temp, temp_max, temp_min },
  } = datos;

  const nombreCiudad = document.createElement('P');
  nombreCiudad.textContent = `Clima en ${name}`;
  nombreCiudad.classList.add('font-bold', 'text-2xl');

  const actual = document.createElement('P');
  actual.innerHTML = `${temp} &#8451;`;
  actual.classList.add('font-bold', 'text-6xl');

  const tempMax = document.createElement('P');
  tempMax.innerHTML = `Temperatura Máxima: ${temp_max} &#8451;`;
  tempMax.classList.add('text-xl');

  const tempMin = document.createElement('P');
  tempMin.innerHTML = `Temperatura Mínima: ${temp_min} &#8451;`;
  tempMin.classList.add('text-xl');

  const resultadoDiv = document.createElement('DIV');
  resultadoDiv.classList.add('text-center', 'text-white');
  resultadoDiv.appendChild(nombreCiudad);
  resultadoDiv.appendChild(actual);
  resultadoDiv.appendChild(tempMax);
  resultadoDiv.appendChild(tempMin);

  resultado.appendChild(resultadoDiv);
}

function limpiarHTML() {
  while (resultado.firstChild) {
    resultado.removeChild(resultado.firstChild);
  }
}

function Spinner() {
  limpiarHTML();

  const divSpinner = document.createElement('DIV');
  divSpinner.classList.add('sk-fading-circle');
  divSpinner.innerHTML = `
    <div class="sk-circle1 sk-circle"></div>
    <div class="sk-circle2 sk-circle"></div>
    <div class="sk-circle3 sk-circle"></div>
    <div class="sk-circle4 sk-circle"></div>
    <div class="sk-circle5 sk-circle"></div>
    <div class="sk-circle6 sk-circle"></div>
    <div class="sk-circle7 sk-circle"></div>
    <div class="sk-circle8 sk-circle"></div>
    <div class="sk-circle9 sk-circle"></div>
    <div class="sk-circle10 sk-circle"></div>
    <div class="sk-circle11 sk-circle"></div>
    <div class="sk-circle12 sk-circle"></div>
  `;

  resultado.appendChild(divSpinner);
}
