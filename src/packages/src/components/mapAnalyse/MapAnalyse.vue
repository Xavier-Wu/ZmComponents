<template>
  <div>
    <zm-dialog
      title="选择地点"
      :visible.sync="mapShow"
      append-to-body
      :before-close="_cancelMap"
      :close-on-click-modal="false"
      size="small"
      class="dialog-map"
      @cancel="_cancelMap"
      @confirm="_confirmMap"
    >
      <div class="amap-box">
        <div>
          <div class="pos-r pt10">
            <div class="map-input-box">
              <el-autocomplete
                class="inline-input w300"
                v-model="keyword"
                :fetch-suggestions="_querySearch"
                placeholder="请输入内容"
                @select="_handleSelect"
                size="mini"
              ></el-autocomplete>
            </div>
            <div class="amap-container" id="mapContainer" style="height:400px"></div>
          </div>
        </div>
      </div>
    </zm-dialog>
  </div>
</template>
<script>
import * as mapUtils from './mapUtils'
export default {
  name: 'MapAnalyse',
  inject: ['provinceCity'],
  data() {
    return {
      map: null,
      mapCenter: [119.296531, 26.074184],
      mapShow: false,
      isResolve: false,
      address: '',
      keyword: '',
      code: '',
      city: '',
      adcode: '',
      addressComponent: {}
    }
  },
  computed: {
    addrObj() {
      return {
        lnglat: this.mapCenter,
        address: this.address,
        addressComponent: this.addressComponent,
        adcode: this.adcode
      }
    }
  },
  watch: {
    mapShow(nv) {
      if (!nv) {
        this.keyword = ''
      }
    }
  },
  methods: {
    // 初始化地图
    async _initMap() {
      this.city = ''
      this.map = new AMap.Map('mapContainer', {
        resizeEnable: true,
        zoom: 14,
        city: this.code
      })
      if (this.mapCenter.length < 2) {
        const area = await mapUtils.showCurrentArea()
        console.log(area)
        if (area[0] === 'complete' && area[1].info === 'SUCCESS') {
          this.adcode = area[1].addressComponent.adcode
          this.code =
            area[1].addressComponent.province + area[1].addressComponent.city
          this.city = area[1].addressComponent.city
          this.addressComponent = area[1].addressComponent
          this.mapCenter = [area[1].position.lng, area[1].position.lat]
        } else {
          const cityS = await mapUtils.showCityInfo()
          this.addressComponent = cityS.addressComponent
          this.city = cityS.city
          this.code = cityS
          this.map.setCity(cityS.city)
          const center = this.map.getCenter()
          this.mapCenter = [center.lng, center.lat]
          this.$message({
            message: '自动定位失败，请拖动地图完成定位！',
            type: 'warning'
          })
        }
      }
      this.map.setCenter(this.mapCenter)
      this._generatorMarker()
      this._setMapPosition(true)
      AMap.plugin(['AMap.ToolBar', 'AMap.Scale'], () => {
        this.map.addControl(new AMap.ToolBar())
        this.map.addControl(new AMap.Scale())
      })

      AMap.event.addListener(this.map, 'dragstart', () => {
        mapUtils.clearInfoWindow(this.map)
      })
      AMap.event.addListener(this.map, 'dragging', () => {
        const LngLatXY = this.map.getCenter()
        this.marker.setPosition(LngLatXY)
      })
      AMap.event.addListener(this.map, 'dragend', () => {
        this._setMapPosition()
      })
      // 缩放地图
      // AMap.event.addListener(this.map, 'zoomchange', () => {
      //   this._setMapPosition()
      // })
    },
    // 设置地图位置并展示
    _setMapPosition(isInit = false) {
      if (!isInit) {
        const LngLatXY = this.map.getCenter()
        // console.log(LngLatXY);
        // this.marker.setPosition(this.mapCenter);
        this.marker.setPosition(LngLatXY)
        this.mapCenter = [LngLatXY.lng, LngLatXY.lat]
      }
      mapUtils.getAddreByLnglat(this.mapCenter, this.code).then(data => {
        console.log(data)
        this.address = data.regeocode.formattedAddress
        this.city = data.regeocode.addressComponent.city
        this.adcode = data.regeocode.addressComponent.adcode
        this.addressComponent = data.regeocode.addressComponent
        console.log(this.adcode)
        mapUtils.generateInfoContentFor(this.map, this.marker, this.address)
      })
    },
    // 生成marker
    _generatorMarker() {
      this.marker = mapUtils.createMarker(this.map, this.mapCenter)
    },
    // 地图取消
    _cancelMap() {
      this.mapShow = false
      this.isResolve = -1
    },
    // 地图确认
    _confirmMap() {
      this.mapShow = false
      this.isResolve = 1
    },
    // 地址搜索
    _querySearch(str, cb) {
      mapUtils.getLocaltionByWord(str, this.city).then(
        result => {
          const _pois = result.poiList.pois
          const _data = Object.freeze(
            _pois.map(p => {
              return {
                value: p.name + ` ( ${p.cityname} ${p.adname} )`,
                label: p.location,
                pos: p
              }
            })
          )
          cb(_data)
        },
        () => {
          cb([])
        }
      )
    },
    // 地址选中
    _handleSelect(item) {
      this.map.setCenter([item.label.lng, item.label.lat])
      this.mapCenter = [item.label.lng, item.label.lat]
      setTimeout(() => {
        this._setMapPosition()
      }, 0)
    }
  }
}
</script>
<style lang="scss">
@import './style';
</style>
