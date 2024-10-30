<style lang="scss" scoped>
@use '@/assets/styles/RepoPreview.scss';
</style>
<template>
    <a :href="this.href" class="repo-preview" target="_blank" :class="(lang == null) ? 'markdown': lang.toLowerCase()">
        <div class="about">
            <p class="name">
                {{ this.name.toUpperCase().split("-").join(" ") }}
            </p>
            <p class="lang">
                {{ (lang == null) ? 'Markdown': lang }}
            </p>
        </div>
        <img :src="'/lang/' + ((lang == null) ? 'markdown': lang.toLowerCase()) + '.svg'" :class="(lang == null) ? 'markdown': lang.toLowerCase()" :alt="(lang == null) ? 'markdown': lang.toLowerCase()" lazy="load">
    </a>
</template>

<script>
export default {
    props:  {
        name:   {
            type: String
        },
        href:   {
            type: String
        },
        lang:   {
            type: String
        },
        isfork: {
            type: Boolean,
            default: false
        }
    }
}

</script>
