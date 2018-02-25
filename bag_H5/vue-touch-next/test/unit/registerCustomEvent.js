import test from 'ava'
import sinon from 'sinon'

import Vue from 'vue/dist/vue.common'
import VueTouch from './helpers/vue-touch'
import Hammer from 'hammerjs'

Vue.use(VueTouch, {hammer: Hammer})

let warn
test.before(t => {
  warn = sinon.stub(console, 'warn')
})
test('registerCustomEvent works before Vue.use(), errors after', t => {
  VueTouch.registerCustomEvent('doubletap', {taps: 2})
  // console.log(log.getCall(0).args[0])
  const pattern = /\[vue\-touch\]: Custom Event/
  t.true(pattern.test(warn.getCall(0).args[0]))
})
