const btn = document.querySelector(".search button");
const search = document.querySelector(".search input");
const radios = document.querySelectorAll('input[type="radio"]');
const lang = document.getElementById("lang");
let products = [];

const tarjama = {
  en: ["All Products", "Best Seller", "Fashion", "jewelery", "Electronics"],
  fr: ["Tous les produits", "Meilleure vente", "Mode", "bijoux", "Électronique"],
  ar: ["كل المنتجات", "الأكثر مبيعًا", "الأزياء", "المجوهرات", "الإلكترونيات"],
};

fetch("./data.json")
  .then(res => res.json())
  .then(data => {
    products = data.products;
    show(products);
    console.log(products);
  });

function show(list) {
  const container = document.querySelector(".catalog");
  container.innerHTML = "";
  list.forEach(p => {
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `
      <img src="${p.image}" width="100" height="100">
      <h3>${p.name}</h3> 
      <p>${p.price} ₿</p>
    `;
    container.appendChild(div);
  });
}

btn.addEventListener("click", () => {
  const text = search.value.toLowerCase();
  show(products.filter(p => p.name.toLowerCase().includes(text)));
});

search.addEventListener("keypress", e => {
  if (e.key === "Enter") btn.click();
});

radios.forEach(radio => {
  radio.addEventListener("change", () => filterproducts());
});

function longlivalue(value) {
  const flatLabels = Object.values(tarjama).flat();
  const index = flatLabels.indexOf(value);
  if (index === -1) return value;
  return tarjama.en[index % 5];
}

function filterproducts() {
  const selected = longlivalue(Array.from(radios).find(r => r.checked).value).toLowerCase();
  let filtered = [];

  if (selected === "all products") {filtered = products;}
  else if (selected === "best seller") {filtered = products.filter(p => p.bestSeller);}
  else if (selected === "fashion") {filtered = products.filter(p => p.category === "fashion");}
  else if (selected === "jewelery") {filtered = products.filter(p => p.category === "jewelery");}
  else if (selected === "electronics") {filtered = products.filter(p => p.category === "electronics");}
  else {filtered = products;}
  show(filtered);
}
lang.addEventListener("change", () => {
  const language = lang.value;
  search.placeholder = language === "fr" ? "Nom du produit" : language === "ar" ? "اسم المنتج" : "Product name";

  radios.forEach((r, i) => {
    r.value = tarjama[language][i];
    r.nextElementSibling.textContent = tarjama[language][i];
  });
});
const dark = document.getElementById('dark');
dark.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  dark.classList.toggle('bx-moon');
  dark.classList.toggle('bx-sun');
});
