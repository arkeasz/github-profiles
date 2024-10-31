<template>
    <Nav />
    <div v-if="isLoading" class="loading">
        Loading...
    </div>
    <div v-else-if="userCount > 0" class="users-container">
        <UserPreview v-for="profile in usersProfiles" :userProfile="profile" :key="profile.id"/>
    </div>
    <div v-else class="not-found">
            not found account
    </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Encode+Sans:wght@600&display=swap');
.users-container    {
    display: grid;
    width: 90%;
    padding: 1.8rem 0;
    margin: 4rem auto;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    grid-auto-rows: 250px;
    gap: 3rem;
    place-items: center;
    place-content: center;
}
@media (max-width: 500px) {
    .users-container    {
        --padding-users-container: 2.5rem;
        width: calc(100% - var(--padding-users-container));
    }
}
.not-found, .loading  {
    padding: 1.8rem 0;
    width: 100%;
    min-height: calc(100vh - 4.8rem);
    display: grid;
    place-items: center;
    color: #ddd;
    font-size: 3rem;
    font-family: 'Encode Sans', sans-serif;
    text-transform: capitalize;
    text-shadow: 0 0 15px #111;
    text-align: center
}
</style>

<script>
import UserPreview from "../components/UserPreview.vue"
import Nav from "../components/NavBar.vue"
import { ref } from '@vue/reactivity'
export default  {
    setup() {
        let locationPathUser = new URL(location.href).searchParams.get("user");
        locationPathUser = locationPathUser.replace(/search\//ig, "" ).replace(/\//ig, "")

        let usersProfiles = ref([]);
        let userCount = ref(0);
        const isLoading = ref(true);

        const fetchUsers = async () => {
            try {
                const response = await fetch(`https://ghprofileapi.vercel.app/search-users?q=${locationPathUser}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const data = await response.json();
                usersProfiles.value = data.items || [];
                userCount.value = data.total_count
            } catch (error) {
                console.error("Error fetching users:", error);
            } finally {
                isLoading.value = false;
            }
        };
        fetchUsers()
        return  {
            usersProfiles,
            userCount,
            isLoading
        }
    },
    components: {
        UserPreview,
        Nav
    },
}
</script>
