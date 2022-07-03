import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'

import Home from '@/views/Home.vue'
import Repositories from '@/views/Repositories.vue'
import User from '@/views/User.vue'
import Users from '@/views/Users.vue'
import Techs from '@/views/Techs.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', name: 'Home', component: Home },
        { path: '/search', name: 'Users', component: Users },
        { path: '/:user', name: 'User', component: User },
        { path: '/:user/techs', name: 'Techs', component: Techs },
        { path: '/:user/repos', name: 'Repositories', component: Repositories },
    ]
})

createApp(App)
.use(router)
.mount('#app')