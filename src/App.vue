<template>
  <Main />
  <Footer />
</template>

<script>
import Main from './components/Main.vue';
import Footer from './components/Footer.vue';

export default {
  name: 'App',
  components: {
    Main,
    Footer
  }
};
</script>

<style lang="scss">
#app {
  font-family: Arial, Helvetica, sans-serif;
}

body {
  overflow-y: scroll;
}
</style>

