const $ = (id) => document.getElementById(id);

let s = JSON.parse(
  localStorage.getItem("vk") ||
    '{"cal":0,"pro":0,"water":0,"sport":0,"goals":{"cal":2200,"pro":160,"water":3},"daily":[],"history":[],"custom":[]}'
);

function save() {
  localStorage.setItem("vk", JSON.stringify(s));
}

function draw() {
  $("cCal").textContent = s.cal;
  $("cPro").textContent = s.pro;
  $("cWater").textContent = s.water.toFixed(1);

  $("tCal").textContent = s.goals.cal;
  $("tPro").textContent = s.goals.pro;
  $("tWater").textContent = s.goals.water;

  $("daily").innerHTML = s.daily
    .map(
      (x, i) =>
        `<div>${x}
        <button onclick="delItem(${i})">
        Sil
        </button>
        </div>`
    )
    .join("");

  $("historyList").innerHTML = s.history.join("<hr>");
}

function delItem(i) {
  s.daily.splice(i, 1);
  save();
  draw();
}

document.querySelectorAll("[data-tab]").forEach((b) => {
  b.onclick = () => {
    document.querySelectorAll(".tab").forEach((t) => {
      t.classList.remove("active");
    });

    $(b.dataset.tab).classList.add("active");
  };
});

function render(v = "") {
  const all = [...foods, ...s.custom].filter((f) =>
    f.name.toLowerCase().includes(v.toLowerCase())
  );

  $("results").innerHTML = all
    .map(
      (f) =>
        `<div>
        ${f.name} - ${f.k} kcal - ${f.p} g protein
        <button onclick="addFood('${f.name}',${f.k},${f.p})">
        Ekle
        </button>
        </div>`
    )
    .join("");
}

window.addFood = (n, k, p) => {
  s.cal += k;
  s.pro += p;

  s.daily.push(n);

  save();
  draw();
};

$("search").oninput = (e) => {
  render(e.target.value);
};

render();

$("saveFood").onclick = () => {
  const f = {
    name: $("nf").value,
    k: +$("nk").value,
    p: +$("np").value,
  };

  if (f.name) {
    s.custom.push(f);

    save();
    render();

    $("nf").value = "";
    $("nk").value = "";
    $("np").value = "";
  }
};

$("water").onclick = () => {
  s.water += 0.25;

  save();
  draw();
};

$("calcSport").onclick = () => {
  const calorie = Math.round(
    +$("dur").value *
      +$("spd").value *
      (1 + +$("inc").value / 10)
  );

  $("sportResult").textContent =
    calorie + " kcal";
};

$("addSport").onclick = () => {
  const c =
    parseInt($("sportResult").textContent) || 0;

  s.sport = c;

  s.daily.push(
    "Spor - " + c + " kcal"
  );

  save();
  draw();
};

$("saveGoals").onclick = () => {
  s.goals = {
    cal:
      +$("goalCal").value ||
      s.goals.cal,

    pro:
      +$("goalPro").value ||
      s.goals.pro,

    water:
      +$("goalWater").value ||
      s.goals.water,
  };

  save();
  draw();
};

draw();
