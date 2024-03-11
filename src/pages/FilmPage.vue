<template>
  <v-container class="mt-15 d-flex ga-3">
    <v-img class="w-25" id="post" style="border-radius: 10px" :src="film.poster.url" :alt="this.film.name"></v-img>
    <v-card class="w-75" id="card" style="border-radius: 10px">
      <v-card-item>
        <v-card-title id="title" class="pa-0 ma-0 mb-2">{{film.name}}</v-card-title>
        <div class="wrapper">
          <label for="button" @click="flag=!flag">{{label()}}</label>
          <input type="checkbox" id="button">
          <p id="text">{{film.description}}</p>
        </div>
        <v-container class="d-flex pa-0 ma-0 justify-space-between mt-2">
          <div class="ratings">
            <div class="rating">kp: {{film.rating.kp}}</div>
            <div class="rating">imdb: {{film.rating.imdb}}</div>
            <div class="rating">critics: {{film.rating.filmCritics}}</div>
          </div>

          <v-btn
              id="dots_btn"
              elevation="0"
              variant="tonal"
              size="">
            <v-icon icon="mdi-dots-horizontal"/>
            <v-menu activator="parent">
              <v-list>
                <v-list-item
                    v-for="(item, index) in actions"
                    :key="index"
                    :value="index"
                >
                  <v-list-item-title class="d-flex justify-space-between align-center">
                    {{ item.name }} <v-icon :icon="item.icon" size="small" end/>
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-btn>
        </v-container>
      </v-card-item>
      <v-rating></v-rating>
    </v-card>
  </v-container>
  <v-container class="">
    <films
        :per-page="5"
        :length-pagination="0"
        :props-array="fs.recommendation(film)"
        :typePage="0"
    ></films>
  </v-container>
  <v-btn
      id="back_btn"
      @click="this.$router.push({name: 'home'})"
      size="small"
  >
    Вернуться на главную
  </v-btn>
</template>

<script>
import {useFilmsStore} from '../stores/films.js'
import Films from "../components/Films.vue";
export default {
  name: "FilmPage",
  props: ['id'],
  components: {Films},
  setup(){
    const fs = useFilmsStore()
    return {fs}
  },
  data(){
    return{
      film: null,
      rating: 0,
      flag: true,

      actions:[
        {
          name: "Оценить",
          icon: "mdi-star-outline",
          fillIcon: "mdi-star"
        },
        {
          name: "Запомнить",
          icon: "mdi-bookmark-outline",
          fillIcon: "mdi-bookmark"
        }
      ]
    }
  },
  beforeRouteLeave(to, from, next){
    localStorage.removeItem('film')
    next()
  },
  beforeRouteUpdate(to, from, next){
    localStorage.removeItem('film')
    const id = to.params.id
    this.film = this.fs.films.find(film => film.id === id)
    if (!this.film){
      this.$router.push({name: 'home'})
    }
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
  methods:{
    label(){
      if(this.flag){
        return "развернуть..."
      }
      else{
        return "свернуть"
      }
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
#back_btn{
  width: fit-content;
  margin: 0 auto;
}
#title{
  color: #7DD3FC;
  font-family: system-ui;
  font-weight: bold;
  font-size: 25px;
}
#text{
  color: #dee3ed;
  font-family: system-ui;
  font-size: 14px;
}
.wrapper {
  display: flex;
  flex-direction: column-reverse;
  border-bottom: 1px solid #7DD3FC;
  align-items: flex-end;
  padding-bottom: 5px;
}
#text{
  height: 42px;
  overflow: hidden;
  order: 0;
}
#dots_btn{
  color: #7DD3FC;
  padding: 6px 10px;
  border-radius: 8px;
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
  font-size: 14px;
  cursor: pointer;
}
.ratings{
  display: flex;
  gap: 10px;
}
.rating{
  font-family: system-ui;
  font-size: 14px;
  border-radius: 8px;
  background-color: #919496;
  padding: 6px;
  margin: auto;
}
</style>
