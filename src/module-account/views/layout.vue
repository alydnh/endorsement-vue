<template>
    <pt-layout :fixed-block-visible="false" vertical-mode style="background-size:cover;background-image:url(/static/images/module-account/background.jpg)">
        <div class="flex-row main account-main" slot="second">
            <div class="flex-col wrapper">
                <div class="flex-row logo">
                </div>
                <div class="flex-row content">
                    <router-view />
                </div>
                <div class="flex-row footer">
                </div>
            </div>
        </div>
    </pt-layout>
</template>

<script>
export default {};
</script>

<style lang="scss">
.account-main {
    justify-content: center;
    > .wrapper {
        flex: 0 0 80%;
        margin: 10px;
    }
}

.logo {
    background-repeat: no-repeat;
    background-image: url(/static/images/module-account/logo.png);
    height: 18%;
}
.content {
    height: 74%;
}
.footer {
    height: 8%;
    background-repeat: no-repeat;
    background-image: url(/static/images/module-account/footer.png);
    background-position: 1% 50%;
    background-color: grey;
    border-radius: 5px;
    opacity: 0.5;
}

.round-corner {
    border-radius: 5px;
}

.bg-default {
    background-color: white;
}

.register-area,
.login-area {
    flex-basis: 90%;
    padding: 0px 40px;
}
.register-area {
    margin-left: 10px;
}
.login-area {
    margin-right: 10px;
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

.image-area {
    flex-basis: 90%;
    background-image: url(/static/images/module-account/login-background.png);
    background-size: cover;

    .gutter-10 {
        flex-basis: 10%;
    }

    .el-button + .pt-text {
        margin-left: 10px;
    }
}
</style>
