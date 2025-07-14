const materias = [
  // PRIMER TRAMO
  { id: "algebra", nombre: "Álgebra", correlativas: [] },
  { id: "analisis1", nombre: "Análisis Matemático", correlativas: [] },
  { id: "economia", nombre: "Economía", correlativas: [] },
  { id: "historia", nombre: "Historia Ec. y Social", correlativas: [] },
  { id: "contable", nombre: "Análisis Contable", correlativas: [] },
  { id: "instituciones", nombre: "Inst. Gob. y Ec. Pol.", correlativas: [] },

  // SEGUNDO TRAMO
  { id: "estadistica1", nombre: "Análisis Estadístico 1", correlativas: ["algebra","analisis1","economia","historia","contable","instituciones"] },
  { id: "matematica1", nombre: "Matemática Aplicada 1", correlativas: ["algebra","analisis1","economia","historia","contable","instituciones"] },
  { id: "macro1", nombre: "Macroeconomía 1", correlativas: ["algebra","analisis1","economia","historia","contable","instituciones"] },
  { id: "sistemas", nombre: "Sistemas Administrativos", correlativas: ["algebra","analisis1","economia","historia","contable","instituciones"] },
  { id: "derecho", nombre: "Derecho Empresarial", correlativas: ["algebra","analisis1","economia","historia","contable","instituciones"] },

  // CICLO PROFESIONAL
  { id: "estadistica2", nombre: "Análisis Estadístico 2", correlativas: ["estadistica1","matematica1"] },
  { id: "matematica2", nombre: "Matemática Aplicada 2", correlativas: ["matematica1"] },
  { id: "micro", nombre: "Microeconomía", correlativas: ["financiera"] },
  { id: "financiero", nombre: "Derecho Financiero", correlativas: ["derecho"] },
  { id: "computacion", nombre: "Computación Científica", correlativas: ["estadistica1","matematica1"] },
  { id: "financiera", nombre: "Matemática Financiera y Actuarial", correlativas: ["estadistica1","matematica1"] },
  { id: "numerico", nombre: "Análisis Numérico", correlativas: ["matematica2"] },
  { id: "bancos", nombre: "Dinero y Bancos", correlativas: ["financiera","estadistica2"] },
  { id: "actuarial", nombre: "Estadística Actuarial", correlativas: ["matematica2","estadistica2"] },
  { id: "biometria", nombre: "Biometría Actuarial", correlativas: ["financiera","actuarial","numerico"] },
  { id: "act1", nombre: "Seguros Personales (Act 1)", correlativas: ["biometria"] },
  { id: "act2", nombre: "Seguros Personales (Act 2)", correlativas: ["financiera","actuarial","numerico"] },
  { id: "act4", nombre: "Seguros Personales (Act 4)", correlativas: ["act1"] },
  { id: "act3", nombre: "Seguros Personales (Act 3)", correlativas: ["act1","act2"] },
  { id: "act5", nombre: "Inversiones y Financiamiento (Act 5)", correlativas: ["financiera","actuarial"] },
  { id: "modelos", nombre: "Modelos y Proyecciones", correlativas: ["act3","act5","computacion"] },

  // PRÁCTICA PROFESIONAL
  { id: "practica", nombre: "Práctica Profesional de Actuario", correlativas: ["act1"] }
];

const container = document.getElementById('materias-container');
let aprobadas = new Set();

function puedeHabilitar(m) {
  return m.correlativas.every(id => aprobadas.has(id));
}

function renderMaterias() {
  container.innerHTML = "";
  materias.forEach(m => {
    const div = document.createElement("div");
    div.classList.add("materia");
    if (aprobadas.has(m.id)) {
      div.classList.add("aprobada");
    } else if (puedeHabilitar(m)) {
      div.classList.add("activa");
      div.addEventListener("click", () => {
        aprobadas.add(m.id);
        renderMaterias();
      });
    }
    div.textContent = m.nombre;
    container.appendChild(div);
  });
}

renderMaterias();
