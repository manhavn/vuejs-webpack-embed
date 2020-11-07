<template>
  <div class="hello">
    <h1>{{message || msg}}</h1>
    <h2>count</h2>
    {{count}}
    <h2>Ecosystem</h2>
    {{subState}}
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'HelloWorld',
  data() {
    return {
      msg: 'Welcome to VueJS Websocket',
      subState: false,
    };
  },
  computed: {
    ...mapState({
      count: state => state.count,
      message: (state) => {
        const msg = state.message ? JSON.parse(state.message) : {};
        return msg.message || '';
      },
    }),
    state: app => app.$store.state,
  },
  mounted() {
    if (!window.xInterval) {
      this.increment();
      window.xInterval = setInterval(() => {
        this.increment();
        this.$set(this, 'subState', !this.subState);
      }, 1000);
    }
  },
  methods: {
    increment() {
      this.$store.commit('increment', 'payload111');
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
