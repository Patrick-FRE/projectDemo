const fetchDataWraper = (fn) => {
  let currentPromise = null;
  return (...args) => {
    let fetchPromise = fn(...args);
    currentPromise = fetchPromise;
    return fetchPromise.then((data) => {
      if (currentPromise !== fetchPromise) {
        return Promise.reject({ reason: 'cancel' });
      } else {
        return data;
      }
    });
  };
};

const fetchData = fetchDataWraper((delay) => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res('data' + delay);
    }, delay);
  });
});

fetchData(4000)
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  });
fetchData(2000)
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  });
// fetchData(4000).then((data) => {
//   console.log(data);
// });

// let p1 = new Promise((res, rej) => {
//   setTimeout(() => {
//     res('data1');
//   }, 2000);
// });

// let p2 = new Promise((res, rej) => {
//   setTimeout(() => {
//     res('data2');
//   }, 1000);
// });

// p1.then((data) => {
//   console.log('fisrt:', data);
//   return p2;
// }).then((data2) => {
//   console.log('first 2', data2);
// });

// p1.then((data) => {
//   console.log(data);
// });
