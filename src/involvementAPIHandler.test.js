import 'regenerator-runtime/runtime'
import api from './involvementAPIHandler.js';
jest.mock('./__mocks__/involvementAPIHandler');

const data = JSON.stringify(undefined);

const data1 = undefined;

// JSON.stringify([{
//     creation_date: 22-10-22,
//     username: 'Tester',
//     comment: 'This is a test comment'
//   }]
// );

const data5 = JSON.stringify([{
  creation_date: 22-10-22,
  username: 'Tester',
  comment: 'This is a test comment'
},
{
    creation_date: 22-10-22,
    username: 'Tester',
    comment: 'This is a test comment'
  },
{
    creation_date: 22-10-22,
    username: 'Tester',
    comment: 'This is a test comment'
  },
{
    creation_date: 22-10-22,
    username: 'Tester',
    comment: 'This is a test comment'
  },
  {
    creation_date: 22-10-22,
    username: 'Tester',
    comment: 'This is a test comment'
  }]
);

describe('Tests for count the number of comments fetched of a list of comments', () => {
  test('return 0 when Comments return undefined', async () => {
      console.log(data.length);
      await expect(api.totalComments(data)).toBe(0);
  });

  test('return 1 when there is one comment', async () => {
    const test = data1.json();
    await expect(api.totalComments(test)).toBe(1);
  });

  test('return 5 when there is five comments', async () => {
    await expect(api.totalComments(Comments(data5))).toBe(5);
  });
});