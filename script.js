function renderMaterias() {
  // Limpiar todos los grupos
  document.querySelectorAll('.grupo').forEach(div => div.innerHTML = "");

  materias.forEach(m => {
    const div = document.createElement("div");
    div.classList.add("materia");

    if (aprobadas.has(m.id)) {
      div.classList.add("aprobada");
      // Al hacer click en aprobada, la desmarcamos
      div.addEventListener("click", () => {
        aprobadas.delete(m.id);
        renderMaterias();
      });
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
