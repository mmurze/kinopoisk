<template>
  <wrapper>
    <div class="pic">
      <img :src="film.poster.url" :alt="film.name"/>
    </div>
    <div class="text">
      <h1>{{film.name}}</h1>
      <div class="description" v-if="widthBlock > 520">{{film.description}}</div>
      <div class="description" v-else>
        <label for="button" @click="roll=!roll">{{label()}}</label>
        <input type="checkbox" id="button">
        <p id="text">{{film.description}}</p>
      </div>
      <div class="container">
        <div class="ratings" v-if="flag">
          <div class="bordered">kp: {{film.rating.kp}}</div>
          <div class="bordered">imdb: {{film.rating.imdb}}</div>
          <div class="bordered">critics: {{film.rating.filmCritics}}</div>
        </div>
        <v-rating v-else
                  :size="widthBlock < 520 ? 25 : 45 "
                  xs="x-small"
                  v-model="rating"
                  length="10"
                  @click="flag=!flag"
        />
        <button class="bordered" v-if="flag">
        <v-icon icon="mdi-dots-horizontal"/>
        <v-menu activator="parent">
          <v-list>
            <v-list-item
                id="v_rating"
                v-for="item in actions"
                :key="item.id"
                :value="item.id"
            >
              <v-list-item-title
                  class="d-flex justify-space-between align-baseline ga-5"
                  @click="changeFlag(item.id)"
              >
                {{ item.name }}
                <div class="person_rating">
                  <v-icon :icon="icon(item, item.id)" size="small"/>
                  <p v-if="item.id === 0 && rating !== 0">{{rating}}</p>
                </div>
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        </button>
      </div>
    </div>
  </wrapper>
</template>

<script>
import {useFilmsStore} from '../../stores/films.js'
import Wrapper from "../../helpers/Wrapper.vue";
export default {
  name: "FilmCard",
  components: {Wrapper},
  setup(){
    const fs = useFilmsStore()
    return {fs}
  },
  props:{
    film: {
      type: Object,
      required: true
    }
  },
  data(){
    return{
      flag: true,
      rating: 0,
      roll: true,
      bookmark: false,
      actions:[
        {
          name: "Оценить",
          icon: "mdi-star-outline",
          fillIcon: "mdi-star",
          id: 0
        },
        {
          name: "Запомнить",
          icon: "mdi-bookmark-outline",
          fillIcon: "mdi-bookmark",
          id: 1
        }
      ]
    }
  },
  updated() {
    this.rating = 0
    this.bookmark = false
    this.roll = true
    this.createPage()
  },
  watch:{
    rating(){
      this.addChangesToLS()
    },
    bookmark(){
      this.addChangesToLS()
    },
  },
  computed:{
    widthBlock(){
      return this.$vuetify.display.width
    }
  },
  created() {
    this.createPage()
  },
  methods:{
    changeFlag(index){
      return !index ? this.flag = !this.flag: this.bookmark = !this.bookmark
    },
    icon(item, index){
      if(!index && this.rating !== 0){
        return item.fillIcon
      }
      if(index && this.bookmark){
        return item.fillIcon
      }
      return item.icon
    },
    label(){
      return this.roll ? "развернуть..." : "свернуть"
    },
    createPage(){
      if(localStorage.getItem('taggetMovies') !== null){
        let taggetMovies = JSON.parse(localStorage.getItem('taggetMovies'))
        let ind = taggetMovies.findIndex(item => item.id === this.film.id)
        if(ind >= 0){
          this.rating = taggetMovies[ind].rating
          this.bookmark = taggetMovies[ind].bookmark
        }
      }
    },
    addChangesToLS(){
      let obj = {id: this.film.id, rating: this.rating, bookmark: this.bookmark}
      let taggetMovies = []
      if(localStorage.getItem('taggetMovies') === null){
        taggetMovies.push(obj)
      }
      else{
        taggetMovies = JSON.parse(localStorage.getItem('taggetMovies'))
        let ind = taggetMovies.findIndex(item => item.id === this.film.id)
        if (ind < 0){
          taggetMovies.push(obj)
        }
        else{
          taggetMovies[ind] = obj
        }
      }
      localStorage.setItem('taggetMovies', JSON.stringify(taggetMovies))
    }
  },
}
</script>

<style lang="scss" scoped>
.wrapper{
  margin-top: 80px;
  display: flex;
  gap: 2%;
}
.pic{
  max-width: 25%;
  width: 100%;
  img{
    border-radius: 10px;
  }
}

.text {
  max-width: calc(100% - 27%);
  width: 100%;
  .description{
    margin-top: 15px;
    padding-bottom: 15px;
    border-bottom: #7DD3FC 2px solid;
  }
  .container{
    margin-top: 15px;
    display: flex;
    justify-content: space-between;
    .ratings{
      display: flex;
      gap: 10px;
    }
    button{
      width: 50px;
    }
  }
}

.bordered{
  text-align: center;
  width: 100px;
  color: #7DD3FC;
  font-size: 17px;
  border-radius: 8px;
  border: #fff 2px solid;
  padding: 7px;
}
.person_rating{
  display: flex;
  gap: 3px;
  align-items:  baseline;
  p{
    font-size: 18px;
  }
}

@media (max-width: 540px) {
  .wrapper{
    justify-content: center;
    flex-wrap: wrap;
  }
  .pic{
    max-width: 75%;
  }
  .text{
    max-width: 100%;
    .description{
      display: flex;
      flex-direction: column-reverse;
      align-items: flex-end;
      #text{
        height: 52px;
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
        cursor: pointer;
      }
    }
    .container button{
      width: 30px;
    }
  }
  .bordered{
    width: 60px;
    font-size: 12px;
    border-radius: 8px;
    padding: 0 4px;
  }
}

</style>
