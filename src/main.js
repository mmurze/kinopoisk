import { createApp } from 'vue'
import App from './App.vue'
import axios from "axios";
//
axios.defaults.baseURL = "http://localhost:3001/docs"

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
const vuetify = createVuetify({
	icons: {
		defaultSet: 'mdi',
		aliases,
		sets: {
			mdi,
		},
	},
	components,
	directives,
})

// Pinia
import { createPinia } from 'pinia'
const pinia = createPinia()

// Router
import { createRouter, createWebHistory } from 'vue-router'
import StartPage from "./components/StartPage.vue";
const router = createRouter({
	routes:[
		{path: '/', name: 'home', component: StartPage},
	],
	history: createWebHistory(),
})

createApp(App).use(vuetify).use(router).use(pinia).mount('#app')
