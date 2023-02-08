import Store from './store/index.js'

import App from './component/app.js'

const vueApp = Vue.createApp({
    components: {
        'app': App
    }
})

vueApp.use(Store)
vueApp.mount('#wrap')