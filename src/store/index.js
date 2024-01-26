import { computed, ref } from 'vue'
import { createPinia, defineStore } from 'pinia'
import axios from '@/middleware/axios.js'

const pinia = createPinia(),
useStore = defineStore('store', () => {
    const tasks = ref([]),
    loading = ref(false),
    activeTab = ref(1),
    getCompletedLocalTasks = computed(() => {
        return tasks.value.filter(task => task.completed)
    }),
    getAwaitLocalTasks = computed(() => {
        return tasks.value.filter(task => !task.completed)
    })

    async function getRemoteTasks() {
        try {
            loading.value = true
            setTimeout(async() => {
                const { data } = await axios.get('todos/?_limit=10')
                tasks.value = data
                loading.value = false
                localStorage.setItem('tasks', JSON.stringify(data))
            }, 1000)
        } catch (error) {
            console.log('error getRemoteTasks', error)
            loading.value = false
        }
    }

    function setActiveTab(number) {
        activeTab.value = number
    }

    function getLocalTasks() {
        if (localStorage.getItem('tasks')) {
            tasks.value = JSON.parse(localStorage.getItem('tasks'))
        } else {
            getRemoteTasks()
        }
    }

    function setLocalTask(task) {
        tasks.value.push({
            id: Date.now(),
            title: task,
            completed: false
        })
        localStorage.setItem('tasks', JSON.stringify(tasks.value))
    }

    function delLocalTask(id) {
        tasks.value = tasks.value.filter(task => task.id !== id)
        localStorage.setItem('tasks', JSON.stringify(tasks.value))
    }

    function editLocalTask(id, title) {
        tasks.value = tasks.value.map(task => {
            if (task.id === id) {
                task.title = title
            }

            return task
        })
        localStorage.setItem('tasks', JSON.stringify(tasks.value))
    }

    function setCompletedLocalTask(id, status) {
        tasks.value = tasks.value.map(task => {
            if (task.id === id) {
                task.completed = status
            }

            return task
        })
        localStorage.setItem('tasks', JSON.stringify(tasks.value))
    }

    return {
        tasks,
        loading,
        activeTab,

        getCompletedLocalTasks,
        getAwaitLocalTasks,

        getRemoteTasks,
        getLocalTasks,
        delLocalTask,
        editLocalTask,
        setCompletedLocalTask,
        setActiveTab,
        setLocalTask
    }
})

export { pinia, useStore }