<template>
  <view>

    <!-- 顶部个人中心组件 -->
    <tab-list v-if="deviceType === 'phone'" :user-info="userInfo" :tab-index="tabIndex" :show-about="false"></tab-list>
    <pc-tab-list v-else :user-info="userInfo" :tab-index="tabIndex" :show-about="false"></pc-tab-list>
    <!-- 顶部个人中心组件 -->

    <!-- 头部内容 -->
    <view style="padding: 0 0.65rem">

      <!-- 搜索区域 -->
      <u-search
          placeholder="検索キーワード"
          shape="square"
          :showAction="false"
          v-model="listQuery.keyword"
          @search="searchDataChange" @clear="searchDataChange"></u-search>
      <!-- 搜索区域 -->

      <!-- 选择区域 -->
      <u-row>
        <u-col span="7">
          <view>
            <!-- 下拉选择框区域 -->
            <view class="select-area" style="margin-top: 10px; padding: 0 3px 0 0">
              <uni-data-select
                  v-model="listQuery.country"
                  :clear="true"
                  :localdata="countrySelectData"
                  placeholder="国家：全て"
                  @change="countrySelectDataChange"
              ></uni-data-select>
            </view>
            <!-- 下拉选择框区域 -->
          </view>
        </u-col>
        <u-col span="5">
          <view>
            <!-- 下拉选择框区域 -->
            <view class="select-area" style="margin-top: 10px; padding: 0 0 0 3px">
              <uni-data-select
                  v-model="listQuery.category"
                  :clear="true"
                  :localdata="categorySelectData"
                  placeholder="基準：全て"
                  @change="categorySelectDataChange"
              ></uni-data-select>
            </view>
            <!-- 下拉选择框区域 -->
          </view>
        </u-col>
      </u-row>
      <!-- 选择区域 -->
    </view>
    <!-- 头部内容 -->


    <!-- 核心内容区域 -->
    <view class="list-area" style="margin-top: 10px;padding: 0 0.65rem">

      <scroll-view :scroll-top="scrollTop" :style="scrollYStyle" scroll-y="true" class="scroll-Y" @scrolltoupper="upper"
                   @scrolltolower="lower" @scroll="scroll">
        <view v-for="(country, countryIndex) in countryHeritageList" :key="countryIndex">
          <view>
            <i v-if="country.name_en === 'China'" :class="`em em-${country.iso_code}`" aria-role="presentation" style="height: 30rpx;width: 35rpx;  margin-right: 15rpx;"></i>
            <i v-else :class="`em em-flag-${country.iso_code}`" aria-role="presentation" style="height: 30rpx; width: 35rpx; margin-right: 15rpx;"></i>
            <span  style="font-size: 13px; color: #1C3B53; font-weight: 700"> {{ country.name_jp }}/{{ country.name_en }}</span>

            <view v-for="(heritage, heritageIndex) in country.heritages" style="padding: 8px 0"  @click="listItemClick(heritage)">

              <view style="display:flex; height: 70px">
                <view>
                  <u--image :src="heritage.cover_img" width="70px" height="70px"></u--image>
                </view>
                <view style="display: flex; flex-direction: column; justify-content: space-between; font-size: 15px; margin-left: 10px">
                  <view style="height: 23.33px">
                    <u--text :text="heritage.name_jp" lines="2" size="13px" color="#1C3B53"></u--text>
                  </view>
                  <view style="height: 23.33px; margin-top: 10px;">
                    <svg  style="height: 16px" v-if="heritage.category === 'Cultural'" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="8" cy="8" r="8" fill="#A57AED"/>
                      <path d="M4.84211 6.85714V9.85714H6.10526V6.85714H4.84211ZM7.36842 6.85714V9.85714H8.63158V6.85714H7.36842ZM4 12H12V10.7143H4V12ZM9.89474 6.85714V9.85714H11.1579V6.85714H9.89474ZM8 3L4 5.14286V6H12V5.14286L8 3Z" fill="white"/>
                    </svg>

                    <svg  style="height: 16px" v-if="heritage.category === 'Natural'" width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <ellipse cx="9.08523" cy="8" rx="8.21951" ry="8" fill="#4E9CA1"/>
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M11.2831 3.92202C10.9684 4.10451 10.8606 4.50867 11.0423 4.82474L12.1387 6.73242C12.3204 7.0485 12.7228 7.1568 13.0374 6.97431C13.3521 6.79182 13.4599 6.38766 13.2782 6.07158L12.1818 4.1639C12.0001 3.84783 11.5977 3.73953 11.2831 3.92202ZM10.3948 4.94594L7.13443 6.83679C6.71489 7.08011 6.57114 7.61899 6.81337 8.04043L6.87591 8.14924L6.86826 8.15354L5.25258 9.09055L5.08474 8.79852C4.99817 8.6479 4.80253 8.59411 4.64778 8.67837C4.49302 8.76263 4.43775 8.95304 4.52432 9.10366L5.1822 10.2483C5.26878 10.3989 5.46441 10.4527 5.61917 10.3684C5.77392 10.2842 5.8292 10.0938 5.74262 9.94313L5.56621 9.6362L7.18948 8.6948L7.25195 8.8035C7.49418 9.22493 8.03065 9.36933 8.4502 9.12601L9.03682 8.7858L7.33032 12.0241C7.24939 12.1777 7.31169 12.3661 7.46948 12.4448C7.62726 12.5236 7.82077 12.4629 7.90169 12.3094L9.80895 8.69008L11.7162 12.3094C11.7971 12.4629 11.9906 12.5236 12.1484 12.4448C12.3062 12.3661 12.3685 12.1777 12.2876 12.0241L10.2196 8.09985L11.7157 7.2322C11.6647 7.17256 11.6187 7.10757 11.5784 7.03755L10.482 5.12987C10.4476 5.0701 10.4186 5.0086 10.3948 4.94594Z" fill="white"/>
                    </svg>

                    <svg  style="height: 16px" v-if="heritage.category === 'Mixed'" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="8" cy="8" r="8" fill="#82A0EE"/>
                      <circle cx="8" cy="5" r="2" fill="white"/>
                      <circle cx="5" cy="10" r="2" fill="white"/>
                      <circle cx="11" cy="10" r="2" fill="white"/>
                    </svg>
                  </view>
                </view>
              </view>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>
    <!-- 核心内容区域 -->

  </view>
