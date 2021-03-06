<template>
    <div :class="[
    type === 'textarea' ? 'el-textarea' : 'el-input',
    inputSize ? 'el-input--' + inputSize : '',
    {
    'is-disabled': inputDisabled,
    'el-input-group': $slots.prepend || $slots.append || showMessage,
    'el-input-group--append': $slots.append,
    'el-input-group--prepend': $slots.prepend,
    'el-input--prefix': $slots.prefix || prefixIcon,
    'el-input--suffix': $slots.suffix || suffixIcon || clearable,
    'pt-input-message': showMessage,
}
    ]"
        @mouseenter="hovering = true"
        @mouseleave="hovering = false">
        <template v-if="type !== 'textarea'">
            <!-- 前置元素 -->
            <div class="el-input-group__prepend"
                v-if="$slots.prepend">
                <slot name="prepend"></slot>
            </div>
            <input :tabindex="tabindex"
                v-if="type !== 'textarea'"
                class="el-input__inner"
                v-bind="$attrs"
                :type="type"
                :disabled="inputDisabled"
                :readonly="readonly"
                :autocomplete="autoComplete || autocomplete"
                :value="currentValue"
                ref="input"
                @compositionstart="handleComposition"
                @compositionupdate="handleComposition"
                @compositionend="handleComposition"
                @input="handleInput"
                @focus="handleFocus"
                @blur="handleBlur"
                @change="handleChange"
                :aria-label="label"
                :style="inputStyles">
            <!-- 前置内容 -->
            <span class="el-input__prefix"
                v-if="$slots.prefix || prefixIcon">
                <slot name="prefix"></slot>
                <i class="el-input__icon"
                    v-if="prefixIcon"
                    :class="prefixIcon">
                </i>
            </span>
            <!-- 后置内容 -->
            <span class="el-input__suffix"
                v-if="$slots.suffix || suffixIcon || showClear || validateState && needStatusIcon">
                <span class="el-input__suffix-inner">
                    <template v-if="!showClear">
                        <slot name="suffix"></slot>
                        <i class="el-input__icon"
                            v-if="suffixIcon"
                            :class="suffixIcon">
                        </i>
                    </template>
                    <i v-else
                        class="el-input__icon el-icon-circle-close el-input__clear"
                        @click="clear"></i>
                </span>
                <i class="el-input__icon"
                    v-if="validateState"
                    :class="['el-input__validateIcon', validateIcon]">
                </i>
            </span>
            <!-- 后置元素 -->
            <div class="el-input-group__append"
                v-if="$slots.append">
                <slot name="append"></slot>
            </div>
            <!-- EDIT -->
            <div class="pt-input-message__append"
                v-if="showMessage">
                <el-tooltip v-if="showMessage"
                    :content="message.text"
                    placement="bottom"
                    effect="danger">
                    <i :class="messageIconClasses" />
                </el-tooltip>
            </div>
            <!-- END -->
        </template>
        <textarea v-else
            :tabindex="tabindex"
            class="el-textarea__inner"
            :value="currentValue"
            @compositionstart="handleComposition"
            @compositionupdate="handleComposition"
            @compositionend="handleComposition"
            @input="handleInput"
            ref="textarea"
            v-bind="$attrs"
            :disabled="inputDisabled"
            :readonly="readonly"
            :autocomplete="autoComplete || autocomplete"
            :style="textareaStyle"
            @focus="handleFocus"
            @blur="handleBlur"
            @change="handleChange"
            :aria-label="label">
    </textarea>
    </div>
</template>
<script>
import _ from 'lodash';
import emitter from 'element-ui/src/mixins/emitter';
import Migrating from 'element-ui/src/mixins/migrating';
import calcTextareaHeight from 'element-ui/packages/input/src/calcTextareaHeight';
import merge from 'element-ui/src/utils/merge';
import { isKorean } from 'element-ui/src/utils/shared';

