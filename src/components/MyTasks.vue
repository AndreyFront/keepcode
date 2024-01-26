<script setup>
    import { defineProps } from 'vue'
    import MyTask from '@/components/MyTask.vue'

    const props = defineProps({
        tasks: {
            type: Array,
            required: true
        },
    })
</script>

<template>
    <div class="tasks">
        <div v-if="tasks.length" class="tasks__list" v-auto-animate>
            <MyTask 
                v-for="task in tasks"
                :key="task.id"
                :id="task.id" 
                :title="task.title"
                :completed="task.completed"
            />
        </div>
        <span v-else>Нет задач</span>
    </div>
</template>

<style lang="scss">
    .tasks {

        &__list {
            display: grid;
            grid-row-gap: 10px;
        }
    }
</style>