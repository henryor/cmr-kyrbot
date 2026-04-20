const tabs = document.querySelectorAll(".nav-tab");
const panels = document.querySelectorAll(".tab-panel");
const notice = document.getElementById("notice");
const orderForm = document.getElementById("order-form");

function showNotice(message) {
  notice.textContent = message;
  notice.classList.remove("hidden");

  window.clearTimeout(showNotice.timeoutId);
  showNotice.timeoutId = window.setTimeout(() => {
    notice.classList.add("hidden");
  }, 2800);
}

function activateTab(tabId) {
  tabs.forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.tab === tabId);
  });

  panels.forEach((panel) => {
    panel.classList.toggle("active", panel.id === tabId);
  });
}

tabs.forEach((tab) => {
  tab.addEventListener("click", () => activateTab(tab.dataset.tab));
});

document.querySelectorAll("[data-focus-tab]").forEach((button) => {
  button.addEventListener("click", () => {
    activateTab(button.dataset.focusTab);
    showNotice("Se abrio la seccion solicitada para continuar la demo.");
  });
});

document.querySelectorAll("[data-demo-action]").forEach((button) => {
  button.addEventListener("click", () => {
    const actionMessages = {
      sync: "Sync demo ejecutado. Los indicadores quedaron actualizados con datos mock.",
      export: "Se genero un resumen demo listo para compartir con el cliente.",
      "resolve-alerts": "Las alertas fueron marcadas como revisadas para la demo.",
      "new-client": "Formulario demo de alta de cliente disponible en la siguiente iteracion.",
      "copy-link": "Enlace demo copiado al portapapeles simulado.",
      "run-stock": "Validacion de stock ejecutada: PD-24018 quedo con entrega parcial confirmada.",
      "issue-invoice": "Factura demo emitida. El pedido paso a estado listo para despacho.",
      "send-reminder": "Recordatorio de cobranza enviado a los clientes seleccionados.",
      "open-report": "Reporte demo abierto. Ideal para contar la historia comercial al cliente."
    };

    showNotice(actionMessages[button.dataset.demoAction] || "Accion demo ejecutada.");
  });
});

document.querySelectorAll("[data-approval]").forEach((button) => {
  button.addEventListener("click", () => {
    const approved = button.dataset.approval === "approve";
    showNotice(
      approved
        ? "Aprobacion registrada. El pedido ya puede avanzar a facturacion."
        : "Se solicito ajuste comercial antes de aprobar el pedido."
    );
  });
});

orderForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(orderForm);
  const client = formData.get("cliente");
  const seller = formData.get("vendedor");
  const product = formData.get("producto");
  const quantity = formData.get("cantidad");

  showNotice(
    `Pedido demo generado para ${client}: ${quantity} unidades de ${product} cargadas por ${seller}.`
  );
});
