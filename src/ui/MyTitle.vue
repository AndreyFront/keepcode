<script>
    import { defineComponent, h } from 'vue'
    
    export default defineComponent({
        name: 'MyTitle',
        props: {
            type: {
                type: String,
                required: true,
            },
            modifiers: {
                type: String
            }
        },
        render() {
            return h(this.type, { class: `title title--${this.type} ${this.modifiers}` }, this.$slots)
        }
    })
</script>

<style lang="scss">
    .title {
        margin: 0;
        line-height: 1.35em;
        font-weight: 500;

        &--h2,
        &--h3 {
            line-height: 1.36em;
        }

        &--h1 {
            font-size: 56px;
            line-height: 1.17em;
        }

        &--h2 {
            font-size: 34px;
        }
    }

    @media screen and (max-width: 1200px) {
        .title {

            &--h1 {
                font-size: 48px;
            }
        }
    }
</style>