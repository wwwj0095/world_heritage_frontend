<template>
  <view>

    <!-- 通知组件 -->
    <u-toast ref="uToast"></u-toast>
    <!-- 通知组件 -->

    <!-- 顶部个人中心组件 -->
    <tab-list
        v-if="deviceType === 'phone'"
        :user-info="userInfo"
        :tab-index="tabIndex"
        :show-about="true"
        ref="tabList"
        :tab-list="tabListData"></tab-list>
    <pc-tab-list
        v-else
        :user-info="userInfo"
        :tab-index="tabIndex"
        :show-about="true"
        :tab-list="tabListData"
                 style="position: fixed; top: 0; background: rgba(255, 255, 255, 0.70);   flex-shrink: 0;">

    </pc-tab-list>
    <!-- 顶部个人中心组件 -->


    <!-- 达成状况 -->
    <view class="achievement-box">
      <view class="achievement-box-content">
        <u-row style="height: 70px; padding: 0 10px ">
          <u-col :span="isLogin ? 8 : 12">
            <u-row style="padding: 5px 0;">
              <u-col>
                <span style="font-size: 13px;font-weight: 700;">🌍 達成状況</span>
              </u-col>
            </u-row>
            <u-row style="padding: 5px 0;">
              <u-col>
                <span v-if="isLogin" style="font-size: 13px;font-weight: 400;">グローバルチェックイン</span>
                <span v-else style="font-size: 12px;font-weight: 400;"><span @click="showSNSLogin" style="text-decoration: underline; font-weight: bold;">サインアップ</span> してチェックインする</span>
              </u-col>
            </u-row>
          </u-col>
          <u-col span="4" v-if="isLogin">
            <u-row>
              <u-col textAlign="right">
                <span style="font-size: 28px;font-style: normal; font-weight: 700">{{ userCheckInTotal }}</span>
              </u-col>
            </u-row>
            <u-row>
              <u-col textAlign="right">
                <span style="font-size: 13px;font-style: normal; font-weight: 700">/{{ heritageTotal }}</span>
              </u-col>
            </u-row>
          </u-col>
        </u-row>
      </view>
    </view>
    <!-- 达成状况 -->

    <!-- 地图组件 -->
    <view id="map" :style="this.mapStyle"></view>
    <!-- 地图组件 -->
  </view>
