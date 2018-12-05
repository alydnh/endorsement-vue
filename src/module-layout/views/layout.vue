<template>
    <pt-layout verticalMode fixed-block-basis="40px">
        <div slot="first" class="layout-header">
        </div>
        <pt-layout slot="second" :fixed-block-visible="showMenu"
            fixed-block-basis="220px">
            <layout-menu slot="first" />
            <router-view slot="second" />
        </pt-layout>
    </pt-layout>
</template>

<script>
import _ from 'lodash';

export default {
    name: 'Layout',
    computed: {
        showMenu: {
            get() {
                const path = this.$route.path;
                const noMenuRoutes = ['/bind-parking-position'];

                return !_.some(noMenuRoutes, route => path.includes(route));
            },
        },
    },
};
</script>

<style lang="scss" scoped>
.layout-main {
    flex: 1;
    display: flex;
    flex-direction: row;
}
.content-main {
    flex: 1;
    display: flex;
    padding: 10px 10px 0 10px;
    overflow: hidden;
}
.layout-header {
    flex: 0 0 100%;
    display: flex;
    background: $ptit-secondary-darker;
}
</style>
