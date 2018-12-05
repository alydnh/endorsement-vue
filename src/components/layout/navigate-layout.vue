<template>
    <pt-layout fixed-block-basis="60px" verticalMode :grow-block-padding="growBlockPadding" :fixed-block-visible="showHeader">
        <div class='flex-row gutter-sm header' slot="first">
            <div class='col navigation' @click="handleRouterBack">
                <el-button type="text" class="navigation-back-arrow">
                    <i class="fa fa-arrow-left"></i>
                </el-button>
            </div>
            <div class="col">
                <slot name="header">
                    <pt-title type="title" size="4">{{ title }}</pt-title>
                </slot>
            </div>
            <div class="col grow middle">
                <slot name="middle-area"></slot>
            </div>
            <div class="col right" :style="{flex: functionAreaFlexStyle}">
                <slot name="right-area"></slot>
            </div>
        </div>
        <div slot="second" class="flex-row navigate-content">
            <pt-layout fixed-block="second" fixed-block-basis="40px" verticalMode :fixed-block-visible="showBottom">
                <slot name="content" slot="first"></slot>
                <slot name="bottom-area" slot="second"></slot>
            </pt-layout>
        </div>
    </pt-layout>
</template>

<script>
import _ from 'lodash';

export default {
    name: 'NavigateLayout',
    props: {
        functionAreaFlexStyle: { type: String, default: '0 0 200px' },
        title: { type: String, default: '' },
        onBack: { type: Function, default: null },
        showHeader: { type: Boolean, default: true },
        showBottom: { type: Boolean, default: false },
        growBlockPadding: { type: String, default: '10px' },
    },
    methods: {
        handleRouterBack() {
            if (_.isFunction(this.onBack)) {
                if (this.onBack()) {
                    return;
                }
            }
            this.$router.back();
        },
    },
};
</script>


<style lang="scss" scoped>
.header {
    background-color: $ptit-grey-lighter;
    .navigation {
        flex: 0 0 20px;

        .navigation-back-arrow {
            margin-left: 10px;
        }
    }
}
</style>

<style lang="scss">
.navigate-content {
    position: relative;

    .full-screen {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;

        .layout {
            height: 100%;
        }
    }
}
</style>
