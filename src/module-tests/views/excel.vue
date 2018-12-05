<template>
    <div style="flex:auto">
        <el-input type="textarea" :autosize="{minRows:5, maxRows:10}"
            placeholder="输入json" v-model="text"></el-input>
    </div>
</template>

<script>
import ExcelUtil from '../../utils/excel-utils';

export default {
    data() {
        return {
            text: '',
            excel: {},
        };
    },
    created() {},
    methods: {},
    watch: {
        text(value) {
            this.excel = ExcelUtil.parse(JSON.parse(value));
            // console.log(this.excel);
            // console.log(this.excel.defaultSheet.getTitleColumns());
            // console.log(this.excel.defaultSheet.getMaxRows());
            // console.log(this.excel.defaultSheet.getRowAsObject(1));
            // console.log(this.excel.defaultSheet.getRowAsObject(2));
            this.carModelFactory();
        },
    },
};
</script>
