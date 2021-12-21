const pokemonsPerPage = 12;
const apiURL = "https://pokeapi.co/api/v2/pokemon/";
const apiSpritesURL = (id) =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

const fetchPokemonsData = (offset = 0) =>
  fetch(`${apiURL}?limit=${pokemonsPerPage}&offset=${offset}`).then((data) =>
    data.json()
  );

export default { fetchPokemonsData, apiSpritesURL };
