<template>
  <v-app id="app" >
    <v-app-bar scroll-behavior="elevate">
      <div class="content">
        <v-app-bar-title id="header" @click="this.$router.push({name: 'home'})">
          <div class="title" style="cursor: pointer">
            ПоискКино
          </div>
        </v-app-bar-title>
        <v-icon icon="mdi-account-circle-outline"
                size="large"
                @click="this.$router.push({name: 'person'})"
        />
      </div>
    </v-app-bar>
    <router-view></router-view>
  </v-app>
</template>

<script>
import {useFilmsStore} from "./stores/films.js";
import axios from "axios";
export default {
  setup(){
    let fs = useFilmsStore()
    return {fs}
  },
  async created() {
    try {
      const data = await axios.get('')
      this.fs.films = data.data
    }
    catch(e){
      console.error(e)
    }
  }
}
</script>

<style>
#app{
  margin: auto;
}
.content{
  display: flex;
  justify-content: space-between;
  margin: auto;
  padding: 0 15px;
  max-width: 1200px;
  width: 100%;
  font-style: italic;
  align-items: baseline;
}
.title{
  font-style: italic;
}
#header{
  color: #7DD3FC;
  font-weight: bold;
  font-size: 30px;
}
</style>
