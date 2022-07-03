<style lang="scss" scoped>
@import '@/assets/styles/Nav.scss';
</style>

<template>
    <header>
        <div class="bar">
            <div class="icon-bar">
                <Bar @click="this.close()" />
            </div>
            <h1 class="title">
                {{ username }}
            </h1>
        </div>
        <nav :class="(this.nav == true)? 'open' : 'close' ">
            
            <div class="icon-bar">
                <Cross @click="this.close()" />
            </div>
            <div class="icons-navigation">
                <a href="#" @click="this.back()" class="arrow-left link-icon">
                    <ArrowLeft @click="this.back()"/>
                    <p class="title">Back</p>
                </a>
                <a href="/" class="home link-icon">
                    <Home />
                    <p class="title">Home</p>
                </a>
                <a class="repositories link-icon" :href="'/' + this.username + '/repos'">
                    <Library />
                    <p class="title">Repos</p>
                </a>
                <router-link :to="'/' + this.username + '/techs'" class="techs link-icon">
                    <Tech />
                    <p class="title">Techs</p>
                </router-link>

            </div>

        </nav>
    </header>
</template>

<script>
import Home from '@/assets/icons/Home.vue'
import ArrowLeft from '@/assets/icons/ArrowLeft.vue'
import Library from '@/assets/icons/Library.vue'
import Tech from '@/assets/icons/Tech.vue'
import Bar from '@/assets/icons/Bar.vue'
import Cross from '@/assets/icons/Cross.vue'

export default {
    components: {
        ArrowLeft,
        Home,
        Library,
        Tech,
        Bar,
        Cross
    },
    data()  {
        return  {
            nav: false
        }
    },
    methods:    {
        back()  {
            this.$router.go(-1)
        },
        close() {
            this.nav = !this.nav
        }

    },
    computed:  {
        username()  {
            let userPath = location.pathname

            if (userPath.charAt(userPath.length - 1) == '/')	{
                return userPath.split("").slice(1, -1).join("").replace('/techs', '').replace('/repos');
            } else	{
                return userPath.replace('/', "").replace('/techs', '').replace('/repos', '')
            }
        }
    }

}
</script>