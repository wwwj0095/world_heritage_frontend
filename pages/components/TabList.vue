<template>
  <view class="tab-list">

    <!-- Tab吸顶 -->
    <u-sticky style="top: 0">
      <view class="head-tab">
        <u-tabs :list="tabList" lineColor="#72CD18" lineWidth="46" :current="tabIndex" @change="clickTab"
            :activeStyle="{
              color: '#1C3B53',
              fontWeight: 'bold',
              transform: 'scale(1.05)'
            }"
            style="justify-content: center; align-items: center">
        </u-tabs>
      </view>

      <!-- 个人图标 -->
      <view class="login-icon" @click="showMobileSNSLogin">
        <u-icon name="account-fill" color="#1C3B53" size="24"></u-icon>
      </view>
      <!-- 个人图标 -->

      <!-- 关于图标 -->
<!--      <view v-if="showAbout" class="about-icon" @click="aboutPopupShow = true">-->
<!--        <u-icon name="info-circle-fill" color="#1C3B53" size="24"></u-icon>-->
<!--      </view>-->
      <!-- 关于图标 -->

      <!-- 翻译图标 -->
      <view v-if="showTranslate" class="translate-icon" @click="clickTranslate">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" >
          <path fill-rule="evenodd" clip-rule="evenodd" d="M10.88 5H20C21.1 5 22 5.9 22 7V20C22 21.1 21.1 22 20 22H12L11 19H4C2.9 19 2 18.1 2 17V4C2 2.9 2.9 2 4 2H10L10.88 5ZM14.39 14.58C13.94 14.06 13.53 13.48 13.2 12.88L13.85 15.11L14.39 14.58ZM12.98 12.12H13.97C14.21 12.59 14.58 13.2 15.1 13.82C16.32 12.39 16.66 11.08 16.66 11.08H12.67L12.98 12.12ZM20 21C20.55 21 21 20.55 21 20V7C21 6.45 20.55 6 20 6H11.18L12.36 10.04H14.32V9H15.36V10.04H19V11.08H17.73C17.41 12.34 16.71 13.56 15.81 14.59L18.52 17.27L17.79 18L15.11 15.31L14.19 16.23L15 19L13 21H20ZM3.82595 14.6059H5.02507L5.71079 12.6244H8.63618L9.32071 14.6059H10.5198L7.82546 7.11869H6.52032L3.82595 14.6059ZM8.3078 11.6739L7.20397 8.47867H7.14547L6.03973 11.6739H8.3078Z" fill="#1C3B53"/>
        </svg>
      </view>
      <!-- 翻译图标 -->

    </u-sticky>
    <!-- Tab吸顶 -->

    <!-- 移动端 登录/个人弹出框 -->
    <u-popup :show="mobileDeviceShow" mode="top" :closeable="true" :close-icon-pos="'top-left'" @close="closePop">
      <view class="pop-login-list" :style="{height : this.isLogin ? '320rpx' : '370rpx'}">
        <view style="padding: 45rpx 16px">

          <view style="position: relative; top: -20rpx; text-align: center; font-size: 15px; font-weight: 400;">
            <span v-if="isLogin">プロフィール</span>
            <span v-else>ソーシャルログイン</span>
          </view>

          <view class="sns-icon-area" v-if="!isLogin">
            <!--Google Icon-->
            <view class="sns-login-style" @click="googleLogin">
              <view class="sns-login-style-svg">
                <svg xmlns="http://www.w3.org/2000/svg" width="27" height="28" viewBox="0 0 27 28" fill="none">
                  <path
                      d="M9.27092 0.756345C5.91634 1.90539 3.0553 4.4194 1.4667 7.5889C0.911455 8.68396 0.510447 9.84842 0.271385 11.0514C-0.337838 14.0436 0.0863047 17.2285 1.4667 19.9584C2.36125 21.7398 3.6491 23.3207 5.20686 24.5546C6.67979 25.7268 8.39179 26.5905 10.2117 27.0763C12.5021 27.6933 14.9467 27.6778 17.2602 27.1534C19.3501 26.6753 21.3243 25.6728 22.8975 24.223C24.5632 22.6884 25.7508 20.6756 26.3831 18.5086C27.0695 16.1412 27.162 13.6194 26.7302 11.198C22.4116 11.198 18.0931 11.198 13.7668 11.198C13.7668 12.9871 13.7668 14.7839 13.7668 16.573C16.2654 16.573 18.7717 16.573 21.2703 16.573C20.9773 18.2927 19.9593 19.8582 18.5095 20.8299C17.5995 21.4391 16.5585 21.8401 15.4788 22.0252C14.3915 22.2103 13.2733 22.2334 12.1936 22.0175C11.0909 21.8015 10.0421 21.3388 9.1244 20.6911C7.65918 19.6654 6.54098 18.1539 5.97032 16.465C5.38423 14.7453 5.37652 12.8251 5.97032 11.1054C6.37904 9.89469 7.06538 8.76879 7.96765 7.85881C9.07813 6.71748 10.5202 5.90775 12.078 5.57615C13.4121 5.29082 14.8156 5.3448 16.1189 5.73809C17.2294 6.07741 18.2473 6.67892 19.0879 7.48093C19.9362 6.64036 20.7768 5.79208 21.625 4.9515C22.0646 4.49651 22.535 4.06466 22.9669 3.59424C21.6867 2.40665 20.1752 1.4504 18.5327 0.848885C15.5868 -0.253886 12.2476 -0.277021 9.27092 0.756345Z"
                      fill="white"/>
                  <path
                      d="M9.27112 0.756258C12.2478 -0.277107 15.587 -0.253972 18.5483 0.841087C20.1909 1.4426 21.6946 2.39885 22.9825 3.58645C22.5506 4.04915 22.0879 4.48871 21.6407 4.9437C20.7924 5.78428 19.9518 6.63256 19.1035 7.47313C18.2629 6.67112 17.245 6.0619 16.1345 5.73029C14.8312 5.337 13.4277 5.28302 12.0936 5.56835C10.5358 5.89995 9.09375 6.71739 7.98327 7.85101C7.081 8.76099 6.39466 9.88689 5.98594 11.0976C4.48217 9.93316 2.97839 8.76099 1.47461 7.59652C3.0555 4.41931 5.91654 1.9053 9.27112 0.756258Z"
                      fill="#E94435"/>
                  <path
                      d="M0.271385 11.0514C0.510447 9.84839 0.919167 8.68393 1.4667 7.58887C2.97047 8.75333 4.47425 9.92551 5.97803 11.09C5.38423 12.8097 5.39194 14.7299 5.97803 16.4496C4.47425 17.6141 2.97047 18.7862 1.4667 19.9507C0.0863047 17.2362 -0.337838 14.0435 0.271385 11.0514Z"
                      fill="#F8BB15"/>
                  <path
                      d="M13.7747 11.1902C18.0932 11.1902 22.4118 11.1902 26.738 11.1902C27.1699 13.6117 27.0773 16.1334 26.391 18.5009C25.7586 20.6678 24.571 22.6883 22.9053 24.2152C21.4478 23.0816 19.9826 21.948 18.5328 20.8144C19.9826 19.8504 21.0005 18.2772 21.2936 16.5575C18.795 16.5575 16.2887 16.5575 13.7901 16.5575C13.767 14.7761 13.7747 12.987 13.7747 11.1902Z"
                      fill="#547DBE"/>
                  <path
                      d="M1.4668 19.9584C2.97058 18.7939 4.47435 17.6217 5.97813 16.4573C6.5488 18.1538 7.66699 19.6576 9.13221 20.6833C10.0499 21.3311 11.0987 21.786 12.2015 22.0097C13.2811 22.2256 14.407 22.2025 15.4866 22.0174C16.5663 21.8323 17.6074 21.4313 18.5173 20.8221C19.9748 21.9557 21.4401 23.0893 22.8899 24.2229C21.3167 25.6804 19.3425 26.6753 17.2526 27.1534C14.9468 27.6778 12.5022 27.6932 10.2041 27.0763C8.38418 26.5904 6.67218 25.7267 5.19925 24.5545C3.6492 23.313 2.36135 21.7321 1.4668 19.9584Z"
                      fill="#34A751"/>
                </svg>
              </view>
            </view>
            <!--Google Icon-->

            <!--FaceBook Icon-->
            <view class="sns-login-style sns-login-top" @click="facebookLogin">
              <view class="sns-login-style-svg">
                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="26" viewBox="0 0 17 26" fill="none">
                  <path
                      d="M11.3333 5.77778H17V0H11.3333C9.45472 0 7.65304 0.76091 6.32466 2.11534C4.99628 3.46977 4.25 5.30677 4.25 7.22222V11.5556H0V17.3333H4.25V26H9.91667V17.3333H14.1667L15.5833 11.5556H9.91667V7.22222C9.91667 6.83913 10.0659 6.47173 10.3316 6.20085C10.5973 5.92996 10.9576 5.77778 11.3333 5.77778Z"
                      fill="#0085FF"/>
                </svg>
              </view>
            </view>
            <!--FaceBook Icon-->

            <!--Twitter Icon-->
            <view class="sns-login-style sns-login-top" @click="twitterLogin">
              <view class="sns-login-style-svg">
                <svg xmlns="http://www.w3.org/2000/svg" width="27" height="24" viewBox="0 0 27 24" fill="none">
                  <path
                      d="M21.2641 0H25.4043L16.3592 10.1662L27 24H18.6683L12.1427 15.6098L4.67584 24H0.533166L10.2078 13.1262L0 0H8.54318L14.4418 7.66892L21.2641 0ZM19.811 21.5631H22.1051L7.29662 2.30892H4.83479L19.811 21.5631Z"
                      fill="white"/>
                </svg>
              </view>
            </view>
            <!--Twitter Icon-->
          </view>

          <view v-else>
            <u-row justify="space-between" gutter="10">
              <u-col span="2">
                <view>
                  <u-avatar :src="userInfo.avatar" shape="circle" size="54"></u-avatar>
                </view>
              </u-col>
              <u-col span="10">
                <view style="font-size: 15px; color: #1C3B53">
                  <u-row>
                    <u-col span="6">{{ userInfo.name }}</u-col>
                  </u-row>
                  <u-row>
                    <u-col span="6">{{ userInfo.email ? userInfo.email : ' ' }}</u-col>
                  </u-row>
                </view>
              </u-col>
            </u-row>

            <!--Twitter Icon-->
            <view class="sns-login-style sns-login-top" style="height: 2.1rem" @click="logout">
              <view class="sns-login-style-svg">
                <span style="color: #ffffff; font-size: 15px">ログアウトする</span>
              </view>
            </view>
            <!--Twitter Icon-->
          </view>

        </view>
      </view>
    </u-popup>
    <!-- 登录/个人弹出框 -->

    <!-- 关于弹出框 -->
    <u-popup :show="aboutPopupShow" mode="center">
      <view class="pop-about-style" style="width: 343px; height: 555px">
          <view style="padding: 0 1.5625rem;">
          <!--Close Icon-->
          <view style="position: relative; top: 1.6rem" @click="aboutPopupShow = false">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                  d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"
                  fill="#1C3B53"/>
            </svg>
          </view>
          <!--Close Icon-->

          <view style="text-align: center; font-size: 0.93rem; font-weight: 400; margin-bottom: 1rem;">
            <span>information</span>
          </view>

          <view>
            <u--image  style="align-items: center; margin-top: 30px" :showLoading="true" src="../../static/images/about_logo.png" width="118px" height="118px"></u--image>
            <u--text style="align-items: center; text-align: center; justify-content: center; height: 25px; margin-top: 10px;"  text="世界遺産の旅" color="#1C3B53"></u--text>
            <view style="color: #1C3B53; font-size: 15px; margin-top: 20px; font-weight: 400">
              <view class="popup-information">運営会社  <a href="">  株式会社POPER</a></view>
              <view class="popup-information"><a href="">利用規約</a></view>
              <view class="popup-information"><a href="">プライバシーポリシー</a></view>
              <view class="popup-information"><a href="">Cookieポリシー</a></view>
              <view class="popup-information"><a href="">お問い合わせ</a></view>
            </view>
          </view>
        </view>
      </view>
    </u-popup>
    <!-- 关于弹出框 -->

    <!-- 翻译选择弹出框 -->
    <view v-if="translatePopupShow" class="language-area" style="width: 100%; background-color: #fff; position: fixed; top: 40px; left: 0; z-index: 1000">
      <view style="height: 140px; padding: 10px; margin-top: 2px;">
        <u-row customStyle="margin-bottom: 10px">
          <u-col span="12">
            <view @click="languageChange('jp')" class="translate-button" :style="{ color: curLanguage === 'jp' ? '#ffffff' : '#1C3B53' , backgroundColor:  curLanguage === 'jp' ? '#1C3B53' : '#ffffff'}">
              <span style="margin-right: 5px;">日本語</span>
            </view>
          </u-col>
        </u-row>
        <u-row customStyle="margin-bottom: 10px">
          <u-col span="12">
            <view @click="languageChange('en')" class="translate-button" :style="{ color: curLanguage === 'en' ? '#ffffff' : '#1C3B53' , backgroundColor:  curLanguage === 'en' ? '#1C3B53' : '#ffffff'}">
              English
            </view>
          </u-col>
        </u-row>
        <u-row customStyle="margin-bottom: 10px">
          <u-col span="12">
            <view @click="languageChange('cn')" class="translate-button" :style="{ color: curLanguage === 'cn' ? '#ffffff' : '#1C3B53' , backgroundColor:  curLanguage === 'cn' ? '#1C3B53' : '#ffffff'}">
              简体中文
            </view>
          </u-col>
        </u-row>
      </view>
    </view>
    <!-- 翻译选择弹出框 -->
  </view>
