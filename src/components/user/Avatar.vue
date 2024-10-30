<template>
    <figure class="avatar section">
        <img :src="this.avatar_image" :alt="this.name">
        <figcaption>
            <h3>{{ this.name }}</h3>
            <div class="social-links">
                <a :href="this.github" class="github">Visit Github</a>
                <a v-if="this.twitter === ''" class="warning">Does not have twitter</a>
                <a v-else :href="`https://twitter.com/${ this.twitter }`" class="twitter">Visit Twitter</a>
            </div>
            <div class="stats">
                <div class="stat">
                    <p class="number"> {{ this.repos }} </p>
                    <p class="name"> Repositories </p>
                </div>
                <div class="stat">
                    <p class="number"> {{ this.following }} </p>
                    <p class="name"> Following </p>
                </div>
                <div class="stat">
                    <p class="number"> {{ this.followers }} </p>
                    <p class="name"> Followers </p>
                </div>
            </div>
        </figcaption>
    </figure>
</template>

<script>
export default {
    props:  {
        name:   {
            type: String,
            required: true
        },
        avatar_image:    {
            type: String,
            required: true
        },
        twitter:    {
            type: String,
            required: true
        },
        github:    {
            type: String,
            required: true
        },
        followers:  {
            type: Number
        },
        following:  {
            type: Number
        },
        repos:  {
            type: Number
        }
    }
}
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as variables;

.avatar {
    padding: 1.5rem 0;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    flex-direction: column;
    background-color: variables.$main-color;
    border-radius: 1rem;
    width: 100%;
    box-shadow: 0px 0px 24px -13px #111;
    @media (max-width: 750px) {
        width: 100%;

    }
}

img {
    border-radius: 4%;
    height: 13rem;
    object-fit: contain;
    filter: drop-shadow(0 0 30px #222);
}

figcaption  {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    justify-content: center;
    gap: 1.9rem;
}

h3  {
    font-family: 'Encode Sans', sans-serif;
    text-transform: uppercase;
    font-size: clamp(1rem, 2.5vw, 1.5rem);
    color: variables.$neutral-color;
    text-shadow: 0 0 .2rem #111
}

.social-links   {
    display: flex;
    width: 90%;
    gap: 1.5rem;
    flex-wrap: wrap;
}

a   {
    flex-grow: 1;
    padding: 1rem 0;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    font-size: 1rem;
    border-radius: .5rem;
    font-family: 'Encode Sans', sans-serif;
    background-color: variables.$second-color;
    transition: background-color .2s ease-in-out;
    text-align: center;
}

.stats  {
    width: 90%;
    display: flex;
    flex-wrap: wrap;
    text-transform: capitalize;
    gap: 1rem;
}

.stat    {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    background-color: variables.$second-color;
    gap: 1rem;
    padding: .8rem 0;
    font-family: 'Encode Sans', sans-serif;
    border-radius: .7rem;
    pointer-events: none;
    color: variables.$neutral-color;
    transition: box-shadow .5s linear;
    border-top: 2px solid variables.$contrast-color;
    border-bottom: 2px solid variables.$secondary-contrast-color;
    border-left: 2px solid variables.$secondary-contrast-color;
    border-right: 2px solid variables.$contrast-color;
}

.stats .stat .number    {
    /* font-size: 1.8rem; */
    font-size: clamp(1.5rem, 2.5vw, 2rem);

}

a:hover    {
    background-color: #ccc;
    color: #111
}

.twitter    {
    color: variables.$secondary-contrast-color
}

.github    {
    color: variables.$neutral-color
}
.warning    {
    color: variables.$neutral-color;
    opacity: .7;
    text-shadow: 0 0 2px #111a;
    pointer-events: none;
    background-color: variables.$contrast-color
}
@media (max-width: 450px) {
    /* img */
}
</style>
