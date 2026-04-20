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
    showNotice("Se abrió la sección solicitada para continuar con la demostración.");
  });
});

document.querySelectorAll("[data-demo-action]").forEach((button) => {
  button.addEventListener("click", () => {
    const actionMessages = {
      sync: "Los indicadores se actualizaron y quedaron alineados con los datos de muestra.",
      export: "Resumen ejecutivo generado y listo para compartir con el cliente.",
      "resolve-alerts": "Las alertas quedaron registradas como revisadas para continuar con la presentación.",
      "new-client": "La incorporación de clientes quedará disponible en la próxima iteración de la demostración.",
      "copy-link": "El vínculo de la demostración quedó listo para compartir.",
      "run-stock": "La validación de stock se ejecutó: PD-24018 quedó con entrega parcial confirmada.",
      "issue-invoice": "La factura se emitió correctamente. El pedido pasó a estado listo para despacho.",
      "send-reminder": "Recordatorio de cobranza enviado a los clientes seleccionados.",
      "open-report": "El informe quedó abierto para acompañar la conversación comercial con el cliente."
    };

    showNotice(actionMessages[button.dataset.demoAction] || "La acción de la demo se ejecutó correctamente.");
  });
});

document.querySelectorAll("[data-approval]").forEach((button) => {
  button.addEventListener("click", () => {
    const approved = button.dataset.approval === "approve";
    showNotice(
      approved
        ? "La autorización quedó registrada y el pedido ya puede avanzar a facturación."
        : "Se solicitó un ajuste comercial antes de autorizar el pedido."
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
    `Pedido de demostración generado para ${client}: ${quantity} unidades de ${product} registradas por ${seller}.`
  );
});
