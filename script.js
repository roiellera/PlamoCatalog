async function fetchKits() {
  const response = await fetch('data/kits.json');
  const data = await response.json();
  return data.kits;
}

// Display Kits on Category Selection
async function loadKits(category) {
  closeModal(); // Automatically close modal when switching categories
  const kits = await fetchKits();
  const filteredKits = kits.filter(kit => kit.category === category);

  let kitsHtml = "";
  filteredKits.forEach(kit => {
    kitsHtml += `
      <div class="kit">
        <img src="images/${kit.image}" alt="${kit.name}" onclick="openModal('${kit.id}')">
        <h3>${kit.name}</h3>
        <p><strong>${kit.price}</strong></p>
      </div>
    `;
  });

  document.getElementById('kitsContainer').innerHTML = kitsHtml;
}

// Open Modal and Show Kit Details
async function openModal(kitId) {
  const kits = await fetchKits();
  const kit = kits.find(k => k.id === kitId);

  if (kit) {
    document.getElementById('kitDetails').innerHTML = `
      <h2>${kit.name}</h2>
      <img src="images/${kit.image}" alt="${kit.name}" width="300">
      <p><strong>Price:</strong> ${kit.price}</p>
      <p>${kit.description}</p>
    `;
    document.getElementById('kitModal').style.display = "flex";
  }
}

// Close Modal
function closeModal() {
  document.getElementById('kitModal').style.display = "none";
}

// Hide modal on page load
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById('kitModal').style.display = "none";
})

// 🟢 Search Function (NEW)
async function searchKits(query) {
  const searchResultsDiv = document.getElementById("searchResults");
  if (query.length === 0) {
    searchResultsDiv.style.display = "none";
    searchResultsDiv.innerHTML = "";
    return;
  }

  const kits = await fetchKits();
  const filteredKits = kits.filter(kit => kit.name.toLowerCase().includes(query.toLowerCase()));

  if (filteredKits.length === 0) {
    searchResultsDiv.innerHTML = "<div>No results found</div>";
    searchResultsDiv.style.display = "block";
    return;
  }

  let resultsHtml = "";
  filteredKits.forEach(kit => {
    resultsHtml += `<div onclick="selectKit('${kit.id}')">${kit.name}</div>`;
  });

  searchResultsDiv.innerHTML = resultsHtml;
  searchResultsDiv.style.display = "block";
}

// 🟢 Select Kit from Search Dropdown (NEW)
async function selectKit(kitId) {
  document.getElementById("searchResults").style.display = "none"; // Hide dropdown

  const kits = await fetchKits();
  const kit = kits.find(k => k.id === kitId);

  if (kit) {
    document.getElementById('kitsContainer').innerHTML = `
      <div class="kits">
        <div class="kit">
          <img src="images/${kit.image}" alt="${kit.name}">
          <h3>${kit.name}</h3>
          <p><strong>${kit.price}</strong></p>
          <p>${kit.description}</p>
        </div>
      </div>
    `;
  }
}

