<template>
    <pt-layout :fixed-block-visible="false" vertical-mode style="background-size:cover;background-image:url(/static/images/module-account/background.jpg)">
        <div class="flex-row account-main" slot="second">
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

<style lang="scss" scoped>
.account-main {
    flex-grow: 1;
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
</style>
