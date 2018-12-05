<template>
    <div class="grid-head-row">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'GridHeadRow',
};
</script>

<style lang="scss" scoped>
.grid-head-row {
    display: flex;
    flex-flow: row wrap;
    flex: 1;
    background-color: #e5e9f2;
    font-size: 13px;
    color: rgb(128, 128, 128);
    align-items: center;
    min-height: 40px;
    padding-left: 5px;
    overflow: hidden;
}
</style>
