// Fetch kits.json clearly once and reuse
async function fetchKits() {
  const response = await fetch('data/kits.json');
  const data = await response.json();
  return data.kits;
}

// (NEW) Dynamically loads kits directly below categories on the homepage
async function loadKits(category) {
  const kits = await fetchKits();
  const filteredKits = kits.filter(kit => kit.category === category);

  let kitsHtml = "";

  filteredKits.forEach(kit => {
    kitsHtml += `
      <div class="kit">
        <img src="images/${kit.image}" alt="${kit.name}">
        <h3><a href="details.html?id=${kit.id}">${kit.name}</a></h3>
        <p><strong>${kit.price}</strong></p>
        <p>${kit.description}</p>
      </div>
    `;
  });

  if (filteredKits.length === 0) {
    kitsHtml = "<p>No kits available for this category.</p>";
  }

  document.getElementById('kitsContainer').innerHTML = kitsHtml;
}

// (Existing) Display category kits in table format (category.html)
async function displayCategoryAsTable() {
  const urlParams = new URLSearchParams(window.location.search);
  const category = urlParams.get('category');
  document.getElementById('categoryTitle').innerText = category + " Kits";

  const kits = await fetchKits();
  const filteredKits = kits.filter(kit => kit.category === category);

  let tableHtml = '<table><tr>';
  
  filteredKits.forEach((kit, index) => {
    tableHtml += `
      <td>
        <img src="images/${kit.image}" alt="${kit.name}" width="242" height="200"><br>
        <strong><a href="details.html?id=${kit.id}">${kit.name}</a></strong><br>
        ${kit.price}
      </td>
    `;
    if ((index + 1) % 5 === 0) tableHtml += '</tr><tr>';
  });

  const remainingCells = 5 - (filteredKits.length % 5);
  if (remainingCells < 5) {
    for (let i = 0; i < remainingCells; i++) {
      tableHtml += `<td></td>`;
    }
  }

  tableHtml += '</tr></table>';
  document.getElementById('kitList').innerHTML = tableHtml;
}

// (Existing) Display details page (details.html)
async function displayKitDetails() {
  const urlParams = new URLSearchParams(window.location.search);
  const kitId = urlParams.get('id');

  const kits = await fetchKits();
  const kit = kits.find(k => k.id === kitId);

  if (kit) {
    document.getElementById('kitDetails').innerHTML = `
      <h2>${kit.name}</h2>
      <img src="images/${kit.image}" alt="${kit.name}" width="300">
      <p><strong>Price:</strong> ${kit.price}</p>
      <p>${kit.description}</p>
    `;
  } else {
    document.getElementById('kitDetails').innerHTML = "<p>Kit not found.</p>";
  }
}
