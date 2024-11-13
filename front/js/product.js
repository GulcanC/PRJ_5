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
            addToCart(myProduct);
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

    // get colors option
    // here colors is a specific name which comes from Product.js, it is an array.

    myProduct.colors.forEach(oneColor => {
        console.log(oneColor)
        let option = document.createElement('option');
        document.getElementById('colors').appendChild(option);
        option.setAttribute('value', oneColor);
        option.innerHTML = oneColor;

    });


}

// add selected product to cart

// call DOM elements

let addButton = document.getElementById('addToCart');
let quantity = document.getElementById('quantity');
let color = document.getElementById('colors');


let prdLocalStorageStr = localStorage.getItem('selectedPrd');
console.log(prdLocalStorageStr); // at first it is null

let prdLocalStorage = JSON.parse(prdLocalStorageStr)
console.log(prdLocalStorage);  // at first it is null


function addToCart(myProduct) {
    addButton.addEventListener('click', (event) => {
        // create object 
        let productObj = {
            productId: productId,
            productColor: color.value,
            productQty: Number(quantity.value),
        }

        // add another alert messages

        if ((quantity.value == 0 || quantity.value == null) && (color.value == 0 || color.value == null)) {
            alert('⚠️ Please choose a color and quantity ! ')
            window.location.reload();
        }

        else if ((quantity.value == 0 || quantity.value == null)) {
            alert('⚠️ Please choose a quantity ! ')
            window.location.reload();
        }

        else if ((color.value == 0 || color.value == null)) {
            alert('⚠️ Please choose a color ! ')
            window.location.reload();
        }


        // if twe chose an item between 1 and 100, push it to local storage
        else if (quantity.value > 0 && quantity.value <= 100) {


            // create a general alert message
            function alertMessage() {

                alert(

                    `💜💜💜 The selected product was added to the cart!

                    ✔️ Product name: ${myProduct.name}
                    ✔️ Product color: ${productObj.productColor}
                    ✔️ Selected product quantity: ${productObj.productQty}
                    `
                );


            }

            function alertMessage2() {

                alert(

                    `💜💜💜 The selected product was added to the cart!

                    ✔️ Product name: ${myProduct.name}
                    ✔️ Product color: ${productObj.productColor}
                    ✔️ Selected product quantity: ${productObj.productQty}
                    ✔️ Total quantity for the same product: ${newQty}
                    `
                );


            }


            if ((prdLocalStorage == null || prdLocalStorage == 0)) {
                prdLocalStorage = [];
                prdLocalStorage.push(productObj);
                localStorage.setItem('selectedPrd', JSON.stringify(prdLocalStorage));


                // call alert message here
                alertMessage();
                // go to the cart page
                location.assign('cart.html')

            }

            // if the same item exist in the local storage, increase the number of the item. 

            else {
                var filterProduct = prdLocalStorage.findIndex(
                    item => item.productId === productId && item.productColor === color.value
                );
                console.log(filterProduct);

                if ((filterProduct >= 0)) {

                    var newQty = Number(productObj.productQty) + Number(prdLocalStorage[filterProduct].productQty);
                    console.log(newQty);
                    /*  prdLocalStorage[filterProduct].productQty = newQty;
                     localStorage.setItem("selectedPrd", JSON.stringify(prdLocalStorage));
                     // call alert message here
                     alertMessage2();
                     // go to the cart page
                     location.assign('cart.html') */

                    if (prdLocalStorage[filterProduct].productQty == 100) {
                        alert(`❎ You have already added "${prdLocalStorage[filterProduct].productQty}" products from the product "${myProduct.name}, thus you can not choose more product! Because you can choose max 100 product for the same one!"`)
                        window.location.reload();
                    }
                    else if ((prdLocalStorage[filterProduct].productQty + productObj.productQty) > 100) {
                       alert(`❎ You have already added "${prdLocalStorage[filterProduct].productQty}" products from the product "${myProduct.name}, thus you can add max "${100 - prdLocalStorage[filterProduct].productQty}" from the same product`)
                        window.location.reload(); 
             
                    }

                    else if (newQty <= 100) {
                        prdLocalStorage[filterProduct].productQty = newQty;
                        localStorage.setItem("selectedPrd", JSON.stringify(prdLocalStorage));
                        // call alert message here
                        alertMessage2();
                        // go to the cart page
                        location.assign('cart.html')

                    }

                }


                else {
                    prdLocalStorage.push(productObj);
                    localStorage.setItem('selectedPrd', JSON.stringify(prdLocalStorage));
                    // call alert message here
                    alertMessage();
                    // go to the cart page
                    location.assign('cart.html')
                }
            }
        }

        else if (quantity.value > 100) {
            alert('⚠️ Please choose a quantity smaller or equal to 100 ! ')
            window.location.reload();
        }
        else if (quantity.value < 0) {
            alert('⚠️ You can not choose negatif value ! ')
            window.location.reload();
        }
    })




    // we will put the data on the local storage
    // we will use the localStorage object, and we will call setItem method
    // setItem method takes two arguments, first is the name of the entry, second is data
    // with stringfy() method, we will convert the data to the string because we can store only string data types in the local storage
    // next I will store an empty array to the local storage, 

}

