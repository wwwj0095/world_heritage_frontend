<template>
  <view>

    <u-navbar
        title="サイト情報"
        @rightClick="rightClick"
        @leftClick="leftClick"
        :autoBack="true">
      <view slot="right">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" :style="{ marginTop: deviceType === 'phone' ? '5px' : '19px' }" style="height: 150px">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M10.88 5H20C21.1 5 22 5.9 22 7V20C22 21.1 21.1 22 20 22H12L11 19H4C2.9 19 2 18.1 2 17V4C2 2.9 2.9 2 4 2H10L10.88 5ZM14.39 14.58C13.94 14.06 13.53 13.48 13.2 12.88L13.85 15.11L14.39 14.58ZM12.98 12.12H13.97C14.21 12.59 14.58 13.2 15.1 13.82C16.32 12.39 16.66 11.08 16.66 11.08H12.67L12.98 12.12ZM20 21C20.55 21 21 20.55 21 20V7C21 6.45 20.55 6 20 6H11.18L12.36 10.04H14.32V9H15.36V10.04H19V11.08H17.73C17.41 12.34 16.71 13.56 15.81 14.59L18.52 17.27L17.79 18L15.11 15.31L14.19 16.23L15 19L13 21H20ZM3.82595 14.6059H5.02507L5.71079 12.6244H8.63618L9.32071 14.6059H10.5198L7.82546 7.11869H6.52032L3.82595 14.6059ZM8.3078 11.6739L7.20397 8.47867H7.14547L6.03973 11.6739H8.3078Z" fill="#1C3B53"/>
        </svg>

      </view>
    </u-navbar>
    <!-- 头部内容 -->
    <view>

      <view v-if="languageChangeShow" class="language-area" style="width: 100%; background-color: #fff; position: fixed; top: 40px; left: 0; z-index: 1000">
        <view style="height: 5rem; padding: 10px">
          <u-row customStyle="margin-bottom: 10px">
            <u-col span="12">
              <view
                  @click="languageChange('jp')"
                  style="display: flex; align-items: center; justify-content: center; border-radius: 8px; background-color: #1C3B53; height: 40px; color: #ffffff; font-size: 15px; text-align: center; line-height: 40px">
                <span style="margin-right: 5px;">日本語</span>
                <svg v-if="heritageInfo.content.is_translate" style="line-height: 40px;" width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="9" cy="8" r="8" fill="#7D78B8"/>
                  <path d="M5.97387 8.05H8.39387L7.20387 4.72H7.18387L5.97387 8.05ZM6.68387 3.86H7.73387L10.5239 11H9.47387L8.69387 8.85H5.67387L4.87387 11H3.90387L6.68387 3.86ZM11.2682 3.86H12.2182V11H11.2682V3.86Z" fill="white"/>
                </svg>
              </view>
            </u-col>
          </u-row>
          <u-row customStyle="margin-bottom: 10px">
            <u-col span="12">
              <view @click="languageChange('eng')"
                    style="border-radius: 8px; background-color: #1C3B53; height: 40px; color: #ffffff; font-size: 15px; text-align: center; line-height: 40px" >
                English
              </view>
            </u-col>
          </u-row>
        </view>
      </view>


      <!-- 背景为黑色的透明框，该透明框相对定位，定位在图片的左侧高度为106px 宽度为340px -->
      <view :style="{ top: deviceType === 'phone' ? '170px' : '90px' }" style="position: absolute; left: 0; width: 340px; background-color: rgba(0,0,0,0.7); z-index: 10">
        <view style="padding: 10px 15px; color: #ffffff">
          <u--text v-if="languageCategory === 'jp'" :text="heritageInfo.name_jp" size="20px" color="#ffffff"></u--text>
          <u--text v-else-if="languageCategory === 'eng'" :text="heritageInfo.name_en" size="20px" color="#ffffff"></u--text>
          <u--text v-else :text="heritageInfo.name_jp" size="20px" color="#ffffff"></u--text>


          <u--text v-if="languageCategory === 'jp'" :text="heritageCountryNameJP" size="13px" color="#ffffff"></u--text>
          <u--text v-else-if="languageCategory === 'eng'" :text="heritageCountryNameEN" size="13px" color="#ffffff"></u--text>
          <u--text v-else :text="heritageCountryNameJP" size="13px" color="#ffffff"></u--text>


          <u-row customStyle="margin-top: 10px" justify="space-between">
            <u-col span="1" justify="center" textAlign="center" align="center">
              <svg v-if="heritageInfo.category === 'Cultural'" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="8" cy="8" r="8" fill="#A57AED"/>
                <path d="M4.84211 6.85714V9.85714H6.10526V6.85714H4.84211ZM7.36842 6.85714V9.85714H8.63158V6.85714H7.36842ZM4 12H12V10.7143H4V12ZM9.89474 6.85714V9.85714H11.1579V6.85714H9.89474ZM8 3L4 5.14286V6H12V5.14286L8 3Z" fill="white"/>
              </svg>

              <svg v-if="heritageInfo.category === 'Natural'" width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <ellipse cx="9.08523" cy="8" rx="8.21951" ry="8" fill="#4E9CA1"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M11.2831 3.92202C10.9684 4.10451 10.8606 4.50867 11.0423 4.82474L12.1387 6.73242C12.3204 7.0485 12.7228 7.1568 13.0374 6.97431C13.3521 6.79182 13.4599 6.38766 13.2782 6.07158L12.1818 4.1639C12.0001 3.84783 11.5977 3.73953 11.2831 3.92202ZM10.3948 4.94594L7.13443 6.83679C6.71489 7.08011 6.57114 7.61899 6.81337 8.04043L6.87591 8.14924L6.86826 8.15354L5.25258 9.09055L5.08474 8.79852C4.99817 8.6479 4.80253 8.59411 4.64778 8.67837C4.49302 8.76263 4.43775 8.95304 4.52432 9.10366L5.1822 10.2483C5.26878 10.3989 5.46441 10.4527 5.61917 10.3684C5.77392 10.2842 5.8292 10.0938 5.74262 9.94313L5.56621 9.6362L7.18948 8.6948L7.25195 8.8035C7.49418 9.22493 8.03065 9.36933 8.4502 9.12601L9.03682 8.7858L7.33032 12.0241C7.24939 12.1777 7.31169 12.3661 7.46948 12.4448C7.62726 12.5236 7.82077 12.4629 7.90169 12.3094L9.80895 8.69008L11.7162 12.3094C11.7971 12.4629 11.9906 12.5236 12.1484 12.4448C12.3062 12.3661 12.3685 12.1777 12.2876 12.0241L10.2196 8.09985L11.7157 7.2322C11.6647 7.17256 11.6187 7.10757 11.5784 7.03755L10.482 5.12987C10.4476 5.0701 10.4186 5.0086 10.3948 4.94594Z" fill="white"/>
              </svg>

              <svg v-if="heritageInfo.category === 'Mixed'" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="8" cy="8" r="8" fill="#82A0EE"/>
                <circle cx="8" cy="5" r="2" fill="white"/>
                <circle cx="5" cy="10" r="2" fill="white"/>
                <circle cx="11" cy="10" r="2" fill="white"/>
              </svg>
            </u-col>
            <u-col span="11" justify="center" textAlign="center" align="center">
              <u--text v-if="languageCategory === 'jp'" size="13" :text="'登録年: ' + heritageInfo.date_inscribed + '｜登録基準: ' + heritageInfo.criteria_txt" color="#ffffff"></u--text>
              <u--text v-else-if="languageCategory === 'eng'" size="13" :text="'Date of Inscription: ' + heritageInfo.date_inscribed + '｜Criteria: ' + heritageInfo.criteria_txt" color="#ffffff"></u--text>
              <u--text v-else size="13" :text="'登録年: ' + heritageInfo.date_inscribed + '｜登録基準: ' + heritageInfo.criteria_txt" color="#ffffff"></u--text>
            </u-col>
          </u-row>
        </view>
      </view>

      <u--image v-if="deviceType === 'phone'" :showLoading="true" :src="heritageInfo.cover_img" width="100%" height="400px"></u--image>
      <u--image v-else :showLoading="true" :src="heritageInfo.cover_img" width="100%" height="400px"></u--image>


      <view v-if="deviceType === 'phone'">


        <view style="padding: 15px"  @click="clickMap">
          <!-- 地图组件 -->
          <view id="map" :style="this.mapStyle"></view>
          <!-- 地图组件 -->

        </view>

        <view style="padding: 15px; font-size: 14px; color: #1C3B53; font-weight: 400">
          <!-- 富文本组件 -->
          <u-parse v-if="languageCategory === 'jp'"  :content="heritageInfo.content.justification_jp"></u-parse>
          <u-parse v-else-if="languageCategory === 'eng'"  :content="heritageInfo.content.justification_en"></u-parse>
          <u-parse v-else :content="heritageInfo.content.justification_jp" ></u-parse>
          <!-- 富文本组件 -->
        </view>
      </view>

      <view v-else>
        <u-row customStyle="margin-bottom: 10px; padding: 15px" align="top">
          <u-col span="8" justify="start">
            <view style="padding: 15px; font-size: 14px; color: #1C3B53; font-weight: 400">
              <!-- 富文本组件 -->
              <u-parse v-if="languageCategory === 'jp'"  :content="heritageInfo.content.justification_jp"></u-parse>
              <u-parse v-else-if="languageCategory === 'eng'"  :content="heritageInfo.content.justification_en"></u-parse>
              <u-parse v-else :content="heritageInfo.content.justification_jp" ></u-parse>
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
import {getHeritageDetail} from '@/util/request/api.js';
import {getGoogleMapsAPI} from "gmap-vue";

