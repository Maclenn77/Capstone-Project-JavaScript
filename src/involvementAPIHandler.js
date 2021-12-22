const apiKey = "TwW5Jh5cVelAAo2KGW0U";
const apiURL = "https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/";

console.log(`${apiURL}${apiKey}/likes`)

const getLikes = () => fetch(
    `${apiURL}${apiKey}/likes`,
  ).then((data) => data.json());

  // getLikes().then(data => {console.log(data)});

  // const postLike = () => fetch(
  //   `${apiURL}${apiKey}/likes`,
  //   {
  //     method: 'POST',
  //     body: JSON.stringify({
  //       "item_id": 4,
  //     }),
  //     headers: {
  //       'Content-type': 'application/json; charset=UTF-8',
  //     },
  //   },
  // )

  // postLike();

  export default {getLikes};