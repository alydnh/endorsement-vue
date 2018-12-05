import _ from 'lodash';

class Item {
    constructor(index, text, icon) {
        this._index = index;
        this._text = text;
        this._icon = _.defaultTo(icon, '');
        this._childs = [];
        this._path = '';
        this._parent = null;
    }

    get index() {
        const index = this._index;
        return !_.isNull(this._parent) ? `${this._parent.index}/${index}` : index;
    }

    get text() {
        return this._text;
    }

    get icon() {
        return this._icon;
    }

    get childs() {
        return this._childs;
    }

    get hasIcon() {
        return !_.isEmpty(this._icon);
    }

    getMatchedItemByRoutePath(path) {
        const match = _.find(this._childs, p => p.getMatchedItemByRoutePath(path));
        if (_.isUndefined(match)) {
            if (this.getRoutePath().includes(path)) {
                return this;
            }
        }

        return match;
    }

    setChildren(items) {
        this._childs = items;
        _.each(this._childs, p => (p._parent = this));
        return this;
    }

    routePath(value) {
        this._path = value;
        return this;
    }

    getRoutePath() {
        const path = this._path;
        return _.isEmpty(path) ? `/${this.index}` : path;
    }
}

export default [
    new Item('kanban', 'endorsement', 'fa fa-edit').setChildren([
        new Item('drafting', 'drafting'),
        new Item('todo', 'todo'),
        new Item('decision', 'decision'),
        new Item('executing', 'executing'),
        new Item('archived', 'archived'),
    ]),
];
