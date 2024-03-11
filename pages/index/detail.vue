<template>
  <view>

    <u-navbar
        :title="tabTitle"
        @rightClick="rightClick"
        @leftClick="leftClick"
        :autoBack="true">
    </u-navbar>
    <!-- 头部内容 -->
    <view>

      <!-- 背景为黑色的透明框，该透明框相对定位，定位在图片的左侧高度为106px 宽度为340px -->
      <view :style="{ top: deviceType === 'phone' ? '170px' : '90px' }" style="position: absolute; left: 0; width: 340px; background-color: rgba(0,0,0,0.7); z-index: 10">
        <view style="padding: 10px 15px; color: #ffffff">
          <u--text :text="dataInfoText" size="20px" color="#ffffff"></u--text>

          <u--text :text="dataInfoCountryText" size="13px" color="#ffffff"></u--text>

          <u-row customStyle="margin-top: 10px" justify="space-between">
            <u-col span="1" justify="center" textAlign="center">
              <svg v-if="dataInfo.additional_info.category === 'Cultural'" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="8" cy="8" r="8" fill="#A57AED"/>
                <path d="M4.84211 6.85714V9.85714H6.10526V6.85714H4.84211ZM7.36842 6.85714V9.85714H8.63158V6.85714H7.36842ZM4 12H12V10.7143H4V12ZM9.89474 6.85714V9.85714H11.1579V6.85714H9.89474ZM8 3L4 5.14286V6H12V5.14286L8 3Z" fill="white"/>
              </svg>

              <svg v-if="dataInfo.additional_info.category === 'Natural'" width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <ellipse cx="9.08523" cy="8" rx="8.21951" ry="8" fill="#4E9CA1"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M11.2831 3.92202C10.9684 4.10451 10.8606 4.50867 11.0423 4.82474L12.1387 6.73242C12.3204 7.0485 12.7228 7.1568 13.0374 6.97431C13.3521 6.79182 13.4599 6.38766 13.2782 6.07158L12.1818 4.1639C12.0001 3.84783 11.5977 3.73953 11.2831 3.92202ZM10.3948 4.94594L7.13443 6.83679C6.71489 7.08011 6.57114 7.61899 6.81337 8.04043L6.87591 8.14924L6.86826 8.15354L5.25258 9.09055L5.08474 8.79852C4.99817 8.6479 4.80253 8.59411 4.64778 8.67837C4.49302 8.76263 4.43775 8.95304 4.52432 9.10366L5.1822 10.2483C5.26878 10.3989 5.46441 10.4527 5.61917 10.3684C5.77392 10.2842 5.8292 10.0938 5.74262 9.94313L5.56621 9.6362L7.18948 8.6948L7.25195 8.8035C7.49418 9.22493 8.03065 9.36933 8.4502 9.12601L9.03682 8.7858L7.33032 12.0241C7.24939 12.1777 7.31169 12.3661 7.46948 12.4448C7.62726 12.5236 7.82077 12.4629 7.90169 12.3094L9.80895 8.69008L11.7162 12.3094C11.7971 12.4629 11.9906 12.5236 12.1484 12.4448C12.3062 12.3661 12.3685 12.1777 12.2876 12.0241L10.2196 8.09985L11.7157 7.2322C11.6647 7.17256 11.6187 7.10757 11.5784 7.03755L10.482 5.12987C10.4476 5.0701 10.4186 5.0086 10.3948 4.94594Z" fill="white"/>
              </svg>

              <svg v-if="dataInfo.additional_info.category === 'Mixed'" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="8" cy="8" r="8" fill="#82A0EE"/>
                <circle cx="8" cy="5" r="2" fill="white"/>
                <circle cx="5" cy="10" r="2" fill="white"/>
                <circle cx="11" cy="10" r="2" fill="white"/>
              </svg>
            </u-col>
            <u-col span="11" justify="center" textAlign="center" align="center">
              <u--text size="13" :text="inscribedText" color="#ffffff"></u--text>
            </u-col>
          </u-row>
          <u-row customStyle="margin-top: 10px" justify="space-between">
            <u-col span="11" justify="center" textAlign="center" align="center">
              <u--text size="13" :text="criteriaTxtText" color="#ffffff"></u--text>
            </u-col>
          </u-row>
        </view>
      </view>

      <u--image v-if="deviceType === 'phone'" :showLoading="true" :src="getCoverImageUrl(dataInfo.cover_img)" width="100%" height="400px"></u--image>
      <u--image v-else :showLoading="true" :src="getCoverImageUrl(dataInfo.cover_img)" width="100%" height="400px"></u--image>


      <view v-if="deviceType === 'phone'">


        <view style="padding: 15px"  @click="clickMap">
          <!-- 地图组件 -->
          <view id="map" :style="this.mapStyle"></view>
          <!-- 地图组件 -->

        </view>

        <view style="padding: 15px; font-size: 14px; color: #1C3B53; font-weight: 400">
          <!-- 富文本组件 -->
          <u-parse :content="dataContent"></u-parse>
          <!-- 富文本组件 -->
        </view>
      </view>

      <view v-else>
        <u-row customStyle="margin-bottom: 10px; padding: 15px" align="top">
          <u-col span="8" justify="start">
            <view style="padding: 15px; font-size: 14px; color: #1C3B53; font-weight: 400">
              <!-- 富文本组件 -->
              <u-parse :content="dataContent"></u-parse>
              <!-- 富文本组件 -->
            </view>
          </u-col>
          <u-col span="4" justify="flex-end">
            <view style="" @click="clickMap">
              <!-- 地图组件 -->
              <view id="map" :style="this.pcMapStyle"></view>
              <!-- 地图组件 -->
            </view>
          </u-col>
        </u-row>
      </view>

    </view>
    <!-- 头部内容 -->


  </view>
