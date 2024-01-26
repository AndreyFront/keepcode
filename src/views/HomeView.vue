<script setup>
    import { onMounted, watch, ref } from 'vue'
    import { useStore } from '@/store'
    import MyTasks from '@/components/MyTasks.vue'
    import MyPreloader from '@/ui/MyPreloader.vue'
    import MyForm from '@/components/MyForm.vue'

    const store = useStore()

    const tasks = ref([]),
    activeTab = ref(1)

    watch(
        () => store.tasks, 
        (newValue) => {
            if (store.activeTab === 1) {
                tasks.value = newValue
            } else if (store.activeTab === 2) {
                tasks.value = store.getCompletedLocalTasks
            }
        },
        { deep: true }
    )


    watch(() => store.activeTab, (newValue) => {
        activeTab.value = newValue

        if (newValue === 1) {
            tasks.value = store.tasks
        } else if (newValue === 2) {
            tasks.value = store.getCompletedLocalTasks
        } else {
            
        }
    })

    onMounted(() => {
        store.getLocalTasks()
    })
</script>

<template>
    <div class="home-view" v-auto-animate>
        <MyTasks v-if="activeTab !== 3 && !store.loading" :tasks="tasks" />
        <MyForm v-if="activeTab === 3" />
        <MyPreloader :class="{ 'active': store.loading }" />
    </div>
</template>

<style lang="scss">
    .home-view {
        position: relative;
    }
</style>