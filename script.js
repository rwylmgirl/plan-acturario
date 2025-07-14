const materias = [
  // PRIMER TRAMO
  { id: "algebra", nombre: "Álgebra", correlativas: [], grupo: "tramo1" },
  { id: "analisis1", nombre: "Análisis Matemático", correlativas: [], grupo: "tramo1" },
  { id: "economia", nombre: "Economía", correlativas: [], grupo: "tramo1" },
  { id: "historia", nombre: "Historia Ec. y Social", correlativas: [], grupo: "tramo1" },
  { id: "contable", nombre: "Análisis Contable", correlativas: [], grupo: "tramo1" },
  { id: "instituciones", nombre: "Inst. Gob. y Ec. Pol.", correlativas: [], grupo: "tramo1" },

  // SEGUNDO TRAMO
  { id: "estadistica1", nombre: "Análisis Estadístico 1", correlativas: ["algebra", "analisis1", "economia", "historia", "contable", "instituciones"], grupo: "tramo2" },
  { id: "matematica1", nombre: "Matemática Aplicada 1", correlativas: ["algebra", "analisis1", "economia", "historia", "contable", "instituciones"], grupo: "tramo2" },
  { id: "macro1", nombre: "Macroeconomía 1", correlativas: ["algebra", "analisis1", "economia", "historia", "contable", "instituciones"], grupo: "tramo2" },
  { id: "sistemas", nombre: "Sistemas Administrativos", correlativas: ["algebra", "analisis1", "economia", "historia", "contable", "instituciones"], grupo: "tramo2" },
  { id: "derecho", nombre: "Derecho Empresarial", correlativas: ["algebra", "analisis1", "economia", "historia", "contable", "instituciones"], grupo: "tramo2" },

  // CICLO PROFESIONAL
  { id: "estadistica2", nombre: "Análisis Estadístico 2", correlativas: ["estadistica1", "matematica1"], grupo: "tramo3" },
  { id: "matematica2", nombre: "Matemática Aplicada 2", correlativas: ["matematica1"], grupo: "tramo3" },
  { id: "financiera", nombre: "Matemática Financiera y Actuarial", correlativas: ["estadistica1", "matematica1"], grupo: "tramo3" },
  { id: "administracion", nombre: "Administración Financiera", correlativas: ["financiera"], grupo: "tramo3" },
  { id: "micro", nombre: "Microeconomía p/economistas", correlativas: ["matematica1"], grupo: "tramo3" },
  { id: "financiero", nombre: "Derecho Financiero, Seguros y Seg. Social", correlativas: ["macro1"], grupo: "tramo3" },
  { id: "computacion", nombre: "Computación Científica Actuarial", correlativas: ["estadistica1", "matematica1"], grupo: "tramo3" },
  { id: "numerico", nombre: "Análisis Numérico", correlativas: ["matematica2"], grupo: "tramo3" },
  { id: "bancos", nombre: "Dinero y Bancos", correlativas: ["administracion", "estadistica2"], grupo: "tramo3" },
  { id: "actuarial", nombre: "Estadística Actuarial", correlativas: ["matematica2", "estadistica2"], grupo: "tramo3" },
  { id: "biometria", nombre: "Biometría Actuarial", correlativas: ["financiera", "actuarial", "numerico"], grupo: "tramo3" },
  { id: "act1", nombre: "Teoría Actuarial Seg. Pers. (Act 1)", correlativas: ["biometria"], grupo: "tramo3" },
  { id: "act2", nombre: "Teoría Actuarial Seg. Pers. (Act 2)", correlativas: ["financiera", "actuarial", "numerico"], grupo: "tramo3" },
  { id: "act4", nombre: "Teoría Actuarial Seg. Pers. (Act 4)", correlativas: ["act1"], grupo: "tramo3" },
  { id: "act3", nombre: "Teoría Actuarial Seg. Pers. (Act 3)", correlativas: ["act1", "act2"], grupo: "tramo3" },
  { id: "act5", nombre: "Bases Actuariales Inversiones (Act 5)", correlativas: ["financiera", "actuarial"], grupo: "tramo3" },
  { id: "modelos", nombre: "Modelos y Proyecciones Actuariales", correlativas: ["act3", "act5", "computacion"], grupo: "tramo3" },
  { id: "practica", nombre: "Práctica Profesional del Actuario", correlativas: ["act1", "act2", "act4"], grupo: "tramo3" }
];

let aprobadas = new Set();

// LocalStorage: cargar
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
  document.querySelectorAll('.grupo').forEach(div => div.innerHTML = "");

  materias.forEach(m => {
    const div = document.createElement("div");
    div.classList.add("materia");
    div.setAttribute("data-id", m.id);

    if (aprobadas.has(m.id)) {
      div.classList.add("aprobada");
      div.addEventListener("click", () => {
        aprobadas.delete(m.id);
        guardarProgreso();
        renderMateriasConFlechas();
      });
    } else if (puedeHabilitar(m)) {
      div.classList.add("activa");
      div.addEventListener("click", () => {
        aprobadas.add(m.id);
        guardarProgreso();
        renderMateriasConFlechas();
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
  svg.innerHTML = ''; // Limpiar

  materias.forEach(m => {
    const origen = document.querySelector(`.materia[data-id="${m.id}"]`);
    if (!origen) return;

    m.correlativas.forEach(corr => {
      const destino = document.querySelector(`.materia[data-id="${corr}"]`);
      if (!destino) return;

      const r1 = origen.getBoundingClientRect();
      const r2 = destino.getBoundingClientRect();

      const x1 = r2.left + r2.width / 2;
      const y1 = r2.top + r2.height / 2;
      const x2 = r1.left + r1.width / 2;
      const y2 = r1.top + r1.height / 2;

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

function renderMateriasConFlechas() {
  renderMaterias();
  setTimeout(dibujarFlechas, 100);
}

// Cambiar tema

const selectorTema = document.getElementById('temaSelector');
selectorTema.value = 'pastel';

function aplicarTema(tema) {
  document.body.classList.remove('tema-pastel', 'tema-oscuro', 'tema-minimalista');
  document.body.classList.add('tema-' + tema);
}

selectorTema.addEventListener('change', (e) => {
  aplicarTema(e.target.value);
});

// Inicializar

setupSVGMarkers();
aplicarTema(selectorTema.value);
renderMateriasConFlechas();
