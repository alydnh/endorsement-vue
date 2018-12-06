<template>
    <div class="pt-text flex-item">
        <i :class="prefixIconClasses"
            v-if="showPrefixIcon"></i>
        <div :style="textStyles"
            class="inner-text">{{getText(text)}}</div>
        <div class="inner-sub-text"
            v-if="showSubText">{{getText(subText)}}</div>
        <i :class="suffixIconClasses"
            v-if="showSuffixIcon"></i>
    </div>
</template>

<script>
import _ from 'lodash';

export default {
    name: 'PtText',
    props: {
        translation: { type: Boolean, default: true },
        text: { type: String },
        subText: { type: String },
        prefixIcon: { type: String, default: '' },
        suffixIcon: { type: String, default: '' },
        textWidth: { type: String, default: '' },
    },
    methods: {
        getText(text) {
            return this.translation ? this._tt(text) : text;
        },
    },
    computed: {
        textStyles() {
            const styles = {};
            if (!_.isEmpty(this.textWidth)) {
                styles.width = this.textWidth;
            }
            return styles;
        },
        showPrefixIcon() {
            return !_.isEmpty(this.prefixIcon);
        },
        showSubText() {
            return !_.isEmpty(this.subText);
        },
        showSuffixIcon() {
            return !_.isEmpty(this.suffixIcon);
        },
        prefixIconClasses() {
            return `prefix-icon ${this.prefixIcon}`;
        },
        suffixIconClasses() {
            return `suffix-icon ${this.suffixIcon}`;
        },
    },
};
</script>

<style lang="scss">
.pt-text {
    flex-direction: row;
    align-items: center;

    .prefix-icon {
        margin-right: 3px;
    }

    .inner-text {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }
}
</style>
