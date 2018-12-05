export default {
    props: {
        visible: { type: Boolean, default: false },
        loading: { type: Boolean, default: false },
    },
    data() {
        return {
            isDialogShow: false,
        };
    },
    methods: {
        closeDialog(ok) {
            if (ok) {
                if (this.onDialogOk()) {
                    this.$emit('dialogOk');
                }
            } else {
                this.isDialogShow = false;
            }
        },
        onDialogOk() {
            return true;
        },
        onDialogShow() {},
    },
    computed: {
        disabled() {
            return this.loading;
        },
    },
    watch: {
        isDialogShow(value) {
            this.$emit('update:visible', value);
        },
        visible(value) {
            this.isDialogShow = value;
            if (value) {
                this.onDialogShow();
            }
        },
    },
};
