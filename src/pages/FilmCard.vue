<template>
  <v-container class="mt-15 d-flex ga-3">
    <v-img class="w-25" id="post" style="border-radius: 10px" :src="this.film.poster.url" :alt="this.film.name"></v-img>
    <v-card class="w-75" id="card" style="border-radius: 10px">
      <v-card-item>
        <v-card-title id="title" class="pa-0 ma-0">{{this.film.name}}</v-card-title>
        <div class="wrapper">
          <label for="button">...</label>
          <input type="checkbox" id="button">
          <p id="text">{{this.film.description}}</p>
        </div>
        <div class="ratings">
          <div class="rating">kp: {{this.film.rating.kp}}</div>
          <div class="rating">imdb: {{this.film.rating.imdb}}</div>
          <div class="rating">critics: {{this.film.rating.filmCritics}}</div>
        </div>
        <v-rating length="10"></v-rating>
        <p id="line"></p>
      </v-card-item>
    </v-card>
  </v-container>
  <v-btn
      @click="this.$router.push({name: 'home'})"
      size="small"
      style="width: fit-content; margin: 0px auto"

  >
    Вернуться на главную
  </v-btn>
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
      rating: 0
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
#text{
  color: #dee3ed;
  font-family: system-ui;
  font-size: 12px;
}
.wrapper {
  display: flex;
  flex-direction: row-reverse;
  border-bottom: 1px solid #7DD3FC;
  align-items: flex-end;
  padding-bottom: 5px;
}
#text{
  height: 40px;
  overflow: hidden;
  order: 0;
}
input[type="checkbox"] {
  display: none;
}
input[type="checkbox"]:checked + #text {
  height: auto;
}
label {
  color: #dee3ed;
  text-decoration: underline;
  font-size: 18px;
  cursor: pointer;
}
.ratings{
  display: flex;
  gap: 10px;
  margin-top: 6px;
}
.rating{
  font-family: system-ui;
  font-size: 12px;
  border-radius: 8px;
  background-color: #919496;
  padding: 4px;
}
.score{

}
</style>
