// Load kits.json
async function fetchKits() {
  const response = await fetch('data/kits.json');
  const data = await response.json();
  return data.kits;
}

// Display category page
async function displayCategoryAsTable() {
  const urlParams = new URLSearchParams(window.location.search);
  const category = urlParams.get('category');

  const kits = await fetchKits();
  const filteredKits = kits.filter(kit => kit.category === category);

  let tableHtml = '<table><tr>';

  if (filteredKits.length === 0) {
    document.getElementById('kitList').innerHTML = `<p>No kits available for ${category}.</p>`;
    return;
  }

  filteredKits.forEach((kit, index) => {
    tableHtml += `
      <td>
        <img src="images/${kit.image}" alt="${kit.name}" width="120"><br>
        <strong><a href="details.html?id=${kit.id}">${kit.name}</a></strong><br>
        Price: ${kit.price}
      </td>
    `;

    if ((index + 1) % 5 === 0 && index !== filteredKits.length - 1) {
      tableHtml += '</tr><tr>';
    }
  });

  tableHtml += '</tr></table>';
  document.getElementById('kitList').innerHTML = tableHtml;
}


// Display details page
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
      <p><strong>Description:</strong> ${kit.description}</p>
    `;
  } else {
    document.getElementById('kitDetails').innerHTML = "Kit not found.";
  }
}
