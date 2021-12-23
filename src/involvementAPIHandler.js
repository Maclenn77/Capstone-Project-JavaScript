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

async function postComment(itemId, username, comment) {
  const data = {
    item_id: itemId,
    username,
    comment,
  };
  const commentURL = `${apiURL + apiKey}/comments`;
  const response = await fetch(commentURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(data),
  });
  return response.ok;
}

async function count(comments, itemId) {
  const numberOfComments = await  Comments(itemId).length
  if (!numberOfComments) {
    return 0;
  }
  return numberOfComments;
}

export default { getLikes, Comments, postComment, count };