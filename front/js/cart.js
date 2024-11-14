
// here the important thing is the key and value name in the local storage. 
// When I send the selected items to local storage, I gave the name for the key "selectedPrd", it is importrant. 
// And this selected product has a value which contains, productId, productColor, productQty, these names are also important. I can not change them in the cart.js
// they come from the product.js => 
 /*   let productObj = {
        productId: productId,
        productColor: color.value,
        productQty: Number(quantity.value),
    } */

let prdLocalStorageStr = localStorage.getItem('selectedPrd');
console.log(prdLocalStorageStr); // string

let prdLocalStorage = JSON.parse(prdLocalStorageStr)
console.log(prdLocalStorage);  // array

// here xProduct name is not important
if (prdLocalStorage) {
    // you can remove the name of the function "callBack"
    prdLocalStorage.forEach(function callBack(xProduct, index) {
    let url = `http://localhost:3000/api/products/${xProduct.productId}`;
    console.log(url)
        
    fetch(url)
      .then(function (response) {
        if (response.ok) {
          return response.json();
        }
      })
// here the xProducts name ?
      .then(function (xProducts) {

  // get all elements from cart.html

  // article
  let article = document.createElement('article');
  article.setAttribute('data-id', xProduct.productId);
  article.setAttribute('data-color', xProduct.productColor);
  // article.setAttribute('class', 'cart__item');
  document.getElementById('cart__items').appendChild(article);

  // first div
  let div1 = document.createElement('div');
  document.querySelector(".cart__item__img").appendChild(div1);

      });
  });
}
