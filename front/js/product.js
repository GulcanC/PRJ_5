let queryStr = window.location.search;

console.log(window.location); // see the properties of the object "window.Location"

let usp = new URLSearchParams(queryStr)

// here we can see that the key is id and the value is product id

console.log(usp.toString())

/// second option

let productId = usp.get('id');
console.log(productId); // find the related id of the product

// here products come from model/Product.js so it is not "data" which is used in the script.js
let urlProduct = `http://localhost:3000/api/products/${productId}`;
console.log(urlProduct);


// With this function we will get the specific product informations, then we will display the products on the page
function getProduct() {
    // fetch(url);
    // If I console it, it turns a promise with an initial pending status. 
    console.log(fetch(urlProduct));
    fetch(urlProduct).then(response => {
        console.log(response);
        if (!response.ok) {
            throw Error("ERROR");
        }
        // with this we will get another promis which means we need to wait. and we need to another then
        //  const data =  response.json();
        return response.json();
        //  console.log(data);
        // then return the response
    }).then(myProduct => {
        // it will return myProduct
        console.log(myProduct);
        if (myProduct) {
            displayProduct(myProduct);
        }

        // Then catch the errors
    }).catch(error => {
        console.log(error);
        alert("⚠️ Error! Fetch()!")
    });
}
getProduct();

// display the specicif product on the page

function displayProduct(myProduct) {

    // get image
    let image = document.createElement('img');
    document.querySelector(".item__img").appendChild(image);
    // this is not workin why ?
    // document.getElementsByClassName('item__img').appendChild(image);
    image.setAttribute('src', myProduct.imageUrl);
    image.setAttribute('alt', myProduct.altTxt);

    // get title
    let h1 = document.createElement('h1');
    document.querySelector('#title').appendChild(h1);
    h1.innerHTML = myProduct.name;

    // get price
    let price = document.createElement('p');
    document.querySelector('#price').appendChild(price);
    price.innerText = myProduct.price

    // get description
    let description = document.createElement('p');
    document.getElementById('description').appendChild(description);
    description.innerHTML = myProduct.description




 




}

