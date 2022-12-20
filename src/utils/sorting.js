const ascendingOrderSort = (array, field) => {
  return array.sort((a, b) => {
    return a[field] < b[field] ? -1 : a[field] > b[field] ? 1 : 0;
  });
};

const descendingOrderSort = (array, field) => {
  return array.sort((a, b) => {
    return a[field] < b[field] ? 1 : a[field] > b[field] ? -1 : 0;
  });
};

export { ascendingOrderSort, descendingOrderSort };
