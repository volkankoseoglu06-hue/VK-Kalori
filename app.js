const $ = (id) => document.getElementById(id);

let s = JSON.parse(localStorage.getItem("vk")) || {
  cal: 0,
  pro: 0,
  water: 0,
  sport: 0,

  goals: {
    cal: 2200,
    pro: 160,
    water: 3
  },

  daily: [],
  history: [],
  custom: []
};

function save() {
  localStorage.setItem("vk", JSON.stringify(s));
}

function updateHome() {
  $("cCal").textContent = s.cal;
  $("cPro").textContent = s.pro;
  $("cWater").textContent = s.water.toFixed(1);

  $("tCal").textContent = s.goals.cal;
  $("tPro").textContent = s.goals.pro;
  $("tWater").textContent = s.goals.water;

  renderDaily();
  renderHistory();
}

function renderDaily() {
  const daily = $("daily");

  daily.innerHTML = "";

  if (s.daily.length === 0) {
    daily.innerHTML = "<div>Bugün henüz kayıt yok.</div>";
    return;
  }

  s.daily.forEach((item, index) => {
    const div = document.createElement("div");

    div.className = "daily-item";

    div.innerHTML = `
      ${item.text}
      <button onclick="deleteDaily(${index})">
        ❌ Sil
      </button>
    `;

    daily.appendChild(div);
  });
}

window.deleteDaily = function (index) {
  s.daily.splice(index, 1);

  save();
  updateHome();
};

function renderHistory() {
  const history = $("historyList");

  history.innerHTML = "";

  if (s.history.length === 0) {
    history.innerHTML = "Henüz kayıt yok.";
    return;
  }

  s.history.forEach((item) => {
    const div = document.createElement("div");

    div.className = "history-item";

    div.innerHTML = item;

    history.appendChild(div);
  });
}

document.querySelectorAll("[data-tab]").forEach((button) => {
  button.onclick = () => {
    document.querySelectorAll("section").forEach((page) => {
      page.classList.remove("active");
    });

    document
      .getElementById(button.dataset.page || button.dataset.tab)
      .classList.add("active");
  };
});

function renderFoods(search = "") {
  const result = $("results");

  if (!result) return;

  const allFoods = [...foods, ...s.custom];

  const filtered = allFoods.filter((food) =>
    food.name.toLowerCase().includes(search.toLowerCase())
  );

  result.innerHTML = "";

  filtered.forEach((food) => {
    const div = document.createElement("div");

    div.className = "food-item";

    div.innerHTML = `
      <strong>${food.name}</strong><br>
      🔥 ${food.k || food.kcal} kcal<br>
      🥩 ${food.p || food.protein} g<br>
      <button onclick="addFood('${food.name}',${food.k || food.kcal},${food.p || food.protein})">
        ➕ Ekle
      </button>
    `;

    result.appendChild(div);
  });
}

window.addFood = function (name, kcal, protein) {
  s.cal += Number(kcal);
  s.pro += Number(protein);

  s.daily.push({
    text: `🍽️ ${name} - ${kcal} kcal - ${protein} g`
  });

  save();
  updateHome();
};

if ($("search")) {
  $("search").addEventListener("input", (e) => {
    renderFoods(e.target.value);
  });

  renderFoods();
}

if ($("saveFood")) {
  $("saveFood").onclick = () => {
    const name = $("nf").value;

    if (!name) return;

    s.custom.push({
      name: name,
      k: Number($("nk").value),
      p: Number($("np").value)
    });

    $("nf").value = "";
    $("nk").value = "";
    $("np").value = "";

    save();

    renderFoods();
  };
}

if ($("water")) {
  $("water").onclick = () => {
    s.water += 0.25;

    save();
    updateHome();
  };
}

if ($("calcSport")) {
  $("calcSport").onclick = () => {
    const duration = Number($("dur").value);

    const speed = Number($("spd").value);

    const incline = Number($("inc").value);

    const calories = Math.round(
      duration * speed * (1 + incline / 10)
    );

    $("sportResult").textContent =
      calories + " kcal";
  };
}

if ($("addSport")) {
  $("addSport").onclick = () => {
    const calories =
      parseInt($("sportResult").textContent) || 0;

    s.sport += calories;

    s.daily.push({
      text: `💪 Spor - ${calories} kcal`
    });

    save();
    updateHome();
  };
}

if ($("saveGoals")) {
  $("saveGoals").onclick = () => {
    s.goals.cal =
      Number($("goalCal").value) || s.goals.cal;

    s.goals.pro =
      Number($("goalPro").value) || s.goals.pro;

    s.goals.water =
      Number($("goalWater").value) || s.goals.water;

    save();
    updateHome();

    alert("Hedefler kaydedildi.");
  };
}

const finishButton = document.getElementById(
  "finishDayButton"
);

if (finishButton) {
  finishButton.onclick = () => {
    const today = new Date().toLocaleDateString(
      "tr-TR"
    );

    s.history.unshift(`
      <strong>${today}</strong><br>
      🔥 ${s.cal} kcal<br>
      🥩 ${s.pro} g<br>
      💧 ${s.water.toFixed(1)} L<br>
      💪 ${s.sport} kcal
    `);

    s.cal = 0;
    s.pro = 0;
    s.water = 0;
    s.sport = 0;

    s.daily = [];

    save();
    updateHome();
  };
}

updateHome();
