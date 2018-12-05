<template>
    <div class="search-item">
        <div class="items">
            <div class="item">
                <pt-title>{{highlights[0]}}</pt-title>
                <pt-title important>{{highlights[1]}}</pt-title>
                <pt-title>{{highlights[2]}}</pt-title>
            </div>
            <div class="item">
                <pt-title minor>共{{item.result.length}}辆车</pt-title>
            </div>
        </div>
    </div>
</template>

<script>
import __ from '../../utils/__';

export default {
    name: 'searchItemReceiptidTitleVids',
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

<style lang="scss" scoped>
.items {
    display: flex;
    flex-direction: column;
    .item {
        display: flex;
    }
}
</style>