</template>
<script>
import {getGoogleMapsAPI} from 'gmap-vue';
import config from '@/common/config'
import {
  getUserInfo,
  getHeritageCount,
  getUserCheckInCount,
  getUserCheckInHeritage,
  getHeritageCountryCount,
  getAllHeritage,
  getHeritageByLocation
} from '@/util/request/api.js';
import tab_list_en from "@/common/tab_list_en.json";
import tab_list_jp from "@/common/tab_list_jp.json";
import tab_list_cn from "@/common/tab_list_cn.json";
import heritage_country_count from "@/common/heritage_country_count.json";
export default {
  data() {
    return {
      map: null,
      show: false,
      tabIndex: 0,
      deviceType: 'phone',
      markersLoaded: false,
      userInfo: {
        id: '',
        name: '',
        email: '',
        avatar: ''
      },
      center: {lat: 19.3347094, lng: 104.4908388},
      mapStyle: {
        width: '100%',
        height: '650px',
      },
      tabListData: [],
      userCheckInTotal: 0,
      heritageTotal: 0,
      styles: [
        {
          featureType: "water",
          stylers: [{color: "#FFFFFF"}],
        },
        {
          "elementType": "labels",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "administrative",
          "elementType": "geometry",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "administrative.neighborhood",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "poi",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "road",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "labels.icon",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "transit",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "landscape",
          "stylers": [
            {
              "color": "#7d78b8"
            }
          ]
        },
      ],
    };
  },
  onLoad(options) {
    let systemInfo = uni.$u.sys()
    this.deviceType = systemInfo.deviceType
    let device_id   = systemInfo.deviceId
    if (options.token && !this.isLogin) {
      // 再判断是否是同一个设备
      // if (device_id === options.device_id) {
        // 代表登录成功
        uni.setStorageSync('auth_token', options.token);
        this.getUserInfo(options.login_type);
      // }
    }
    let localLanguage = uni.getStorageSync('local_lang');
    if (localLanguage === 'jp') {
      this.tabListData = tab_list_jp
    } else if (localLanguage === 'en') {
      this.tabListData = tab_list_en
    } else {
      this.tabListData = tab_list_cn
    }
    if (this.isLogin) {
      this.userInfo = uni.getStorageSync('cur_user');
      this.getUserCheckInHeritageCount()
    }
    this.getHeritageCount()
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
    }
  },
  async mounted() {
    await this.$gmapApiPromiseLazy();
    // 根据不同手机设置不同的高度
    let that = this
    uni.getSystemInfo({
      success: function (res) {
        that.mapStyle.height = (res.windowHeight - 40) + 'px';
      }
    });

    this.initMap();
  },
  methods: {
    // 获取遗迹总数量
    async getHeritageCount() {
      await getHeritageCount().then((response) => {
        this.heritageTotal = response.data
      })
    },
    // 获取用户CheckIn总数
    getUserCheckInHeritageCount() {
      getUserCheckInCount({ custom: { auth: true }}).then((response) => {
        this.userCheckInTotal = response.data
      })
    },
    getUserInfo(login_type) {
      uni.showLoading({
        title: 'Loading'
      });
      getUserInfo({ custom: { auth: true, login_type: login_type }}).then((response) => {
        this.$store.commit('login', response);
        this.userInfo = response.data.user;
        this.initMap()
        uni.hideLoading()
      })
    },
    showSNSLogin() {
      this.$refs.tabList.showMobileSNSLogin()
    },
    initMap() {
      let that = this
      that.map = new google.maps.Map(document.getElementById("map"), {
        center: this.center,
        zoom: 3,
        minZoom: 3,
        maxZoom: 14,
        mapId: "555a779519b7419",
        zoomControl: false, // 禁用缩放控件
        streetViewControl: false, // 禁用街景视图控件
        mapTypeControl: false, // 启用地图类型控件
        fullScreenControl: false, // 禁用全屏控件
        rotateControl: false, // 禁用旋转控件
        fullscreenControl: false, // 禁用全屏按钮
        // styles: this.mapStyle,
        // 设置用户的地图范围，上面显示的范围不能超过北极，下面不能超过南极
        restriction: {
          latLngBounds: {
            north: 85,
            south: -85,
            west: -180,
            east: 180,
          },
          strictBounds: false,
        },
      });

      let map = that.map
      let countryHeritageData = [];   // 国家遗迹数量
      let countryHeritageMarkers = []; // 国家遗迹数量Marker
      let heritageData = [];
      let heritageMarkers = [];
      let heritageBigMarkers = [];
      let previousZoom = 0; // 用于记录前一个缩放级别
      let previousUserCenter = that.center // // 用于记录前一个用户中心点的坐标


      if (that.isLogin) {
        getUserCheckInHeritage().then((response) => {
          if (response.code === 0) {
            countryHeritageData = response.data
            showCountryHeritageMarker()
          }
        })
      } else {
        countryHeritageData = heritage_country_count
        showCountryHeritageMarker()
        // 未登录时，使用本地数据
        // getHeritageCountryCount().then((response) => {
        //   if (response.code === 0) {
        //     countryHeritageData = heritage_country_count
        //     showCountryHeritageMarker()
        //   }
        // })
      }

      const infoWindow = new google.maps.InfoWindow();

      // 监听地图加载完成事件
      google.maps.event.addListenerOnce(map, 'tilesloaded', function(){
        // 当地图加载完成后执行的操作
      });

      // 监听地图拖动事件
      google.maps.event.addListener(map, 'dragend', function() {
        var center = map.getCenter();
        let currentZoom = parseInt(map.getZoom());
        var lat = center.lat();
        var lng = center.lng();

        // 首先计算当前中心点和上一个中心点的距离
        const dist = distance(lat, lng, previousUserCenter.lat, previousUserCenter.lng);
        previousUserCenter = { lat: lat, lng: lng }
        if (dist > 10) {
          if (currentZoom === 5) {
            that.markersLoaded = false
            loadMarkers(map)
          }
        }
      });

      // 根据缩放级别显示不同级别marker
      google.maps.event.addListener(map, "zoom_changed", function () {
        // let currentZoom = parseInt(map.getZoom());
        let currentZoom = map.getZoom();
        var currentZoom1 = map.getZoom();
        if (currentZoom1 > previousZoom) {
          // 从小缩放到大
        } else if (currentZoom1 < previousZoom) {
          // 从大缩放到小暂不处理
        }
        previousZoom = currentZoom1;  // 更新前一个缩放级别
        if (currentZoom >= 5 && currentZoom < 6) {
          loadMarkers(map)
          setCountryMarkerView(false)
          setHeritageMarkerView(true)
          setHeritageBigMarkerView(false)
        } else if (currentZoom >= 6) {
          setCountryMarkerView(false)
          setHeritageMarkerView(false)
          setHeritageBigMarkerView(true)
        } else {
          setCountryMarkerView()
          setHeritageMarkerView(false)
          setHeritageBigMarkerView(false)
          that.markersLoaded = false
        }

      });

      // 加载国家遗迹点数据
      function showCountryHeritageMarker() {
        countryHeritageData.forEach((property, index) => {
          if (property.latitude !== '' && property.longitude !== '') {
            let position = { lat: parseFloat(property.latitude), lng: parseFloat(property.longitude) }
            const advancedMarkerView = new google.maps.marker.AdvancedMarkerView({
              map,
              content: that.buildContent(property, index),
              position: position,
              title: property.description,
            });
            countryHeritageMarkers.push(advancedMarkerView);
          }
        });
      }
      // 加载遗迹点数据
      function loadMarkers(map) {
        // 在这里编写加载遗迹点数据的代码
        // 包括发起异步请求获取数据、处理数据、渲染标记点等步骤
        // 注意避免重复加载数据
        // 获取当前地图视口的经纬度范围
        if (that.markersLoaded) {
          return;
        }
        var bounds = map.getBounds();
        var ne = bounds.getNorthEast();
        var sw = bounds.getSouthWest();
        var viewportData = {
          north: ne.lat(),
          south: sw.lat(),
          east: ne.lng(),
          west: sw.lng(),
          lat: previousUserCenter.lat,
          lng: previousUserCenter.lng
        };

        // 禁用用户操作
        disableUserInteraction();
        // 显示加载中提示
        uni.showLoading({
          title: 'Loading'
        });

        getHeritageByLocation({params: viewportData}).then((response) => {
          if (response.code === 0) {
            heritageData = response.data
            if (heritageData.length) {
              that.markersLoaded = true; // 标记遗迹点数据已加载
            }
            heritageData.forEach((property, index) => {
              if (property.latitude !== '' && property.longitude !== '') {
                let position = { lat: parseFloat(property.latitude), lng: parseFloat(property.longitude) }
                const advancedMarkerView = new google.maps.marker.AdvancedMarkerView({
                  map,
                  content: buildHeritageMark(property, index),
                  position: position,
                  title: property.description,
                });
                heritageMarkers.push(advancedMarkerView);
              }
            });
          }
          enableUserInteraction()
          uni.hideLoading()
        }).catch((error) => {
          enableUserInteraction()
          uni.hideLoading()
        });
      }
      // 处理国家级别的标签
      function setCountryMarkerView(is_show = true) {
        if (is_show) {
          countryHeritageMarkers.forEach((marker) => {
            marker.setMap(map);
          });
        } else {
          countryHeritageMarkers.forEach((marker) => {
            marker.setMap(null);
          });
        }
      }
      // 处理遗迹的标签
      function setHeritageMarkerView(is_show = true) {
        if (is_show) {
          heritageData.forEach((property, index) => {
            if (property.latitude !== '' && property.longitude !== '') {
              let position = { lat: parseFloat(property.latitude), lng: parseFloat(property.longitude) }
              const advancedMarkerView = new google.maps.marker.AdvancedMarkerView({
                map,
                content: buildHeritageMark(property, index),
                position: position,
                title: property.description,
              });
              heritageMarkers.push(advancedMarkerView);
            }
          });
        } else {
          heritageMarkers.forEach((marker) => {
            marker.setMap(null);
          });
        }
      }
      // 处理PC端遗迹可点击的标签
      function PCClickContent(property) {
        let svg = ''
        if (property.category === 'Cultural') {
          svg = `<div style="display: flex; align-items: center;"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="8" cy="8" r="8" fill="#A57AED"/>
    <path d="M4.84211 6.85714V9.85714H6.10526V6.85714H4.84211ZM7.36842 6.85714V9.85714H8.63158V6.85714H7.36842ZM4 12H12V10.7143H4V12ZM9.89474 6.85714V9.85714H11.1579V6.85714H9.89474ZM8 3L4 5.14286V6H12V5.14286L8 3Z" fill="white"/>
  </svg></div>`
        }
        if (property.category === 'Natural') {
          svg = `<div style="display: flex; align-items: center;"><svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="9.08523" cy="8" rx="8.21951" ry="8" fill="#4E9CA1"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M11.2831 3.92202C10.9684 4.10451 10.8606 4.50867 11.0423 4.82474L12.1387 6.73242C12.3204 7.0485 12.7228 7.1568 13.0374 6.97431C13.3521 6.79182 13.4599 6.38766 13.2782 6.07158L12.1818 4.1639C12.0001 3.84783 11.5977 3.73953 11.2831 3.92202ZM10.3948 4.94594L7.13443 6.83679C6.71489 7.08011 6.57114 7.61899 6.81337 8.04043L6.87591 8.14924L6.86826 8.15354L5.25258 9.09055L5.08474 8.79852C4.99817 8.6479 4.80253 8.59411 4.64778 8.67837C4.49302 8.76263 4.43775 8.95304 4.52432 9.10366L5.1822 10.2483C5.26878 10.3989 5.46441 10.4527 5.61917 10.3684C5.77392 10.2842 5.8292 10.0938 5.74262 9.94313L5.56621 9.6362L7.18948 8.6948L7.25195 8.8035C7.49418 9.22493 8.03065 9.36933 8.4502 9.12601L9.03682 8.7858L7.33032 12.0241C7.24939 12.1777 7.31169 12.3661 7.46948 12.4448C7.62726 12.5236 7.82077 12.4629 7.90169 12.3094L9.80895 8.69008L11.7162 12.3094C11.7971 12.4629 11.9906 12.5236 12.1484 12.4448C12.3062 12.3661 12.3685 12.1777 12.2876 12.0241L10.2196 8.09985L11.7157 7.2322C11.6647 7.17256 11.6187 7.10757 11.5784 7.03755L10.482 5.12987C10.4476 5.0701 10.4186 5.0086 10.3948 4.94594Z" fill="white"/>
  </svg></div>`
        }
        if (property.category === 'Mixed') {
          svg = `<div style="display: flex; align-items: center;"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="8" cy="8" r="8" fill="#82A0EE"/>
    <circle cx="8" cy="5" r="2" fill="white"/>
    <circle cx="5" cy="10" r="2" fill="white"/>
    <circle cx="11" cy="10" r="2" fill="white"/>
  </svg></div>`
        }

        let start_content = `<div style="display: flex; justify-content: flex-start; align-items: center; text-align: center;  padding-right: 12px; padding-bottom: 12px">`

        let middle_content = `<div style="margin-left: 10px; font-size: 14px; font-weight: 700; text-align: center;">${property.name_jp}</div></div>
                    <div style="display: flex;">
                    <div>${property.states_name_jp}</div><span style="margin-left: 10px"> | </span><div style="font-size: 13px; margin-left: 10px;">登録年: ${property.date_inscribed}</div>
</div>
                `

        let end_content = `</div>`

        return `<div style="padding-right: 12px; padding-bottom: 12px">` + start_content + svg + middle_content + end_content + `</div>`
      }
      // 处理移动端遗迹可点击的标签
      function mobileClickContent(property) {
        let svg = ''
        if (property.category === 'Cultural') {
          svg = `<div style="display: flex; align-items: center;"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="8" cy="8" r="8" fill="#A57AED"/>
    <path d="M4.84211 6.85714V9.85714H6.10526V6.85714H4.84211ZM7.36842 6.85714V9.85714H8.63158V6.85714H7.36842ZM4 12H12V10.7143H4V12ZM9.89474 6.85714V9.85714H11.1579V6.85714H9.89474ZM8 3L4 5.14286V6H12V5.14286L8 3Z" fill="white"/>
  </svg></div>`
        }
        if (property.category === 'Natural') {
          svg = `<div style="display: flex; align-items: center;"><svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="9.08523" cy="8" rx="8.21951" ry="8" fill="#4E9CA1"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M11.2831 3.92202C10.9684 4.10451 10.8606 4.50867 11.0423 4.82474L12.1387 6.73242C12.3204 7.0485 12.7228 7.1568 13.0374 6.97431C13.3521 6.79182 13.4599 6.38766 13.2782 6.07158L12.1818 4.1639C12.0001 3.84783 11.5977 3.73953 11.2831 3.92202ZM10.3948 4.94594L7.13443 6.83679C6.71489 7.08011 6.57114 7.61899 6.81337 8.04043L6.87591 8.14924L6.86826 8.15354L5.25258 9.09055L5.08474 8.79852C4.99817 8.6479 4.80253 8.59411 4.64778 8.67837C4.49302 8.76263 4.43775 8.95304 4.52432 9.10366L5.1822 10.2483C5.26878 10.3989 5.46441 10.4527 5.61917 10.3684C5.77392 10.2842 5.8292 10.0938 5.74262 9.94313L5.56621 9.6362L7.18948 8.6948L7.25195 8.8035C7.49418 9.22493 8.03065 9.36933 8.4502 9.12601L9.03682 8.7858L7.33032 12.0241C7.24939 12.1777 7.31169 12.3661 7.46948 12.4448C7.62726 12.5236 7.82077 12.4629 7.90169 12.3094L9.80895 8.69008L11.7162 12.3094C11.7971 12.4629 11.9906 12.5236 12.1484 12.4448C12.3062 12.3661 12.3685 12.1777 12.2876 12.0241L10.2196 8.09985L11.7157 7.2322C11.6647 7.17256 11.6187 7.10757 11.5784 7.03755L10.482 5.12987C10.4476 5.0701 10.4186 5.0086 10.3948 4.94594Z" fill="white"/>
  </svg></div>`
        }
        if (property.category === 'Mixed') {
          svg = `<div style="display: flex; align-items: center;"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="8" cy="8" r="8" fill="#82A0EE"/>
    <circle cx="8" cy="5" r="2" fill="white"/>
    <circle cx="5" cy="10" r="2" fill="white"/>
    <circle cx="11" cy="10" r="2" fill="white"/>
  </svg></div>`
        }

        let start_content = `<div style="display: flex; justify-content: flex-start; align-items: center; text-align: center;" @click="infoClick">`

        let middle_content = `<div style="margin-left: 12px; font-size: 14px; font-weight: 700; text-align: center;">${property.name_jp}</div></div>
                    <div style="display: flex;">
                    <div><a href="https://world-heritage-d0047ce80266.herokuapp.com/client/#/pages/index/detail?id=${property.id}">${property.states_name_jp}</a></div><span style="margin-left: 10px"> | </span><div style="font-size: 13px; margin-left: 10px;">登録年: ${property.date_inscribed}</div>
</div>
                `

        let end_content = `</div>`

        return start_content + svg + middle_content + end_content
      }
      // 处理遗迹可点击的标签
      function setHeritageBigMarkerView(is_show = true) {
        if (is_show) {
          heritageData.forEach((property, index) => {
            if (property.latitude !== '' && property.longitude !== '') {
              let position = { lat: parseFloat(property.latitude), lng: parseFloat(property.longitude) }
              const advancedMarkerView = new google.maps.marker.AdvancedMarkerView({
                map,
                content: buildHeritageBigMark(property, index),
                position: position,
                title: property.description,
              });
              advancedMarkerView.addListener("click", ({ domEvent, latLng }) => {
                let content = '';
                if (that.deviceType === 'phone') {
                  content = mobileClickContent(property)
                } else {
                  content = PCClickContent(property)
                }
                infoWindow.close();
                infoWindow.setContent(content);
                infoWindow.open(advancedMarkerView.map, advancedMarkerView);
              });
              heritageBigMarkers.push(advancedMarkerView);
            }
          });
        } else {
          heritageBigMarkers.forEach((marker) => {
            marker.setMap(null);
          });
        }
      }
      function buildHeritageMark() {
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        svg.setAttribute("width", "8");
        svg.setAttribute("height", "8");
        svg.setAttribute("viewBox", "0 0 8 8");
        svg.setAttribute("fill", "none");

        // 创建圆形元素
        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("cx", "4");
        circle.setAttribute("cy", "4");
        circle.setAttribute("r", "4");
        circle.setAttribute("fill", "#72CD18");

        // 将圆形元素添加到SVG中
        svg.appendChild(circle);
        return svg
      }
      function buildHeritageBigMark(property) {

        // 创建SVG元素
        const svg2 = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg2.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        svg2.setAttribute("width", "16");
        svg2.setAttribute("height", "16");
        svg2.setAttribute("viewBox", "0 0 16 16");
        svg2.setAttribute("fill", "none");
        svg2.setAttribute("class", "big-icon-demo"); // 添加class属性

        // 创建圆形元素
        const circle2 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle2.setAttribute("cx", "8");
        circle2.setAttribute("cy", "8");
        circle2.setAttribute("r", "8");
        circle2.setAttribute("fill", "#72CD18");

        // 将圆形元素添加到SVG中
        svg2.appendChild(circle2);
        return svg2;
      }
      // 禁用用户操作函数
      function disableUserInteraction() {
        map.setOptions({
          draggable: false,
          touchZoom: false,
          doubleClickZoom: false,
          scrollwheel: false,
          boxZoom: false,
          keyboardShortcuts: false,
        });
      }
      // 启用用户操作函数
      function enableUserInteraction() {
        map.setOptions({
          draggable: true,
          touchZoom: true,
          doubleClickZoom: true,
          scrollwheel: true,
          boxZoom: true,
          keyboardShortcuts: true,
        });
      }
      function distance(lat1, lon1, lat2, lon2) {
        const R = 6371e3; // 地球半径，单位为米
        const φ1 = toRadians(lat1);
        const φ2 = toRadians(lat2);
        const Δφ = toRadians(lat2 - lat1);
        const Δλ = toRadians(lon2 - lon1);

        const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        const d = R * c; // 距离，单位为米
        const km = d / 1000; // 距离，单位为千米

        return km;
      }
      function toRadians(degrees) {
        return degrees * (Math.PI/180);
      }
    },
    // 窗口点击事件
    infoClick() {

    },
    buildContent(property, index) {
      const priceTag = document.createElement("div");
      priceTag.className = "price-tag";
      if (this.isLogin) {
        priceTag.textContent = `${property.check_count}/${property.count}`;
      } else {
        priceTag.textContent = `0/${property.count}`;
      }
      return priceTag;
    },
    googleLogin() {
      window.location.href = config.googleAuthenticationUrl + '?page=' + uni.$u.page()
    },
    twitterLogin() {
      window.location.href = config.twitterAuthenticationUrl + '?page=' + uni.$u.page()
    },
    facebookLogin() {
      window.location.href = config.facebookAuthenticationUrl + '?page=' + uni.$u.page()
    }
  }
}
</script>
<style lang="scss" scoped>
.price-tag {
  background-color: #72CD18;
  border-radius: 4px;
  color: #FFFFFF;
  font-size: 10px;
  padding: 3px;
  position: relative;
}
#map {
  height: 100%;
}

/**
 * Optional: Makes the sample page fill the window.
 */
html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
  //background-color: #ffffff;
}

h2 {
  margin-top: 0;
}

.info-window-content {
  padding: 8px;
}

.achievement-box-content {
  //padding: 1rem;
  height: 70px; /* 设置方框的高度 */
}
.achievement-box {
  //height: 4.5rem; /* 设置方框的高度 */
  height: 70px; /* 设置方框的高度 */
  width: 250px;
  flex-shrink: 0;
  color: #1C3B53;
  background: rgba(255, 255, 255, 0.90);
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);


  //background-color: rgba(255, 255, 255, 0.5); /* 设置背景为白色透明 */
  //box-shadow: 0 2px 3px rgba(0, 0, 0, 0.2), 0 2px 8px rgba(0, 0, 0, 0.4); /* 添加阴影效果 */
  //border-left: 1px solid rgba(0, 0, 0, 0.2); /* 左边框阴影 */
  //border-right: 1px solid rgba(0, 0, 0, 0.2); /* 右边框阴影 */
  //border-bottom: 1px solid rgba(0, 0, 0, 0.4); /* 下边框阴影 */

  position: fixed;
  top: 88%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
}

</style>
