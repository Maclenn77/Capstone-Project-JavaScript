const totalComments = (listOfComments) => {
  const numberOfComments = listOfComments.length;
  if (!numberOfComments) {
    return 0;
  }
  return numberOfComments;
}

export default { totalComments };