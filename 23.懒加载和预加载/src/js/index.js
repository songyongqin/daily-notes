
console.log('index.js被加载')

function add(a, b) {
  return a + b;
}

// eslint-disable-next-line
console.log(add(1, 2));

document.getElementById('btn').onclick = () => {
  /*
  * 预加载：webpackPrefetch: true，等其他资源加载完毕，浏览器空闲再加载资源
  */
  import (/*webpackChunkName:'test', webpackPrefetch: true*/'./test')
  .then(({mul}) => {
    console.log(mul(2,8))
  })
}




