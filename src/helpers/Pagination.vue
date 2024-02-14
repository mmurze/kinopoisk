<template>
  <v-list class="d-flex flex-wrap ga-3">
    <v-list-item v-for="(item, index) in showArray" :key="index" class="pa-0 ma-0 d-grid" style="width: 200px; align-content: space-between">
      <v-list-item-media>
        <v-img :src="item.poster.url" :alt="item.name" ></v-img>
      </v-list-item-media>
      <v-list-item-title style="white-space: normal">{{item.name}}</v-list-item-title>
    </v-list-item>
  </v-list>
  <v-pagination
      v-model="page"
      class="w-50 d-flex"
      :length="lengthPagination"
  ></v-pagination>
</template>

<script>
export default {
  name: "pagination",
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
  computed:{
    showArray(){
      let res = this.propsArray.slice((this.page - 1) * this.perPage, this.page * this.perPage)
      return res
    },
  }
}
</script>

<style scoped>

</style>
