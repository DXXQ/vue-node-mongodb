<template>
  <div id="app">
   <router-view/>
   </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  height:100%;
  width:100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.md_show{
  position:absolute;
  top:50%;
  left:50%;
  margin-top:-1.5rem;
  margin-left:-2.5rem;
  width:5rem;
  height:3rem;
  background-color:white;
  z-index:9999;
}
</style>
