import {defineStore} from 'pinia'
import axios from "axios";

export const useFilmsStore = defineStore('films', {
	state: () => {
		return {
			films: [],
			currentFilm: null,
			sortBy: "",
			typeSort: "",
			searchFilm: "",
		}
	},
	getters: {},
	actions: {
		recommendation(film){
			return this.films.filter(item => {
				return item.type === film.type
					&& (film.rating.kp >= (item.rating.kp*0.6) && film.rating.kp <= (item.rating.kp*1.4))
					&& (film.year > (item.year - 5) && film.year < (item.year + 5))
					&& film.id !== item.id
			}).sort(() => 0.5 - Math.random()).splice(0, 5)
		}
	}
})
