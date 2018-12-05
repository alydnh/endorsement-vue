<template>
    <pt-layout fixed-block-basis="38%">
        <div class="flex-col main" slot="first">

            <div class="flex-col bg-default round-corner space-between-content login-area">
                <div class="flex-item" />
                <el-input v-model="accountName" :disabled="disabled" :placeholder="_tt('login/placeholder/account-email-phone')">
                    <template slot="prepend">
                        <i class="fa fa-user" />
                    </template>
                </el-input>
                <div class="flex-col">
                    <el-input v-model="password" type="password" :disabled="disabled" :placeholder="_tt('login/placeholder/password')">
                        <template slot="prepend">
                            <i class="fa fa-key" />
                        </template>
                    </el-input>
                    <el-button class="end-self" type="text">{{_tt('login/button/forget-password')}}</el-button>
                </div>
                <div class="flex-item tips center-content">
                    <i v-if="showErrorMessage" class="fa fa-times-circle danger">&nbsp;{{errorMessage}}</i>
                    <span v-if="loading"><i class="el-icon-loading"></i>登录中...</span>
                    <span v-if="showTips">请输入账户名和密码进行登录</span>
                </div>
                <el-button @click="onLogin" :loading="loading" type="warning">{{_tt('login/button/login')}}</el-button>
                <div class="flex-item" />
            </div>
        </div>
        <div class="flex-col main" slot="second">

        </div>
    </pt-layout>
</template>

<script>
import _ from 'lodash';

export default {
    data() {
        return {
            loading: false,
            errorMessage: '',
            accountName: '',
            password: '',
        };
    },
    methods: {
        onLogin() {
            this.errorMessage = '';
            if (_.isEmpty(this.accountName)) {
                this.errorMessage = this._tt(
                    'login/validate/account-name-empty',
                );
                return false;
            }

            if (_.isEmpty(this.password)) {
                this.errorMessage = this._tt(
                    'login/validate/account-password-empty',
                );
                return false;
            }

            this.loading = true;
            return true;
        },
    },
    computed: {
        disabled() {
            return this.loading;
        },
        showErrorMessage() {
            return !this.loading && !_.isEmpty(this.errorMessage);
        },
        showTips() {
            return !this.showErrorMessage && !this.loading;
        },
    },
};
</script>

<style lang="scss">
.login-area {
    flex-basis: 90%;
    margin-right: 10px;
    padding: 0px 40px;
    .el-input-group__prepend > i.fa {
        width: 20px;
        text-align: center;
    }
    .tips {
        background-image: url(/static/images/module-account/tips.png);
        background-repeat: no-repeat;
        background-position-x: center;
        padding-top: 20px;
    }
}
</style>
