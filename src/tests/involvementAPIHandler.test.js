import api from '../involvementAPIHandler.js';

jest.mock('../involvementAPIHandler.js');

const data = '';

const data1 = [{
  creation_date: 22 - 10 - 22,
  username: 'Tester',
  comment: 'This is a test comment',
}];

const data5 = [{
  creation_date: 22 - 10 - 22,
  username: 'Tester',
  comment: 'This is a test comment',
},
{
  creation_date: 22 - 10 - 22,
  username: 'Tester',
  comment: 'This is a test comment',
},
{
  creation_date: 22 - 10 - 22,
  username: 'Tester',
  comment: 'This is a test comment',
},
{
  creation_date: 22 - 10 - 22,
  username: 'Tester',
  comment: 'This is a test comment',
},
{
  creation_date: 22 - 10 - 22,
  username: 'Tester',
  comment: 'This is a test comment',
}];

describe('Tests for count the number of comments fetched of a list of comments', () => {
  test('return 0 when there an empty object', async () => {
    const test = data;
    await expect(api.totalComments(test)).toBe(0);
  });

  test('return 1 when there is one comment', async () => {
    const test = data1;
    await expect(api.totalComments(test)).toBe(1);
  });

  test('return 5 when there is five comments', async () => {
    const test = data5;
    await expect(api.totalComments(test)).toBe(5);
  });
});