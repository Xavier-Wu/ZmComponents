import DateSelector from './DateSelector/index.js'
import GlInput from './GlInput/index.js'
import GtLtPrice from './GtLtPrice/index.js'
import Hamburger from './Hamburger/index.js'
import InvoiceInfo from './InvoiceInfo/index.js'
import mapAnalyse from './mapAnalyse/index.js'
import PaymentInfo from './PaymentInfo/index.js'
import PermissionTree from './PermissionTree/index.js'
import QueryExtPlane from './QueryExtPlane/index.js'
import SelectDateTime from './SelectDateTime/index.js'
import SelectWeekDateTime from './SelectWeekDateTime/index.js'
import SetPriceTable from './SetPriceTable/index.js'
import SetPriceTableItems from './SetPriceTableItems/index.js'
import SetPriceTableItemsHandle from './SetPriceTableItemsHandle/index.js'
import TagList from './TagList/index.js'
import TimeRange from './TimeRange/index.js'

const components = [
  DateSelector,
  GlInput,
  GtLtPrice,
  Hamburger,
  InvoiceInfo,
  mapAnalyse,
  PaymentInfo,
  PermissionTree,
  QueryExtPlane,
  SelectDateTime,
  SelectWeekDateTime,
  SetPriceTable,
  SetPriceTableItems,
  SetPriceTableItemsHandle,
  TagList,
  TimeRange
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
  DateSelector,
  GlInput,
  GtLtPrice,
  Hamburger,
  InvoiceInfo,
  mapAnalyse,
  PaymentInfo,
  PermissionTree,
  QueryExtPlane,
  SelectDateTime,
  SelectWeekDateTime,
  SetPriceTable,
  SetPriceTableItems,
  SetPriceTableItemsHandle,
  TagList,
  TimeRange
}
