<template>
    <div class="page-infinite-wrapper main" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
        <div class="header-top">
            <my-header :urlObj="urlObj" @formTitleType="formTitleType"></my-header>
            <div class="search">
                <input type="text" placeholder="搜索" v-model="params.pro_name">
                <i class="iconfont icon-shanchu" @click="params.pro_name=''" v-if="params.pro_name"></i>
                <i class="iconfont icon-shaixuan" @click="showSort = true"></i>
                <my-select v-show="showSort" @closeSort="closeSort" :urlObj="urlObj"></my-select>
            </div>
        </div>
        <div class="weui-panel__bd">
            <wv-group v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="50">
                <div class="item" v-for="(item,index) in list" :key="index" @click="jumpUrl(item)">
                    <div class="weui-media-box weui-media-box_appmsg">
                        <div class="weui-media-box__hd" v-if="urlObj.type!=='pMineList'"><img :src="item.creater_pic_url" alt="" class="weui-media-box__thumb"></div>
                        <div class="weui-media-box__bd">
                            <h4 class="weui-media-box__title">{{item.formsetinst_name}}</h4>
                            <p class="weui-media-box__desc">申请时间 : {{item['create_time']}}</p>
                            <p class="weui-media-box__desc">请假时间 : {{item['start_time']}}~{{item['start_time']}}</p>
                        </div>
                    </div>
                    <div class="line"></div>
                    <p class="weui-media-box__desc text">请假类型：{{item.type}}
                        <wv-badge color="#9FC488">{{item.state==0? '进行中':'已结束'}}</wv-badge>
                    </p>
                </div>
            </wv-group>
            <p v-show="!loading" class="loading-tips">
                <wv-spinner type="snake" color="#444" :size="24" />
            </p>
            <div class="has-no-record" v-if="loading&&list.length==0">
                <img alt="" :src="imgUrl">
                <p class="p1">暂时没有内容</p>
                <p class="p2"></p>
            </div>
            <p v-show="loading" class="loading-tips">
                <wv-footer class="footer-demo" text="移步到微技术支持"></wv-footer>
            </p>
        </div>
    </div>
</template>
<script>
import MyHeader from '@/components/child/header'
import MySelect from '@/components/child/select'
const img = require('@/assets/weixin_application_nothing01.jpg')
export default {
  data () {
    return {
      imgUrl: img,
      value: '',
      showSort: false,
      urlObj: {},
      list: [],
      loading: false,
      allLoaded: false,
      wrapperHeight: 0,
      numberPage: 0,
      params: { type: 0, pro_name: '', sort: 0, order: 1, page: 1 }
    }
  },
  components: {
    MyHeader,
    MySelect
  },
  mounted () {
    this.wrapperHeight =
      document.documentElement.clientHeight -
      this.$refs.wrapper.getBoundingClientRect().top
    this.getList(this.params)
  },
  methods: {
    mate (url) {
      if (url === 'pMineList') {
        return '/index.php?model=restmgt&m=ajax&a=index&cmd=103'
      } else if (url === 'pDealList') {
        return '/index.php?model=restmgt&m=ajax&a=index&cmd=102'
      } else if (url === 'pNotifyList') {
        return '/index.php?model=index&m=app&a=index&cmd=105'
      }
    },
    getList (opt) {
      Object.assign(this.params, opt)
      this.$common.req(this.mate(this.urlObj.type), this.params, res => {
        let newArr = res.data.info.data.map((item, index, input) => {
          item['create_time'] = this.$common.translateTimeStampToLocalDate(
            item['create_time']
          )
          item['start_time'] = this.$common.translateTimeStampToLocalDate2(
            item['start_time']
          )
          item['end_time'] = this.$common.translateTimeStampToLocalDate2(
            item['end_time']
          )
          return item
        })
        if (this.params.page === 1) {
          this.list = newArr
          this.loading = false
        } else {
          this.list = this.list.concat(newArr)
        }
        if (res.data.info.data.length === 0) {
          this.loading = true
        }
      })
    },
    loadMore () {
      if (this.getNumber() > 1) {
        this.getList({ page: this.params.page + 1 })
      } else {
        this.getNumber()
      }
    },
    getNumber () {
      return this.numberPage++
    },
    jumpUrl (item) {
      console.log(item)
    },
    closeSort (obj) {
      this.showSort = false
      this.getList({page: 1, order: obj.order, sort: obj.sort})
    },
    formTitleType (obj) {
      this.getList({page: 1, type: obj.type})
    }
  },
  watch: {
    'params.pro_name' (val) {
      this.getList({ page: 1, pro_name: val })
    }
  },
  created () {
    this.urlObj = {
      type: 'pMineList',
      state: 0
    }
  }
}
</script>
<style lang="less" scoped>
.header-top {
  width: 100%;
  position: fixed;
  z-index: 10;
  top: 0;
  background: #fff;
}
.search {
  height: 44px;
  padding-right: 46px;
  background: #f5f5f5;
  box-shadow: inset 0 0 0 0 #d9d9d9;
  position: relative;
  input {
    text-align: center;
    width: 100%;
    height: 28px;
    margin: 8px 0 8px 10px;
    background: #ffffff;
    border: 0 solid #d7dade;
    border-radius: 2px;
    outline: none;
  }
  .icon-shaixuan {
    position: absolute;
    right: 10px;
    top: 10px;
  }
  .icon-shanchu {
    position: absolute;
    right: 40px;
    top: 10px;
  }
}
.weui-panel__bd {
  padding-top: 92px;
}
.item {
  background: #fff;
  margin-bottom: 20px;
}
.item:last-child {
  margin-bottom: 0;
}
.text {
  padding: 9px 0 11px 15px;
}
.line {
  width: 95%;
  border: 0.5px solid #d9d9d9;
  margin: 0 auto;
}
.has-no-record {
  text-align: center;
  padding-left: 3%;
  padding-right: 3%;
  img {
    width: 275px;
    height: 150px;
    padding-bottom: 10px;
  }
}
</style>
<style>
.weui-media-box_appmsg .weui-media-box__thumb {
  border-radius: 50%;
}
.weui-cells {
  margin-top: 0;
  background-color: rgb(245, 245, 245);
}
.footer-demo {
  padding: 10px 0;
}
.weui-badge {
  margin-right: 15px;
  float: right;
}
.loading-tips{
    text-align:center;
}
</style>
