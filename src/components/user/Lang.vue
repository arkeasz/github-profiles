<template>
    <figure>
        <img lazy="load"  :src="
                    '/lang/' + 
                    (
                        (this.lang.toLowerCase() == 'c#')? 'csharp' : 
                        // (this.lang.toLowerCase() == 'scss')? 'sass' : 
                        this.lang.toLowerCase()
                    )
                    + '.svg'"
                :class="this.lang.toLowerCase()"
        >
        <figcaption> {{ this.lang }} </figcaption>
    </figure>
</template>

<script>
export default {
    props:  {
        lang:   {
            type: String,
            required: true
        }
    }
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Encode+Sans:wght@600&display=swap');
@import '@/assets/styles/variables';

figure  {
    height: 100%;
    width: 100%;
    background-color: $second-color;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8%;
    border-radius: .7rem;
    box-shadow: 0 0 .8rem .05rem #1a1a1a;
    position: relative;
    overflow: hidden;
    transition: background-color .4s ease-in-out;
    outline: .1rem solid rgb(32, 33, 46);
}

figure::after   {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    clip-path: circle(8.3% at 0 100%);
    width: 100%;
    height: 100%;
    background: #dfdfdf02;
    border: none;
    outline: none;
    transition: clip-path .3s linear, background .4s ease-in-out;
}

figure:hover::after {
    background: #9992;
    clip-path: circle(141.4% at 0 100%);
}

figure:hover    {
    background-color: rgba(15, 16, 27, 0.133);
}

img {
    height: 50%;
    width: 50%;
    object-fit: contain;
}

figcaption  {
    height: 20%;
    font-size: 1rem;
    text-align: center;
    font-family: 'Encode Sans', sans-serif;
    color: $neutral-color;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center
}
</style>