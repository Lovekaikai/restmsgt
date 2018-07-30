<template>
    <div class="traceRecord">
        <div class="page page-with-padding">
            <wv-cell-swipe title="请假人" :value="userName"></wv-cell-swipe>
            <!-- <wv-cell-swipe title="请假类型" is-link :value="fruit[0].name" @click.native="fruitPickerShow = true" />
            <wv-picker :visible.sync="fruitPickerShow" :columns="fruitColumns" value-key="name" @confirm="confirmPerson" /> -->
        </div>
        <p class="check">记录查询</p>
        <div class="trace">
            <div class="timeItem " :class="{active:index==active}" v-for="(item,index) in fastList" :key='index' @click="fastSelect(index)">
                {{item.lebel}}
            </div>
        </div>
        <wv-cell-swipe title="开始时间" is-link :value="start_time" @click.native="openPicker" />
        <wv-datetime-picker ref="picker" type="date" @confirm="confirm1">
        </wv-datetime-picker>
        <wv-cell-swipe title="结束时间" is-link :value="end_time" @click.native="openPicker2" />
        <wv-datetime-picker ref="picker2" type="date" @confirm="confirm2">
        </wv-datetime-picker>
        <div class="record">
            <wv-panel :title="text" v-if="info.count!=='0'">
            </wv-panel>
            <wv-panel title="暂无数据" class="not_data" v-if="info.count==0">
            </wv-panel>
            <wv-panel class="list" v-if="info.count!==0" v-for="(item,index) in info.data" :key="index">
                <p class="start_time">请假时间： {{$common.translateTimeStampToLocalDate2(item.start_time)}}~{{$common.translateTimeStampToLocalDate2(item.end_time)}}</p>
                <p class="countTime">请假时长：{{item.time}}天 </p>
            </wv-panel>
        </div>
    </div>
</template>
<script>
export default {
  data () {
    return {
      text: '',
      active: 0,
      time: '2018/09/08  ～2018/09/10',
      userName: '',
      currentVisible: false,
      fruit: [{ name: 'Apple', age: 1 }],
      start_time: '2018-09-02',
      end_time: '2018-09-02',
      info: {
        data: [],
        count: 0,
        total_time: 0
      },
      fastList: [
        {
          lebel: '最近20天',
          value: 0
        },
        {
          lebel: '上个月',
          value: 1
        },
        {
          lebel: '本月',
          value: 2
        },
        {
          lebel: '最近半个月',
          value: 3
        }

      ],
      fruitColumns: [
        {
          values: [
            {
              name: 'Apple',
              price: 1.3
            },
            {
              name: 'Banana',
              price: 2.0
            },
            {
              name: 'Orange',
              price: 10
            },
            {
              name: 'Pear',
              price: 0.5
            }
          ]
        }
      ]
    }
  },

  methods: {
    fastSelect (index) {
      this.active = index
      this._timeStamp(index)
    },
    _timeStamp (index) {
      let date = new Date()
      let current = Math.ceil(date.getTime() / 1000)
      if (index === 0) {
        // 最近20天
        let time = current - 1728000
        this.start_time = this.$common.translateTimeStampToLocalDate2(time)
        this.end_time = this.$common.translateTimeStampToLocalDate2(current)
      } else if (index === 1) {
        this.start_time = `${date.getFullYear()}-${date.getMonth() + 1 - 1}-1`
        this.end_time = `${date.getFullYear()}-${date.getMonth() + 1 - 1}-${this.getDaysInOneMonth(date.getFullYear(), date.getMonth())}`
      } else if (index === 2) {
        this.start_time = this.$common.translateTimeStampToLocalDate2(this.getCurrentMonthFirst())
        this.end_time = this.$common.translateTimeStampToLocalDate2(this.getCurrentMonthLast())
      } else if (index === 3) {
        this.start_time = this.$common.translateTimeStampToLocalDate2(current - 1209600)
        this.end_time = this.$common.translateTimeStampToLocalDate2(current)
      }
      // this.getTraceRecord()
    },

    getDaysInOneMonth (year, month) {
      month = parseInt(month, 10)
      var d = new Date(year, month, 0)
      console.log(d)
      return d.getDate()
    },
    lastMonthDate (index) {
    },
    getCurrentMonthFirst () {
      var date = new Date()
      date.setDate(1)
      return date.getTime() / 1000
    },
    getCurrentMonthLast () {
      var date = new Date()
      var currentMonth = date.getMonth()
      var nextMonth = ++currentMonth
      var nextMonthFirstDay = new Date(date.getFullYear(), nextMonth, 1)
      var oneDay = 1000 * 60 * 60 * 24
      return new Date(nextMonthFirstDay - oneDay).getTime() / 1000
    },
    openPicker () {
      this.$refs.picker.open()
    },
    openPicker2 () {
      this.$refs.picker2.open()
    },
    confirmPerson (picker, val) {
      this.fruit = picker.getValues()
    },
    getUserName () {
      this.$common.req(
        '/index.php?model=index&m=mine&a=index&cmd=101',
        {},
        res => {
          this.userName = res.data.info.userName
        }
      )
    },
    getTraceRecord () {
      let obj = {
        begin_time: this.start_time,
        end_time: this.end_time
      }
      this.$common.req(
        '/index.php?model=restmgt&m=ajax&a=index&cmd=111',
        obj,
        res => {
          this.info = res.data.info
          this.text = `总计请假时长：${this.info.total_time}天`
          console.log(this.info)
        }
      )
    },
    confirm1 (value) {
      this.start_time = this.$common.translateTimeStampToLocalDate2(
        new Date(value).getTime() / 1000
      )
      this.getTraceRecord()
    },
    confirm2 (value) {
      this.end_time = this.$common.translateTimeStampToLocalDate2(
        new Date(value).getTime() / 1000
      )
      this.getTraceRecord()
    }
  },
  created () {
    this.getUserName()
    this.getTraceRecord()
  }
}
</script>
<style scoped lang="less">
.traceRecord {
  height: 100vh;
  background: rgb(245, 245, 245);
  padding-top: 20px;
}
p.check {
  font-family: PingFangSC-Regular;
  font-size: 17px;
  color: #9b9b9b;
  line-height: 22px;
  margin: 20px 12px;
}
.trace {
  overflow: hidden;
}
.timeItem {
  float: left;
  min-width: 60px;
  height: 22px;
  border: 0.5px solid #d4d4d4;
  border-radius: 200px;
  margin: 0 10px 15px;
  text-align: center;
  padding: 5px;
  line-height: 22px;
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #9b9b9b;
  line-height: 22px;
  &.active {
    background: #2f7dcd;
    border-radius: 200px;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #ffffff;
    line-height: 22px;
  }
}
</style>
<style lang="less">
.weui-cells {
  margin-top: 0;
}
.weui-panel__hd {
  padding: 14px 15px 10px;
  /* color: #999; */
  font-size: 13px;
  position: relative;
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #2f7dcd;
  line-height: 22px;
}
.not_data {
  text-align: center;

  .weui-panel__hd {
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #9b9b9b;
    text-align: center;
    line-height: 22px;
  }
}
.weui-panel {
  margin-top: 0;
}
.list {
  .weui-panel__bd {
    margin: 10px 0 16px 8px;
  }
}

.start_time {
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #9b9b9b;
  line-height: 22px;
}
.countTime {
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #9b9b9b;
  line-height: 22px;
}
</style>
