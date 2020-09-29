const aa = new Promise((res,rej) => {
  setTimeout(() => {
    console.log('执行完成')
    res()
  }, 1000);
}) 

// eslint-disable-next-line
console.log(aa);
