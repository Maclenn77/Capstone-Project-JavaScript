const apiKey = 'TwW5Jh5cVelAAo2KGW0U';
const apiURL = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/';

// const getLikes = () => fetch(
//   `${apiURL}${apiKey}/likes`,
// ).then((data) => data.json());

const getLikes = async () => {
  const data = await fetch(`${apiURL}${apiKey}/likes`);
  return data.json();
}

const postLike = async (id) => {
  const response = await fetch(`${apiURL}${apiKey}/likes`, {
    method: 'POST',
    body: JSON.stringify({
      item_id: parseInt(id, 10),
    }),
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
  });
  return response.ok;
};

const getComments = (itemId) => `${apiURL + apiKey}/comments?item_id=${itemId}`;

const Comments = async (itemId) => {
  let listOfComments = await fetch(getComments(itemId));
  listOfComments = await listOfComments.json();
  return listOfComments;
}

const postComment = async (itemId, username, comment) => {
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

const totalComments = async (listOfComments) => {
  const numberOfComments = await listOfComments.length;
  if (!numberOfComments) {
    return 0;
  }
  return numberOfComments;
}

export default {
  getLikes, Comments, postComment, totalComments, postLike,
};