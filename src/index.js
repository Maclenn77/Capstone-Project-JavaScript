import _ from 'lodash';
import './style.css';
import GET from './pokemon.js';

const pokeDetails = document.querySelector('.details');
const openModalButtons = document.querySelectorAll('[data-modal-target]')
const closeModalButtons = document.querySelectorAll('[data-close-button]')
const overlay = document.getElementById('overlay')

function openModal(modal) {
  if (modal == null) return
  modal.classList.add('active')
  overlay.classList.add('active')
}

function closeModal(modal) {
  if (modal == null) return
  modal.classList.remove('active')
  overlay.classList.remove('active')
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



// async function displayDetails(pokeID) {
//   const pokemon = await GET.aPokemon(pokeID);
//   pokeDetails.insertAdjacentHTML('beforeend', `<img src='${pokemon.image}' alt='A sprite of ${pokemon.name}' class='col-10'> <button data-close-button class="close-button col-2">&times;</button>`);
//   pokeDetails.insertAdjacentHTML('beforeend', `<h2 class='col-12'>${pokemon.name.toUpperCase()}, #${pokeID}</p>`);
//   pokeDetails.insertAdjacentHTML('beforeend', `<p class='col-6'>Height: ${pokemon.height}</p>`);
//   pokeDetails.insertAdjacentHTML('beforeend', `<p class='col-6'>Weight: ${pokemon.weight}</p>`);
//   pokeDetails.insertAdjacentHTML('beforeend', `<div class='w-100'></div>`);
//   pokeDetails.insertAdjacentHTML('beforeend', `<p class='col-6'>Type: ${pokemon.types}</p>`);
//   pokeDetails.insertAdjacentHTML('beforeend', `<p class='col-6'>Base Experience: ${pokemon.exp}</p>`);
// }

// displayDetails(679);
