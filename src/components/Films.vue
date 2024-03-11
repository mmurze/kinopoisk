<template>
  <v-list class="d-flex flex-wrap justify-space-evenly pa-3" id="main">
    <v-list-item v-for="item in showArray" :key="item.id" class="pa-0 ma-0 d-grid mb-4" @click="toFilm(item)" id="item">
      <v-img :src="item.poster.url" :alt="item.name" id="img"/>
      <v-list-item-title id="title">{{item.name}}</v-list-item-title>
    </v-list-item>
  </v-list>
  <v-pagination
      v-model="page"
      :length="lengthPagination"
      v-if="settingsCSS.pagination"
      class="w-50 d-flex"
      style="margin: 0 auto"
  />
</template>

<script>
export default {
  name: "films",
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
    },
    typePage:{
      type: Number
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
      return this.$router.push({name : 'film', params: {id: item.id}})
    }
  },
  computed:{
    showArray(){
      return this.propsArray.slice((this.page - 1) * this.perPage, this.page * this.perPage)
    },
    settingsCSS(){
      if(this.typePage === 1){
        return {
          fontSize: "20px",
          width: "270px",
          pagination: true
        }
      }
      else {
        return {
          fontSize: "14px",
          width: "150px",
          pagination: false
        }
      }
    }
  }
}
</script>

<style scoped>
#main{
  border-radius: 20px;
}
#item{
  width: v-bind('settingsCSS.width');
  align-content: space-between
}
#img{
  width: 100%;
  border-radius: 10px;
}
#title{
  white-space: normal;
  text-align: center;
  color: #7DD3FC;
  font-family: system-ui;
  font-weight: bold;
  font-size: v-bind('settingsCSS.fontSize');
}
</style>
