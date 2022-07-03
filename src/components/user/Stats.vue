<template>
    <div class="about">
        <div class="tech-star">
            <div class="title">
                Star Technology
            </div>
            <figure>

                <img 
                    :src="'/lang/' + this.getTechStar.toLowerCase()  + '.svg'"
                    :class="
                            (
                                this.getTechStar.toLowerCase() == 'rust' ||
                                this.getTechStar.toLowerCase() == 'handlebars'
                            )
                            ? 'white-icon'
                            : ''
                    " 
                    :alt="this.getTechStar"
                    :title="this.getTechStar"
                >
                <figcaption>{{ this.getTechStar }}</figcaption>
            </figure>
        </div>
        <Repo :name="this.nameRepo" :license="this.license" :tech="(this.techRepoRandom === '')? 'markdown' : this.techRepoRandom" :star="this.star" :link="this.linkRepoRandom"/>
    </div>
</template>

<style lang="scss">
@import '@/assets/styles/Stats.scss';
</style>

<script>
import { ref } from '@vue/reactivity';
import Repo from "./Repo.vue";
import getUser from '@/helpers/userPath.js'
import { useFetch } from '@/hooks/useFetch';

export default {
    computed: {
        getTechStar()   {
            const mostRepeat = ar => ar.reduce((acum, el, i, ar) => {
                const count = ar.filter(e => e == el).length;
                return count > acum[1] ? [el, count] :  acum
            }, ["", 0]);
            this.mostUsedTech = mostRepeat(this.languages)[0]

            return this.mostUsedTech
        },
        getRepoRandom() {
            return this.repoRandom;
        },
        nameRepository()    {
            return this.repoRandom.name
        }
    },
    setup() {
        let repositories = ref([]);
        let languages = ref([])
        let mostUsedTech = ref("")
        let repoRandom = ref({})
        let license = ref("")
        let nameRepo = ref("")
        let star = ref(0)
        let techRepoRandom = ref("")
        let linkRepoRandom = ref("")

        const fetchRepositories = async() => {
            
            let data = await useFetch("https://api.github.com/users/" + getUser + "/repos", {
                        headers: {
                            "Authorization": "Bearer " + import.meta.env.VITE_APP_GHTOKEN
                        }
                    })
            return data.value
        }

        repositories.value  = fetchRepositories();

        Promise.resolve(repositories.value)
            .then(repos =>    {
                console.log(repos)
                let languagesR = []
                repos.forEach(async(repo) =>   {
                    const objLang = await fetch(repo.languages_url, {
                        headers: {
                            "Authorization": "Bearer "+import.meta.env.VITE_APP_GHTOKEN
                        }
                    })
                    const dataLang = await objLang.json()

                    if (Object.keys(dataLang)[0] === undefined) {
                        if (Object.keys(dataLang) > 1 ) {
                            languagesR.push(Object.keys(dataLang)[1])
                        } else  {
                            languages.value.push('markdown')
                        }
                    } else  {
                        languages.value.push(Object.keys(dataLang)[0])
                    }
                    
                })
                let numRandom = Math.floor(Math.random() * repos.length)
                repoRandom.value = repos[numRandom]
                license.value = (repoRandom.value.license === null)? '' : repoRandom.value.license.name;
                nameRepo.value = repoRandom.value.name
                techRepoRandom.value = (repoRandom.value.language === null)? '' : repoRandom.value.language
                star.value = repoRandom.value.stargazers_count
                linkRepoRandom.value = repoRandom.value.html_url
        })

        return  {
            mostUsedTech,
            languages,
            repoRandom,
            license,
            nameRepo,
            techRepoRandom,
            star,
            linkRepoRandom
        }
    },
    components: { Repo }
}
</script>