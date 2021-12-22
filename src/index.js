import './style.css';
import pokeAPI from './pokeAPIHandler.js';

const pokemonCardsSection = document.querySelector('.pokemon-cards');
const pageLinks = document.querySelectorAll('.page-link');
let pageNum = 1;
const pokemonsPerPage = 12;

const createCard = (pokemonId, pokemon) => {
  const cardDiv = document.createElement('div');
  cardDiv.classList = 'card col-md-3 d-flex flex-column overflow-hidden';
  cardDiv.id = pokemonId;
  cardDiv.innerHTML = `
  <button class="position-absolute bg-dark rounded-circle heart-btn">
    <p class="text-white">0</p>
    <i class="far fa-heart"></i>
  </button>
  <img src="${pokeAPI.apiSpritesURL(pokemonId)}" class="card-img-top" alt="${
  pokemon.name
}'s image">
  <div class="card-body text-center mt-auto">
      <h4 class="card-title fs-4">${pokemon.name}</h4>
      <a href="#" class="btn btn-outline-primary">Comments</a>
  </div>
  `;
  return cardDiv;
};

const changeLinks = (currentPage) => {
  const pageNumbersElements = [...pageLinks].filter((link) => !link.classList.contains('next-page') && !link.classList.contains('previous-page'));
  pageNumbersElements.forEach((link) => link.parentNode.classList.remove('active'));
  currentPage = parseInt(currentPage, 10);
  const pageArr = [];
  for (let i = currentPage - 3; i < currentPage + 4; i += 1) {
    pageArr.push(i);
  }
  if (pageArr[0] < 1) {
    pageArr.forEach((_, index) => { pageArr[index] = index + 1; });
  }
  if (pageArr[pageArr.length - 1] > 94) {
    const firstPageNum = 88;
    pageArr.forEach((_, index) => { pageArr[index] = firstPageNum + index; });
  }
  if (pageArr[0] > 1) {
    pageArr[0] = '...';
  }
  if (pageArr[pageArr.length - 1] < 94) {
    pageArr[pageArr.length - 1] = '...';
  }
  pageNumbersElements.forEach((link, index) => { link.textContent = pageArr[index]; });
  const currentPageElement = pageNumbersElements.find((link) => {
    link = parseInt(link.textContent, 10);
    return link === currentPage;
  });
  currentPageElement.parentNode.classList.add('active');
};

const renderUI = (pageNumber) => {
  pokemonCardsSection.innerHTML = '';
  pokeAPI.fetchPokemonsData(pageNumber).then((data) => {
    data.results.forEach((pokemon, index) => {
      let pokemonId = index + ((pageNumber - 1) * pokemonsPerPage) + 1;
      if (pokemonId >= 899) {
        pokemonId += 9102;
      }
      const card = createCard(pokemonId, pokemon);
      pokemonCardsSection.appendChild(card);
    });
  });
  changeLinks(pageNumber);
};

// Pagination
pageLinks.forEach((pageLink) => {
  pageLink.addEventListener('click', (e) => {
    let pageChanged = false;
    if (e.target.textContent === 'Next' && pageNum < 94) {
      pageNum += 1;
      pageChanged = true;
    } else if (e.target.textContent === 'Previous' && pageNum > 1) {
      pageNum -= 1;
      pageChanged = true;
    } else if (e.target.textContent !== '...' && e.target.textContent !== 'Next' && e.target.textContent !== 'Previous') {
      pageNum = parseInt(e.target.textContent, 10);
      pageChanged = true;
    }
    if (pageChanged) {
      renderUI(pageNum);
    }
  });
});

renderUI(pageNum);
