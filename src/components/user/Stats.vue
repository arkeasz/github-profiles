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
@use '@/assets/styles/Stats.scss';
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

            let data = await useFetch("https://ghprofileapi.vercel.app/get-repos/" + getUser)
            return data.value
        }

        repositories.value  = fetchRepositories();
        console.log(repositories)

        Promise.resolve(repositories.value)
            .then(async (repos) =>    {
                let languagesR = []
                const languagePromises = repos.map(async (repo) => {
                    const objLang = await fetch(
                        "https://ghprofileapi.vercel.app/get-repo/" + getUser + "/" + repo.name + "/languages"
                    );
                    const dataLang = await objLang.json();

                    if (Object.keys(dataLang)[0] === undefined) {
                        if (Object.keys(dataLang).length > 1) {
                        languagesR.push(Object.keys(dataLang)[1]);
                        } else {
                        languagesR.push("markdown");
                        }
                    } else {
                        languagesR.push(Object.keys(dataLang)[0]);
                    }
                });

            await Promise.all(languagePromises);
            languages.value = languagesR;

            let numRandom = Math.floor(Math.random() * repos.length);
            repoRandom.value = repos[numRandom];
            license.value = repoRandom.value.license ? repoRandom.value.license.name : "";
            nameRepo.value = repoRandom.value.name;
            techRepoRandom.value = repoRandom.value.language || "";
            star.value = repoRandom.value.stargazers_count;
            linkRepoRandom.value = repoRandom.value.html_url;
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
