<template>
    <div class="search-item">
        <pt-title>包含</pt-title>
        <pt-title left-gap="2">{{ highlights[0] }}</pt-title>
        <pt-title important>{{ highlights[1] }}</pt-title>
        <pt-title>{{ highlights[2] }}</pt-title>
        <pt-title left-gap="2">的{{ typeName }}</pt-title>
    </div>
</template>

<script>
import __ from '../../utils/__';

export default {
    name: 'searchItemVidEidTitleReceiptidReceiptid',
    props: {
        item: { type: Object, required: true },
        keyword: { type: String, required: true },
    },
    computed: {
        highlights() {
            return __.getHighlightTexts(this.item.keyword, this.keyword);
        },
        typeName: {
            get() {
                let name = '';

                switch (this.item.returnType) {
                    case 'inbound': {
                        name = '入库单';

                        break;
                    }
                    case 'import_declaration': {
                        name = '进境报关建议书';

                        break;
                    }
                    case 'import_certificate': {
                        name = '进口证明书';

                        break;
                    }
                    case 'outbound': {
                        name = '出库单';

                        break;
                    }
                    default: {
                        name = '';

                        break;
                    }
                }

                if (!name) {
                    switch (this.item.keyword.substr(0, 3)) {
                        case 'RK_': {
                            name = '入库单';

                            break;
                        }
                        case 'ID_': {
                            name = '进境报关建议书';

                            break;
                        }
                        case 'IC_': {
                            name = '进口证明书';

                            break;
                        }
                        case 'CK_': {
                            name = '出库单';

                            break;
                        }
                        default: {
                            name = '';

                            break;
                        }
                    }
                }

                if (!name) {
                    return '未知单据类型';
                }

                return name;
            },
        },
    },
};
</script>
