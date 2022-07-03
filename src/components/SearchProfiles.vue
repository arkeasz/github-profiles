<template>
    <div class="form" >
        <form :action="'/search'" method="get">
            <input autocomplete="off" ref="search" type="text" name="user" v-model="username" > 
            <input type="submit" value="search">
        </form>
    </div>
</template>

<script>
export default {
    props:  {
        userProfile:    {
            type: String,
        }
    },
    data()  {
        return  {
            username: ''
        }
    },
    mounted()   {
        this.$refs.search.focus()
    },
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables';
input[type="text"]   {
    --padding-input: 1rem;
    width: calc(55% - var(--padding-input));
    min-width: calc(350px - var(--padding-input));
    height: 2.8rem;
    background-color: $neutral-color;
    outline: thin solid $contrast-color;
    border: none;
    text-decoration-line: none;
    border-radius: .5rem;
    box-shadow: 0 0 15px 0 #0003;
    font-size: 1.1rem;
    color: #222;
    padding: 0 var(--padding-input);
    transition: box-shadow .5s linear;
}

input:active    {
    border: none;
    box-shadow: none;
    text-decoration-line: none;
    outline: none
}
form, .form {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}
.form   {
    gap: 1.2rem
}

form    {
    gap: 2rem
}

input[type="submit"]    {
    --padding-width: 1rem;
    outline: none;
    box-shadow: none;
    border: none;
    background-color: $contrast-color;
    cursor: pointer;
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #eee;
    text-decoration: none;
    font-family: "Built Titling";
    font-size: 1.5rem;
    width: calc(25% - var(--padding-width));
    min-width: calc(300px - var(--padding-width));
    border-radius: .5rem;
    transition: background-color .2s linear
}
</style>