export default {
    name: 'PtInput',

    componentName: 'PtInput',

    mixins: [emitter, Migrating],

    inheritAttrs: false,

    inject: {
        elForm: {
            default: '',
        },
        elFormItem: {
            default: '',
        },
    },

    data() {
        return {
            currentValue:
                this.value === undefined || this.value === null
                    ? ''
                    : this.value,
            textareaCalcStyle: {},
            hovering: false,
            focused: false,
            isOnComposition: false,
            valueBeforeComposition: null,
            message: {
                icon: '',
                text: '',
                color: '',
            },
        };
    },

    props: {
        value: [String, Number],
        size: String,
        resize: String,
        form: String,
        disabled: Boolean,
        readonly: Boolean,
        type: {
            type: String,
            default: 'text',
        },
        autosize: {
            type: [Boolean, Object],
            default: false,
        },
        autocomplete: {
            type: String,
            default: 'off',
        },
        /** @Deprecated in next major version */
        autoComplete: {
            type: String,
            validator(val) {
                process.env.NODE_ENV !== 'production' &&
                    console.warn(
                        "[Element Warn][Input]'auto-complete' property will be deprecated in next major version. please use 'autocomplete' instead.",
                    );
                return true;
            },
        },
        validateEvent: {
            type: Boolean,
            default: true,
        },
        suffixIcon: String,
        prefixIcon: String,
        label: String,
        clearable: {
            type: Boolean,
            default: false,
        },
        tabindex: String,
        messageMode: { type: Boolean, default: false },
        messageTrigger: { type: [Function, Object], default: () => () => {} },
    },

    computed: {
        inputStyles() {
            const styles = {};
            if (this.showMessage && !_.isEmpty(this.message.color)) {
                styles['border-color'] = this.message.color;
            }
            return styles;
        },
        showMessage() {
            return this.messageMode && !_.isEmpty(this.message.text);
        },
        messageIconClasses() {
            if (this.showMessage && !_.isEmpty(this.message.icon)) {
                return `${this.message.icon} cursor-pointer`;
            }
            return 'fa fa-square transparent';
        },
        _elFormItemSize() {
            return (this.elFormItem || {}).elFormItemSize;
        },
        validateState() {
            return this.elFormItem ? this.elFormItem.validateState : '';
        },
        needStatusIcon() {
            return this.elForm ? this.elForm.statusIcon : false;
        },
        validateIcon() {
            return {
                validating: 'el-icon-loading',
                success: 'el-icon-circle-check',
                error: 'el-icon-circle-close',
            }[this.validateState];
        },
        textareaStyle() {
            return merge({}, this.textareaCalcStyle, { resize: this.resize });
        },
        inputSize() {
            return (
                this.size || this._elFormItemSize || (this.$ELEMENT || {}).size
            );
        },
        inputDisabled() {
            return this.disabled || (this.elForm || {}).disabled;
        },
        showClear() {
            return (
                this.clearable &&
                !this.disabled &&
                !this.readonly &&
                this.currentValue !== '' &&
                (this.focused || this.hovering)
            );
        },
    },

    watch: {
        value(val, oldValue) {
            this.setCurrentValue(val);
        },
    },

    methods: {
        focus() {
            (this.$refs.input || this.$refs.textarea).focus();
        },
        blur() {
            (this.$refs.input || this.$refs.textarea).blur();
        },
        getMigratingConfig() {
            return {
                props: {
                    icon:
                        'icon is removed, use suffix-icon / prefix-icon instead.',
                    'on-icon-click': 'on-icon-click is removed.',
                },
                events: {
                    click: 'click is removed.',
                },
            };
        },
        handleBlur(event) {
            this.focused = false;
            this.$emit('blur', event);
            if (this.validateEvent) {
                this.dispatch('ElFormItem', 'el.form.blur', [
                    this.currentValue,
                ]);
            }
        },
        select() {
            (this.$refs.input || this.$refs.textarea).select();
        },
        resizeTextarea() {
            if (this.$isServer) return;
            const { autosize, type } = this;
            if (type !== 'textarea') return;
            if (!autosize) {
                this.textareaCalcStyle = {
                    minHeight: calcTextareaHeight(this.$refs.textarea)
                        .minHeight,
                };
                return;
            }
            const minRows = autosize.minRows;
            const maxRows = autosize.maxRows;

            this.textareaCalcStyle = calcTextareaHeight(
                this.$refs.textarea,
                minRows,
                maxRows,
            );
        },
        handleFocus(event) {
            this.focused = true;
            this.$emit('focus', event);
        },
        handleComposition(event) {
            if (event.type === 'compositionend') {
                this.isOnComposition = false;
                this.currentValue = this.valueBeforeComposition;
                this.valueBeforeComposition = null;
                this.handleInput(event);
            } else {
                const text = event.target.value;
                const lastCharacter = text[text.length - 1] || '';
                this.isOnComposition = !isKorean(lastCharacter);
                if (this.isOnComposition && event.type === 'compositionstart') {
                    this.valueBeforeComposition = text;
                }
            }
        },
        handleInput(event) {
            const value = event.target.value;
            this.setCurrentValue(value);
            if (this.isOnComposition) return;
            this.$emit('input', value);
            this.doMessageTrigger();
        },
        handleChange(event) {
            this.$emit('change', event.target.value);
        },
        setCurrentValue(value) {
            if (this.isOnComposition && value === this.valueBeforeComposition)
                return;
            this.currentValue = value;
            if (this.isOnComposition) return;
            this.$nextTick(this.resizeTextarea);
            if (this.validateEvent && this.currentValue === this.value) {
                this.dispatch('ElFormItem', 'el.form.change', [value]);
            }
        },
        calcIconOffset(place) {
            let elList = [].slice.call(
                this.$el.querySelectorAll(`.el-input__${place}`) || [],
            );
            if (!elList.length) return;
            let el = null;
            for (let i = 0; i < elList.length; i++) {
                if (elList[i].parentNode === this.$el) {
                    el = elList[i];
                    break;
                }
            }
            if (!el) return;
            const pendantMap = {
                suffix: 'append',
                prefix: 'prepend',
            };

            const pendant = pendantMap[place];
            if (this.$slots[pendant]) {
                el.style.transform = `translateX(${
                    place === 'suffix' ? '-' : ''
                }${
                    this.$el.querySelector(`.el-input-group__${pendant}`)
                        .offsetWidth
                }px)`;
            } else {
                el.removeAttribute('style');
            }
        },
        updateIconOffset() {
            this.calcIconOffset('prefix');
            this.calcIconOffset('suffix');
        },
        clear() {
            this.$emit('input', '');
            this.$emit('change', '');
            this.$emit('clear');
            this.setCurrentValue('');
            this.focus();
        },

        doMessageTrigger() {
            if (this.messageMode) {
                const message = this.messageTrigger(this.currentValue);
                if (!_.isEmpty(message)) {
                    this.message.text = _.defaultTo(message.text, '');
                    this.message.icon = _.defaultTo(message.icon, '');
                    this.message.color = _.defaultTo(message.color, '');
                }
            }
        },
    },

    created() {
        this.$on('inputSelect', this.select);
    },

    mounted() {
        this.resizeTextarea();
        this.updateIconOffset();
    },

    updated() {
        this.$nextTick(this.updateIconOffset);
    },
};
</script>

<style lang="scss">
.pt-input-message {
    > .el-input__inner {
        vertical-align: middle;
        display: table-cell;
    }
}

.pt-input-message__append {
    vertical-align: middle;
    display: table-cell;
    position: relative;
    padding: 0 10px;
    width: 1px;
    white-space: nowrap;
}
</style>
