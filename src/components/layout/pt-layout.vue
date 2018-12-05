<template>
    <div :class="{layout:true, vertical:verticalMode}">
        <div :class="firstClasses" :style="firstStyles" v-if="firstVisible">
            <slot name="first"></slot>
        </div>
        <div :class="secondClasses" :style="secondStyles" v-if="secondVisible">
            <slot name="second"></slot>
        </div>
    </div>
</template>

<script>
import _ from 'lodash';
import __ from '../../utils/__';

export default {
    name: 'PtLayout',
    props: {
        verticalMode: { type: Boolean, default: false },
        fixedBlock: { type: String, default: 'first' },
        fixedBlockBasis: { type: String, default: '' },
        firstBlockClass: {
            type: [Object, Array, String],
            default: __.emptyArray(),
        },
        secondBlockClass: {
            type: [Object, Array, String],
            default: __.emptyArray(),
        },
        growBlockScroll: { type: Boolean, default: false },
        fixedBlockPadding: { type: String, default: '0px' },
        growBlockPadding: { type: String, default: '0px' },
        fixedBlockVisible: { type: Boolean, default: true },
        growBlockVisible: { type: Boolean, default: true },
    },
    computed: {
        firstClasses: {
            get() {
                return this.getClasses('first');
            },
        },
        secondClasses: {
            get() {
                return this.getClasses('second');
            },
        },
        firstStyles: {
            get() {
                return this.getStyles('first');
            },
        },
        secondStyles: {
            get() {
                return this.getStyles('second');
            },
        },
        firstVisible: {
            get() {
                if (this.fixedBlock === 'first') {
                    return this.fixedBlockVisible;
                }

                return this.growBlockVisible;
            },
        },
        secondVisible: {
            get() {
                if (this.fixedBlock === 'second') {
                    return this.fixedBlockVisible;
                }

                return this.growBlockVisible;
            },
        },
    },
    methods: {
        getClasses(block) {
            if (block === 'first') {
                if (_.isEmpty(this.firstBlockClass)) {
                    return block;
                }

                return [this.firstBlockClass, block];
            }

            if (_.isEmpty(this.secondBlockClass)) {
                return block;
            }
            return [this.secondBlockClass, block];
        },
        getStyles(block) {
            const styles = {};
            if (this.fixedBlock === block) {
                styles['flex-grow'] = '0';
                if (
                    _.isEmpty(this.firstBlockClass) &&
                    !_.isEmpty(this.fixedBlockBasis)
                ) {
                    const width = _.isEmpty(this.fixedBlockBasis)
                        ? 'auto'
                        : this.fixedBlockBasis;
                    styles.flex = `0 0 ${width}`;
                }
            } else {
                styles.flex = '1 1 auto';
                styles['min-height'] = '0';
            }
            styles['flex-direction'] = this.verticalMode ? 'column' : 'row';
            if (this.fixedBlock !== block) {
                styles.padding = this.growBlockPadding;
                if (this.growBlockScroll) {
                    if (this.verticalMode) {
                        styles['overflow-y'] = 'scroll';
                    } else {
                        styles['overflow-x'] = 'scroll';
                    }
                }
            } else {
                styles.padding = this.fixedBlockPadding;
            }
            return styles;
        },
    },
};
</script>

<style lang="scss">
.layout {
    display: flex;
    flex: 1;
    flex-direction: row;
    overflow: hidden;
    .first,
    .second {
        display: flex;
    }
}

.layout.vertical {
    flex-direction: column;
}
</style>