</template>

<script>
import {getDataDetail} from '@/util/request/api.js';
import {getGoogleMapsAPI} from "gmap-vue";
import {s3Path} from "@/common/config";

export default {
  data() {
    return {
      languageChangeShow: false,
      languageCategory: 'jp',
      center: {lat: 0, lng: 0},
      deviceType: 'phone',
      currentLanguage: 'jp',
      mapStyle: {
        width: '100%',
        height: '120px',
      },
      pcMapStyle: {
        width: '100%',
        height: '280px',
      },
      heritageCountryNameEN: '',
      heritageCountryNameJP: '',
      listQuery: {
        id: '',
      },
      dataInfo: {
        id: '',
        name_en: '',
        name_jp: '',
        name_fr: '',
        latitude: '',
        longitude: '',
        cover_img: '',
        states_name: '',
        criteria_txt: '',
        date_inscribed: '',
        country: [],
        content: {
          app_data_id: '',
          content_jp: '',
          content_en: '',
          content_cn: '',
        },
        additional_info: {

        }
      }
    };
  },
  computed: {
    google: getGoogleMapsAPI,
    isLogin() {
      return this.$store.state.isLogin;
    },
    tabTitle() {
      if (this.currentLanguage === 'jp') {
        return 'サイト情報'
      } else if (this.currentLanguage === 'en') {
        return 'Info'
      } else {
        return '详情'
      }
    },
    dataContent() {
      if (this.currentLanguage === 'jp') {
        return this.dataInfo.content.content_jp
      } else if (this.currentLanguage === 'en') {
        return this.dataInfo.content.content_en
      } else {
        return this.dataInfo.content.content_cn
      }
    },
    dataInfoText() {
      if (this.currentLanguage === 'jp') {
        return this.dataInfo.name_jp
      } else if (this.currentLanguage === 'en') {
        return this.dataInfo.name_en
      } else {
        return this.dataInfo.name_jp
      }
    },
    dataInfoCountryText() {
      if (this.currentLanguage === 'jp') {
        return this.dataInfo.country.map(item => item.name_jp).join('/')
      } else if (this.currentLanguage === 'en') {
        return this.dataInfo.country.map(item => item.name_en).join('/')
      } else {
        return this.dataInfo.country.map(item => item.name_cn).join('/')
      }
    },
    // 收录标准
    criteriaTxtText() {
      if (this.currentLanguage === 'jp') {
        return '登録基準' + this.dataInfo.additional_info.criteria_txt
      } else if (this.currentLanguage === 'en') {
        return 'Criteria' + this.dataInfo.additional_info.criteria_txt
      } else {
        return '收录标准' + this.dataInfo.additional_info.criteria_txt
      }
    },
    inscribedText() {
      if (this.currentLanguage === 'jp') {
        return '登録年 ' + this.dataInfo.additional_info.date_inscribed
      } else if (this.currentLanguage === 'en') {
        return 'Date of Inscription ' + this.dataInfo.additional_info.date_inscribed
      } else {
        return '收录年 ' + this.dataInfo.additional_info.date_inscribed
      }
    }
  },
  watch: {
    google: function (newObj, oldObj) {
      if (newObj) {
        window.initMap = this.initMap();
      }
    },
    dataInfo: function (newObj, oldObj) {
      if (newObj) {
        window.initMap = this.initMap();
      }
    }
  },
  onLoad(options) {
    this.deviceType = uni.$u.sys().deviceType
    this.currentLanguage = uni.getStorageSync('local_lang');
    if (options.id) {
      this.listQuery.id = options.id
      this.getDataInfo()
    } else {
      uni.showToast({
        title: 'データがありません',
        icon: 'none',
        duration: 2000
      });
    }
  },
  async mounted() {
    await this.$gmapApiPromiseLazy();
  },
  methods: {
    getDataInfo() {
      uni.showLoading({
        title: 'Loading'
      });
      getDataDetail({ params: this.listQuery}).then((response) => {
        this.dataInfo = response.data
        // 处理国家名称 this.heritageCountryNameEN this.heritageCountryNameJP
        this.dataInfo.country.forEach((item, index) => {
          if (index === 0) {
            this.heritageCountryNameEN = item.name_en
            this.heritageCountryNameJP = item.name_jp
          } else {
            this.heritageCountryNameEN = this.heritageCountryNameEN + ' ' + item.name_en
            this.heritageCountryNameJP = this.heritageCountryNameJP + ' ' + item.name_jp
          }
        })
        uni.hideLoading()
      }).catch(() => {
        uni.hideLoading()
      })
    },
    getCoverImageUrl(image) {
      // 如果image是以 http 或者 https 开头的, 那么就直接返回，否则就拼接
      if (image.startsWith('http') || image.startsWith('https')) {
        return image
      } else {
        return s3Path + image
      }
    },
    initMap() {
      const myLatLng = {lat: parseInt(this.dataInfo.latitude), lng: parseInt(this.dataInfo.longitude)};
      this.map = new google.maps.Map(document.getElementById("map"), {
        center: myLatLng,
        zoom: 6,
        zoomControl: false, // 禁用缩放控件
        streetViewControl: false, // 禁用街景视图控件
        mapTypeControl: false, // 启用地图类型控件
        fullScreenControl: false, // 禁用全屏控件
        rotateControl: false, // 禁用旋转控件
        fullscreenControl: false, // 禁用全屏按钮
        gestureHandling: "none", // 禁用手势操作
        // styles: this.mapStyle,
      });
      const map = this.map;
      new google.maps.Marker({
        position: myLatLng,
        map,
        title: "Hello World!",
      });
    },
    rightClick() {
      this.languageChangeShow = !this.languageChangeShow
    },
    leftClick() {
      uni.$u.route({
        url: '/pages/index/list'
      })
    },
    languageChange(language) {
      this.languageCategory = language
      this.languageChangeShow = false
    },
    clickMap() {
      window.location.href = 'https://www.google.com/maps/dir/?api=1&destination=' + this.dataInfo.name_jp + '&destination_place_id=' + this.dataInfo.latitude + ',' + this.dataInfo.longitude;
    }
  },
}
</script>

<style lang="scss" scoped>
.text {
  font-size: 12px;
  color: #666;
  margin-top: 5px;
}

.uni-px-5 {
  padding-left: 10px;
  padding-right: 10px;
}

.uni-pb-5 {
  padding-bottom: 10px;
}
.basketball-option {
  background-color: #1C3B53;
}

.football-option {
  background-color: #1C3B53;
}

.swimming-option {
  background-color: #1C3B53;
}
.list-cell {
  display: flex;
  box-sizing: border-box;
  width: 100%;
  padding: 10px 24rpx;
  overflow: hidden;
  color: #323233;
  font-size: 14px;
  line-height: 24px;
  background-color: #fff;
}
.bottom-button-area {
  position: fixed;
  width: 100%;
  bottom:  1rem;
}
.bottom-button {
  width: 40%;
  height: 40px;
  background: #1C3B53;
  border-radius: 4px;
  color: #ffffff;
  font-size: 15px;
  line-height: 40px
}
</style>
