<template>
  <FilmCard :film="film"/>
  <Recommendation :film="film"/>
</template>

<script>
import {useFilmsStore} from '../stores/films.js'
import FilmCard from "../layouts/FilmPage/FilmCard.vue";
import Recommendation from "../layouts/FilmPage/Recommendation.vue";
export default {
  name: "FilmPage",
  components: {Recommendation, FilmCard},
  setup(){
    const fs = useFilmsStore()
    return {fs}
  },
  data(){
    return{
      film: null,
    }
  },
  watch:{
    film(newFilm){
      localStorage.setItem('currentFilm', JSON.stringify(newFilm))
    },
  },
  beforeRouteLeave(to, from, next){
    localStorage.removeItem('currentFilm')
    next()
  },
  beforeRouteUpdate(to, from, next){
    const id = to.params.id
    this.film = this.fs.films.find(film => film.id === id)
    localStorage.setItem('currentFilm', JSON.stringify(this.film))
    if (!this.film){
      localStorage.removeItem('currentFilm')
      this.$router.push({name: 'home'})
    }
    next()
  },
  created() {
    const data = JSON.parse(localStorage.getItem('currentFilm'))
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

