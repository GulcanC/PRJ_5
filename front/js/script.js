// DISPLAY ALL THE PRODUCTS ON THE HOME PAGE
// The name of the file must be script.js because in the index.html, at the bottom, the linked script folder is script.js
// to access to the products we have an url => "http://localhost:3000/api/products"
// our backend listens the port 3000 and to access to the products the root is '/api/products'
// In the frontend inspect and open NETWORK tab. You can see the products. 
// 1. Use fetch method, it is a simple GET request, FETCH() is returning a promise. 
// 2. Use then() which resolves the promise to a response
// 3. Response object has a json method which is used to parse the response's body to a js object. Here json method will give me an array that holds my products. 

let url = 'http://localhost:3000/api/products';

function fetchData() {
    // fetch(url);
    // If I console it, it turns a promise with an initial pending status. 
    console.log(fetch(url));
    fetch(url).then(response => {
        console.log(response);
        if (!response.ok) {
            throw Error("ERROR");
        }
        // with this we will get another promis which means we need to wait. and we need to another then
        //  const data =  response.json();
        return response.json();
        //  console.log(data);
        // then return the response
    }).then(data => {
        // it will return data
        console.log(data);
        // Then catch the errors
    }).catch(error => {
        console.log(error);
    });
}

fetchData();