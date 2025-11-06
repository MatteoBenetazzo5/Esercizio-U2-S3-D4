// KEY DI PEXELS
const API_KEY = "gv3NCzdr96ZEHBrZsbI9IlJWzsxEKaATUpl8D8wBIB6SeraNFLwh0xPt";
const API_BASE = "https://api.pexels.com/v1";
const headers = { Authorization: API_KEY };

// RIFERIMENTI AL DOM
const grid = document.getElementById("grid");
const btnLoad = document.getElementById("btn-load");
const btnLoadSecondary = document.getElementById("btn-load-secondary");
const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");

// GET--> search con query
const loadImages = function (query) {
  const url = `${API_BASE}/search?query=${encodeURIComponent(query)}&per_page=12`;
  fetch(url, {headers})
    .then((res) => {
      if (res.ok) return res.json();
      throw new Error(`Errore nella risposta ricevuta dal server: ${res.status}`);
    })
    .then((data) => {
      renderCards(data.photos);
    })
    .catch((err) => {
      console.log("PROBLEMA NEL RECUPERO DELLE IMMAGINI", err);
    });
};

// GRIGLIA CON LE CARD
const renderCards = function (photos) {
  grid.innerHTML = "";

  photos.forEach((photo) => {
    grid.innerHTML += `
      <div class="col-12 col-sm-6 col-md-4 col-lg-3">
        <div class="card h-100">
          <img src="${photo.src.medium}" class="card-img-top clickable" data-id="${photo.id}" alt="img">
          <div class="card-body">
            <h5 class="card-title clickable" data-id="${photo.id}">${photo.photographer}</h5>
            <p class="card-text"><small class="text-muted">ID: ${photo.id}</small></p>
            <button class="btn btn-danger btn-sm btn-hide">Hide</button>
          </div>
        </div>
      </div>
    `;
  });

  // LISTENERS 

  // Hide → rimuove l'intera card/colonna
  const allHideButtons = grid.querySelectorAll(".btn-hide");
  allHideButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      
      const col =
        e.currentTarget.closest(".col-12, .col-sm-6, .col-md-4, .col-lg-3") ||
        e.currentTarget.closest(".col");
      const target = col || e.currentTarget.closest(".card");
      if (target) target.remove();
    });
  });

  // pagina di dettaglio 
  const allClickables = grid.querySelectorAll(".clickable");
  allClickables.forEach((el) => {
    el.addEventListener("click", (e) => {
      const id = e.currentTarget.getAttribute("data-id");

      location.assign(`details.html?photoId=${id}`);
    });
  });
};

// --- BOTTONI CARICAMENTO RAPIDO ---
btnLoad.addEventListener("click", function () {
  loadImages("hamsters");
});

btnLoadSecondary.addEventListener("click", function () {
  loadImages("tigers");
});

// --- RICERCA ---


