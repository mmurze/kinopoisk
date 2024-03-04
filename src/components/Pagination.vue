<template>
  <v-list class="d-flex flex-wrap justify-space-evenly pa-3" id="main">
    <v-list-item v-for="item in showArray" :key="item.id" class="pa-0 ma-0 d-grid mb-4" @click="toFilm(item)" id="item">
      <v-list-item-media class="d-flex" id="box">
        <v-img :src="item.poster.url" :alt="item.name" id="img"></v-img>
      </v-list-item-media>
      <v-list-item-title style="white-space: normal" id="title">{{item.name}}</v-list-item-title>
    </v-list-item>
  </v-list>
  <v-pagination
      v-model="page"
      class="w-50 d-flex"
      :length="lengthPagination"
  ></v-pagination>
</template>

<script>
import {useFilmsStore} from "../stores/films.js";

export default {
  name: "pagination",
  setup(){
    const fs = useFilmsStore()
    return {fs}
  },
  props: {
    propsArray:{
      type: Array,
      required: true
    },
    lengthPagination:{
      type: Number,
      required: true
    },
    perPage:{
      type: Number,
      required: true
    }
  },
  data(){
    return{
      page: 1
    }
  },
  watch:{
    propsArray(value){
      this.page = 1
    }
  },
  methods:{
    toFilm(item){
      this.fs.currentFilm = item
      return this.$router.push({name : 'film', params: {id: item.id}})
    }
  },
  computed:{
    showArray(){
      let res = this.propsArray.slice((this.page - 1) * this.perPage, this.page * this.perPage)
      return res
    },
  }
}
</script>

<style scoped>
#main{
  border-radius: 20px;
}
#item{
  width: 270px;
  align-content: space-between
}
#box{
  max-width: 270px;
  width: 100%;
}
#img{
  border-radius: 10px;
  /*display: block;*/
  /*width: 280px;*/
  /*height: 400px;*/
  /*object-fit: fill;*/
}
#title{
  text-align: center;
  color: #7DD3FC;
  font-family: system-ui;
  font-weight: bold;
  font-size: 20px;
}
</style>
