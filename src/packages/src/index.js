// commons
import AppBlock from './commons/AppBlock/index.js'
import PageTable from './commons/PageTable/index.js'
import PicUpload from './commons/PicUpload/index.js'
import RemoteSelect from './commons/RemoteSelect/index.js'
import RemoteSelectMultiple from './commons/RemoteSelectMultiple/index.js'
import SvgIcon from './commons/SvgIcon/index.js'
import SwitchConfirm from './commons/SwitchConfirm/index.js'
import Tip from './commons/Tip/index.js'
import TitlePlane from './commons/TitlePlane/index.js'
import ZmCheckbox from './commons/ZmCheckbox/index.js'
import ZmCollapseForm from './commons/ZmCollapseForm/index.js'
import ZmDatePicker from './commons/ZmDatePicker/index.js'
import ZmDatePickerOne from './commons/ZmDatePickerOne/index.js'
import ZmDesc from './commons/ZmDesc/index.js'
import ZmDetail from './commons/ZmDetail/index.js'
import ZmDialog from './commons/ZmDialog/index.js'
import ZmExport from './commons/ZmExport/index.js'
import FormPoster from './commons/FormPoster/index.js'
import FormRadioSelect from './commons/FormRadioSelect/index.js'
import ZmPanel from './commons/ZmPanel/index.js'
import ZmProgress from './commons/ZmProgress/index.js'
import ZmSelectCom from './commons/ZmSelectCom/index.js'
import ZmSteps from './commons/ZmSteps/index.js'
import ZmTable from './commons/ZmTable/index.js'
import ZmTabs from './commons/ZmTabs/index.js'
import ZmTimesPicker from './commons/ZmTimesPicker/index.js'
import ZmUpdateLoading from './commons/ZmUpdateLoading/index.js'
// components
// import DateSelector from './components/DateSelector/index.js'
// import GlInput from './components/GlInput/index.js'
// import GtLtPrice from './components/GtLtPrice/index.js'
// import Hamburger from './components/Hamburger/index.js'
// import InvoiceInfo from './components/InvoiceInfo/index.js'
// import mapAnalyse from './components/mapAnalyse/index.js'
// import PaymentInfo from './components/PaymentInfo/index.js'
// import PermissionTree from './components/PermissionTree/index.js'
// import QueryExtPlane from './components/QueryExtPlane/index.js'
// import SelectDateTime from './components/SelectDateTime/index.js'
// import SelectWeekDateTime from './components/SelectWeekDateTime/index.js'
// import SetPriceTable from './components/SetPriceTable/index.js'
// import SetPriceTableItems from './components/SetPriceTableItems/index.js'
// import SetPriceTableItemsHandle from './components/SetPriceTableItemsHandle/index.js'
// import TagList from './components/TagList/index.js'
// import TimeRange from './components/TimeRange/index.js'

const components = [
  AppBlock,
  PageTable,
  PicUpload,
  RemoteSelect,
  RemoteSelectMultiple,
  SvgIcon,
  SwitchConfirm,
  Tip,
  TitlePlane,
  ZmCheckbox,
  ZmCollapseForm,
  ZmDatePicker,
  ZmDatePickerOne,
  ZmDesc,
  ZmDetail,
  ZmDialog,
  ZmExport,
  FormPoster,
  FormRadioSelect,
  ZmPanel,
  ZmProgress,
  ZmSelectCom,
  ZmSteps,
  ZmTable,
  ZmTabs,
  ZmTimesPicker,
  ZmUpdateLoading
  // DateSelector,
  // GlInput,
  // GtLtPrice,
  // Hamburger,
  // InvoiceInfo,
  // mapAnalyse,
  // PaymentInfo,
  // PermissionTree,
  // QueryExtPlane,
  // SelectDateTime,
  // SelectWeekDateTime,
  // SetPriceTable,
  // SetPriceTableItems,
  // SetPriceTableItemsHandle,
  // TagList,
  // TimeRange
]
const install = function(vue) {
  /* istanbul ignore if */
  if (install.installed) return
  /*eslint-disable*/
  components.map(component => {
    vue.component(component.name, component) //component.name 此处使用到组件vue文件中的 name 属性
  })
}
/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install,
  AppBlock,
  PageTable,
  PicUpload,
  RemoteSelect,
  RemoteSelectMultiple,
  SvgIcon,
  SwitchConfirm,
  Tip,
  TitlePlane,
  ZmCheckbox,
  ZmCollapseForm,
  ZmDatePicker,
  ZmDatePickerOne,
  ZmDesc,
  ZmDetail,
  ZmDialog,
  ZmExport,
  FormPoster,
  FormRadioSelect,
  ZmPanel,
  ZmProgress,
  ZmSelectCom,
  ZmSteps,
  ZmTable,
  ZmTabs,
  ZmTimesPicker,
  ZmUpdateLoading
  // DateSelector,
  // GlInput,
  // GtLtPrice,
  // Hamburger,
  // InvoiceInfo,
  // mapAnalyse,
  // PaymentInfo,
  // PermissionTree,
  // QueryExtPlane,
  // SelectDateTime,
  // SelectWeekDateTime,
  // SetPriceTable,
  // SetPriceTableItems,
  // SetPriceTableItemsHandle,
  // TagList,
  // TimeRange
}
