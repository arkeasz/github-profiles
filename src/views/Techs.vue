<template>
    <section class="techs">
        <Nav />
        <article class="techs-container">
            <Techs />
        </article>
    </section>
</template>

<style lang="scss">
    .techs  {
        color: #ddd;
        width: 100%;

        .techs-container    {
            display: flex;
            align-items: center;
            justify-content: center ;
            margin-top: 1rem
        }
    }
</style>

<script>
import Nav from '@/components/user/Nav.vue'
import Techs from '@/components/user/Techs.vue'

export default {
    components: {
        Nav,
        Techs
    },
}
</script>