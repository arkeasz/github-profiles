<style scoped>
@import '@/assets/styles/User.scss';
</style>

<template>
    <section class="user">
        <Nav />
        <div class="user-stats">    
            <div class="container-avatar-stats">
                <Avatar 
                    :name="this.name"
                    :avatar_image="this.avatar_image"
                    :twitter="(this.twitter == null)? '' : this.twitter"
                    :github="this.github"
                    :repos="this.total_repos" 
                    :followers="this.followers" 
                    :following="this.following"
                />
                <Stats />
            </div>
            <div class="markdown">
                <div v-html="markdown"></div>
            </div>
        </div>
    </section>
</template>

<script>
import Nav from '@/components/user/Nav.vue';
import Avatar from '@/components/user/Avatar.vue';
import Techs from '@/components/user/Techs.vue';
import Stats from '@/components/user/Stats.vue';
import { ref } from '@vue/reactivity';
import getUser from '@/helpers/userPath.js'

export default {
    components: {
    Nav,
    Avatar,
    Techs,
    Stats,
},
    setup() {

        let name = ref("")
        let avatar_image = ref("")
        let github = ref("")
        let twitter = ref("")
        let total_repos = ref(0)
        let followers = ref(0)
        let following = ref(0)
        let markdown = ref("")
        

        const fetchMarkdown = async () =>    {
            const obj = await fetch("https://ghpapi.herokuapp.com/u/" + getUser)
            const data = await obj.json();
            markdown.value = (data.md == null)? '<h1>MARKDOWN NOT FOUND</h1>' : data.md 

        }

        const fetchUserData = async () =>    {
            const obj = await fetch("https://api.github.com/users/" + getUser, {
                headers: {
                    "Authorization": "Bearer "+import.meta.env.VITE_APP_GHTOKEN
                }
            })
            const data = await obj.json();

            avatar_image.value = data.avatar_url
            name.value = data.login
            github.value = data.html_url,
            twitter.value = data.twitter_username
            total_repos.value = data.public_repos
            followers.value = data.followers
            following.value = data.following
            document.querySelector('title').textContent = data.login
        }

        fetchUserData()
        fetchMarkdown()
        return  {
            avatar_image,
            name,
            github,
            twitter,
            total_repos,
            followers,
            following,
            markdown
        }
    }
}
</script>