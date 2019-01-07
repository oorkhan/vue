"use strict";

document.addEventListener("DOMContentLoaded", function() {
  console.log("Hello Bulma!");
});

let app01 = new Vue({
  el: "#root01",
  data: {
    product: "Socks",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores, non!",
    url: "https://excisionmerch.com/products/bass-canyon-midnight-socks",
    image: "images/socks.jpg",
    stock: 10,
    inStock: true,
    onSale: true,
    details: ["80 % cotton", "20 % polyester", "for men"],
    variants: [
      {
        variantId: 1,
        variantColor: "blue",
        variantImage: "images/socks.jpg"
      },
      {
        variantId: 2,
        variantColor: "green",
        variantImage: "images/socks_blue.jpg"
      }
    ],
    sizes: ["small", "medium", "large", "XL"],
    cart: 0
  },
  methods: {
    addToCart: function() {
      this.cart += 1;
    },
    changeImage(variantImage){
      this.image = variantImage;
      console.log(this.variantImage);
    }
  }
});
