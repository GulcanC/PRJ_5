const queryStr = window.location.search;

console.log(window.location); // see the properties of the object "window.Location"

const usp = new URLSearchParams(queryStr)

// here we can see that the key is id and the value is product id
for (const [key, value] of usp) {
console.log(`${key} => ${value}`)

console.log(usp.toString())

/// second option

const productId = usp.get('id');
console.log(productId); // find the related id of the product

// here products come from model/Product.js so it is not "data" which is used in the script.js
const urlProduct = `http://localhost:3000/api/products/${productId}`;
console.log(urlProduct);
}