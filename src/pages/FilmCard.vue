<template>
  <v-container class="mt-15 d-flex ga-3">
    <v-img class="w-25" id="post" style="border-radius: 10px" :src="this.film.poster.url" :alt="this.film.name"></v-img>
    <v-card class="w-75" id="card" style="border-radius: 10px">
      <v-card-item>
        <v-card-title id="title">{{this.film.name}}</v-card-title>
        <v-card-subtitle class="text-caption">{{this.film.description}}</v-card-subtitle>
      </v-card-item>
    </v-card>
  </v-container>
</template>

<script>
import {useFilmsStore} from '../stores/films.js'
export default {
  name: "filmCard",
  setup(){
    const fs = useFilmsStore()
    return {fs}
  },
  data(){
    return{
      film: null,
    }
  },
  beforeRouteEnter(to, from, next){
    const data = JSON.parse(localStorage.getItem('film'))
    if(from.name === 'home' || to.params.id === data.id){
      next()
    }
    else if (to.params.id !== data.id) {
      localStorage.removeItem('film')
      next()
    }
    else {
      next({name: 'home'})
    }
  },
  beforeRouteLeave(to, from, next){
    console.log("leave")
    localStorage.removeItem('film')
    next()
  },
  mounted(){
    if(localStorage.film){
     this.film = JSON.parse(localStorage.getItem('film'))
    }
  },
  watch:{
    film(newFilm){
      localStorage.setItem('film', JSON.stringify(newFilm))
    }
  },
  created() {
    const data = JSON.parse(localStorage.getItem('film'))
    if(data == null){
      const id = this.$route.params.id
      this.film = this.fs.films.find(film => film.id === id)
      if (!this.film){
        this.$router.push({name: 'home'})
      }
    }
    else{
      this.film = data
    }
  },
}
</script>

<style scoped>
#title{
  text-align: center;
  color: #7DD3FC;
  font-family: system-ui;
  font-weight: bold;
  font-size: 20px;
}
#post{
  /*border-bottom-left-radius: 10px;*/
  /*border-top-left-radius: 10px;*/
}
#card{
  /*border-bottom-right-radius: 10px;*/
  /*border-top-right-radius: 10px;*/
}
</style>
