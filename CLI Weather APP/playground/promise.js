var promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    //resolve("Hey, it worked!");
    reject("Sed, frens!");
  }, 2000);
});

promise
  .then(msg => console.log("Success: ", msg))
  .catch(errorMessage => console.log("Error: ", errorMessage));
