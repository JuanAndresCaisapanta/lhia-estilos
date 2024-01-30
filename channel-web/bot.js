window.botpressWebChat.init({
  host: "https://lhia-bp.tws2.io/",
  botId: "lhia-jardin-azuayo-socio",
  stylesheet: "https://lhia-estilos.vercel.app/channel-web/default.css",
  composerPlaceholder: "Consulta a Jarvi",
  showTimestamp: true,
  hideWidget: true,
});
window.addEventListener("message", (event) => {
  if (event.data && event.data.name === "webchatReady") {
    window.botpressWebChat.sendEvent({
      type: "proactive-trigger",
      channel: "web",

      payload: {
        type: "text",
        text: "hola",
      },
    });
  }
});
document.addEventListener("DOMContentLoaded", function () {
  const img = document.createElement("img");
  img.id = "draggableButtonJarvi";
  img.src = "https://jaiser.jardinazuayo.fin.ec/cb1/assets/modules/channel-web/images/movimiento.gif";
  img.alt = "Botón Animado";
  img.style.cssText = `
position: fixed;
cursor: move;
user-select: none;
width: 250px;
height: 150px;
bottom: 0;
right: 0;
`;

  // Función para obtener las posiciones guardadas
  function getSavedPosition() {
    const savedPosition = localStorage.getItem("buttonPosition");
    if (savedPosition) {
      const { left, top } = JSON.parse(savedPosition);
      img.style.left = left;
      img.style.top = top;
    }
  }

  let offsetX, offsetY;

  function startDragJarvi(e) {
    e.preventDefault();
    const { left, top } = img.getBoundingClientRect();
    offsetX = e.clientX - left;
    offsetY = e.clientY - top;

    document.addEventListener("mousemove", dragMoveJarvi);
    document.addEventListener("mouseup", dragEndJarvi);
  }

  function dragMoveJarvi(e) {
    const newX = e.clientX - offsetX;
    const newY = e.clientY - offsetY;
    img.style.left = `${newX}px`;
    img.style.top = `${newY}px`;

    // Guardar las posiciones mientras se mueve
    localStorage.setItem("buttonPosition", JSON.stringify({ left: img.style.left, top: img.style.top }));
  }

  function dragEndJarvi() {
    document.removeEventListener("mousemove", dragMoveJarvi);
    document.removeEventListener("mouseup", dragEndJarvi);
  }

  function showChatJarvi() {
    window.botpressWebChat.sendEvent({ type: "show" });
  }

  // Mostrar la imagen y cargar las posiciones guardadas
  document.body.appendChild(img);
  getSavedPosition();

  // Agregar eventos de arrastrar y soltar
  img.addEventListener("mousedown", startDragJarvi);
  img.addEventListener("dblclick", showChatJarvi);
});
