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
    onSale: true,
    details:['80 % cotton', '20 % polyester', 'for men'],
    variants:[
      {
        variantId:1,
        variantColor: 'blue'
      },
      {
        variantId:2,
        variantColor: 'green'
      }
    ],
    sizes:['small', 'medium', 'large', 'XL']
  }
});