export default {
  data() {
    return {
      languageChangeShow: false,
      languageCategory: 'jp',
      center: {lat: 0, lng: 0},
      deviceType: 'phone',
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
        page: 1,
        limit: 10,
        keyword: '',
        category: '',
        country: ''
      },
      heritageInfo: {
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
        states_name_jp: '',
        country: [

        ],
        content: {
          is_translate: 0,
          justification_en: '',
          justification_jp: '',
        }
      }
    };
  },
  computed: {
    google: getGoogleMapsAPI,
    isLogin() {
      return this.$store.state.isLogin;
    }
  },
  watch: {
    google: function (newObj, oldObj) {
      if (newObj) {
        window.initMap = this.initMap();
      }
    },
    heritageInfo: function (newObj, oldObj) {
      if (newObj) {
        window.initMap = this.initMap();
      }
    }
  },
  onLoad(options) {
    this.deviceType = uni.$u.sys().deviceType
    if (options.id) {
      this.listQuery.id = options.id
      this.getHeritageInfo()
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
    getHeritageInfo() {
      uni.showLoading({
        title: 'Loading'
      });
      getHeritageDetail({ custom: { auth: false}, params: this.listQuery}).then((response) => {
        this.heritageInfo = response.data
        // 处理国家名称 this.heritageCountryNameEN this.heritageCountryNameJP
        this.heritageInfo.country.forEach((item, index) => {
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
    initMap() {
      const myLatLng = {lat: parseInt(this.heritageInfo.latitude), lng: parseInt(this.heritageInfo.longitude)};
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
        url: '/pages/index/h_list'
      })
    },
    languageChange(language) {
      this.languageCategory = language
      this.languageChangeShow = false
    },
    clickMap() {
      window.location.href = 'https://www.google.com/maps/dir/?api=1&destination=' + this.heritageInfo.name_jp + '&destination_place_id=' + this.heritageInfo.latitude + ',' + this.heritageInfo.longitude;
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
