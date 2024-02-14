<template>
  <v-container>
    <v-text-field label="Film name ..." v-model="searchFilm">
    </v-text-field>
    <v-select
        clearable
        v-model="searchType"
        :items="this.searchTypes.map((item) => item.name)"
        density="compact"
        label="Сортировка"
    />
    <pagination :per-page="perPage" :length-pagination="lengthPagination" :props-array="getFilm"/>
  </v-container>
</template>

<script>
import axios from "axios";
import pagination from "../helpers/Pagination.vue";

const enumTypeSort = {
  ascending: 1,
  decreasing: -1
};
const enumSortBy = {
  year: 0,
  timing: 1,
  rating: 3
}

export default {
  name: "StartPage",
  components:{
    pagination
  },
  data(){
    return{
      perPage: 8,
      searchType: "",
      sortBy: "",
      typeSort: "",
      searchTypes: [
        {
          name: "-",
          typeSort: -3,
          sortBy: -3
        },
        {
          name: "Дата выхода по убыванию",
          typeSort: enumTypeSort.decreasing,
          sortBy: enumSortBy.year
        },
        {
          name: "Дата выхода по возрастанию",
          typeSort: enumTypeSort.ascending,
          sortBy: enumSortBy.year
        },
        {
          name: "Рейтинг по убыванию",
          typeSort: enumTypeSort.decreasing,
          sortBy: enumSortBy.rating
        },
        {
          name: "Рейтинг по возрастанию",
          typeSort: enumTypeSort.ascending,
          sortBy: enumSortBy.rating
        },
        {
          name: "Хронометраж по убыванию",
          typeSort: enumTypeSort.decreasing,
          sortBy: enumSortBy.rating
        },
        {
          name: "Хронометраж по возрастанию",
          typeSort: enumTypeSort.ascending,
          sortBy: enumSortBy.rating
        }
        ],
      searchFilm: "",
      films: []
    }
  },
  watch:{
    searchType(value){
      this.searchTypes.forEach((item) => {
        if(item.name === value){
          this.typeSort = item.typeSort
          this.sortBy = item.sortBy
        }
      })
    }
  },
  computed:{
    getFilmByName(){
      let res = []
      this.films.forEach((item)=>{
        item.name.toLowerCase().includes(this.searchFilm.toLowerCase()) ? res.push(item) : false
      })
      return res
    },
    getFilm(){
      let res = []
      this.films.forEach((item)=>{
        item.name.toLowerCase().includes(this.searchFilm.toLowerCase()) ? res.push(item) : false
      })
      res = this.sortedByYear(this.typeSort, this.sortBy, res)
      return res
    },
    lengthPagination(){
      return Math.ceil(this.getFilmByName.length / this.perPage)
    }
  },
  methods:{
    sortedByYear(typeSort, sortBy, array){
      let res = array
      switch (sortBy) {
        case enumSortBy.timing:
          switch (typeSort){
            case enumTypeSort.ascending:
              res.sort((a, b) => a.movieLength > b.movieLength ? 1 : -1);
              break;
            case enumTypeSort.decreasing:
              res.sort((a, b) => a.movieLength < b.movieLength ? 1 : -1);
              break;
          }
          break;
        case enumSortBy.year:
          switch (typeSort){
            case enumTypeSort.ascending:
              res.sort((a, b) => a.year > b.year ? 1 : -1);
              break;
            case enumTypeSort.decreasing:
              res.sort((a, b) => a.year < b.year ? 1 : -1);
              break;
          }
          break;
        case enumSortBy.rating:
          switch (typeSort){
            case enumTypeSort.ascending:
              res.sort((a, b) => a.rating.kp > b.rating.kp ? 1 : -1);
              break;
            case enumTypeSort.decreasing:
              res.sort((a, b) => a.rating.kp < b.rating.kp ? 1 : -1);
              break;
          }
          break;
      }
      return res
    }
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
