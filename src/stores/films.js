import {defineStore} from 'pinia'

export const useFilmsStore = defineStore('films', {
	state: () => {
		return {
			films: [],
			currentFilm: null
		}
	},
	getters: {},
	actions: {}
})
