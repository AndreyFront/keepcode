<script setup>
    import { ref } from 'vue'
    import { useStore } from '@/store'
    import IconCircleCheck from '@/components/icons/IconCircleCheck.vue'
    import MyInput from '@/ui/MyInput.vue'

    const store = useStore()

    const task = ref(''),
    isСompletion = ref(false)

    function getText(text) {
        task.value = text

        if (task.value.length > 5) {
            isСompletion.value = true
        } else {
            isСompletion.value = false
        }
    }

    function createTask() {
        store.setLocalTask(task.value.trim())
        store.setActiveTab(1)
        task.value = ''
    }
</script>

<template>
    <div class="form" :class="{ 'form--completion': isСompletion }">
        <form @submit.prevent="createTask">
            <MyInput placeholder="Нужно сделать ..." @change="getText" />
            <button type="submit" class="form__btn-create btn-reset">
                <IconCircleCheck />
            </button>
        </form>
    </div>
</template>

<style lang="scss">
    .form {
        position: relative;

        &--completion {

            .input {

                &__field {
                    width: calc(100% - 34px);
                }
            }

            .form {
                
                &__btn-create {
                    opacity: 1;
                    pointer-events: auto;
                }
            }
        }

        .input {
            
            &__field {
                transition: width $tr-time-p, border-color $tr-time-p;
            }
        }

        form {
            display: grid;
            align-items: center;
            grid-column-gap: 10px;
        }

        &__btn-create {
            position: absolute;
            top: 50%;
            right: 0;
            transform: translateY(-50%);
            width: 24px;
            height: 24px;
            opacity: 0;
            pointer-events: none;
            cursor: pointer;
            transition: opacity $tr-time-p;

            &:hover {
                opacity: 0.6;
            }
        }
    }
</style>