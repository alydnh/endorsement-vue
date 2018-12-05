<template>
    <span>{{text}}</span>
</template>

<script>
export default {
    name: 'PtText',
    props: {
        translation: { type: Boolean, default: true },
        text: { type: String },
    },
    computed: {
        computedText() {
            return this.translation ? this._tt(this.text) : this.text;
        },
    },
};
</script>