</template>

<script>
import config from "@/common/config";
export default {
  name: 'TabList',
  data() {
    return {
      mobileDeviceShow: false,
      aboutPopupShow: false,
      translatePopupShow: false
    };
  },
  props: {
    tabIndex: {
      type: Number,
      default: 0
    },
    showTranslate: {
      type: Boolean,
      default: false
    },
    curLanguage: {
      type: String,
      default: 'cn'
    },
    showAbout: {
      type: Boolean,
      default: false
    },
    userInfo: {
      type: Object,
      default: () => {
        return {}
      }
    },
    tabList: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  computed: {
    isLogin() {
      return this.$store.state.isLogin;
    },
    currentLanguage() {
      return this.$store.state.currentLanguage;
    }
  },
  methods: {
    showMobileSNSLogin() {
      this.mobileDeviceShow = true
    },
    closePop() {
      this.mobileDeviceShow = false
    },
    clickTranslate() {
      this.translatePopupShow = !this.translatePopupShow
    },
    languageChange(language) {
      this.$store.commit('setLocalLanguage', language);
      this.translatePopupShow = false
      window.location.reload();
    },
    logout() {
      this.$store.commit('logout')
      this.mobileDeviceShow = false
    },
    clickTab(item) {
      let url = ''
      if (item.index === 0) {
        url = '/pages/index/index'
      }
      if (item.index === 1) {
        url = '/pages/index/check_in'
      }
      if (item.index === 2) {
        url = '/pages/index/list'
      }
      uni.$u.route({
        type: 'redirect',
        url: url,
      })
    },
    googleLogin() {
      let systemInfo = uni.$u.sys()
      window.location.href = config.googleAuthenticationUrl + '?page=' + uni.$u.page() + '&device_id=' + systemInfo.deviceId
    },
    twitterLogin() {
      let systemInfo = uni.$u.sys()
      window.location.href = config.twitterAuthenticationUrl + '?page=' + uni.$u.page() + '&device_id=' + systemInfo.deviceId
    },
    facebookLogin() {
      let systemInfo = uni.$u.sys()
      window.location.href = config.facebookAuthenticationUrl + '?page=' + uni.$u.page() + '&device_id=' + systemInfo.deviceId
    }
  },
}
</script>

<style lang="scss">
.tab-list {
  z-index: 1000;
  position: static;
  padding: 0 0.65rem;
}
/* 登录图标样式 */
.login-icon {
  position: absolute;
  top: 10px;
  left: 0.65rem;
  z-index: 1000;
}
.about-icon {
  position: absolute;
  top: 10px;
  right: 0.65rem;
  z-index: 1000;
}

.translate-icon {
  position: absolute;
  top: 10px;
  right: 0.65rem;
  z-index: 1000;
}

.sns-login-style {
  height: 40px;
  width: 100%;
  flex-shrink: 0;
  border-radius: 0.3125rem;
  background-color: #1C3B53;
  display: flex;
  justify-content: center;
  align-items: center
}

/* 社交网络svg样式 */
.sns-login-style-svg {
  display: flex;
  justify-content: center;
  align-items: center
}

/* 社交网络btn样式 */
.sns-login-top {
  margin-top: 10px;
}

/* 弹窗样式 */
.pop-login-list {
  width: 100%;
}

/* 弹窗样式 */
.pop-about-style {
  width: 100%;
  height: 34.69rem;
}

.popup-information {
  margin: 10px 0
}

.translate-button {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  //background-color: #1C3B53;
  height: 40px;
  color: #1C3B53;
  font-size: 15px;
  text-align: center;
  line-height: 40px;

}
</style>
