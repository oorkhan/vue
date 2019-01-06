"use strict";

document.addEventListener("DOMContentLoaded", function() {
  console.log("Hello Bulma!");
});

let app01 = new Vue({
  el: "#root01",
  data: {
    product: "Red Socks",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores, non!",
    url: "https://excisionmerch.com/products/bass-canyon-midnight-socks",
    image: "images/socks.jpg",
    stock: 10,
    onSale: true
  }
});
