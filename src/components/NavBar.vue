<template>
    <header>
        <h1 class="logo">
            GHProfile
        </h1>
        <div class="nav-desktop">
            <form action="/search" method="get" autocomplete="off">
                <input type="text" name="user" v-model="username">
                <input type="submit">
            </form>
        </div>
        <ButtonNav class="button-nav" @click="this.showNavBar()"/>
        <div class="nav-mobile" :class="this.showNav.toString()">
            <form action="/search" method="get">
                <input type="text" v-model="username" name="user">
                <input type="submit" value="">
            </form>
        </div>
    </header>
</template>

<script>
import ButtonNav from "./ButtonNav.vue"

export default {
    data()  {
        return  {
            username: '',
            showNav: false,
        }
    },
    methods:    {
        toSearchProfile() {
            (this.username === '')? this.$router.push({ name: 'Home' }) : this.$router.push({path: `/search?user=${this.username}`})
        },
        showNavBar()    {
            this.showNav = !this.showNav
        }
    },
    components: {
        ButtonNav
    }
}
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as variables;

@font-face {
    font-family: "Built Titling";
    src: url("../assets/fonts/BuiltTitling.ttf");
}

header  {
    background-color: variables.$second-color;
    height: 4rem;
    width: 100%;
    box-shadow: 0px 22px 19px -11px #111;
    position: fixed;
    top: 0;
    color: #eee;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    border-bottom: .1rem solid #2a2d38;

    .logo   {
        text-align: center;
        font-size: 2.5rem;
        font-family: "Built Titling";
        color: variables.$contrast-color;
    }
}


input[type="text"]  {
        --padding-input: 1rem;
    width: calc(55% - var(--padding-input));
    min-width: calc(350px - var(--padding-input));
    height: 2.8rem;
    background-color: #ddd;
    border: none;
    outline: none;
    text-decoration-line: none;
    border-radius: .5rem;
    font-size: 1.1rem;
    color: #2a2d38;
    padding: 0 var(--padding-input);
}

input[type="submit"]    {
    visibility: hidden;
    position: absolute;
}


input:active    {
    border: none;
    outline: none;
    text-decoration-line: none;
}

.button-nav {
    visibility: hidden;
}

.nav-mobile {
    display: none
}

@media (max-width: 650px) {
    .button-nav {
        visibility: visible;
    }
    .nav-mobile {
        position: fixed;
        display: flex;
        align-items: center;
        justify-content: center;
        top: 4rem;
        width: 100%;
        padding: 1rem 0;
        background-color: #2a2d38;
        box-shadow: 0 .6rem .5rem 0 #0009;
        transition: opacity .3s linear;
    }
    .nav-mobile.false   {
        opacity: 0;
        visibility: hidden;
    }
    .nav-mobile.true   {
        visibility: visible;
        opacity: 1;
    }
    .nav-desktop    {
        display: none;
    }
}
</style>
