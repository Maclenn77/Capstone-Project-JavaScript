import _ from 'lodash';
import './style.css';
import GET from './pokemon.js';

const pokeDetails = document.querySelector('.details');
const overlay = document.getElementById('overlay');
const commentButtons = document.querySelectorAll('[data-comment-target]');
const closeCommentButtons = document.querySelectorAll('[data-close-button]')

// commentButtons.forEach(button => {
//   button.addEventListener('click', () => {
//     const comment = document.querySelector(button.dataset.commentTarget)
//     openComment(comment)
//   })
// })

// overlay.addEventListener('click', () => {
//   const comments = document.querySelectorAll('.details.active')
//   comments.forEach(details => {
//     closeComment(details)
//   })
// })

// closeCommentButtons.forEach(button => {
//   button.addEventListener('click', () => {
//     const comment = button.closest('.details')
//     closeComment(comment)
//   })
// })

// function openComment(comment) {
//   if (comment == null) return
//   comment.classList.add('active')
//   overlay.classList.add('active')
// }

// function closeComment(comment) {
//     if (comment == null) return
//     comment.classList.remove('active')
//     overlay.classList.remove('active')
//   }

async function displayDetails(pokeID) {
  const pokemon = await GET.aPokemon(pokeID);
  pokeDetails.insertAdjacentHTML('beforeend', `<img src='${pokemon.image}' alt='A sprite of ${pokemon.name}' class='col-10'> <button data-close-button class="close-button col-2">&times;</button>`);
  pokeDetails.insertAdjacentHTML('beforeend', `<h2 class='col-12'>${pokemon.name.toUpperCase()}, #${pokeID}</p>`);
  pokeDetails.insertAdjacentHTML('beforeend', `<p class='col-6'>Height: ${pokemon.height}</p>`);
  pokeDetails.insertAdjacentHTML('beforeend', `<p class='col-6'>Weight: ${pokemon.weight}</p>`);
  pokeDetails.insertAdjacentHTML('beforeend', `<div class='w-100'></div>`);
  pokeDetails.insertAdjacentHTML('beforeend', `<p class='col-6'>Type: ${pokemon.types}</p>`);
  pokeDetails.insertAdjacentHTML('beforeend', `<p class='col-6'>Base Experience: ${pokemon.exp}</p>`);
}

displayDetails(679);
