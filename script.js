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

// Cargar materias aprobadas desde localStorage
const guardado = localStorage.getItem('aprobadas');
if (guardado) {
  aprobadas = new Set(JSON.parse(guardado));
}

// Verifica si una materia puede habilitarse
function puedeHabilitar(materia) {
  return materia.correlativas.every(id => aprobadas.has(id));
}

// Guarda en localStorage
function guardarProgreso() {
  localStorage.setItem('aprobadas', JSON.stringify([...aprobadas]));
}

// Renderiza todas las materias y aplica estilos según estado
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
}

// Selector de temas
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
aplicarTema(selectorTema.value);
renderMaterias();
