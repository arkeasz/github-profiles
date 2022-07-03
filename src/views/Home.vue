<template>
    <section class="home">
        <div class="search">
            <h1 class="logo">
                GHProfile
            </h1>        
            <SearchProfiles />
        </div>
    </section>
</template>


<script>
import SearchProfiles from "@/components/SearchProfiles.vue";

export default {
    components: { SearchProfiles },
}
</script>

<style scoped>

@font-face {
    font-family: "Built Titling";
    src: url("../assets/fonts/BuiltTitling.ttf");
}

.home   {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    min-height: 100vh;
}
.search {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 1rem 0;
    flex-direction: column;
    gap: 2rem;
    color: #eee
}

.logo   {
    font-family: "Built Titling";
    font-size: 5rem;
    color: #ddd;
    pointer-events: none;
}
</style>