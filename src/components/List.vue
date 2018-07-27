<template>
    <div class="page-infinite-wrapper main" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
        <div class="header-top">
            <my-header :formType="formType" @formTitleType="formTitleType"></my-header>
            <div class="search">
                <input type="text" placeholder="搜索">
                <i class="iconfont icon-shaixuan" @click="showSort = true"></i>
                <my-select v-show="showSort" @closeSort="closeSort" :formType="formType"></my-select>
            </div>
        </div>
        <div class="weui-panel__bd">
            <wv-group v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="50">
                <div class="item" v-for="(item1,index) in list" :key="index">
                    <div class="weui-media-box weui-media-box_appmsg">
                        <div class="weui-media-box__hd"><img :src="item1.creater_pic_url" alt="" class="weui-media-box__thumb"></div>
                        <div class="weui-media-box__bd">
                            <h4 class="weui-media-box__title">{{item1.creater_name}}</h4>
                            <p class="weui-media-box__desc">申请时间 : {{item1['create_time']}}</p>
                            <p class="weui-media-box__desc">请假时间 : {{item1['receive_time']}}</p>
                        </div>
                    </div>
                    <div class="line"></div>
                    <p class="weui-media-box__desc text">这里是一些描述文字。本例使用 url 进行跳转</p>
                </div>
            </wv-group>
            <p v-show="loading" class="loading-tips">
                <wv-spinner type="snake" color="#444" :size="24" />
            </p>
        </div>
    </div>
</template>
<script>
import MyHeader from '@/components/child/header'
import MySelect from '@/components/child/select'

export default {
  data () {
    return {
      pMineList: '/index.php?model=index&m=app&a=index&cmd=104',
      pDealList: '/index.php?model=index&m=app&a=index&cmd=103',
      pNotifyList: '/index.php?model=index&m=app&a=index&cmd=105',
      value: '',
      showSort: false,
      formType: '',
      list: [],
      loading: false,
      allLoaded: false,
      wrapperHeight: 0,
      params: { type: 0, pro_name: '', sort: 0, order: 1, page: 1, id: '86482' }
    }
  },
  components: {
    MyHeader,
    MySelect
  },
  mounted () {
    this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top
    this.getList(this.params)
  },
  methods: {
    closeSort (obj) {
      this.showSort = false
    },
    formTitleType (obj) {

    },
    getList (opt) {
      Object.assign(this.params, opt)
      this.$common.req('/index.php?model=index&m=app&a=index&cmd=103', this.params, (res) => {
        let newArr = res.data.info.data.map((item, index, input) => {
          item['create_time'] = this.$common.translateTimeStampToLocalDate(item['create_time'])
          item['receive_time'] = this.$common.translateTimeStampToLocalDate(item['receive_time'])
          return item
        })
        console.log(newArr)
        if (this.params.page === 1) {
          this.list = newArr
          this.loading = false
        } else {
          this.list = this.list.concat(newArr)
        }
        if (res.data.length === 0) {
          this.loading = true
        }
      })
    },
    loadMore () {
      if (this.getNumber() > 1) {
        this.getList({ page: this.obj.page + 1 })
      } else {
        this.getNumber()
        this.loading = false
      }
    },
    getNumber () {
      return this.numberPage++
    },
    requset () {}
  },
  created () {
    // this.formType = 'pMineList'
    this.formType = 'pDealList'
    // this.formType = 'pNotifyList'
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
  background: #f5f5f5;
  box-shadow: inset 0 0 0 0 #d9d9d9;
  position: relative;
  input {
    text-align: center;
    width: 85%;
    height: 28px;
    margin: 8px 0 8px 10px;
    background: #ffffff;
    border: 0 solid #d7dade;
    border-radius: 2px;
    outline: none;
  }
  .icon-shaixuan {
    margin-left: 10px;
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
</style>
<style>
.weui-media-box_appmsg .weui-media-box__thumb {
  border-radius: 50%;
}
.weui-cells {
  margin-top: 0;
  background-color: rgb(245, 245, 245);
}
</style>
