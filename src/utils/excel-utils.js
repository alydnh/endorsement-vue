import _ from 'lodash';

function columnName2Index(name) {
    if (_.isEmpty(name)) {
        return 0;
    }
    let n = 0;
    let j = 1;
    const s = name.toUpperCase();
    for (let i = s.length - 1; i >= 0; i--) {
        const c = s[i];
        if (c < 'A' || c > 'Z') {
            return 0;
        }
        n += (s.charCodeAt(i) - 64) * j;
        j *= 26;
    }
    return n;
}

function index2ColumnName(index) {
    let s = '';
    let n = index;
    while (n > 0) {
        let m = n % 26;
        if (m === 0) {
            m = 26;
        }

        s = String.fromCharCode(m + 64) + s;
        n = (n - m) / 26;
    }
    return s;
}

function move(n, o) {
    return index2ColumnName(columnName2Index(n) + o);
}

class Cell {
    constructor(value) {
        this._value = value.value;
        this._col = /([A-Z]+)/.exec(value.address)[0];
        this._row = parseInt(/(\d+)/.exec(value.address)[0], 10);
    }

    get address() {
        return this.col + this.row;
    }

    get col() {
        return this._col;
    }

    get row() {
        return this._row;
    }

    get value() {
        return this._value;
    }

    set value(v) {
        this._value = v;
    }

    isEmptyValue() {
        return _.isEmpty(this.value);
    }
}

class Sheet {
    constructor(sheetData) {
        this._name = sheetData.name;
        this._cells = _.map(sheetData.values, p => new Cell(p));
        _.each(this._cells, p => (this[p.address] = p));
    }

    get name() {
        return this._name;
    }

    get cells() {
        return this._cells;
    }

    isEmpty() {
        return _.every(this.cells, p => p.isEmptyValue());
    }

    getTitleColumns() {
        let cell = _.find(this.cells, p => !p.isEmpty);
        const row = cell.row;
        const columns = [];
        while (cell && row === cell.row) {
            if (!_.isEmpty(cell.value)) {
                columns.push(cell);
            }
            cell = this[move(cell.col, 1) + row];
        }
        return columns;
    }

    getCell(col, rowIndex) {
        let colName = col;
        if (/^\d+$/.test(colName)) {
            colName = index2ColumnName(colName);
        }

        let cell = this[colName + rowIndex];
        if (!cell) {
            cell = new Cell({ address: colName + rowIndex, value: '' });
        }
        return cell;
    }

    getMaxRows() {
        return _.last(this.cells).row;
    }

    getRowAsObject(index) {
        const titles = this.getTitleColumns();
        const obj = {};
        _.each(titles, p => (obj[p.value] = this.getCell(p.col, titles[0].row + index)));
        return obj;
    }
}

class Excel {
    constructor(excelData) {
        this._sheets = _.map(excelData.sheets, p => new Sheet(p));
    }

    get sheets() {
        return this._sheets;
    }

    get defaultSheet() {
        return _.find(this.sheets, p => !p.isEmpty());
    }
}

export default {
    parse(excelData) {
        return new Excel(excelData);
    },
};
