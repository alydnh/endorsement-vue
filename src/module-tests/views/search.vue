<template>
    <div style="flex:auto">
        <search-input :types="['vId','note']" :expectedTypes="['vId','vIds']"
            @select="onSelect">
        </search-input>
    </div>
</template>

<script>
export default {
    methods: {
        onSelect(item) {
            this.$message(JSON.stringify(item));
        },
    },
};
</script>
