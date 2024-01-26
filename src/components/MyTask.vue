<script setup>
    import { defineProps, ref } from 'vue'
    import { useStore } from '@/store'
    import IconCheck from '@/components/icons/IconCheck.vue'
    import IconEdit from '@/components/icons/IconEdit.vue'
    import IconTrash from '@/components/icons/IconTrash.vue'
    import IconCircleCheck from '@/components/icons/IconCircleCheck.vue'
    import IconStopEvent from '@/components/icons/IconStopEvent.vue'

    const store = useStore()

    const props = defineProps({
        id: {
            type: Number,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        completed: {
            type: Boolean,
            default: false,
            required: true
        }
    })

    const isCompleted = ref(props.completed),
    isEdit = ref(false),
    field = ref(null),
    title = ref(props.title)

    function completed() {
        isCompleted.value = !isCompleted.value
        if (isCompleted.value !== props.completed) store.setCompletedLocalTask(props.id, isCompleted.value)
    }

    function edit() {
        isEdit.value = !isEdit.value
        isCompleted.value = false
        store.setCompletedLocalTask(props.id, isCompleted.value)
        
        const newTitle = field.value.innerText.trim()

        if (!isEdit.value && title.value !== newTitle) {
            store.editLocalTask(props.id, newTitle)
        }
    }

    function reset() {
        const newTitle = field.value.innerText.trim()
        isEdit.value = false
        store.setCompletedLocalTask(props.id, isCompleted.value)
        
        if (title.value !== newTitle) field.value.innerText = title.value
    }

    function del() {
        store.delLocalTask(props.id)
    }
</script>

<template>
    <div 
        class="task" 
        :class="[
            { 'task--done': isCompleted },
            { 'task--edit': isEdit },
        ]"
    >
        <button class="task__btn task__btn--done btn-reset" @click="completed">
            <IconCheck class="task__btn-icon" />
        </button>
        <div class="task__field" :contenteditable="isEdit" ref="field">{{ title }}</div>
        <button class="task__btn task__btn--edit btn-reset" @click="edit">
            <IconEdit class="task__btn-icon" />
            <IconCircleCheck class="task__btn-icon" />
        </button>
        <button class="task__btn task__btn--reset btn-reset" @click="reset">
            <IconStopEvent class="task__btn-icon" />
        </button>
        <button class="task__btn btn-reset" @click="del">
            <IconTrash class="task__btn-icon" />
        </button>
    </div>
</template>

<style lang="scss">
    .task {
        position: relative;
        display: grid;
        grid-template-columns: 24px 1fr repeat(2, 24px);
        align-items: center;
        grid-column-gap: 10px;

        &:not(.task--edit):hover {
            .task {

                &__btn {

                    &--done {
                        opacity: 1;

                        &:hover {
                            opacity: 0.6;
                        }
                    }
                }
            }
        }

        &--done {
            .task {
                &__field {
                    text-decoration: line-through;
                    opacity: 0.6;
                }

                &__btn {

                    &--done {
                        opacity: 1;
                    }
                }
            }
        }

        &--edit {
            grid-template-columns: 24px 1fr repeat(3, 24px);

            .task {

                &__btn {

                    &--done {
                        pointer-events: none;
                        opacity: 0;
                    }

                    &--edit {
                        
                        svg {

                            &:first-child {
                                opacity: 0;
                            }

                            &:last-child {
                                opacity: 1;
                            }
                        }
                    }

                    &--reset {
                        display: block;
                    }
                }
            }
        }

        &__field {
            height: auto;
            max-height: 200px;
            overflow-y: auto;
            padding: 10px;
            border-radius: 5px;
            border: 1px solid transparent;
            outline: none;
            color: $color-p;
            line-height: 1.5em;
            background-color: transparent;
            transition: 
                opacity $tr-time-p, 
                background-color $tr-time-p, 
                border-color $tr-time-p, 
                color $tr-time-p;

            &[contenteditable=false] {
                cursor: default;
            }

            &[contenteditable=true] {
                border-color: $color-p;
            }

            &.active {
                color: $color-s;
                background-color: $color-p;
            }
        }

        &__btn {
            width: 24px;
            height: 24px;
            cursor: pointer;
            transition: opacity $tr-time-p;
            
            &:hover {
                opacity: 0.6;
            }

            &--done {
                opacity: 0;
            }

            &--edit {
                position: relative;
                
                svg {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;

                    &:first-child {
                        opacity: 1;
                    }

                    &:last-child {
                        opacity: 0;
                    }
                }
            }

            &--reset {
                display: none;
            }

            svg {
                transition: opacity $tr-time-p;
            }
        }
    }

    @media screen and (max-width: 1200px) {
        .task {

            &--edit {
                grid-template-columns: 1fr repeat(3, 24px);

                .task {

                    &__btn {

                        &--done {
                            position: absolute;
                            top: 50%;
                            left: 0;
                            transform: translateY(-50%);
                        }
                    }
                }
            }

            &__btn {

                &--done {
                    opacity: 1;
                }
            }
        }
    }
</style>