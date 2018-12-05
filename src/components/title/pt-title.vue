<template>
    <div :class="content" :style="style">
        <div class="wrapper">
            <slot></slot>
        </div>
    </div>
</template>


<script>
export default {
    name: 'PtTitle',
    props: {
        size: { type: String, default: '' },
        type: { type: String, default: '' },
        format: { type: String, default: '' },
        important: { type: Boolean, default: false },
        minor: { type: Boolean, default: false },
        positive: { type: Boolean, default: false },
        negative: { type: Boolean, default: false },
        secondary: { type: Boolean, deafult: false },
        leftGap: { type: [String, Number], default: 0 },
        ignore: { type: Boolean, deafult: false },
        justifyContent: { type: String, default: 'flex-start' },
    },
    computed: {
        content() {
            const content = ['pt-title'];
            if (this.size.length > 0) {
                switch (this.type) {
                    case 'text':
                        content.push(`text-part-${this.size}`);
                        break;
                    case 'title':
                        content.push(`pt-h${this.size}`);
                        break;
                    default:
                        break;
                }
            }
            if (this.format.length > 0) {
                content.push(`format-${this.format}`);
            }

            if (this.minor) {
                content.push('minor');
            } else if (this.important) {
                content.push('important');
            }

            if (this.negative) {
                content.push('negative');
            } else if (this.positive) {
                content.push('positive');
            } else if (this.secondary) {
                content.push('secondary');
            } else if (this.ignore) {
                content.push('ignore');
            }

            if (this.leftGap > 0) {
                content.push(`gap-${this.leftGap}`);
            }

            return content;
        },
        style() {
            return {
                'justify-content': this.justifyContent,
            };
        },
    },
};
</script>


<style lang="scss" scoped>
.pt-title {
    display: flex;
    .wrapper {
        display: flex;
        align-items: center;
    }
}

.gap-1 {
    padding-left: 3px;
}

.gap-2 {
    padding-left: 6px;
}

.pt-h1 {
    @extend h1;
}

.pt-h2 {
    @extend h2;
}

.pt-h3 {
    @extend h3;
}

.pt-h4 {
    @extend h4;
}

.pt-h5 {
    @extend h5;
}

.pt-h6 {
    @extend h6;
}

.pt-h7 {
    @extend h7;
}

.format-link {
    text-decoration: underline;
}

.format-number {
    text-align: right;
    justify-content: flex-end;
    flex: auto;
    font-style: italic;
    text-decoration: underline;
}

.format-number.important {
    color: $ptit-negative-darker;
}

.format-date {
    font-style: italic;
}

.important {
    font-weight: 600;
}

.minor {
    color: $ptit-grey;
}

.positive {
    color: $ptit-positive-darker;
}

.negative {
    color: $ptit-negative;
}

.secondary {
    color: $ptit-secondary-darker;
}

.ignore {
    color: $ptit-grey-light;
}
</style>
