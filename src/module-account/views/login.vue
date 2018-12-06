<template>
    <pt-layout fixed-block-basis="38%">
        <div class="flex-col main" slot="first">
            <div class="flex-col bg-default round-corner space-between-content login-area">
                <div class="flex-item" />
                <div class="flex-item center-content">
                    <pt-text text="login/text/title" />
                </div>
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
                    <pt-text v-if="showErrorMessage" prefix-icon="fa fa-times-circle" :text="errorMessage" />
                    <pt-text v-if="loading" prefix-icon="el-icon-loading" text="login/text/loagining" />
                    <pt-text v-if="showTips" prefix-icon="fa fa-info-circle" text="login/text/tips" />
                </div>
                <el-button @click="onLogin" :loading="loading" type="warning">{{_tt('login/button/login')}}</el-button>
                <div class="flex-item" />
            </div>
        </div>
        <div class="flex-col main" slot="second">
            <div class="flex-col round-corner image-area">
                <pt-layout fixed-block="second" vertical-mode fixed-block-basis="20%">
                    <div class="flex-row" slot="second">
                        <div class="flex-item gutter-10" />
                        <el-button type="warning" plain @click="onRegister">{{_tt('login/button/register')}}</el-button>
                        <pt-text text="login/text/register-tips" />
                    </div>
                </pt-layout>
            </div>
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
                this.errorMessage = 'login/validate/account-name-empty';
                return false;
            }

            if (_.isEmpty(this.password)) {
                this.errorMessage = 'login/validate/account-password-empty';
                return false;
            }

            this.loading = true;
            return true;
        },
        onRegister() {
            this.$router.replace('/account/register');
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
