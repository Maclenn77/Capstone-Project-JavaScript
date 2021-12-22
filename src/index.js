import _ from 'lodash';
import './style.css';
import GET from './pokemon.js';

const pokeHeader = document.querySelector('.modal-header');
const openModalButtons = document.querySelectorAll('[data-modal-target]')
const closeModalButtons = document.querySelectorAll('[data-close-button]')
const overlay = document.getElementById('overlay')

function openModal(modal) {
  if (modal == null) return
  modal.classList.add('active')
  overlay.classList.add('active')
  displayDetails(3);
}

function closeModal(modal) {
  if (modal == null) return
  modal.classList.remove('active')
  overlay.classList.remove('active')
  pokeHeader.removeChild(pokeHeader.firstChild);
  pokeHeader.removeChild(pokeHeader.lastChild);
}

openModalButtons.forEach(button => {
    button.addEventListener('click', () => {
      const modal = document.querySelector(button.dataset.modalTarget)
      openModal(modal)
    })
  })
  
  overlay.addEventListener('click', () => {
    const modals = document.querySelectorAll('.modal.active')
    modals.forEach(modal => {
      closeModal(modal)
    })
  })
  
  closeModalButtons.forEach(button => {
    button.addEventListener('click', () => {
      const modal = button.closest('.modal')
      closeModal(modal)
    })
  })



async function displayDetails(pokeID) {
  let pokemon = await GET.aPokemon(pokeID);
  const pokeHeader = document.querySelector('.modal-header');
  const pokeDetails = document.querySelectorAll('span');
  pokeHeader.insertAdjacentHTML('beforeend',`<h2 class='col-12'>${pokemon.name.toUpperCase()}, #${pokeID}</p>`);
  pokeHeader.insertAdjacentHTML('afterbegin', `<img src='${pokemon.image}' alt='A sprite of ${pokemon.name}' class='col-10'>`);
  pokemon = [pokemon.height, pokemon.weight, pokemon.types, pokemon.exp];
  let i = -1;
  pokeDetails.forEach(span => {
      span.innerHTML = pokemon[i];
      i++;
  });
}
