<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>
  @import './assets/css/main.css';
html, body, #app, section.section {
  height: 100% !important;
}
</style>
<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
  
</style>
