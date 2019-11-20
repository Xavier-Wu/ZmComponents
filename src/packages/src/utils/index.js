/**
 * Created by jiachenpan on 16/11/18.
 */
import { Loading } from 'element-ui'

export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (('' + time).length === 10) time = parseInt(time) * 1000
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    if (key === 'a') {
      return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
    }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

export function formatTime(time, option) {
  time = +time * 1000
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}

export function objectMerge(target, source) {
  /* Merges two  objects,
     giving the last one precedence */

  if (typeof target !== 'object') {
    target = {}
  }
  if (Array.isArray(source)) {
    return source.slice()
  }
  Object.keys(source).forEach(property => {
    const sourceProperty = source[property]
    if (typeof sourceProperty === 'object' && sourceProperty !== null) {
      target[property] = objectMerge(target[property], sourceProperty)
    } else {
      target[property] = sourceProperty
    }
  })
  return target
}

export function cloneObject(target, source) {
  if (typeof target !== 'object') {
    target = {}
  }
  Object.keys(target).forEach(property => {
    const sourceProperty = source[property]
    target[property] = sourceProperty
  })
  return target
}
// 无法递归到更深
export function deepClone(obj) {
  var proto = Object.getPrototypeOf(obj)
  return Object.assign({}, Object.create(proto), obj)
}
// 可以深层次拷贝
export function realDeepClone(sourceObj, targetObj) {
  let cloneObj = targetObj || {}
  if (!sourceObj || typeof sourceObj !== 'object') {
    return sourceObj
  }
  if (sourceObj.length) {
    cloneObj = sourceObj.map(e => {
      return realDeepClone(e)
    })
    return cloneObj
  }
  for (const i in sourceObj) {
    // if (sourceObj[i] && typeof sourceObj[i] === 'object' && sourceObj[i].length) {
    if (sourceObj[i] && typeof sourceObj[i] === 'object') {
      cloneObj[i] = realDeepClone(sourceObj[i], {})
    } else {
      cloneObj[i] = sourceObj[i]
    }
  }
  return cloneObj
}
export function split(arrStr, fix = ',') {
  const arr = arrStr.split(fix)
  return arr.filter(e => e !== '')
}

export function mergeArray(arr1, arr2, prop = 'value') {
  for (let i = 0; i < arr1.length; i++) {
    for (let j = 0; j < arr2.length; j++) {
      if (prop) {
        if (arr1[i]) {
          if (arr1[i][prop] === arr2[j][prop]) {
            arr1.splice(i, 1) // 利用splice函数删除元素，从第i个位置，截取长度为1的元素
          }
        }
      } else {
        if (arr1[i] === arr2[j]) {
          arr1.splice(i, 1) // 利用splice函数删除元素，从第i个位置，截取长度为1的元素
        }
      }
    }
  }
  for (let i = 0; i < arr2.length; i++) {
    arr1.push(arr2[i])
  }
  return arr1
}

export function mergeDiffArray(arr1, arr2, prop = 'value') {
  for (let i = 0; i < arr1.length; i++) {
    for (let j = 0; j < arr2.length; j++) {
      if (prop) {
        if (arr1[i]) {
          if (arr1[i][prop] === arr2[j][prop]) {
            arr1.splice(i, 1) // 利用splice函数删除元素，从第i个位置，截取长度为1的元素
          }
        }
      } else {
        if (arr1[i] === arr2[j]) {
          arr1.splice(i, 1) // 利用splice函数删除元素，从第i个位置，截取长度为1的元素
        }
      }
    }
  }
  return arr1
}

export function intersectArray(arr1, arr2, prop = 'value') {
  // 交集
  const arr3 = []
  for (let i = 0; i < arr1.length; i++) {
    for (let j = 0; j < arr2.length; j++) {
      if (prop) {
        if (arr1[i]) {
          if (arr1[i][prop] === arr2[j][prop]) {
            arr3.push(arr1[i])
          }
        }
      } else {
        if (arr1[i] === arr2[j]) {
          arr3.push(arr1[i])
        }
      }
    }
  }
  return arr3
}

