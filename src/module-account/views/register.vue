<template>
    <pt-layout fixed-block="second"
        fixed-block-basis="38%">
        <div class="flex-col main"
            slot="second">
            <div class="flex-col bg-default round-corner space-between-content register-area">
                <div class="flex-item" />
                <div class="flex-item center-content">
                    <pt-text text="register/text/title" />
                </div>
                <div class="flex-row">
                    <pt-text text="register/label/account-name"
                        text-width="100px"
                        subText="*" />
                    <pt-input v-model="model.accountName"
                        :placeholder="_tt('register/placeholder/account-name')"
                        message-mode
                        :message-trigger="createMessageTrigger('accountName')" />
                </div>
                <div class="flex-item" />
            </div>
        </div>
        <div class="flex-col main"
            slot="first">
            <div class="flex-col round-corner image-area">
                <pt-layout fixed-block="second"
                    vertical-mode
                    fixed-block-basis="20%">
                    <div class="flex-row"
                        slot="second">
                        <div class="flex-item gutter-10" />
                        <el-button type="warning"
                            plain>{{_tt('register/button/login')}}</el-button>
                        <pt-text text="register/text/login-tips" />
                    </div>
                </pt-layout>
            </div>
        </div>
    </pt-layout>
</template>

<script>
import RegisterModel from '../models/register';

export default {
    data() {
        return {
            model: new RegisterModel(),
        };
    },
    methods: {
        createMessageTrigger(name) {
            return value => {
                const validator = this.model.validator[name];
                validator.validate(value);
                return {
                    text: validator.message,
                    icon: 'fa fa-times-circle danger',
                    color: 'red',
                };
            };
        },
    },
};
</script>

<style lang="scss">
.pt-text + .el-input {
    margin-left: 10px;
}
</style>
