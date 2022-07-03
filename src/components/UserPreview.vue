<template>
    <a :href="'/' + this.userProfile.login " class="card">
        <figure>
            <img :src="this.userProfile.avatar_url" alt="">
            <figcaption>
                {{ this.userProfile.login }}         
            </figcaption>
        </figure>
    </a>
</template>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Encode+Sans:wght@600&display=swap');
@import '@/assets/styles/variables';

a   {
    text-decoration: none;
}
.card   {
    --padding-card: 1.5rem;
    background-color: #2a2d38;
    cursor: pointer;
    color: #eee;
    display: flex;
    height: 100%;
    outline: medium solid $contrast-color;
    padding: 0 var(--padding-card);
    width: calc(90% - var(--padding-card));
    overflow: hidden;
    border-radius: .8rem;
    box-shadow: 0px 0px 24px 1px #111;
    transition: box-shadow .5s ease,
                background-color .3s ease-in;

    &:hover   {
        background-color: #323644;
    }
}

@media (max-width:430px) {
    .card   {
        --padding-card: 1rem;
        box-sizing: border-box;
        width: calc(85% - var(--padding-card));
    }
}

figure  {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: .8rem
}

img {
    height: 70%;
    border-radius: 10%;
}

figcaption  {
    font-family: 'Encode Sans', sans-serif;
}
</style>

<script>
export default {
    props: {
        userProfile:    {
            type: Object,
            default: null,
            required: true
        }
    }
}
</script>