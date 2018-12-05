<template>
    <div class="grid-head-column" :style="{'flex': flexWidth, 'min-width': minWidth}">
        <div class="static" :style="{'text-align': textAlign}">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'GridHeadColumn',
    props: {
        flexWidth: { type: [Number, String], default: '1' },
        textAlign: { type: String, default: '' },
        minWidth: { type: [Number, String], default: '' },
    },
};
</script>

<style scoped>
.grid-head-column {
    padding: 5px;
    overflow: hidden;
}
</style>
