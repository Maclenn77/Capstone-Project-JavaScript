import './style.css';
import pokeAPI from './pokeAPIHandler.js';
import involvementAPI from './involvementAPIHandler.js';

const pokemonCardsSection = document.querySelector('.pokemon-cards');
const pageLinks = document.querySelectorAll('.page-link');
let pageNum = 1;
const pokemonsPerPage = 12;
const pokeDetails = document.querySelectorAll('.details');
const closeModalButtons = document.querySelectorAll('.close-button');
const overlay = document.getElementById('overlay');
const addComment = document.querySelector('#add-comment');
const modalComments = document.querySelector('.modal-comments');
let pokeIdForOpenedModal = null;
const number = document.querySelector('.number');
const header = document.createElement('h6');
const pokeImage = document.getElementById('pokeimage');
const alertMessage = document.getElementById('alert-message');

// Comments in the modal popup
const createComment = (comment) => {
  const line = document.createElement('hr');
  const date = document.createElement('span');
  date.classList = 'col-3 comment-date';
  date.textContent = `${comment.creation_date}`;
  const username = document.createElement('span');
  username.classList = 'col-3 comment-user';
  username.textContent = `${comment.username}`;
  const aComment = document.createElement('span');
  aComment.classList = 'col-6 comment';
  aComment.textContent = `${comment.comment}`;
  modalComments.appendChild(date);
  modalComments.appendChild(username);
  modalComments.appendChild(aComment);
  modalComments.appendChild(line);
};

async function displayComments(pokeID) {
  const itemComments = await involvementAPI.Comments(pokeID);
  const totalComments = await involvementAPI.totalComments(itemComments);
  modalComments.innerHTML = '';
  number.innerHTML = `${totalComments}`;
  header.classList = 'row';
  if (totalComments === 0) {
    header.innerHTML = '<span class=\'col-12 h6\'>No comments yet</span>';
    modalComments.appendChild(header);
  } else {
    header.innerHTML = '<span class=\'col-3 h6\'>Date</span><span class=\'col-3 h6\'>User</span><span class=\'col-6 h6\'>Comment</span>';
    modalComments.appendChild(header);
    itemComments.forEach((comment) => {
      createComment(comment);
    });
  }
}

function validateName() {
  const name = document.getElementById('username').value;
  if (name === '') {
    alertMessage.innerHTML = 'Name must be filled out';
    return false;
  }
  return true;
}

function validateComment() {
  const comment = document.getElementById('insights').value;
  if (comment === '') {
    alertMessage.innerHTML = 'Comment must be filled out';
    return false;
  }
  return true;
}

// Modal Functions

async function displayDetails(pokeID) {
  pokeDetails.forEach((span) => {
    span.innerHTML = 'Downloading info...';
  });
  let pokemon = await pokeAPI.aPokemon(pokeID);
  pokeImage.setAttribute('src', `${pokemon.image}`);
  pokeImage.setAttribute('alt', `A sprite of ${pokemon.name}`);
  pokemon = [`${pokemon.name}, # ${pokeID}`, pokemon.height, pokemon.weight, pokemon.types, pokemon.exp];
  let i = 0;
  pokeDetails.forEach((span) => {
    span.innerHTML = pokemon[i];
    i += 1;
  });
}

function openModal(modal, cardId) {
  if (modal == null) return;
  pokeIdForOpenedModal = cardId;
  modal.classList.add('active');
  overlay.classList.add('active');
  displayDetails(cardId);
  displayComments(cardId);
}

addComment.addEventListener('click', async (e) => {
  e.preventDefault();
  const validate = validateName() && validateComment();
  if (!validate) {
    return;
  }
  alertMessage.innerHTML = '';
  addComment.disabled = true;
  const username = document.getElementById('username').value;
  const insights = document.getElementById('insights').value;
  const response = await involvementAPI.postComment(pokeIdForOpenedModal, username, insights);
  document.querySelector('.comment-added-div').classList.add('active');
  setTimeout(() => {
    document.querySelector('.comment-added-div').classList.remove('active');
  }, 2000);
  header.innerHTML = '';
  header.innerHTML = '<span class=\'col-3 h6\'>Date</span><span class=\'col-3 h6\'>User</span><span class=\'col-6 h6\'>Comment</span>';
  displayComments(pokeIdForOpenedModal);
  if (response === true) {
    addComment.disabled = false;
  }
  document.getElementById('username').value = '';
  document.getElementById('insights').value = '';
});

function closeModal(modal) {
  if (modal == null) return;
  modal.classList.remove('active');
  overlay.classList.remove('active');
}

overlay.addEventListener('click', () => {
  const modals = document.querySelectorAll('.modal.active');
  modals.forEach((modal) => {
    closeModal(modal);
  });
});

closeModalButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const modal = button.closest('.modal');
    closeModal(modal);
  });
});

const createCard = (pokemonId, pokemon, likes = 0) => {
  const cardDiv = document.createElement('div');
  cardDiv.classList = 'card col-md-3 d-flex flex-column overflow-hidden';
  cardDiv.id = pokemonId;
  cardDiv.innerHTML = `
  <button class="position-absolute bg-dark rounded-circle heart-btn">
    <p class="text-white likes-counter fw-bold">${likes}</p>
    <i class="${likes > 0 ? 'fas' : 'far'} fa-heart"></i>
  </button>
  <img src="${pokeAPI.apiSpritesURL(pokemonId)}" class="card-img-top" alt="${
  pokemon.name
}'s image">
  <div class="card-body text-center mt-auto">
      <h4 class="card-title fs-4">${pokemon.name}</h4>
      <a class="btn btn-outline-primary commentButton">Comments</a>
  </div>
  `;
  cardDiv.querySelector('.commentButton').addEventListener('click', () => {
    const modal = document.querySelector('#modal');
    openModal(modal, cardDiv.id);
  });
  const LikesCounterDiv = cardDiv.querySelector('.likes-counter');
  const likeBtn = cardDiv.querySelector('.heart-btn');
  likeBtn.addEventListener('click', async () => {
    likeBtn.disabled = true;
    const response = await involvementAPI.postLike(cardDiv.id);
    if (await response) {
      likeBtn.disabled = false;
      LikesCounterDiv.textContent = parseInt(LikesCounterDiv.textContent, 10) + 1;
      LikesCounterDiv.nextElementSibling.classList.add('fas');
      LikesCounterDiv.nextElementSibling.classList.add('far');
    }
  });
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

const getLikesForCurrentPage = async (pageNumber) => {
  const result = await involvementAPI.getLikes().then((arr) => {
    const pokeIdInPageStart = (pageNumber * pokemonsPerPage) - pokemonsPerPage + 1;
    const pokeIdInPageEnd = pageNumber * pokemonsPerPage;
    return arr.filter((obj) => obj.item_id >= pokeIdInPageStart && obj.item_id <= pokeIdInPageEnd);
  });
  return result;
};

const renderUI = async (pageNumber) => {
  pokemonCardsSection.innerHTML = '';
  const likesArr = await getLikesForCurrentPage(pageNumber);
  pokeAPI.fetchPokemonsData(pageNumber, pokemonsPerPage).then((data) => {
    data.results.forEach((pokemon, index) => {
      let pokemonId = index + ((pageNumber - 1) * pokemonsPerPage) + 1;
      if (pokemonId >= 899) {
        pokemonId += 9102;
      }
      const likes = likesArr.find((obj) => obj.item_id === pokemonId)?.likes;
      const card = createCard(pokemonId, pokemon, likes);
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
pokeAPI.fetchPokemonsCount().then((data) => {
  document.querySelector('.pokemons-count').textContent = data;
});
