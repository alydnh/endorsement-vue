<template>
    <div class="layout-menu">
        <el-menu :default-active="defaultActive" router>
            <el-menu-item index="collapse">
                <template slot="title">
                    <span slot="title">收起</span>
                </template>
            </el-menu-item>
            <el-submenu v-for="item in items" :key="item.index" :index="item.index">
                <template slot="title">
                    <i :class="item.icon" v-if="item.hasIcon" />
                    <pt-text slot="title" :text="item.text" />
                </template>
                <el-menu-item v-for="child in item.childs" :index="child.getRoutePath()" :key="child.index">
                    <pt-text :text="child.text" />
                </el-menu-item>
            </el-submenu>
        </el-menu>
    </div>
</template>

<script>
import _ from 'lodash';
import items from '../config/menu-config';

export default {
    name: 'LayoutMenu',
    data() {
        return {
            items: items,
            isCollapse: true,
        };
    },
    computed: {
        defaultActive: {
            get() {
                const path = this.$route.path;
                for (const item of this.items) {
                    const match = item.getMatchedItemByRoutePath(path);
                    if (!_.isUndefined(match)) {
                        return match.getRoutePath();
                    }
                }

                return '';
            },
        },
    },
};
</script>

<style lang="scss" scoped>
.layout-menu {
    flex: 1;
    border: solid 1px #e6e6e6;
    .el-menu {
        border-right: none;
    }
}
</style>
