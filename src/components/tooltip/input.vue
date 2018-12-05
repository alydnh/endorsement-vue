<template>
    <ptit-tooltip-container :style="{width:width}" :tooltip="tooltip" :effect="tooltipEffect"
        :iconClasses="iconClasses" :color="tooltipColor" @on="onShowTooltip"
        @off="onOffTooltip" :hOffset="iconHOffset">
        <el-autocomplete v-if="isInput && suggestionMode" v-bind="$attrs" v-on="$listeners"
            ref="elInput" v-model="currentValue" @change="onBlur" />
        <el-date-picker v-else-if="isDatePicker" v-bind="$attrs" ref="elInput"
            v-model="currentValue" @change="onBlur" />
        <el-input-number v-else-if="isNumber" :debounce="1000" v-bind="$attrs"
            ref="elInput" v-model="currentValue" @change="onBlur" />
        <el-select v-else-if="isSelect" v-bind="$attrs" ref="elInput" v-model="currentValue"
            @change="onBlur" @visible-change="onSelectVisibleChange">
            <slot></slot>
        </el-select>
        <el-input v-else v-bind="$attrs" v-on="$listeners" ref="elInput"
            v-model="currentValue" @blur="onBlur" @change="onBlur" />
    </ptit-tooltip-container>
</template>

<script>
import _ from 'underscore';

export default {
    name: 'PtInput',
    props: {
        tooltipColor: { type: String, default: 'red' },
        showInputBorder: { type: Boolean, default: true },
        tooltip: { type: String, default: null },
        iconClasses: { type: String, default: 'fa fa-warning' },
        value: { type: [String, Number, Date] },
        tooltipEffect: { type: String, default: 'red' },
        validate: { type: [Function, Object], default: _.noop() },
        width: { type: String, default: 'auto' },
        inputType: { type: String, default: 'input' },
    },
    data() {
        return {
            currentValue: this.value,
        };
    },
    methods: {
        getInputNode() {
            let elInput = this.$refs.elInput;
            if (!_.isEmpty(elInput)) {
                if (this.suggestionMode || this.isNumber) {
                    elInput = elInput.$refs.input;
                } else if (this.isDatePicker) {
                    elInput = elInput.$refs.reference;
                } else if (this.isSelect) {
                    elInput = elInput.$refs.reference;
                }
                return elInput.$refs.input;
            }
            return null;
        },
        setInputBorderColor(color) {
            if (this.showInputBorder) {
                const input = this.getInputNode();
                if (!_.isEmpty(input)) {
                    input.style.borderColor = color;
                }
            }
        },
        onShowTooltip() {
            this.setInputBorderColor(this.tooltipColor);
        },
        onOffTooltip() {
            this.setInputBorderColor('');
        },
        onBlur(event) {
            if (_.isFunction(this.validate)) {
                this.validate(this.currentValue);
            }

            this.$emit('blur', event);
            if (this.isSelect) {
                this.$emit('change', event);
            }
        },
        onSelectVisibleChange(value) {
            if (!value) {
                this.doValidate();
            }
        },
        doValidate() {
            if (_.isFunction(this.validate)) {
                this.validate(this.currentValue);
            } else if (_.isObject(this.validate) && _.isFunction(this.validate.validate)) {
                this.validate.validate(this.currentValue);
            }
        },
    },
    computed: {
        suggestionMode() {
            return _.has(this.$attrs, 'fetch-suggestions');
        },
        isInput() {
            return this.inputType === 'input';
        },
        isNumber() {
            return this.inputType === 'number';
        },
        isDatePicker() {
            return this.inputType === 'date';
        },
        isSelect() {
            return this.inputType === 'select';
        },
        iconHOffset() {
            return this.isDatePicker || this.isSelect ? 10 : 0;
        },
    },
    watch: {
        value(value) {
            this.currentValue = value;
        },
        currentValue(value) {
            this.$emit('input', value);
            this.doValidate();
        },
    },
};
</script>
<style>
.ptit-tooltip-container > .el-autocomplete {
    width: 100%;
}

.ptit-tooltip-container > .el-input-number {
    width: 100%;
}

.ptit-tooltip-container > .el-date-editor {
    width: 100%;
}

.close-icon {
    cursor: pointer;
}
</style>
