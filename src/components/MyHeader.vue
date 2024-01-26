<script setup>
    import { useStore } from '@/store'
    import MyTitle from '@/ui/MyTitle.vue'
    import MyBtn from '@/ui/MyBtn.vue'

    const store = useStore()

    const tabs = [
        {
            id: 1,
            value: 'Все задачи'
        },
        {
            id: 2,
            value: 'Выполненные'
        },
        {
            id: 3,
            value: 'Создать'
        }
    ]
</script>

<template>
    <header class="header">
        <MyTitle type="h1">Todos</MyTitle>
        <nav class="header__nav">
            <ul class="list-reset">
                <li 
                    v-for="tab in tabs"
                    :key="tab.id"
                >
                    <MyBtn 
                        class="btn--theme--s"
                        :class="{ 'active': store.activeTab === tab.id }" 
                        :name="tab.value"
                        @click="() => store.setActiveTab(tab.id)"
                    />
                </li>
            </ul>
        </nav>
    </header>
</template>

<style lang="scss">
    .header {
        display: grid;
        grid-row-gap: 20px;
        text-align: center;

        &__nav {

            ul {
                display: grid;
                grid-auto-flow: column;
                grid-auto-columns: 1fr;
                grid-column-gap: 10px;
            }

            .btn {
                width: 100%;
            }
        }
    }

    @media screen and (max-width: 576px) {
        .header {

            &__nav {

                ul {
                    grid-auto-flow: row;
                    grid-row-gap: 10px;
                }
            }
        }
    }
</style>