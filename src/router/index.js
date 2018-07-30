import Vue from 'vue'
import Router from 'vue-router'
import List from '@/components/List.vue'
import traceRecord from '@/components/traceRecord.vue'
Vue.use(Router)

let routes = new Router({
  routes: [
    {
      path: '/',
      name: 'List',
      component: List
    }, {
      path: '/traceRecord',
      name: 'traceRecord',
      component: traceRecord
    }
  ]
})

export default routes
