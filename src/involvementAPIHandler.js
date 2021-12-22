const apiKey = 'TwW5Jh5cVelAAo2KGW0U';
const apiURL = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/';

const getLikes = () => fetch(
  `${apiURL}${apiKey}/likes`,
).then((data) => data.json());

export default { getLikes };