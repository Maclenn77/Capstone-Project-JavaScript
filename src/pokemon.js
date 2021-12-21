import { add } from 'lodash';
import api from './api.js';

function Pokemon(name, height, weight, types, exp, image) {
    this.name =  name;
    this.height = height;
    this.weight = weight;
    this.types = types;
    this.exp = exp;
    this.image = image;
}

function getImageBy(pokeID) {
    const pokeImage = api.imagesURL + pokeID + '.png';
    return pokeImage
}

async function aPokemon(pokeID) {
    const image = getImageBy(pokeID);
    const pokeUrl = api.pokeAPI + pokeID;
    const types = [];
    const values = await fetch(pokeUrl);
    const json = await values.json();
    await json.types.forEach(element => {
        types.push(element.type.name);
      });
    const pokemon = new Pokemon(json.name, json.height, json.weight, types, json.base_experience, image);
    return pokemon
}

export default { aPokemon }