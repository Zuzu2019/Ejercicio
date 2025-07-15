document.addEventListener('DOMContentLoaded', () => {
  fetch('data.csv')
    .then(res => res.text())
    .then(csv => {
      const data = parseCSV(csv);
      renderPersonas(data);
      setupSearch(data);
    });
});

function parseCSV(csv) {
  const lines = csv.trim().split('\n');
  const headers = lines[0].split(',');
  return lines.slice(1).map(line => {
    const values = line.split(',');
    return Object.fromEntries(headers.map((h, i) => [h.trim(), values[i].trim()]));
  });
}

function renderPersonas(data) {
  const container = document.getElementById('lista-personas');
  container.innerHTML = '';

  data.slice(0, 50).forEach((persona, index) => {
    const card = document.createElement('div');
    card.className = 'col';
    card.innerHTML = `
      <div class="card h-100" onclick="mostrarDetalle(${index})">
        <div class="card-body">
          <h5 class="card-title">${persona["Nombre completo"]}</h5>
        </div>
      </div>
    `;
    container.appendChild(card);
  });

  // Guardar datos globales
  window._personas = data;
}

function mostrarDetalle(index) {
  const p = window._personas[index];

  document.getElementById("modalNombre").textContent = p["Nombre completo"];
  document.getElementById("modalEdad").textContent = p["Edad"];
  document.getElementById("modalSexo").textContent = p["Sexo"];
  document.getElementById("modalOcupacion").textContent = p["Ocupación"];
  document.getElementById("modalNivel").textContent = p["Nivel de estudios"];
  

  document.getElementById("modal").style.display = "block";



  document.getElementById("cerrarModal").onclick = () => {
    document.getElementById("modal").style.display = "none";
  }

  //alert(`Nombre: ${p["Nombre completo"]}\nEdad: ${p["Edad"]}\nSexo: ${p["Sexo"]}\nOcupación: ${p["Ocupación"]}\nNivel: ${p["Nivel de estudios"]}`);
}

function setupSearch(data) {
  const input = document.getElementById('buscador');
  input.addEventListener('input', () => {
    const filtro = input.value.toLowerCase();
    const filtrados = data.filter(p => p["Nombre completo"].toLowerCase().includes(filtro));
    renderPersonas(filtrados);
  });
}