export function funDownload(contentUrl) {
  // 创建隐藏的可下载链接
  var eleLink = document.createElement('a')
  eleLink.style.display = 'none'
  eleLink.href = contentUrl
  // 触发点击
  document.body.appendChild(eleLink)
  eleLink.click()
  // 然后移除
  document.body.removeChild(eleLink)
}

// 通用导出数据
export async function exportData(fun, query, pageSize = 5000, reCall = false) {
  const loading = Loading.service({
    lock: true,
    text: '正在导出...',
    spinner: 'el-icon-loading'
  })
  if (!reCall) {
    query = Object.assign({}, query)
    query.page = 1
    query.requestType = 'export'
    query.pageSize = pageSize
  }
  try {
    const result = await fun(query)
    loading.close()
    funDownload(result.url)
  } catch (error) {
    if (error.status === 30001) {
      query.page += 1
      exportData(fun, query, pageSize, true)
    } else if (error.status === 1) {
      loading.close()
    }
  }
}
// 模糊查询下拉框回调参数
export async function getSelectValue(msg, params, val, val2, paramsChange) {
  this.$set(params, val, msg[0])
  if (val2) {
    this.$set(params, val2, msg[1])
  }
}

// 获取数组内所有id,并操作全选和反选
export function getCanChooseIds(list, isAll, idName) {
  const ids = []
  const newIdName = idName || 'value'
  Array.isArray(list) &&
    list.forEach(item => {
      if (isAll) ids.push(item[newIdName])
      if (typeof isAll === 'boolean') item.isAll = isAll
    })
  return ids
}

export const lazyComponent = name => () => import(`@/views/${name}`)

export const lazyComponentNew = name => () => import(`@/views/viewsNew/${name}`)

// export const lazyComponent = name => resolve =>
//   require([`@/views/${name}`], resolve)

// export const lazyComponentNew = name => resolve =>
//   require([`@/views/viewsNew/${name}`], resolve)

// api 扁平化按文件／文件夹生成对象
export const requireFolderObj = (r, exinclude) => {
  const contents = {}
  const paths = r.keys().filter(p => {
    return exinclude.indexOf(p) === -1
  })
  for (const path of paths) {
    const pArray = path.split('/').slice(1)
    const l = pArray.length
    const fn = r(path).default || r(path)
    let utilObj = contents
    pArray[l - 1] = pArray[l - 1].match(/(\w+-?\w+).js$/)[1]

    for (let i = 0; i < l; i++) {
      const p = pArray[i]
      if (i < l - 1) {
        if (!contents[p]) {
          contents[p] = {}
        }
        utilObj = contents[p]
      } else if (i === l - 1) {
        utilObj[p] = fn
      }
    }
  }
  return contents
}

export const eachOwn = (obj, fn) => {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      fn(obj[key], key, obj)
    }
  }
}

export const getModelName = (
  model,
  value,
  label = 'label',
  valueKey = 'value'
) => {
  if (model instanceof Array) {
    const item = model.find(i => i[valueKey] === value)
    if (item) {
      return item[label]
    }
    return ''
  }
  return ''
}

// obj1 的值覆盖到obj上 , （编辑表单时候用）
export const simpleExtented = (obj, obj1) => {
  // const o = JSON.parse(JSON.stringify(obj))
  const o = obj
  const o_key = Object.keys(o)
  o_key.forEach(el => {
    o[el] = obj1[el] || o[el]
  })
  return o
}

export const getTypeName = (
  v,
  Type,
  valueKey = 'value',
  labelKey = 'label'
) => {
  if (Type instanceof Array) {
    const item = Type.find(i => i[valueKey] === v)
    if (item) {
      return item[labelKey]
    }
  }
  return v
}

// 数组为空判断
export const judgeArrFill = value => {
  const noFill = value && value.filter(i => {
    const arr = Object.keys(i).filter(key => {
      return i[key] === null || i[key] === '' || i[key] === undefined
    })
    return arr.length > 0
  })
  return noFill
}
