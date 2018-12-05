<template>
    <div class="grid-row" :style="{'flex': flexWidth}">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'GridRow',
    props: {
        selected: { type: Boolean, default: false },
        flexWidth: { type: [Number, String], default: '1' },
    },
};
</script>

<style lang="scss" scoped>
.grid-row {
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    padding-left: 5px;
    color: #4c4c4c;
}
</style>
