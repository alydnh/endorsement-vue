<template>
    <div id="app">
        <router-view />
    </div>
</template>

<script>
export default {
    name: 'App',
    data() {
        return {
            ready: false,
        };
    },
};
</script>

<style lang="scss">
html,
body,
#app {
    height: 100%;
    width: 100%;
    display: flex;
    margin: 0;
    padding: 0;
}

/*flex layout*/
.flex-item {
    display: flex;
    display: -webkit-flex;
    flex: 0 0 auto;
}

.flex-row {
    flex-direction: row;
}

.flex-col {
    flex-direction: column;
}

.flex-row.main,
.flex-col.main {
    flex-grow: 1;
}

.flex-row,
.flex-col {
    display: flex;
    display: -webkit-flex;
    flex-grow: 0;
    flex-shrink: 0;
    flex-basis: auto;

    .grow {
        flex-grow: 1;
    }

    > .center-item {
        align-items: center;
    }

    > .end-item {
        align-items: flex-end;
    }

    > .center-content {
        justify-content: center;
    }

    > .end-content {
        justify-content: flex-end;
    }

    > .space-between-content {
        justify-content: space-between;
    }

    > .end-self {
        align-self: flex-end;
    }
}

.flex-list-row {
    display: flex;
    align-items: center;
    min-height: 40px;
    flex-flow: row wrap;
    cursor: pointer;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
}

.flex-list-row.secondary.selected {
    background-color: $ptit-secondary-darker !important;
}

.flex-list-row.secondary {
    &:nth-child(2n) {
        background-color: $ptit-white;
    }

    &:nth-child(2n + 1) {
        background-color: $ptit-secondary-lighter;
    }

    &:hover {
        background-color: $ptit-secondary-darker;
    }
}

.flex-row.gutter-sm {
    > .col {
        margin: 5px 10px;
    }
}
.flex-row.gutter-md {
    > .col {
        margin: 10px 15px;
    }
}

.flex-row.gutter-lg {
    > .col {
        margin: 15px 20px;
    }
}

/*cursor*/
.cursor-pointer {
    cursor: pointer;
}

/*icon*/

.fa.transparent {
    color: transparent;
}

.fa.danger {
    color: #f56c6c;
}

.fa.positive-darker {
    color: $ptit-positive-darker;
}

.fa.grey {
    color: $ptit-grey;
}

.fa + .fa {
    margin-left: 5px;
}
</style>
