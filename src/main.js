import { createApp } from 'vue'
import App from './App.vue'
import Axios from 'axios';

Axios.defaults.baseURL = "http://localhost:3000"
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
import AddPersons from "./components/AddPersons.vue";
import AddDish from "./components/AddDish.vue";
import StartPage from "./components/StartPage.vue";
import Results from "./components/Results.vue";
const router = createRouter({
	routes:[
		{path: '/', name: 'home', component: StartPage},
	],
	history: createWebHistory(),
})

createApp(App).use(vuetify).use(router).use(pinia).mount('#app')
