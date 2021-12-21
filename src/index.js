import _ from "lodash";
import "./style.css";
import pokeAPI from "./pokeAPIHandler";

const pokemonCardsSection = document.querySelector(".pokemon-cards");

pokeAPI.fetchPokemonsData().then((data) => {
  data.results.forEach((pokemon, index) => {
    const cardDiv = document.createElement("div");
    cardDiv.classList = "card col-md-3 d-flex flex-column";
    cardDiv.innerHTML = `
    <img src="${pokeAPI.apiSpritesURL(index + 1)}" class="card-img-top" alt="${
      pokemon.name
    }'s image">
    <div class="card-body text-center mt-auto">
        <h4 class="card-title fs-4">${pokemon.name}</h4>
        <a href="#" class="btn btn-outline-primary">Comments</a>
    </div>
    `;
    pokemonCardsSection.appendChild(cardDiv);
  });
});
