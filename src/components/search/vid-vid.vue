<template>
    <div class="search-item">
        <pt-title>{{highlights[0]}}</pt-title>
        <pt-title important>{{highlights[1]}}</pt-title>
        <pt-title>{{highlights[2]}}</pt-title>
    </div>
</template>

<script>
import __ from '../../utils/__';

export default {
    name: 'searchItemVidVid',
    props: {
        item: { type: Object, required: true },
        keyword: { type: String, required: true },
    },
    computed: {
        highlights() {
            return __.getHighlightTexts(this.item.keyword, this.keyword);
        },
    },
};
</script>
