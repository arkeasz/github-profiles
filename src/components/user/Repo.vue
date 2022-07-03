<template>
    <a :href="this.link" class="repo" target="_blank" >
            <h3>Random Repository</h3>
            <figure class="repository">
                <img 
                    :src=" '/lang/' + this.tech.toLowerCase() + '.svg' " 
                    :alt="this.tech.toLowerCase()"
                    :class="
                        (
                            this.tech.toLowerCase() == 'rust' ||
                            this.tech.toLowerCase() == 'handlebars' ||
                            this.tech.toLowerCase() == 'markdown'
                        )
                        ? 'white-icon tech'
                        : 'tech'
                    "
                >
                <figcaption>
                    <p class="name">
                        {{ this.name }}
                    </p>
                    <p class="license">
                        {{ this.license }}
                    </p>
                    <div class="stars">
                        <img src="../../assets/icons/star.png" alt="">
                        {{ this.star }}
                    </div>
                </figcaption>
            </figure>
    </a>
</template>

<style lang="scss" scoped>

@import '@/assets/styles/variables';
.repo   {
    text-decoration: none;
    width: calc(90% - 1rem);
    background-color: $second-color;
    padding: 1rem;
    border-radius: .8rem;
    color: #eee;
    font-family: 'Encode Sans', sans-serif;
    display: flex;
    flex-direction: column;
    gap: 1rem
}

h3  {
    font-size: 1.2rem;
    color: $neutral-color;
}
.repository    {
    display: flex;
    align-items: center;
}

figure   {
    display: flex;
    height: 12rem;
}

.name   {
    width: 100%;
    text-align: center;
    color: $neutral-color;
    font-size: 1.3rem
}

.license    {
    font-size: 1rem;
    text-align: center;
    color: $neutral-color;
}

.tech {
    width: 40%;
    object-fit: contain;
    height: 70%;
    filter: drop-shadow(0 0 20px #111)
}
.white-icon {
    width: 40%;
    object-fit: contain;
    height: 70%;
    filter: drop-shadow(0 0 20px #eee) invert(150%);
}


figcaption  {
    width: 60%;
    display: flex;
    flex-direction: column;
    gap: .5rem;
    align-items: center;
}

.stars  {
    display: flex;
    width: 80%;
    align-items: center;
    justify-content: center;
    color: $neutral-color;
    gap: 1rem;
    font-size: 1.5rem
}

.stars img  {
    width: 30%;
}
</style>

<script>
export default {
    props:  {
        name:   {
            type: String,
        },
        tech:   {
            type: String
        },
        license:    {
            type: String
        },
        star:   {
            type: Number
        },
        link:   {
            type: String
        }
    }
}
</script>
