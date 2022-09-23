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
    NSpace,
    NLayout,
    NLayoutHeader,
    NLayoutContent,
    NLayoutFooter,
    NConfigProvider
} from 'naive-ui'

const naive = create({
    components: [
        NButton,
        NSpace,
        NLayout,
        NLayoutHeader,
        NLayoutContent,
        NLayoutFooter,
        NConfigProvider
    ]
})
app.use(naive)

app.mount('#app')
