(() => {
  const $ = (id) => document.getElementById(id);
  const logDialog = $("logDialog");
  const infoDialog = $("infoDialog");
  let points = 120, items = 12, kg = 3.4;
  const materials = {
    "Plastic bottle": { points: 10, kg: 0.03 },
    "Aluminium can": { points: 8, kg: 0.015 },
    "Paper bundle": { points: 5, kg: 0.2 },
    "Glass bottle": { points: 8, kg: 0.25 }
  };
  function update() {
    $("points").textContent = points;
    $("phonePoints").innerHTML = `${points} <small>pts</small>`;
    $("items").textContent = items;
    $("impactCount").textContent = `${kg.toFixed(2)} kg`;
    $("impactItems").textContent = items;
    $("impactPoints").textContent = points;
    $("impactKg").textContent = `${kg.toFixed(2)} kg`;
  }
  let toastTimer;
  function toast(message) {
    const el = $("toast"); el.textContent = message; el.classList.add("show");
    clearTimeout(toastTimer); toastTimer = setTimeout(() => el.classList.remove("show"), 2600);
  }
  function openLog(material) {
    if (material && materials[material]) $("material").value = material;
    logDialog.showModal();
  }
  $("openAdd").addEventListener("click", () => openLog());
  $("openAdd2").addEventListener("click", () => openLog());
  document.querySelectorAll("[data-quick]").forEach(btn => btn.addEventListener("click", () => openLog(btn.dataset.quick)));
  $("saveLog").addEventListener("click", () => {
    const select = $("material");
    const material = select.value;
    const qty = Math.max(1, Math.min(50, parseInt($("quantity").value, 10) || 1));
    points += materials[material].points * qty;
    items += qty;
    kg += materials[material].kg * qty;
    update(); logDialog.close(); $("quantity").value = 1;
    toast(`Added ${qty} ${qty === 1 ? "item" : "items"} — +${materials[material].points * qty} points!`);
  });
  const details = {
    "Community Market Hub": "Sample drop-off point for plastic bottles, cans, and paper. A real version would show verified opening hours, directions, accepted materials, and contact details.",
    "Neighbourhood Collection Day": "Sample community collection event. A real version would allow organisers to publish confirmed dates, collection rules, and reminders.",
    "Green Corner School": "Sample partner location for paper, cardboard, and selected plastics. Partner details and material rules would be confirmed before launch."
  };
  document.querySelectorAll("[data-location]").forEach(btn => btn.addEventListener("click", () => {
    $("infoTitle").textContent = btn.dataset.location;
    $("infoBody").textContent = details[btn.dataset.location] || "Details would be verified before launch.";
    infoDialog.showModal();
  }));
  update();
})();