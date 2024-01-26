<script setup>
    import { useStore } from '@/store'

    const store = useStore()
</script>

<template>
    <footer class="footer">
        <span 
            class="footer__count-tasks" 
            :class="{ 'active': store.tasks.length }"
        > 
            Всего {{ store.tasks.length }}
        </span>
    </footer>
</template>

<style lang="scss">
    .footer {
        text-align: center;

        &__count-tasks {
            display: grid;
            color: $color-p-03;
            opacity: 0;
            transform: translateY(-10px);
            transition: opacity $tr-time-p, transform $tr-time-p;

            &.active {
                opacity: 1;
                transform: translateY(0);
            }
        }
    }
</style>