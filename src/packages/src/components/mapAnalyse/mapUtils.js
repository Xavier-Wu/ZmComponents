import markPng from './location-red.png'
// 经纬度解析地址
export const getAddreByLnglat = (postion = [], city = '全国') => {
    return new Promise((resolve, reject) => {
        AMap.service('AMap.Geocoder', function () {
            const geocoder = new AMap.Geocoder({
                radius: 500,
                batch: false,
                city,
                citylimit: true
            })
            geocoder.getAddress(postion, function (status, result) {
                if (status === 'complete' && result.info === 'OK') {
                    resolve(result)
                } else {
                    reject(result)
                }
            })
        })
    })
}
// 清楚infowindow
export const clearInfoWindow = (map) => {
  console.log(1)
  map.clearInfoWindow()
}
// 获取用户所在城市信息
export function showCityInfo() {
    return new Promise((resolve, reject) => {
        // 实例化城市查询类
        var citysearch = new AMap.CitySearch();
        // 自动获取用户IP，返回当前城市
        citysearch.getLocalCity(function (status, result) {
            if (status === 'complete' && result.info === 'OK') {
                // return result
                console.log(result)
                // resolve(result.province + result.city)
                resolve(result)
            } else {
                // return result.info
                reject(result.info)
            }
        })
    })
}
// 获取高精度定位
export function showCurrentArea() {
    return new Promise((resolve, reject) => {
        var geolocation = new AMap.Geolocation({
            // 是否使用高精度定位，默认：true
            enableHighAccuracy: true,
            // 设置定位超时时间，默认：无穷大
            timeout: 20000,
            // 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
            buttonOffset: new AMap.Pixel(10, 20),
            //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
            zoomToAccuracy: true,
            //  定位按钮的排放位置,  RB表示右下
            buttonPosition: 'RB'
        })

        geolocation.getCurrentPosition(function (status, result) {
            if (status === 'complete' && result.info === 'SUCCESS') {
                resolve([status, result])
            } else {
                reject([status, result])
            }
        })
    })
}
// 地址搜索
export const getLocaltionByWord = (address, city = '全国') => {
    return new Promise((resolve, reject) => {
        AMap.service(['AMap.PlaceSearch'], function () {
            const placeSearch = new AMap.PlaceSearch({
                extensions: 'all',
                city,
                citylimit: false
            })
            placeSearch.search(address, function (status, result) {
                if (status === 'complete' && result.info === 'OK') {
                    resolve(result)
                } else {
                    reject(result)
                }
            })
        })
    })
}
// 创建简单marker
export const createMarker = (amap, lnglat) => {
    const size = new AMap.Size(48, 48)
    const imageSize = new AMap.Size(48, 48)
    const locationIcon = new AMap.Icon({
        size: size,
        image: markPng,
        imageSize: imageSize
    })
    const marker = new AMap.Marker({
        map: amap,
        icon: locationIcon, // 地图标注
        zIndex: 101,
        animation: 'AMAP_ANIMATION_DROP', // 点标掉落效果
        position: new AMap.LngLat(...lnglat),
        offset: new AMap.Pixel(-24, -47) // 图片偏移
    })
    return marker
}
// 创建简单infowindow
export const createInfoWindow = (title, content, map, show) => {
    const info = document.createElement('div')
    if (!show) {
        info.className = 'info'
        const top = document.createElement('div')
        const titleD = document.createElement('div')
        const closeX = document.createElement('img')
        top.className = 'info-top'
        titleD.innerHTML = title
        closeX.src = 'http://webapi.amap.com/images/close2.gif'
        closeX.onclick = function() { map.clearInfoWindow() }
        top.appendChild(titleD)
        top.appendChild(closeX)
        info.appendChild(top)
    }
    // 定义中部内容
    const middle = document.createElement('div')
    middle.className = 'info-middle'
    middle.style.backgroundColor = 'white'
    middle.innerHTML = content
    info.appendChild(middle)

    // 定义底部内容
    const bottom = document.createElement('div')
    bottom.className = 'info-bottom'
    bottom.style.position = 'relative'
    bottom.style.top = '0px'
    bottom.style.margin = '0 auto'
    const sharp = document.createElement('img')
    sharp.src = 'http://webapi.amap.com/images/sharp.png'
    bottom.appendChild(sharp)
    info.appendChild(bottom)
    return info
}
// 生成infowindow
export const generateInfoContentFor = (map, marker, address) => {
    const infoContent = []
    infoContent.push("<div class='fc6'>" + address + '</div>')
    const infoWindow = new AMap.InfoWindow({
        isCustom: true, // 使用自定义窗体
        content: createInfoWindow('位置', infoContent.join('<br/>'), map),
        offset: new AMap.Pixel(15, -60)
    })
    infoWindow.open(map, marker.getPosition())
}
