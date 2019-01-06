// Define a new component called button-counter
Vue.component("button-counter", {
  data: function() {
    return {
      count: 0
    };
  },
  template:
    '<button v-on:click="count++">You clicked me {{ count }} times.</button>'
});
Vue.component("message", {
  props: ["title", "body"],
  data() {
    return {
      isVisible: true
    };
  },
  template: `
                <article class="message" v-show="isVisible">
                <div class="message-header">
                <p>{{title}}</p>
                <button class="delete" aria-label="delete" v-on:click="hideMessage"></button>
                </div>
                <div class="message-body">
                {{body}}
                </div>
            </article>
    `,
  methods: {
    hideMessage() {
      this.isVisible = false;
    }
  }
});

Vue.component("modal", {
  template: `
    <div class="modal is-active">
      <div class="modal-background"></div>
      <div class="modal-content">
        <div class="box"><slot></slot></div>
      </div>
      <button class="modal-close is-large" aria-label="close" @click="$emit('close')"></button>
    </div>
  `
});
Vue.component("tabs", {
  template: `
  <div>
    <div class="tabs">
      <ul>
        <li v-for="tab in tabs" :class="{'is-active' : tab.isActive}"><a :href="tab.href" @click="selectTab(tab)">{{tab.name}}</a></li>
      </ul>
    </div>
    <div class="tabs-details">
      <slot></slot>
    </div>
  </div>
  `,
  data() {
    return { tabs: [] };
  },
  created() {
    this.tabs = this.$children;
  },
  methods: {
    selectTab(selectedTab) {
      this.tabs.forEach(tab => {
        tab.isActive = tab.name == selectedTab.name;
      });
    }
  }
});
Vue.component("tab", {
  template: `
    <div v-show="isActive"><slot></slot></div>
  `,
  props: {
    name: { required: true },
    selected: { default: false }
  },
  data() {
    return {
      isActive: false
    };
  },
  mounted() {
    this.isActive = this.selected;
  },
  computed: {
    href() {
      return '#' + this.name.toLowerCase().replace(/ /g, '-');
    }
  }
});
new Vue({
  el: "#components-demo",
  el: "#root"
});

new Vue({
  el: '#root02',
  data:{
    modalIsVisible:false 
   }
});
new Vue({
  el: '#root03',
});