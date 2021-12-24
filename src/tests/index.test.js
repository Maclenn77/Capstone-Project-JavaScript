import pokeAPI from '../pokeAPIHandler.js';

jest.mock('../pokeAPIHandler.js');

describe('pokemon API tests', () => {
  test('fetchPokemonsCount test', async () => {
    const data = await pokeAPI.fetchPokemonsCount();
    expect(data.count).toEqual(1118);
  });
});