<template>
    <el-autocomplete v-model="text" :fetch-suggestions="onSearch" @select="onSelect"
        :placeholder="placeholder" value-key="keyword">
        <template slot-scope="{ item }">
            <search-item-vid-vid v-if="item.type=='vId' && item.returnType=='vId'"
                :item="item" :keyword="text" />
            <search-item-eid-vid v-else-if="item.type=='eId' && item.returnType=='vId'"
                :item="item" :keyword="text" />
            <search-item-note-vids v-else-if="item.type==='note' && item.returnType=='vIds'"
                :item="item" :keyword="text" />
            <search-item-receiptid-title-vids v-else-if="item.type === 'receipt' && item.returnType === 'vIds'"
                :item="item" :keyword="text" />
            <search-item-vid-eid-title-receiptid-receiptid v-if="hasReturnType(item)"
                :item="item" :keyword="text" />
        </template>
    </el-autocomplete>
</template>

<script>
import _ from 'lodash';
import CarInfoApi from '../../api/module-car-info/car-info-api';

export default {
    name: 'SearchInput',
    props: {
        types: { type: Array, required: true },
        expectedTypes: { type: Array, required: true },
        minLength: { type: Number, default: 3 },
        placeholder: { type: String, default: '输入搜索关键字（至少三位字符）' },
    },
    data() {
        return {
            text: '',
        };
    },
    methods: {
        hasType(type) {
            return _.some(this.types, p => p === type);
        },
        onSearch(text, cb) {
            const processedText = text.trim();

            if (processedText.length < this.minLength) {
                cb([]);
                return;
            }
            const returnType = this.expectedTypes.join(',');
            const types = this.types.join(',');
            CarInfoApi.getCarsAndReceiptList(processedText, returnType, types).then(p => cb(p));
        },
        onSelect(item) {
            this.$emit('select', item);
        },
        hasReturnType(item) {
            const returnTypes = [
                'receipt',
                'inbound',
                'outbound',
                'import_declaration',
                'import_certificate',
            ];

            return returnTypes.includes(item.returnType);
        },
    },
};
</script>

<style lang="scss" scoped>
.search-item {
    display: flex;
}
</style>
