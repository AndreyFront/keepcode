<script setup>
    import { defineProps } from 'vue'

    const props = defineProps({
        name: {
            type: String
        },
        type: {
            type: String,
            default: 'button'
        },
    })
</script>

<template>
    <button 
        class="btn" 
        :type="type"
        @click="$emit('click', $event)"
    >
        <span class="btn__name">{{ name }}</span>
        <slot />
    </button>
</template>
  
<style lang="scss">
    .btn {
        position: relative;
        display: grid;
        justify-content: center;
        align-items: center;
        width: max-content;
        height: 40px;
        padding: 0 20px;
        text-decoration: none;
        cursor: pointer;
        border: 1px solid;
        border-color: transparent;
        border-radius: 20px;
        transition: background-color $tr-time-p, border-color $tr-time-p, opacity $tr-time-p;

        &:hover {
            opacity: 0.6;
        }

        &.disabled {
            opacity: 0.5;
            pointer-events: none;
        }

        &__name {
            color: $color-p;
            font-size: 14px;
            font-weight: 600;
            line-height: 1em;
            transition: color $tr-time-p;
        }

        &--theme--p {
            background-color: $color-t;
        }

        &--theme--s {
            background-color: $color-q;

            &.active {
                background-color: $color-t;

                &:hover {
                    opacity: 1;
                    cursor: default;
                }
            }
        }
    }
</style>