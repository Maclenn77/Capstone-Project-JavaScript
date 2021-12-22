const appKey = 'TwW5Jh5cVelAAo2KGW0U';
const InvolmentAPI = new URL('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/');

const getComments = (item_id) => {
  return InvolmentAPI + appKey + '/comments?item_id=' + item_id;
}

async function Comments(item_id) {
  let listOfComments = await fetch(getComments(item_id));
  listOfComments = await listOfComments.json();
  return listOfComments;
}

export default { Comments }