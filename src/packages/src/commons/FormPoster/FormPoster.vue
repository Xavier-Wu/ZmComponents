<template>
<div class="form-poster">
  <div class="form-poster-list" :class="outItem.headImg ? 'has-avatar-list' : ''" v-for="(outItem, oidx) in infoItemList" :key="oidx + 'o'">
    <div class="poster-img" v-if="outItem.headImg">
      <img class="poster-avatar" :src="outItem.headImg" alt="暂无图片" v-default-img>
    </div>
    <div class="poster-info" :class="outItem.headImg ? 'has-avatar' : ''">
      <div class="poster-info-item tc" v-for="(item, index) in outItem.list" :key="index + 'i'">
        <p class="info-item-label">{{item.label}}</p>
        <p class="info-item-value" :class="item.class">
          <span>{{item.value}}</span>
          <span v-if="item.unit">{{item.unit}}</span>
        </p>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'FormPoster',
  props: {
    infoArr: { // 展示内容
      type: Array,
      required: true,
      default() {
        return []
      }
    },
    dict: { // 展示文案字典
      type: Array,
      required: true,
      default() {
        return []
      }
    }
  },
  data() {
    return {}
  },
  computed: {
    infoItemList: {
      get() {
        const arr = this.infoArr.map(i => {
          const list = this.dict.map(j => {
            return {
              label: j.label,
              value: i[j.value]
            }
          })
          return {
            ...i,
            list
          }
        })
        console.log(arr)
        return arr
      },
      set() {}
    }
  },
  created() {},
  mounted() {},
  methods: {}
}
</script>

<style lang="scss">
.form-poster {
  margin-top: 10px;
  background: rgba(242, 242, 242, 1);

  .has-avatar-list {
    min-height: 120px;
    padding: 15px 30px;
  }

  .form-poster-list {

    .poster-info {
      display: flex;
      align-items: center;
      justify-content: space-around;
      flex-direction: row;

      .poster-info-item {
        .info-item-value {
          font-size: 14px;
          color: #444;
        }
      }
    }

    .poster-img {
      float: left;

      .poster-avatar {
        width: 90px;
        height: 90px;
      }
    }

    .has-avatar {
      max-width: 90%;
    }
  }

}
</style>
