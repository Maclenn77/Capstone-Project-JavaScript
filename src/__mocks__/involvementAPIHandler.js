const data = undefined;

const data1 = JSON.stringify([{
    creation_date: 22-10-22,
    username: 'Tester',
    comment: 'This is a test comment'
  }]
);

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

async function Comments(data) {
    let listOfComments = data ;
    listOfComments = data.json();
    return listOfComments;
}

async function totalComments(listOfComments) {
    const numberOfComments = await  listOfComments.length
    if (!numberOfComments) {
      return 0;
    }
    return numberOfComments;
  }

  export default involvementAPIHandler