<template>
    <div class="header">
        <div class="navbar">
            <span class="item " v-for="(item,index) in list" :key="index" :class="{'active':active==index}" @click="clickItem(index)">
                {{item.name}}
            </span>
        </div>
    </div>
</template>
<script>
export default {
  props: ['formType'],
  data () {
    return {
      list: [{ name: '代办', value: '0' }, { name: '已办', value: '1' }],
      active: 0
    }
  },
  methods: {
    clickItem (item) {
      this.active = item
      this.$emit('formTitleType', {type: item})
    }
  },
  created () {
    if (this.formType === 'pNotifyList') {
      this.list = [
        {
          name: '运行中',
          value: '0'
        },
        {
          name: '已结束',
          value: '1'
        },
        {
          name: '草稿',
          value: '2'
        }
      ]
    } else {
      this.list = [
        { name: '已阅读', value: '0' },
        { name: '未阅读', value: '1' }
      ]
    }
  }
}
</script>
<style lang="less" scoped>
.header {
  text-align: center;
  height: 48px;
  .navbar {
    margin: 9px auto;
    display: inline-block;
    height: 28px;
    text-align: center;
    line-height: 28px;
    border-radius: 4px;
    border: 1px solid #2f7dcd;
  }
  .item {
    width: 67px;
    height: 28px;
    float: left;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #4b7ad1;
    &.active {
      background: #2f7dcd;
      color: #fff;
    }
  }
  .item:first-child {
    border-right: 1px solid #2f7dcd;
  }
  .item:last-child {
    border-left: 1px solid #2f7dcd;
  }
}
</style>
