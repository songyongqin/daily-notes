
const add = (x,y) => {
  return x + y
}

console.log(add(1,2))

let pro = new Promise((res,rej) => {
  console.log('promise start')
  setTimeout(() => {
    console.log('time 1')
    res()
  }, 1000);
  console.log('time 2')
})
console.log(pro)
