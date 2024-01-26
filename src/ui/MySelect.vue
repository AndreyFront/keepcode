<script setup>
    import { defineProps, defineEmits, ref, onMounted, watch } from 'vue'

    const emit = defineEmits(['selected']),
    props = defineProps({
        options: {
            type: Array,
            required: true
        },
        selectedOption: {
            type: Number,
            default: 1
        }
    })

    const isActive = ref(false),
    value = ref(''),
    activeOption = ref(props.selectedOption),
    currentSelect = ref(null)

    function setOption(option) {
        value.value = option.name
        isActive.value = false
        activeOption.value = option.id
        emit('selected', option.name)
    }

    watch(() => props.options, (newValue) => {
        newValue.forEach(option => {
            if (+option.id === activeOption.value) value.value = option.name
        })
    }, { deep: true })

    onMounted(() => {
        document.addEventListener('click', (event) => {
            const el = event.target

            if (el.closest('.select') !== currentSelect.value) {
                isActive.value = false
            }
        })
    })
</script>

<template>
    <div 
        class="select"
        :class="{ 'active': isActive }"
        ref="currentSelect"
    >
        <div class="select__header" @click="isActive = !isActive">
            <span class="select__value">{{ value }}</span>
            <img class="select__icon" src="@/assets/icons/arrow-down.svg" alt="">
        </div>
        <div class="select__content">
            <ul class="list-reset">
                <li
                    v-for="option in options"
                    :key="option.id"
                    :class="{ 'active': +option.id === activeOption }"
                    @click="setOption(option)"
                >{{ option.name }}</li>
            </ul>
        </div>
    </div>
</template>

<style lang="scss">
    .select {
        position: relative;
        z-index: 2;
        width: max-content;
        height: max-content;

        &.active {
            
            .select {

                &__header {
                    opacity: 1;
                }

                &__icon {
                    transform: rotate(-180deg);
                }

                &__content {
                    opacity: 1;
                    pointer-events: auto;
                    transform: translateY(0);
                }
            }
        }

        &.disabled {
            opacity: 0.6;
            pointer-events: none;
        }

        &__header {
            display: grid;
            align-items: center;
            grid-template-columns: 1fr max-content;
            justify-content: space-between;
            padding: 0 16px;
            width: 200px;
            height: 52px;
            cursor: pointer;
            border-radius: 4px;
            background-color: $color-p;
            transition: opacity $tr-time-p;

            &:hover {
                opacity: 0.6;
            }
        }

        &__value {
            color: $color-t;
            font-weight: 500;
        }

        &__icon {
            width: 30px;
            height: 30px;
            transition: transform $tr-time-p;
        }

        &__content {
            position: absolute;
            top: calc(100% + 4px);
            left: 0;
            width: 100%;
            padding: 16px;
            border-radius: 4px;
            background-color: $color-p;
            opacity: 0;
            pointer-events: none;
            transform: translateY(-4px);
            transition: opacity $tr-time-p, transform $tr-time-p;

            ul {
                display: grid;
                grid-row-gap: 10px;

                li {
                    font-weight: 500;
                    line-height: 1.1em;
                    color: $color-t;
                    cursor: pointer;
                    transition: opacity $tr-time-p;

                    &:hover {
                        opacity: 0.7;
                    }

                    &.active {
                        opacity: 0.3;
                        pointer-events: none;
                    }
                }
            }
        }
    }
</style>