import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'

const vuetify = createVuetify({
	theme: {
		defaultTheme: 'dark'
	},
	icons: {
		iconfont: 'mdi',
		// defaultSet: 'mdi',
		// aliases,
		// sets: {
		// 	mdi,
		// },
	},
	components,
	directives,
})
export  default vuetify
