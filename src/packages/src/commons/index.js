import AppBlock from './AppBlock/index.js'
import PageTable from './PageTable/index.js'
import PicUpload from './PicUpload/index.js'
import RemoteSelect from './RemoteSelect/index.js'
import RemoteSelectMultiple from './RemoteSelectMultiple/index.js'
import SvgIcon from './SvgIcon/index.js'
import SwitchConfirm from './SwitchConfirm/index.js'
import Tip from './Tip/index.js'
import TitlePlane from './TitlePlane/index.js'
import ZmCheckbox from './ZmCheckbox/index.js'
import ZmCollapseForm from './ZmCollapseForm/index.js'
import ZmDatePicker from './ZmDatePicker/index.js'
import ZmDatePickerOne from './ZmDatePickerOne/index.js'
import ZmDesc from './ZmDesc/index.js'
import ZmDetail from './ZmDetail/index.js'
import ZmDialog from './ZmDialog/index.js'
import ZmExport from './ZmExport/index.js'
import FormPoster from './FormPoster/index.js'
import FormRadioSelect from './FormRadioSelect/index.js'
import ZmPanel from './ZmPanel/index.js'
import ZmProgress from './ZmProgress/index.js'
import ZmSelectCom from './ZmSelectCom/index.js'
import ZmSteps from './ZmSteps/index.js'
import ZmTable from './ZmTable/index.js'
import ZmTabs from './ZmTabs/index.js'
import ZmTimesPicker from './ZmTimesPicker/index.js'
import ZmUpdateLoading from './ZmUpdateLoading/index.js'

const components = [
  AppBlock,
  MessageBox,
  Notify,
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
  MessageBox,
  Notify,
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
}