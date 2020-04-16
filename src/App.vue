<template>
  <div id="app">
    <NavBar />
    <router-view/>
  </div>
</template>
<script>
import NavBar from './components/NavBar.vue'
import { dataMixin } from './mixins/mixin'

export default {
  name: 'home',
  mixins: [dataMixin],
  components: {
    NavBar
  },
  data() {
    return {
      user: window.localStorage.getItem('user')
    }
  },
  created () {
    if (window.localStorage.getItem('loginToken')) {
      this.$router.push('/gradebooks')
    } else {
      this.$router.push('/login')
    }
  },
}
</script>
<style>
#app {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
