"use strict";

document.addEventListener("DOMContentLoaded", function() {
  console.log("Hello Bulma!");
});
Vue.component("product-details", {
  props:{
    details:{
      type:Array,
      required: true
    }
  },
  template: `<div class="detail"> <ul><li v-for="detail in details">{{detail}}</li> </ul> </div>`,
});

Vue.component("product", {
  props: {
    premium: {
      type: Boolean,
      required: true
    }
  },
  template: `
    <div>
      <div class="columns">
          <div class="column is-one-fifth">
            <div class="card product-card">
              <div class="card-image is-flex isHorizontalCentered">
                <figure class="image is-4by5 is-flex is-v-center">
                  <a :href="url"><img class="image" :src="image"/></a>
                </figure>
              </div>
              <div class="card-content">
                <div class="media">
                  <div class="media-content">
                    <p class="title is-4">Product: {{title}}<br>
                    User is {{premium}}
                      <div>
                        <span v-if="inStock > 10" class="tag is-primary">In stock</span>
                        <span v-else-if="inStock <= 10 && inStock >0" class="tag is-warning">Almost out of stock</span>
                        <span v-else class="tag is-danger">Out of stock</span>
                        <span v-show="onSale" class="tag is-black">On Sale</span>                          
                      </div>
                    </p>
                    <product-details :details="details"></product-details>
                  </div>
                </div>
                <div class="content">
                  <div class="product-desc">Description: {{ description }}</div>
                  <div class="colors">Colors:
                    <ul class="details-ul">
                      <li class="details-li" v-for="(variant, index) in variants" v-bind:key="variant.variantId">
                        <div class="color" :style="{backgroundColor: variant.variantColor}"
                         @mouseover="changeImage(index)"></div>
                      </li>
                    </ul>
                  </div>
                  <div class="sizes">Size:
                      <ul class="details-ul">
                        <li class="details-li" v-for="size in sizes">
                          <a href="#">{{size}}</a>
                        </li>
                      </ul>
                      <p>Shipping: {{shipping}}</p>
                    </div>
                    <div>
                    <h3>Reviews</h3>
                    <p v-if="!reviews.length">There are no reviews</p>
                      <ul>
                        <li v-for="review in reviews">
                          <p>User: {{review.name}} rated this for: {{review.rating}}</p>
                          <p v-if="review.recomended == 'yes'">and recomends it.</p>
                          <p v-if="review.recomended == 'no'">and not recomends it.</p>
                          <p>Review: {{review.review}}</p>
                        </li>
                      </ul>
                    </div>
                    <div class="buttons">
                      <button @click="addToCart" class="button is-success" :disabled="!inStock">Add to cart</button>
                      <button class="button is-primary" @click="removeProductFromCart">Remove</button> 
                    </div>
                    <product-review @review-submited="addReview"></product-review>
                </div>
                
              </div>
            </div> <!--card end-->
          </div> <!--column end-->
        </div>
    </div>
  `,
  data() {
    return {
      brand: "Armani",
      product: "Socks",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores, non!",
      url: "https://excisionmerch.com/products/bass-canyon-midnight-socks",
      selectedVariant: 0,
      onSale: true,
      details: ["80 % cotton", "20 % polyester", "for men"],
      variants: [
        {
          variantId: 1,
          variantColor: "blue",
          variantImage: "images/socks.jpg",
          variantQuantity: 0
        },
        {
          variantId: 2,
          variantColor: "green",
          variantImage: "images/socks_blue.jpg",
          variantQuantity: 10
        }
      ],
      sizes: ["small", "medium", "large", "XL"],
      reviews: []
    };
  },

  methods: {
    addToCart: function() {
      this.$emit("add-to-cart", this.variants[this.selectedVariant].variantId);
    },
    changeImage(index) {
      console.log(this.variants[this.selectedVariant].variantQuantity);
      return (this.selectedVariant = index);
    },
    removeProductFromCart() {
      this.$emit(
        "remove-from-cart",
        this.variants[this.selectedVariant].variantId
      );
    },
    addReview(productReview) {
      this.reviews.push(productReview);
    }
  },
  computed: {
    title() {
      return this.brand + " " + this.product;
    },
    image() {
      return this.variants[this.selectedVariant].variantImage;
    },
    inStock() {
      return this.variants[this.selectedVariant].variantQuantity;
    },
    shipping() {
      if (this.premium) {
        return "Free";
      } else {
        return 3.99;
      }
    }
  }
});
Vue.component("product-review", {
  template: `
  <form @submit.prevent="onSubmit">
    <div v-if="errors.length">
      <p>Please correnct your errors</p>
      <ul>
        <li v-for="error in errors">{{error}}</li>
      </ul>
    </div>
      <input  class="input" type="text" placeholder="your name" v-model="name">
      <textarea class="textarea" placeholder="write product review" v-model="review"></textarea>
      <div class="select">
        <select v-model="rating">
          <option selected>Rate a product</option>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </select>
      </div>
      <div class="control">
        <label class="radio">
        Recomend?
          <input type="radio" name="answer" value="yes" v-model="recomended">
          Yes
        </label>
        <label class="radio">
          <input type="radio" name="answer" value="no" v-model="recomended">
          No
        </label>
      </div>
       <input type="submit" class="button is-link" value="Submit">
    </form>
  `,
  data() {
    return {
      name: null,
      review: null,
      rating: null,
      errors: [],
      recomended: null
    };
  },
  methods: {
    onSubmit() {
      if (this.name && this.review && this.rating && this.recomended) {
        let productReview = {
          name: this.name,
          review: this.review,
          rating: this.rating,
          recomended: this.recomended
        };
        this.$emit("review-submited", productReview);
        this.name = null;
        this.review = null;
        this.rating = null;
        this.recomended = null;
      } else {
        if (!this.name) this.errors.push("Name is required");
        if (!this.review) this.errors.push("Review is required");
        if (!this.rating) this.errors.push("Rating is required");
        if (!this.recomended) this.errors.push("Recomended is required");
      }
    }
  }
});

let app01 = new Vue({
  el: "#root01",
  data: {
    premium: true,
    cart: []
  },
  methods: {
    updateCart: function(id) {
      this.cart.push(id);
    },
    removeItem(id){
      for(var i = this.cart.length - 1; i >=0; i--){
        if(this.cart[i]===id){
          this.cart.splice(i,1);
        }
      }
    }
  }
});
