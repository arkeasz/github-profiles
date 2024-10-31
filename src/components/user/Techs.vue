<template>
    <div id="techs" class="techs">
        <Tech v-for="lang in languages" :key="lang" :lang="lang"/>
    </div>
</template>

<style scoped>
.techs  {
    --padding-languages: 1rem;
    width: calc(94% - var(--padding-languages));
    padding: 1.1rem var(--padding-languages);
    grid-area: langs;
    grid-template-columns: repeat(auto-fit, minmax(9rem, 1fr));
    grid-auto-rows: 9rem;
    grid-auto-flow: dense;
    display: grid;
    place-items: center;
    align-items: center;
    gap: 1.7rem;
    border-radius: 1rem;
}
</style>
<script>
import { ref } from '@vue/reactivity';
import Tech from './Lang.vue'
import { useFetch } from "@/hooks/useFetch"
import getUser from '@/helpers/userPath.js'

export default {
    components: {
        Tech
    },
    setup() {
        let repositories = ref({})
        let languages = ref([])
        let userPath = location.pathname

        userPath = userPath.replace(/\/techs/ig, "")
        userPath = userPath.replace(/repos/ig, "")
        userPath = userPath.replace(/\//ig, "")

        const onlyUnique = (value, index, self) => self.indexOf(value) === index;

        const fetchLanguages = async() =>   {
            let obj = await fetch("https://ghprofileapi.vercel.app/get-repos/" + getUser, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            let data = obj.json()
            return data
        }

        repositories.value = fetchLanguages()

        let promisesRepos = []

        Promise.resolve(repositories.value)
            .then(repos =>   {

                let reposArray = repos.map(repo => repo.name)

                for(let i = 0; i < reposArray.length; i++)    {
                    promisesRepos.push(fetch('https://ghprofileapi.vercel.app/get-repo/' + userPath + '/' + reposArray[i] + '/languages', {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }))
                }

                Promise.all(promisesRepos)
                        .then(data =>    {
                            data.forEach(val => {
                                Promise.resolve(val.json())
                                    .then(lang =>   {
                                        languages.value = languages.value.concat(Object.keys(lang))
                                        languages.value = languages.value.filter( onlyUnique )
                                    })
                            })
                        })

            })

        return  {
            languages,
            repositories
        }
    }
}
</script>
