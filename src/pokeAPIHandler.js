const apiURL = 'https://pokeapi.co/api/v2/pokemon/';
const apiSpritesURL = (id) => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

class Pokemon{
  constructor(name, height, weight, types, exp, image) {
    this.name = name;
    this.height = height;
    this.weight = weight;
    this.types = types;
    this.exp = exp;
    this.image = image;
  }
}

const fetchPokemonsData = async (pageNum, pokemonsPerPage) => {
  const data = await fetch(`${apiURL}?limit=${pokemonsPerPage}&offset=${(pageNum - 1) * pokemonsPerPage}`);
  return data.json();
}

const fetchPokemonsCount = async ()  => {
  let data = await fetch(`${apiURL}?limit=100000`);
  data = await data.json();
  return data.count;
}

const aPokemon = async (pokeID) => {
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

export default {
  fetchPokemonsData, fetchPokemonsCount, apiSpritesURL, aPokemon,
};
