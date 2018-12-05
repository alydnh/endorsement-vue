<template>
    <div class="GridCell" :style="style">
        <slot></slot>
        <div :class="{'hr-show': deleted}" v-if="deleted">
        </div>
    </div>

</template>

<script>
export default {
    name: 'GridCell',
    props: {
        flexWidth: { type: [Number, String], default: '1' },
        minWidth: { type: [Number, String], default: '' },
        maxWidth: { type: [Number, String], default: '' },
        deleted: { type: Boolean, default: false },
        justifyContent: { type: String, default: 'flex-start' },
    },
    computed: {
        style() {
            const style = {};
            if (this.flexWidth) {
                style.flex = this.flexWidth;
            }
            if (this.minWidth) {
                style.minWidth = this.minWidth;
            }
            if (this.maxWidth) {
                style.maxWidth = this.maxWidth;
            }
            if (this.justifyContent) {
                style.justifyContent = this.justifyContent;
            }
            return style;
        },
    },
};
</script>

<style lang="scss" scoped>
.GridCell {
    font-size: 14px;
    /* overflow: hidden; */
    position: relative;
    padding: 5px;
    white-space: nowrap;
    display: flex;
    justify-content: flex-start;
    align-items: center;
}

.hr-show {
    position: absolute;
    top: 50%;
    left: 0;
    height: 1px;
    width: 100%;
    border: none;
    background-color: grey;
}
</style>
