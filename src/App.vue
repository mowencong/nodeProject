<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return{

    }
  },
  created(){
    if(!localStorage.getItem('user')){
      this.$router.push('/')
    }
  }
}
</script>

<style>
#app {
 
}
</style>
