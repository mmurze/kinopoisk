<template>
  <v-container>
    <v-text-field label="Film name ..." v-model="searchFilm">
    </v-text-field>
    <v-list>
      <v-list-item v-for="(film, indexFilm) in getFilmByName" :key="indexFilm" class="d-flex">
        <v-list-item-media>
          <v-img :src="film.poster.url" :alt="film.name" class="w-25"></v-img>
        </v-list-item-media>
        <v-list-item-title>{{film.name}}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  name: "StartPage",
  data(){
    return{
      searchFilm: "",
      films: []
    }
  },
  computed:{
    getFilmByName(){
      let res = []
      this.films.forEach((item)=>{
        item.name.toLowerCase().includes(this.searchFilm.toLowerCase()) ? res.push(item) : false
      })

      // let res = this.films.filter((item, index) =>{
      //   item.name.toLowerCase().includes(this.searchFilm.toLowerCase()) ? console.log(item.name) : false
      // })
      console.log(this.searchFilm, res)
      return res
    }
  },
  methods:{


  },
  async created() {
    try {
      const data = await axios.get('')
      this.films = data.data
    }
    catch (e){
      console.log(e.name)
    }
  }
}
</script>

<style scoped>

</style>
