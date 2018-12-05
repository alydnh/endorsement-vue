import PtTitle from './title/pt-title';
import PtLayout from './layout/pt-layout';
import GridCell from './grid/grid-cell';
import GridRow from './grid/grid-row';
import GridHeadRow from './grid/grid-head-row';
import GridHeadColumn from './grid/grid-head-column';
import SearchInput from './search/search-input';
import NoteVids from './search/note-vids';
import VidVid from './search/vid-vid';
import EidVid from './search/eid-vid';
import NavigateLayout from './layout/navigate-layout';
import ReceiptIdTitleVids from './search/receiptid-title-vids';
import VidEidTitleReceiptidReceiptid from './search/vid-eid-title-receiptid-receiptid';

import TooltipContainer from './tooltip/container';
import TooltipInput from './tooltip/input';

import PtText from './text/pt-text';

/* istanbul ignore next */
const install = Vue => {
    Vue.component(PtTitle.name, PtTitle);
    Vue.component(PtLayout.name, PtLayout);
    Vue.component(GridCell.name, GridCell);
    Vue.component(GridRow.name, GridRow);
    Vue.component(GridHeadRow.name, GridHeadRow);
    Vue.component(GridHeadColumn.name, GridHeadColumn);
    Vue.component(SearchInput.name, SearchInput);
    Vue.component(NoteVids.name, NoteVids);
    Vue.component(VidVid.name, VidVid);
    Vue.component(EidVid.name, EidVid);
    Vue.component(NavigateLayout.name, NavigateLayout);
    Vue.component(ReceiptIdTitleVids.name, ReceiptIdTitleVids);
    Vue.component(VidEidTitleReceiptidReceiptid.name, VidEidTitleReceiptidReceiptid);
    Vue.component(TooltipContainer.name, TooltipContainer);
    Vue.component(TooltipInput.name, TooltipInput);
    Vue.component(PtText.name, PtText);
};
export default {
    install,
};
