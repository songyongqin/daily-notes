import '../css/index.css';

function add(x, y) {
  return x + y;
}
// eslint-disable-next-line
console.log(add(1, 3));

const pro = new Promise((res) => {
  setTimeout(() => {
    console.log('time');
    res();
  }, 1000);
});

console.log(pro);
