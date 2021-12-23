const apiURL = 'https://pokeapi.co/api/v2/pokemon/';
const apiSpritesURL = (id) => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

function Pokemon(name, height, weight, types, exp, image) {
  this.name = name;
  this.height = height;
  this.weight = weight;
  this.types = types;
  this.exp = exp;
  this.image = image;
}

const fetchPokemonsData = (pageNum, pokemonsPerPage) => fetch(
  `${apiURL}?limit=${pokemonsPerPage}&offset=${
    (pageNum - 1) * pokemonsPerPage
  }`,
).then((data) => data.json());

const fetchPokemonsCount = () => fetch(
  `${apiURL}?limit=100000`,
).then((data) => data.json()).then(data => data.count);

async function aPokemon(pokeID) {
  const image = apiSpritesURL(pokeID);
  const pokeUrl = apiURL + pokeID;
  const types = [];
  const values = await fetch(pokeUrl);
  const j = await values.json();
  await j.types.forEach((element) => {
    types.push(element.type.name);
  });
  const pokemon = new Pokemon(j.name, j.height, j.weight, types, j.base_experience, image);
  return pokemon;
}

export default { fetchPokemonsData, fetchPokemonsCount, apiSpritesURL, aPokemon };
