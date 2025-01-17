<style scoped>
@import '@/assets/styles/User.scss';
</style>

<template>
    <section class="user">
        <Nav />
        <div class="user-stats">
            <div class="container-avatar-stats">
                <Avatar
                    :name="this.user.name"
                    :avatar_image="this.user.avatar_image"
                    :twitter="(this.user.twitter == null)? '' : this.user.twitter"
                    :github="this.user.github"
                    :repos="this.user.total_repos"
                    :followers="this.user.followers"
                    :following="this.user.following"
                />
                <Stats />
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

        let user = ref({
            name: "",
            avatar_image: "",
            github: "",
            twitter: "",
            total_repos: 0,
            followers: 0,
            following: 0
        })

        const fetchUserData = async () =>    {
            const obj = await fetch("https://ghprofileapi.vercel.app/get-profile/" + getUser, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const data = await obj.json();

            user.value =  {
                name: data.login,
                avatar_image: data.avatar_url,
                github: data.html_url,
                twitter: data.twitter_username,
                total_repos: data.public_repos,
                followers: data.followers,
                following: data.following
            }
            document.querySelector('title').textContent = user.value.name
        }

        fetchUserData()

        return  {
            user
        }
    }
}
</script>
