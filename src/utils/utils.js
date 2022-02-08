const findLargest = (arr) => {
  let largest = 0;
  arr.forEach((item) => {
    if (item.id > largest) {
      largest = item.id;
    }
  });
  return largest;
};

export { findLargest };
