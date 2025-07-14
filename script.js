const materias = [
  // Primer Tramo
  { id: "algebra", nombre: "Álgebra", correlativas: [], grupo: "tramo1" },
  { id: "analisis1", nombre: "Análisis Matemático", correlativas: [], grupo: "tramo1" },
  { id: "economia", nombre: "Economía", correlativas: [], grupo: "tramo1" },
  { id: "historia", nombre: "Historia Ec. y Social", correlativas: [], grupo: "tramo1" },
  { id: "contable", nombre: "Análisis Contable", correlativas: [], grupo: "tramo1" },
  { id: "instituciones", nombre: "Inst. Gob. y Ec. Pol.", correlativas: [], grupo: "tramo1" },

  // Segundo Tramo
  { id: "estadistica1", nombre: "Análisis Estadístico 1", correlativas: ["algebra","analisis1","economia","historia","contable","instituciones"], grupo: "tramo2" },
  { id: "matematica1", nombre: "Matemática Aplicada 1", correlativas: ["algebra","analisis1","economia","historia","contable","instituciones"], grupo: "tramo2" },
  { id: "macro1", nombre: "Macroeconomía 1", correlativas: ["algebra","analisis1","economia","historia","contable","instituciones"], grupo: "tramo2" },
  { id: "sistemas", nombre: "Sistemas Administrativos", correlativas: ["algebra","analisis1","economia","historia","contable","instituciones"], grupo: "tramo2" },
  { id: "derecho", nombre: "Derecho Empresarial", correlativas: ["algebra","analisis1","economia","historia","contable","instituciones"], grupo: "tramo2" },

  // Ciclo Profesional
  { id: "estadistica2", nombre: "Análisis Estadístico 2", correlativas: ["estadistica1","matematica1"], grupo: "tramo3" },
  { id: "matematica2", nombre: "Matemática Aplicada 2", correlativas: ["matematica1"], grupo: "tramo3" },
  { id: "micro", nombre: "Microeconomía", correlativas: ["financiera"], grupo: "tramo3" },
  { id: "financiero", nombre: "Derecho Financiero", correlativas: ["derecho"], grupo: "tramo3" },
  { id: "computacion", nombre: "Computación Científica", correlativas: ["estadistica1","matematica1"], grupo: "tramo3" },
  { id: "financiera", nombre: "Matemática Financiera y Actuarial", correlativas: ["estadistica1","matematica1"], grupo: "tramo3" },
  { id: "numerico", nombre: "Análisis Numérico", correlativas: ["matematica2"], grupo: "tramo3" },
  { id: "bancos", nombre: "Dinero y Bancos", correlativas: ["financiera","estadistica2"], grupo: "tramo3" },
  { id: "actuarial", nombre: "Estadística Actuarial", correlativas: ["matematica2","estadistica2"], grupo: "tramo3" },
  { id: "biometria", nombre: "Biometría Actuarial", correlativas: ["financiera","actuarial","numerico"], grupo: "tramo3" },
  { id: "act1", nombre: "Seguros Personales (Act 1)", correlativas: ["biometria"], grupo: "tramo3" },
  { id: "act2", nombre: "Seguros Personales (Act 2)", correlativas: ["financiera","actuarial","numerico"], grupo: "tramo3" },
  { id: "act4", nombre: "Seguros Personales (Act 4)", correlativas: ["act1"], grupo: "tramo3" },
  { id: "act3", nombre: "Seguros Personales (Act 3)", correlativas: ["act1","act2"], grupo: "tramo3" },
  { id: "act5", nombre: "Inversiones y Financiamiento (Act 5)", correlativas: ["financiera","actuarial"], grupo: "tramo3" },
  { id: "modelos", nombre: "Modelos y Proyecciones", correlativas: ["act3","act5","computacion"], grupo: "tramo3" },
  { id: "practica", nombre: "Práctica Profesional de Actuario", correlativas: ["act1"], grupo: "tramo3" }
];

let aprobadas = new Set();

// Cargar aprobadas desde localStorage
const guardado = localStorage.getItem('aprobadas');
if (guardado) {
  aprobadas = new Set(JSON.parse(guardado));
}

function puedeHabilitar(materia) {
  return materia.correlativas.every(id => aprobadas.has(id));
}

