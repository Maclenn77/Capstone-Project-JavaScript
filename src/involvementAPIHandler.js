const apiKey = 'TwW5Jh5cVelAAo2KGW0U';
const apiURL = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/';

const getLikes = () => fetch(
  `${apiURL}${apiKey}/likes`,
).then((data) => data.json());

const getComments = (itemId) => `${apiURL + apiKey}/comments?item_id=${itemId}`;

async function Comments(itemId) {
  let listOfComments = await fetch(getComments(itemId));
  listOfComments = await listOfComments.json();
  return listOfComments;
}

export default { getLikes, Comments };