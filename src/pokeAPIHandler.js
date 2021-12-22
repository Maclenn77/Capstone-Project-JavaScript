const pokemonsPerPage = 12;
const apiURL = "https://pokeapi.co/api/v2/pokemon/";
const apiSpritesURL = (id) =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id<899?id:parseInt(id, 10)+9102}.png`;

const fetchPokemonsData = (pageNum) =>
  fetch(
    `${apiURL}?limit=${pokemonsPerPage}&offset=${
      (pageNum - 1) * pokemonsPerPage
    }`
  ).then((data) => data.json());

export default { fetchPokemonsData, apiSpritesURL };