</template>

<script>
import {getMyCheckInHeritage, getHeritageCategory, getHeritageCountry, getUserInfo, getAllHeritage} from '@/util/request/api.js';
import heritageList from '@/common/h_list.json';

export default {
  data() {
    return {
      tabIndex: 2,
      deviceType: 'phone',
      dataLoading: false,
      selectedHeritageCount: 0,
      selectedHeritageList: [],
      countryHeritageList: [],
      countrySelectData: [
        {value: 0, text: '国家：全て'}
      ],
      categorySelectData: [
        {value: 0, text: '基準：全て'}
      ],
      scrollTop: 0,
      old: {
        scrollTop: 0,
      },
      scrollYStyle: {
        height: '600rpx'
      },
      // 已选中的数据
      selectCheckedIds: [],
      userInfo: {
        id: '',
        name: '',
        email: '',
        avatar: ''
      },
      listQuery: {
        page: 1,
        limit: 10,
        keyword: '',
        category: '',
        country: '',
        letter: 'A'
      },
      indexList: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
      indexListIndex: 0,
    };
  },
  computed: {
    isLogin() {
      return this.$store.state.isLogin;
    }
  },
  onLoad(options) {
    let systemInfo = uni.$u.sys()
    this.deviceType = systemInfo.deviceType
    let device_id   = systemInfo.deviceId

    let that = this
    uni.getSystemInfo({
      success: function (res) {
        that.scrollYStyle.height = (res.windowHeight - 150) + 'px';
      }
    });
    if (options.token && !this.isLogin) {
      // 再判断是否是同一个设备
      // if (device_id === options.device_id) {
        // 代表登录成功
        uni.setStorageSync('auth_token', options.token);
        this.getUserInfo(options.login_type);
      // }
    }
    if (this.isLogin) {
      this.userInfo = uni.getStorageSync('cur_user');
    }
    this.countryHeritageList = heritageList.heritage_list
    // this.getHeritageList()
    // 获取遗产分类列表
    this.getHeritageCategoryList()
    // 获取遗产国家列表
    this.getHeritageCountryList()
  },
  methods: {
    // 获取遗产的列表
    getHeritageList() {
      uni.showLoading({
        title: 'Loading'
      })
      getAllHeritage({params: this.listQuery})
          .then(response => {
            if (response.data.heritage_list.length === 0) {
              uni.hideLoading()
              return false
            } else {
              this.countryHeritageList = this.countryHeritageList.concat(response.data.heritage_list)
              // this.indexList = response.data.heritage_list_country_first_letter_index
              uni.hideLoading()
            }
          })
          .catch(error => {
            uni.hideLoading()
          });
    },
    searchDataChange() {
      this.listQuery.letter = 'A'
      this.countryHeritageList = []
      this.getHeritageList()
    },
    // 国家分类选择
    countrySelectDataChange(e) {
      this.listQuery.country = e
      this.listQuery.letter = 'A'
      this.countryHeritageList = []
      this.getHeritageList()
    },
    // 遗产分类选择
    categorySelectDataChange(e) {
      this.listQuery.category = e
      this.listQuery.letter = 'A'
      this.countryHeritageList = []
      this.getHeritageList()
    },
    listItemClick(e) {
      uni.$u.route({
        url: 'pages/index/detail',
        params: {
          id: e.id
        }
      })
    },
    scrolltolower() {
      this.loadmore()
    },
    loadmore() {
      // for (let i = 0; i < 30; i++) {
      //   this.indexList.push({
      //     url: this.urls[uni.$u.random(0, this.urls.length - 1)]
      //   })
      // }
    },
    getHeritageCategoryList() {
      getHeritageCategory({ custom: { auth: false}}).then((response) => {
        this.categorySelectData = response.data
      })
    },
    getHeritageCountryList() {
      getHeritageCountry({ custom: { auth: false}}).then((response) => {
        this.countrySelectData = response.data
      })
    },
    getUserInfo(login_type) {
      uni.showLoading({
        title: 'Loading'
      });
      getUserInfo({ custom: { auth: true, login_type: login_type }}).then((response) => {
        this.$store.commit('login', response);
        this.userInfo = response.data.user;
        uni.hideLoading()
      }).catch(() => {
        uni.hideLoading()
      })
    },
    upper: function(e) {
      // console.log(e)
    },
    lower: function(e) {
      // 如果到底了, 那么就加载更多数据
      this.indexListIndex++
      this.listQuery.letter = this.indexList[this.indexListIndex]
      this.getHeritageList()
    },
    scroll: function(e) {
      // console.log(e)
      this.old.scrollTop = e.detail.scrollTop
    },
    goTop: function(e) {
      // 解决view层不同步的问题
      this.scrollTop = this.old.scrollTop
      this.$nextTick(function() {
        this.scrollTop = 0
      });
      uni.showToast({
        icon: "none",
        title: "纵向滚动 scrollTop 值已被修改为 0"
      })
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
//.scroll-Y {
//  height: 600rpx;
//}
.scroll-view_H {
  white-space: nowrap;
  width: 100%;
}
.scroll-view-item {
  height: 300rpx;
  line-height: 300rpx;
  text-align: center;
  font-size: 36rpx;
}
.scroll-view-item_H {
  display: inline-block;
  width: 100%;
  height: 300rpx;
  line-height: 300rpx;
  text-align: center;
  font-size: 36rpx;
}
</style>
