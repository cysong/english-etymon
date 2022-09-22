import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

import './assets/main.css'

const app = createApp(App)

app.use(createPinia())


import {
    // create naive ui
    create,
    // component
    NButton,
    NConfigProvider
} from 'naive-ui'

const naive = create({
    components: [NButton]
})
app.use(naive)

app.mount('#app')
