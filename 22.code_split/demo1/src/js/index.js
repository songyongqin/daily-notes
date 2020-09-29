import $ from 'jquery';


function add(a, b) {
  return a + b;
}

// eslint-disable-next-line
console.log(add(1, 2));
console.log($);


import (/*webpackChunkName:'test'*/'./test')
.then(({mul}) => {
  console.log(mul(2,8))
})


