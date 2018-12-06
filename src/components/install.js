import PtLayout from './layout/pt-layout';
import NavigateLayout from './layout/navigate-layout';
import PtText from './text/pt-text';
import PtInput from './element-ui/input/input';

const install = Vue => {
    Vue.component(PtLayout.name, PtLayout);
    Vue.component(NavigateLayout.name, NavigateLayout);
    Vue.component(PtText.name, PtText);
    Vue.component(PtInput.name, PtInput);
};
export default {
    install,
};
