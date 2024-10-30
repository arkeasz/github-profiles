<template>
    <section class="repositories">
        <Nav/>
        <div class="repo-preview-container" >
            <RepoPreview
                v-for="repo in repositories"
                :key="repo.id"
                :name="repo.name"
                :href="repo.html_url"
                :lang="repo.tech_star"
                :isfork="repo.fork"
            />
        </div>
    </section>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as variables;
@import url('https://fonts.googleapis.com/css2?family=Encode+Sans:wght@600&display=swap');
.repo-preview-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    grid-auto-rows: 150px;
    place-content: center;
    place-items: center;
    gap: 4rem;
    width: 90%;
    margin: 2rem auto;
    font-family: 'Encode Sans', sans-serif;
}
</style>

<script>
import RepoPreview from "@/components/RepoPreview.vue"
import { ref } from '@vue/reactivity';
import Nav from "@/components/user/Nav.vue";
import { useFetch } from "@/hooks/useFetch"
import getUser from '@/helpers/userPath.js'
export default {
    setup() {
        let repositoriesPromise = ref(null)
        let repositories = ref([])
        let newrepos = ref([])

        const fetchRepositories = async () =>    {

            let data = await useFetch("https://ghprofileapi.vercel.app/get-repos/" + getUser)
            repositoriesPromise.value = data.value.map(repo => repo);


            Promise.resolve(repositoriesPromise.value)
                .then(async(repos) =>   {
                    repositories.value = await repos

                    for (let i = 0; i < 8; i++) {
                        const objRepo = await fetch(repos[i].languages_url)
                        const dataRepo = await objRepo.json()
                        repos[i].tech_star = Object.keys(dataRepo)[0]
                        newrepos.value.push(repos[i])
                    }

                    repositories.value = []
                    repositories.value = newrepos.value
                })
        }

        fetchRepositories()

        return  {
            repositories,
        }
    },
    components: { RepoPreview, Nav },
}
</script>
