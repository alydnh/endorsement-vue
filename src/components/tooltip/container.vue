<template>
    <div class="ptit-tooltip-container">
        <slot></slot>
        <el-tooltip ref="tooltip" :effect="effect" :visible-arrow="false"
            v-show="showTooltip" :content="tooltip" :placement="placement">
            <i :class="tooltipIconClasses" :style="{right:iconRightOffset, top:iconTopOffset, color:color}"
                ref="icon"></i>
        </el-tooltip>
    </div>
</template>

<script>
import _ from 'underscore';

export default {
    name: 'PtitTooltipContainer',
    props: {
        iconClasses: { type: [Object, String], default: () => {} },
        tooltip: { type: String, default: null },
        placement: { type: String, default: 'bottom-end' },
        color: { type: String, default: 'black' },
        effect: { type: String, default: 'dark' },
        hOffset: { type: Number, default: 0 },
        vOffset: { type: Number, default: 0 },
    },
    data() {
        return {
            iconOffset: 'auto',
        };
    },
    computed: {
        showTooltip() {
            return !_.isEmpty(this.tooltip);
        },
        tooltipIconClasses() {
            return this.concatClass('tooltip-icon', this.iconClasses);
        },
        iconRightOffset() {
            return _.isNumber(this.iconOffset) ? `${this.iconOffset + this.hOffset}px` : 'auto';
        },
        iconTopOffset() {
            return _.isNumber(this.iconOffset) ? `${this.iconOffset + this.vOffset}px` : 'auto';
        },
    },
    methods: {
        setIconPosition() {
            if (this.iconOffset === 'auto') {
                const domHeight = this.$el.offsetHeight;
                const iconHeight = this.$refs.icon.offsetHeight;
                this.iconOffset = (domHeight - iconHeight) / 2;
            }
        },
        concatClass(a, b) {
            if (a && a.indexOf(b) > -1) return a;
            return a ? (b ? a + ' ' + b : a) : b || '';
        },
    },
    mounted() {
        if (this.showTooltip) {
            this.$emit('on');
            this.setIconPosition();
        }
    },
    watch: {
        showTooltip(value) {
            if (value) {
                this.$emit('on');
                this.$nextTick(() => this.setIconPosition());
            } else {
                this.$emit('off');
            }
        },
    },
};
</script>

<style>
.ptit-tooltip-container {
    position: relative;
}
.ptit-tooltip-container i.tooltip-icon {
    position: absolute;
    cursor: pointer;
}

.el-tooltip__popper.is-red {
    background-color: red;
    color: white;
}
</style>
