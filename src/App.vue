<template>
  <v-app id="app" >
    <v-app-bar scroll-behavior="elevate" >
      <v-app-bar-title id="header" @click="this.$router.push({name: 'home'})">ПоискКино</v-app-bar-title>
    </v-app-bar>

    <router-view></router-view>
  </v-app>
</template>

<script setup>

</script>

<style>
#app{
  margin: auto;
}
#header{
  color: #7DD3FC;
  font-weight: bold;
  font-size: 30px;
}
</style>
