<template>
    <div class="select">
        <div class="headSortScreen" @click="close"></div>
        <div class="sort">
            <div class="triangle_border_up">
                <span></span>
            </div>
            <ul>
                <li @click.stop="selectSort(index)" v-for="(item,index) in List" :key="index">
                    <span>
                        {{item.name}}
                        <template v-if="active===index">
                            <i class="iconfont icon-paixujiangxu" v-if="sortBo"></i>
                            <i class="iconfont icon-paixushengxu" v-if="!sortBo"></i>
                        </template>
                    </span>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
  props: ['formType'],
  data () {
    return {
      List: [
        { name: '默认', value: 0 },
        { name: '申请时间', value: 1 },
        { name: '发送人', value: 2 },
        { name: '流程名', value: 3 },
        { name: '表单名', value: 4 }
      ],
      active: 0,
      sortBo: false
    }
  },
  methods: {
    close () {
      this.$emit('closeSort')
    },
    selectSort (sort) {
      this.active = sort
      this.sortBo = !this.sortBo
      this.$emit('closeSort', { sort: sort, order: this.sortBo ? 1 : 0 })
    }
  },
  created () {
    if (this.formType === 'pNotifyList') {
      this.List = [
        { name: '进行中', value: 0 },
        { name: '申请时间', value: 1 },
        { name: '发送人', value: 2 },
        { name: '凯', value: 3 },
        { name: '流程名字', value: 4 }
      ]
    } else if (this.formType === 'pDealList') {
      this.List = [
        { name: '代办', value: 0 },
        { name: '申请时间', value: 1 },
        { name: '发送人', value: 2 },
        { name: '凯', value: 3 },
        { name: '流程名字', value: 4 }
      ]
    } else {
      this.list = [
        { name: '阅读', value: 0 },
        { name: '申请时间', value: 1 },
        { name: '发送人', value: 2 },
        { name: '流程名', value: 3 },
        { name: '表单名', value: 4 }
      ]
    }
  }
}
</script>
<style lang="less" scoped>
.headSortScreen {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0);
  z-index: 2000;
}
.select {
  position: absolute;
  right: 0;
}
.active {
  display: inline-block;
}
.sort {
  border-radius: 8px;
  background: rgba(38, 39, 40, 0.8);
  width: 128px;
  position: absolute;
  right: 0%;
  top: 0;
  z-index: 3000;
  li {
    text-align: center;
    color: #fff;
    list-style-type: none;
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #fff;
    position: relative;
  }
}
.triangle_border_up {
  position: relative;
}
.triangle_border_up span {
  display: block;
  width: 0;
  height: 0;
  border-width: 0 10px 12px;
  border-style: solid;
  border-color: transparent transparent rgba(38, 39, 40, 0.8);
  position: absolute;
  top: -12px;
  right: 12px;
}
</style>
