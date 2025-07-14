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

function puedeHabilitar(materia) {
  return materia.correlativas.every(id => aprobadas.has(id));
}

function renderMaterias() {
  // Limpiar todos los grupos
  document.querySelectorAll('.grupo').forEach(div => div.innerHTML = "");

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

    const grupoDiv = document.getElementById(m.grupo);
    grupoDiv.appendChild(div);
  });
}

renderMaterias();