function guardarProgreso() {
  localStorage.setItem('aprobadas', JSON.stringify([...aprobadas]));
}

function renderMaterias() {
  // Limpiar todos los grupos
  document.querySelectorAll('.grupo').forEach(div => div.innerHTML = "");

  materias.forEach(m => {
    const div = document.createElement("div");
    div.classList.add("materia");

    if (aprobadas.has(m.id)) {
      div.classList.add("aprobada");
      div.addEventListener("click", () => {
        aprobadas.delete(m.id);
        guardarProgreso();
        renderMaterias();
      });
    } else if (puedeHabilitar(m)) {
      div.classList.add("activa");
      div.addEventListener("click", () => {
        aprobadas.add(m.id);
        guardarProgreso();
        renderMaterias();
      });
    }

    div.textContent = m.nombre;

    const grupoDiv = document.getElementById(m.grupo);
    grupoDiv.appendChild(div);
  });

  dibujarFlechas();
}

function dibujarFlechas() {
  const svg = document.getElementById('flechasSVG');
  svg.innerHTML = ''; // Limpiar flechas anteriores

  materias.forEach(m => {
    if (!puedeHabilitar(m)) return; // Solo dibujar si está habilitada o aprobada
    const nodoOrigen = document.querySelector(`.materia[data-id="${m.id}"]`);
    if (!nodoOrigen) return;

    m.correlativas.forEach(corrId => {
      const nodoDestino = document.querySelector(`.materia[data-id="${corrId}"]`);
      if (!nodoDestino) return;

      // Obtener posiciones
      const rectOrigen = nodoOrigen.getBoundingClientRect();
      const rectDestino = nodoDestino.getBoundingClientRect();

      // Coordenadas relativas al viewport
      const x1 = rectDestino.left + rectDestino.width / 2;
      const y1 = rectDestino.top + rectDestino.height / 2;
      const x2 = rectOrigen.left + rectOrigen.width / 2;
      const y2 = rectOrigen.top + rectOrigen.height / 2;

      // Crear línea con flecha
      const linea = document.createElementNS("http://www.w3.org/2000/svg", "line");
      linea.setAttribute("x1", x1);
      linea.setAttribute("y1", y1);
      linea.setAttribute("x2", x2);
      linea.setAttribute("y2", y2);
      linea.setAttribute("stroke", "#cc6699");
      linea.setAttribute("stroke-width", "2");
      linea.setAttribute("marker-end", "url(#flecha)");

      svg.appendChild(linea);
    });
  });
}

// Añadimos marker para flechas
function setupSVGMarkers() {
  const svg = document.getElementById('flechasSVG');
  const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
  const marker = document.createElementNS("http://www.w3.org/2000/svg", "marker");
  marker.setAttribute("id", "flecha");
  marker.setAttribute("markerWidth", "10");
  marker.setAttribute("markerHeight", "7");
  marker.setAttribute("refX", "0");
  marker.setAttribute("refY", "3.5");
  marker.setAttribute("orient", "auto");
  marker.setAttribute("fill", "#cc6699");

  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("d", "M0,0 L0,7 L10,3.5 z");

  marker.appendChild(path);
  defs.appendChild(marker);
  svg.appendChild(defs);
}

// Para que dibuje las flechas después de renderizar y también con un pequeño retraso para que se posicione bien

function renderMateriasConFlechas() {
  renderMaterias();
  setTimeout(dibujarFlechas, 100);
}

// Tema selector

const selectorTema = document.getElementById('temaSelector');
selectorTema.value = 'pastel'; // tema por defecto

function aplicarTema(tema) {
  document.body.classList.remove('tema-pastel', 'tema-oscuro', 'tema-minimalista');
  document.body.classList.add('tema-' + tema);
  // Actualizar color de flechas según tema
  const svg = document.getElementById('flechasSVG');
  const colorFlecha = tema === 'oscuro' ? '#f4c2c2' : '#cc6699';
  svg.querySelectorAll('line').forEach(line => {
    line.setAttribute('stroke', colorFlecha);
    line.setAttribute('fill', colorFlecha);
  });
}

// Cambiar tema al seleccionar

selectorTema.addEventListener('change', (e) => {
  aplicarTema(e.target.value);
});

// Inicialización

setupSVGMarkers();
aplicarTema(selectorTema.value);
renderMateriasConFlechas();
