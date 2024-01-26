<script setup>
    import MyHeader from '@/components/MyHeader.vue'
    import MyFooter from '@/components/MyFooter.vue'
</script>

<template>
    <div class="main-layout">
        <MyHeader />
        <div class="main-layout__page">
            <slot />
        </div>
        <MyFooter />
    </div>
</template>

<style lang="scss">
    .main-layout {
        display: grid;
        align-content: center;
        justify-content: center;
        grid-template-columns: minmax(100px, 600px);
        grid-row-gap: 20px;
        min-height: 100dvh;
        padding: 20px;
        background-color: $color-s;

        &__page {
            max-width: 900px;
            padding: 20px;
            overflow: hidden;
            border: 1px solid $color-p-01;
            border-radius: 10px;
        }
    }
</style>