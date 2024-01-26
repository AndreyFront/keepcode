<script setup>
    import MainLayout from '@/layouts/MainLayout.vue'
</script>

<template>
    <component :is="$route.meta.layout || MainLayout">
        <router-view />
    </component>
</template>

<style lang="scss"></style>