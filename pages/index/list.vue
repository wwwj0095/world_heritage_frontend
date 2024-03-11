<template>
  <view>

    <!-- 顶部个人中心组件 -->
    <tab-list
        v-if="deviceType === 'phone'"
        :user-info="userInfo"
        :tab-index="tabIndex"
        :show-about="false"
        :tab-list="tabListData"></tab-list>
    <pc-tab-list
        v-else
        :user-info="userInfo"
        :tab-index="tabIndex"
        :show-about="false"
        :tab-list="tabListData"></pc-tab-list>
    <!-- 顶部个人中心组件 -->

    <!-- 头部内容 -->
    <view style="padding: 0 0.65rem">

      <!-- 搜索区域 -->
      <u-search
          :placeholder="searchPlaceholder"
          shape="square"
          :showAction="false"
          v-model="listQuery.keyword"
          @search="searchDataChange" @clear="clearSearch"></u-search>
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
                  :localdata="categoryMainData"
                  :placeholder="categoryMainPlaceholder"
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
                  :localdata="categorySubData"
                  :placeholder="categorySubPlaceholder"
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

      <scroll-view
          :scroll-top="scrollTop"
          :style="{
				  maxHeight: $u.addUnit(scrollViewHeight)
			    }"
          scroll-y="true"
          class="scroll-Y"
          @scrolltolower="lower" @scroll="scroll">
        <view v-for="(country, countryIndex) in listData" :key="countryIndex">
          <view>
            <i v-if="country.name_en === 'China'" :class="`em em-${country.iso_code}`" aria-role="presentation" style="height: 30rpx;width: 35rpx;  margin-right: 15rpx;"></i>
            <i v-else :class="`em em-flag-${country.iso_code}`" aria-role="presentation" style="height: 30rpx; width: 35rpx; margin-right: 15rpx;"></i>
            <span v-if="currentLanguage === 'jp'" style="font-size: 13px; color: #1C3B53; font-weight: 700"> {{ country.name_jp }}/{{ country.name_en }}</span>
            <span v-else-if="currentLanguage === 'en'" style="font-size: 13px; color: #1C3B53; font-weight: 700"> {{ country.name_en }}</span>
            <span v-else style="font-size: 13px; color: #1C3B53; font-weight: 700"> {{ country.name_cn }}/{{ country.name_en }}</span>
            <view v-for="(appDataItem, appDataIndex) in country.app_data" style="padding: 8px 0"  @click="listItemClick(appDataItem)">

              <view style="display:flex; height: 70px">
                <view>
                  <u--image :src="getCoverImageUrl(appDataItem.cover_img)" width="70px" height="70px"></u--image>
                </view>
                <view style="display: flex; flex-direction: column; justify-content: space-between; font-size: 15px; margin-left: 10px">
                  <view style="height: 23.33px">
                    <u--text v-if="currentLanguage === 'jp'" :text="appDataItem.name_jp" lines="2" size="13px" color="#1C3B53"></u--text>
                    <u--text v-else-if="currentLanguage === 'en'" :text="appDataItem.name_en" lines="2" size="13px" color="#1C3B53"></u--text>
                    <u--text v-else :text="appDataItem.name_cn" lines="2" size="13px" color="#1C3B53"></u--text>
                  </view>
                  <view style="height: 23.33px; margin-top: 10px;">
                    <svg  style="height: 16px" v-if="appDataItem.category === 'Cultural'" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="8" cy="8" r="8" fill="#A57AED"/>
                      <path d="M4.84211 6.85714V9.85714H6.10526V6.85714H4.84211ZM7.36842 6.85714V9.85714H8.63158V6.85714H7.36842ZM4 12H12V10.7143H4V12ZM9.89474 6.85714V9.85714H11.1579V6.85714H9.89474ZM8 3L4 5.14286V6H12V5.14286L8 3Z" fill="white"/>
                    </svg>

                    <svg  style="height: 16px" v-if="appDataItem.category === 'Natural'" width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <ellipse cx="9.08523" cy="8" rx="8.21951" ry="8" fill="#4E9CA1"/>
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M11.2831 3.92202C10.9684 4.10451 10.8606 4.50867 11.0423 4.82474L12.1387 6.73242C12.3204 7.0485 12.7228 7.1568 13.0374 6.97431C13.3521 6.79182 13.4599 6.38766 13.2782 6.07158L12.1818 4.1639C12.0001 3.84783 11.5977 3.73953 11.2831 3.92202ZM10.3948 4.94594L7.13443 6.83679C6.71489 7.08011 6.57114 7.61899 6.81337 8.04043L6.87591 8.14924L6.86826 8.15354L5.25258 9.09055L5.08474 8.79852C4.99817 8.6479 4.80253 8.59411 4.64778 8.67837C4.49302 8.76263 4.43775 8.95304 4.52432 9.10366L5.1822 10.2483C5.26878 10.3989 5.46441 10.4527 5.61917 10.3684C5.77392 10.2842 5.8292 10.0938 5.74262 9.94313L5.56621 9.6362L7.18948 8.6948L7.25195 8.8035C7.49418 9.22493 8.03065 9.36933 8.4502 9.12601L9.03682 8.7858L7.33032 12.0241C7.24939 12.1777 7.31169 12.3661 7.46948 12.4448C7.62726 12.5236 7.82077 12.4629 7.90169 12.3094L9.80895 8.69008L11.7162 12.3094C11.7971 12.4629 11.9906 12.5236 12.1484 12.4448C12.3062 12.3661 12.3685 12.1777 12.2876 12.0241L10.2196 8.09985L11.7157 7.2322C11.6647 7.17256 11.6187 7.10757 11.5784 7.03755L10.482 5.12987C10.4476 5.0701 10.4186 5.0086 10.3948 4.94594Z" fill="white"/>
                    </svg>

                    <svg  style="height: 16px" v-if="appDataItem.category === 'Mixed'" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
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
import {
  getUserInfo,
  getListData,
  getUserTokenByTokenKey
} from '@/util/request/api.js';
import tab_list_cn from "@/common/tab_list_cn";
import tab_list_en from "@/common/tab_list_en";
import tab_list_jp from "@/common/tab_list_jp";
import {s3Path} from "@/common/config";
export default {
  data() {
    return {
      tabIndex: 2,
      deviceType: 'phone',
      dataLoading: false,
      scrollViewHeight: 0,
      listData: [],
      allListData: [],
      listLimit: 10,
      listDataPage: 1,
      listDataLimit: 10,
      categoryMainData: [
        {value: 0, text: '国家：全て'}
      ],
      categoryMainPlaceholder: '国家：全て',
      categorySubData: [],
      categorySubPlaceholder: '基準：全て',
      searchPlaceholder: '検索キーワード',
      scrollTop: 0,
      currentLanguage: 'cn',
      tabListData: [],
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
    this.scrollInit()
    if (options.token_key && !this.isLogin) {
      this.getUserTokenKey(options.login_type, options.token_key);
    }
    if (this.isLogin) {
      this.userInfo = uni.getStorageSync('cur_user');
    }

    this.currentLanguage = uni.getStorageSync('local_lang');
    if (this.currentLanguage === 'jp') {
      this.categoryMainPlaceholder = '国家：全て'
      this.categorySubPlaceholder = '基準：全て'
      this.searchPlaceholder = '検索キーワード'
      this.tabListData = tab_list_jp
    } else if (this.currentLanguage === 'en') {
      this.categoryMainPlaceholder = 'Country: All'
      this.categorySubPlaceholder = 'Category: All'
      this.searchPlaceholder = 'Search Keyword'
      this.tabListData = tab_list_en
    } else {
      this.categoryMainPlaceholder = '国家：全部'
      this.categorySubPlaceholder = '分类：全部'
      this.searchPlaceholder = '搜索关键字'
      this.tabListData = tab_list_cn
    }
    this.getCategoryMainJson()
    this.getCategorySubJson()
    this.getListDataJson()
  },
  methods: {
    // 获取左侧筛选数据
    getCategoryMainJson() {
      let requestUrl = `${s3Path}list/category_main_${this.currentLanguage}.json?time=` + new Date().getTime()
      uni.$u.http.get(requestUrl).then(res => {
        this.categoryMainData = res
      })
    },
    // 获取右侧筛选数据
    getCategorySubJson() {
      let requestUrl = `${s3Path}list/category_sub_${this.currentLanguage}.json?time=` + new Date().getTime()
      uni.$u.http.get(requestUrl).then(res => {
        this.categorySubData = res
      })
    },
    // 获取列表的数据
    getListDataJson() {
      let requestUrl = `${s3Path}list/list_data.json?time=` + new Date().getTime()
      uni.showLoading({
        title: 'Loading'
      })
      uni.$u.http.get(requestUrl).then(res => {
        this.allListData = res
        this.listData = this.allListData.slice(0, this.listLimit)
        uni.hideLoading()
      }).catch(() => {
        uni.hideLoading()
      })
    },
    scrollInit() {
      this.scrollViewHeight = uni.$u.sys().windowHeight - 100
    },
    // 列表滚动触底事件
    scrolltolower() {
      // 当触底之后, 证明是第一次数据已经加载完毕，列表上显示的已经是0-20的数据，触底之后，就去加载21-40的数据，但是要记住，如果21-40的数据已经加载过了，就需要判断是否加载完毕，如果加载完毕了，就不再加载数据
      this.listDataPage++
      // 计算当前页数的数据，offset = (page - 1) * limit
      let offset = (this.listDataPage - 1) * this.listDataLimit
      let limit = this.listDataPage * this.listDataLimit
      let listData = this.allListData.slice(offset, limit)
      // 添加一个Loading
      uni.showLoading({
        title: 'Loading'
      })
      // 添加500毫秒延迟，模拟网络请求，然后隐藏Loading
      setTimeout(() => {
        if (listData.length) {
          this.listData = this.listData.concat(listData)
        }
        uni.hideLoading()
      }, 500)
      return;
    },
    // 筛选的时候请求的接口
    getAppDataList() {
      uni.showLoading({
        title: 'Loading'
      })
      getListData({params: this.listQuery})
          .then(response => {
            if (response.data.heritage_list.length === 0) {
              uni.hideLoading()
              return false
            } else {
              this.listData = this.listData.concat(response.data.heritage_list)
              // this.indexList = response.data.heritage_list_country_first_letter_index
              uni.hideLoading()
            }
          })
          .catch(error => {
            uni.hideLoading()
          });
    },
    getCoverImageUrl(image) {
      // 如果image是以 http 或者 https 开头的, 那么就直接返回，否则就拼接
      if (image.startsWith('http') || image.startsWith('https')) {
        return image
      } else {
        return s3Path + image
      }
    },
    clearSearch() {
      this.listData = this.allListData.slice(0, this.listDataLimit)
    },
    searchDataChange() {
      this.listData = []
      if (this.listQuery.keyword === '') {
        this.listData = this.allListData.slice(0, this.listDataLimit)
      } else {
        this.getAppDataList()
      }
    },
    // 国家分类选择
    countrySelectDataChange(e) {
      this.listQuery.country = e
      this.listQuery.letter = 'A'
      this.listData = []
      this.getAppDataList()
    },
    // 遗产分类选择
    categorySelectDataChange(e) {
      this.listQuery.category = e
      this.listQuery.letter = 'A'
      this.listData = []
      this.getAppDataList()
    },
    listItemClick(e) {
      uni.$u.route({
        url: 'pages/index/detail',
        params: {
          id: e.id
        }
      })
    },
    getUserTokenKey(login_type, token_key) {
      getUserTokenByTokenKey({ params: { login_type: login_type , token_key: token_key}}).then((response) => {
        if (response.data) {
          uni.setStorageSync('auth_token', response.data);
          this.getUserInfoByToken(response.data.login_type, response.data.token_key)
        }
      })
    },
    getUserInfoByToken(login_type, token_key) {
      uni.showLoading({ title: 'Loading' });
      getUserInfo({ custom: { auth: true, login_type: login_type , token_key: token_key}}).then((response) => {
        this.$store.commit('login', response);
        this.userInfo = response.data.user;
        uni.hideLoading()
      })
    },
    lower: function(e) {
      // 如果到底了, 那么就加载更多数据
      this.indexListIndex++
      this.listQuery.letter = this.indexList[this.indexListIndex]
      this.getAppDataList()
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
