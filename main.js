import Vue from 'vue'
import App from './App'

// vuex
import store from './store'

// 引入全局uView
import uView from '@/uni_modules/uview-ui'
// 引入gmap-vue
import GmapVue from 'gmap-vue'
import mixin from './common/mixin'
import google_map_config_jp from './common/google_map_config_jp'
import google_map_config_en from './common/google_map_config_en'
import google_map_config_cn from './common/google_map_config_cn'
let localLanguage = uni.getStorageSync('local_lang');
let google_map_config_val = google_map_config_jp;
if (localLanguage === 'jp') {
    google_map_config_val = google_map_config_jp;
} else if (localLanguage === 'en') {
    google_map_config_val = google_map_config_en;
} else if (localLanguage === 'cn') {
    google_map_config_val = google_map_config_cn;
} else {
    google_map_config_val = google_map_config_jp;
}
Vue.use(GmapVue, {
    load: google_map_config_val,

    // [OPTIONAL] If you intend to programmatically custom event listener code
    // (e.g. `this.$refs.gmap.$on('zoom_changed', someFunc)`)
    // instead of going through Vue templates (e.g. `<GmapMap @zoom_changed="someFunc">`)
    // you might need to turn this on.
    autoBindAllEvents: false,

    // [OPTIONAL] If you want to manually install components, e.g.
    // import {GmapMarker} from 'gmap-vue/src/components/marker'
    // Vue.component('GmapMarker', GmapMarker)
    // then set installComponents to 'false'.
    // If you want to automatically install all the components this property must be set to 'true':
    installComponents: true,

    // Load the Google Maps API dynamically, if you set this to `true` the plugin doesn't load the Google Maps API
    dynamicLoad: false,
})


import TabList from "@/pages/components/TabList.vue";
import PCTabList from "@/pages/components/PCTabList.vue";
Vue.prototype.$store = store
Vue.config.productionTip = false
Vue.component('tab-list', TabList);
Vue.component('pc-tab-list', PCTabList);
App.mpType = 'app'
Vue.use(uView)

// #ifdef MP
// 引入uView对小程序分享的mixin封装
const mpShare = require('@/uni_modules/uview-ui/libs/mixin/mpShare.js')
Vue.mixin(mpShare)
// #endif

Vue.mixin(mixin)

const app = new Vue({
    store,
    ...App
})

// 引入请求封装
require('./util/request/index')(app)

app.$mount()
