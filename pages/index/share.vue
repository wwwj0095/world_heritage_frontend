<template>
  <view class="share-page">


    <view>

      <u-toast ref="uToast"></u-toast>

      <u-popup :show="sharePopupShow" mode="top">
        <view style="padding: 0 1.5625rem;">
          <!--Close Icon-->
          <view style="position: relative; top: 1.6rem" @click="closeSharePopup">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                  d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"
                  fill="#1C3B53"/>
            </svg>
          </view>
          <!--Close Icon-->

          <view style="text-align: center; font-size: 0.93rem; font-weight: 400; margin-bottom: 1rem;">
            <span>ソーシャルログイン</span>
          </view>
          <view class="pop-login-list">
            <view class="sns-icon-area">
              <!--Google Icon-->
              <view class="sns-login-style" @click="shareToGoogle">
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
              <view class="sns-login-style sns-login-top" @click="shareToFaceBook">
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
              <view class="sns-login-style sns-login-top" @click="shareToTwitter">
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
            <view style="text-align: center; align-items: center; justify-content: center; font-size: 15px; font-weight: 400; width: 100%">
              <view style="padding: 10px 40px">チェックイン機能を利用するにはサインインしてください。</view>
            </view>
          </view>
        </view>
      </u-popup>

      <view style="text-align: center; font-size: 15px; margin-top: 0.65rem; font-weight: 400; margin-bottom: 1rem;">
        <span>SNSにシェアする</span>
      </view>

      <view>
        <view style="font-size: 13px; color: #1C3B53; font-style: normal; margin-left: 3px;">達成状況</view>
        <view style="font-size: 30px; color: #1C3B53; font-style: normal;">
          🌍 世界遺産の旅
        </view>


        <view>
          <!-- 左右排列显示 -->
          <u-row customStyle="margin-top: 2.25rem">
            <u-col span="6">
              <u-row>
                <u-col span="6" text-align="left">
                  <view style="font-size: 12px">グローバル</view>
                </u-col>
                <u-col span="5">
                  <view style="font-size: 14px; font-weight: 700;text-align: right;color: #1C3B53">{{ selectedHeritageStatistics.rate }}</view>
                </u-col>
              </u-row>
            </u-col>
            <u-col span="6">

            </u-col>
          </u-row>

          <u-row customStyle="margin-top: 10px">
            <u-col span="6">
              <u-row>
                <u-col span="6" text-align="left">
                  <view style="font-size: 12px; color: #1C3B53">ヨーロッパ</view>
                </u-col>
                <u-col span="5">
                  <view style="font-size: 14px; font-weight: 700; text-align: right; color: #1C3B53">{{ EuropeCount }}</view>
                </u-col>
              </u-row>
            </u-col>
            <u-col span="6">
              <u-row>
                <u-col span="6">
                  <view style="font-size: 12px; color: #1C3B53">アフリカ</view>
                </u-col>
                <u-col span="5">
                  <view style="font-size: 14px; font-weight: 700; text-align: right; color: #1C3B53">{{ AfricaCount }}</view>
                </u-col>
              </u-row>
            </u-col>
          </u-row>
          <u-row customStyle="margin-top: 10px">
            <u-col span="6">
              <u-row>
                <u-col span="6" text-align="left">
                  <view style="font-size: 12px; color: #1C3B53">アジア</view>
                </u-col>
                <u-col span="5">
                  <view style="font-size: 14px; font-weight: 700; text-align: right; color: #1C3B53">{{ AsiaCount }}</view>
                </u-col>
              </u-row>
            </u-col>
            <u-col span="6">
              <u-row>
                <u-col span="6">
                  <view style="font-size: 12px; color: #1C3B53">北米・中米</view>
                </u-col>
                <u-col span="5">
                  <view style="font-size: 14px; font-weight: 700; text-align: right; color: #1C3B53">{{ NorthAmericaCount + CentralAmericaCount }}</view>
                </u-col>
              </u-row>
            </u-col>
          </u-row>
          <u-row customStyle="margin-top: 10px">
            <u-col span="6">
              <u-row>
                <u-col span="6" text-align="left">
                  <view style="font-size: 12px; color: #1C3B53">オセアニア</view>
                </u-col>
                <u-col span="5">
                  <view style="font-size: 14px; font-weight: 700; text-align: right; color: #1C3B53">{{ OceaniaCount }}</view>
                </u-col>
              </u-row>
            </u-col>
            <u-col span="6">
              <u-row>
                <u-col span="6">
                  <view style="font-size: 12px; color: #1C3B53">南米</view>
                </u-col>
                <u-col span="5">
                  <view style="font-size: 14px; font-weight: 700; text-align: right; color: #1C3B53">{{ SouthAmericaCount }}</view>
                </u-col>
              </u-row>
            </u-col>
          </u-row>
          <!-- 左右排列显示 -->
        </view>


        <view style="margin-top: 30rpx;">
          <!-- 地图组件 -->
          <img v-if="pageImageUrl" :src="pageImageUrl" alt="" id="share-image" width="100%" height="180px">
          <!-- 地图组件 -->
        </view>

      </view>

      <view class="canvas-dom">
        <canvas canvas-id="canvas-bg-img" id="canvas-bg-img" style="width: 566px; height: 1014px" />
      </view>


      <view  class="canvas-dom">
        <canvas canvas-id="canvas-share"  style="width: 566px; height: 1014px" />
      </view>

      <view v-if="shareImgUrl" style="margin-top: 50px;">
        <u-button type="primary" color="#1C3B53" text="SNSにシェアする" @click="shareToSNS"></u-button>
        <u-button type="primary" color="#1C3B53" text="ギャラリーに保存する" style="margin-top: 10px" @click="showMapFlagImage"></u-button>
      </view>
    </view>


  </view>
</template>

<script>
import {getContinent, getHeritage, getCheckInInfo} from '@/util/request/api.js';
import { Node, Canvas } from '@/pages/components/html2canvas/index';

export default {
  data() {
    return {
      tabIndex: 1,
      value: 0,
      sharePopupShow: false,
      selectedHeritageCount: 0,
      selectedHeritageList: [],
      countryHeritageList: [],
      range: [
        {value: 0, text: '全て'}
      ],
      scrollTop: 0,
      old: {
        scrollTop: 0
      },
      EuropeCount: 0,
      AfricaCount: 0,
      AsiaCount: 0,
      NorthAmericaCount: 0,
      OceaniaCount: 0,
      CentralAmericaCount: 0,
      SouthAmericaCount: 0,
      // 已选中的数据
      selectCheckedIds: [],
      // 已选中的遗产统计数据
      selectedHeritageStatistics: {
        rate: '',
        continent_data_list: []
      },
      userInfo: {
        id: '',
        name: '',
        email: '',
        avatar: ''
      },
      center: {lat: 0, lng: 0},
      listQuery: {
        heritage_ids: '',
      },
      shareImgUrl: '',
      pageImageUrl: '',
      indexList: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
    };
  },
  computed: {
    isLogin() {
      return this.$store.state.isLogin;
    }
  },
  onLoad(options) {
    this.listQuery.heritage_ids = options.params
    this.getCheckInInformation(options.params)
  },
  async mounted() {
    await this.$gmapApiPromiseLazy();
  },
  methods: {
    showToast(message) {
      this.$refs.uToast.show({
        type: 'default',
        title: '成功',
        message: message
      })
    },
    // 分享到SNS
    shareToSNS() {
      this.sharePopupShow = true
    },
    closeSharePopup() {
      this.sharePopupShow = false
    },
    // 分享到Google
    shareToGoogle() {
      // 跳转到Google分享页面
      window.location.href = 'https://plus.google.com/share?url=https://doyounknowtheway.jp'
    },
    shareToFaceBook() {
      // 跳转到FaceBook分享页面
      window.location.href = 'https://www.facebook.com/sharer/sharer.php?u=https://doyounknowtheway.jp'
    },
    shareToTwitter() {
      // 跳转到Twitter分享页面
      window.location.href = 'https://twitter.com/intent/tweet?text=https://doyounknowtheway.jp'
    },
    // 生成图片海报
    showMapFlagImage() {
      uni.showLoading({
        title: "Loading",
        mask: true,
      });
      this.genShareBgImage(342, true)
    },
    // 获取CheckIn信息
    getCheckInInformation() {
      getCheckInInfo({ ...this.listQuery} ).then((response) => {
        if (response.code == 1) {
          this.showToast(response.msg)
        }
        if (response.code == 0) {
          this.selectedHeritageStatistics = response.data
          // 遍历该数据，为每个大洲变量赋值
          this.selectedHeritageStatistics.continent_data_list.forEach((item, index) => {
            if (item.name_en === "Europe") {
              this.EuropeCount = item.count
            }
            if (item.name_en === "Africa") {
              this.AfricaCount = item.count
            }
            if (item.name_en === "Asia") {
              this.AsiaCount = item.count
            }
            if (item.name_en === "North America") {
              this.NorthAmericaCount = item.count
            }
            if (item.name_en === 'South America') {
              this.SouthAmericaCount = item.count
            }
            if (item.name_en === "Oceania") {
              this.OceaniaCount = item.count
            }
            if (item.name_en === "Central America") {
              this.CentralAmericaCount = item.count
            }
          })
          // 生成分享图片的背景图片
          this.genShareBgImage(342, false)
          // 生成大洲地图背景图片
          this.genStateBgImageForPage(372)
        }
      }).catch((error) => {
        this.showToast('データの取得に失敗しました')
      })
    },
    // 生成当前页面的背景图片
    genStateBgImageForPage(imageX) {
      let content = `
<div style="box-sizing: border-box; overflow: hidden;padding: 20rpx; position: absolute; bottom: 100rpx;">
</div>`

      const ctx = uni.createCanvasContext("canvas-bg-img");
      // 绘制背景图片
      ctx.drawImage('../../static/img.png', 0, 10, imageX, 250);

      // 为背景图的每个大洲添加打卡标识
      // 北美洲
      ctx.fillStyle = "#FFFFFF"; // 设置文本颜色
      let SouthAmericaFlagX = 59;
      ctx.drawImage('../../static/images/share_page_map_states_flag.png', SouthAmericaFlagX, 90, 24, 24);
      ctx.font = 'bold 13px Arial';
      let SouthAmericaCountX = 68;
      let SouthAndCentralAmericaCount = this.NorthAmericaCount + this.CentralAmericaCount
      if (SouthAndCentralAmericaCount < 10 && SouthAndCentralAmericaCount >= 0) {
        SouthAmericaCountX = 68;
      } else if (SouthAndCentralAmericaCount >= 10 && SouthAndCentralAmericaCount < 100) {
        SouthAmericaCountX = 64;
      } else if (SouthAndCentralAmericaCount >= 100 && SouthAndCentralAmericaCount < 1000) {
        SouthAmericaCountX = 61;
      }
      ctx.fillText(SouthAndCentralAmericaCount, SouthAmericaCountX, 107)
      // 南美洲
      let NorthAmericaFlagX = 107;

      ctx.drawImage('../../static/images/share_page_map_states_flag.png', NorthAmericaFlagX, 170, 24, 24);
      // 进行像素判断
      let CentralAmericaCountX = 116;
      if (this.SouthAmericaCount < 10 && this.SouthAmericaCount >= 0) {
        CentralAmericaCountX = 116;
      } else if (this.SouthAmericaCount >= 10 && this.SouthAmericaCount < 100) {
        CentralAmericaCountX = 113;
      } else if (this.SouthAmericaCount >= 100 && this.SouthAmericaCount < 1000) {
        CentralAmericaCountX = 109;
      }
      ctx.fillText(this.SouthAmericaCount, CentralAmericaCountX, 187)

      // 非洲
      let AfricaFlagX = 195;
      ctx.drawImage('../../static/images/share_page_map_states_flag.png', AfricaFlagX, 150, 24, 24);
      let AfricaCountX = 204;
      if (this.AfricaCount < 10 && this.AfricaCount >= 0) {
        AfricaCountX = 204;
      } else if (this.AfricaCount >= 10 && this.AfricaCount < 100) {
        AfricaCountX = 201;
      } else if (this.AfricaCount >= 100 && this.AfricaCount < 1000) {
        AfricaCountX = 197;
      }
      ctx.fillText(this.AfricaCount, AfricaCountX, 167)


      // 亚洲
      let AsiaCountX = 304;
      let AsiaFlagX = 295;
      ctx.drawImage('../../static/images/share_page_map_states_flag.png', AsiaFlagX, 99, 24, 24);
      if (this.AsiaCount < 10 && this.AsiaCount >= 0) {
        AsiaCountX = 304;
      } else if (this.AsiaCount >= 10 && this.AsiaCount < 100) {
        AsiaCountX = 302;
      } else if (this.AsiaCount >= 100 && this.AsiaCount < 1000) {
        AsiaCountX = 297;
      }
      ctx.fillText(this.AsiaCount, AsiaCountX, 115)


      // 欧洲
      let EuropeCountX = 204;
      let EuropeFlagX = 195;
      ctx.drawImage('../../static/images/share_page_map_states_flag.png', EuropeFlagX, 65, 24, 24);
      if (this.EuropeCount < 10 && this.EuropeCount >= 0) {
        EuropeCountX = 204;
      } else if (this.EuropeCount >= 10 && this.EuropeCount < 100) {
        EuropeCountX = 201;
      } else if (this.EuropeCount >= 100 && this.EuropeCount < 1000) {
        EuropeCountX = 196;
      }
      ctx.fillText(this.EuropeCount, EuropeCountX, 82)
      // 大洋洲
      let OceaniaCountX = 319;
      let OceaniaFlagX  = 310;
      ctx.drawImage('../../static/images/share_page_map_states_flag.png', OceaniaFlagX, 193, 24, 24);
      if (this.OceaniaCount < 10 && this.OceaniaCount >= 0) {
        OceaniaCountX = 319;
      } else if (this.OceaniaCount >= 10 && this.OceaniaCount < 100) {
        OceaniaCountX = 315;
      } else if (this.OceaniaCount >= 100 && this.OceaniaCount < 1000) {
        OceaniaCountX = 312;
      }
      ctx.fillText(this.OceaniaCount, OceaniaCountX, 210)


      const canvas1 = new Canvas(ctx);
      const tree = Node.fromHtml(content);
      tree.setStyle("width", "375px");
      tree.setStyle("height", "250px");
      tree
          .layout(ctx)
          .then(() => {
            canvas1.draw(tree);
            ctx.draw(false, () => {
              setTimeout(() => {
                uni.canvasToTempFilePath({
                  fileType: "jpg",
                  quality: 1,
                  x: 0,
                  y: 0,
                  width: tree.boxWidth().value(),
                  height: tree.boxHeight().value(),
                  destWidth: 375,
                  destHeight: 250,
                  canvasId: "canvas-bg-img",
                  success: (res) => {
                    this.pageImageUrl = res.tempFilePath;
                  },
                  fail: () => {
                    this.showToast('画像の生成に失敗しました')
                  },
                });
              }, 1000);
            });
          })
          .catch(() => {
            this.showToast('画像の生成に失敗しました')
          });
    },
    // 生成图片
    genShareBgImage(imageX, is_show) {
      let content = `
<div style="box-sizing: border-box; overflow: hidden;padding: 20px; position: absolute; bottom: 100px;">
</div>`

      const ctx = uni.createCanvasContext("canvas-share");
      ctx.fillStyle = "#1C3B53"; // 设置文本颜色
      ctx.font = "14px Arial"; // 设置字体样式和大小
      ctx.fillText("達成状況", 22, 20); // 绘制文本

      ctx.font = "30px Arial"; // 设置字体样式和大小
      ctx.fillText("🌍 世界遺産の旅", 18, 54); // 绘制文本

      ctx.font = "13px Arial"; // 设置字体样式和大小
      ctx.fillText("グローバル", 22, 90); // 绘制文本
      ctx.font = "bold 16px Arial"; // 设置粗体样式和大小
      ctx.fillText(this.selectedHeritageStatistics.rate, 120, 90); // 绘制文本

      ctx.font = "13px Arial"; // 设置字体样式和大小
      ctx.fillText("ヨーロッパ", 22, 120); // 绘制文本
      ctx.font = "bold 16px Arial"; // 设置粗体样式和大小
      ctx.fillText(this.EuropeCount, 165, 120); // 绘制文本

      ctx.font = "13px Arial"; // 设置字体样式和大小
      ctx.fillText("アフリカ", 220, 120); // 绘制文本
      ctx.font = "bold 16px Arial"; // 设置粗体样式和大小
      ctx.fillText(this.AfricaCount, 340, 120); // 绘制文本

      ctx.font = "13px Arial"; // 设置字体样式和大小
      ctx.fillText("アジア", 22, 150); // 绘制文本
      ctx.font = "bold 16px Arial"; // 设置粗体样式和大小
      ctx.fillText(this.AsiaCount, 165, 150); // 绘制文本

      ctx.font = "13px Arial"; // 设置字体样式和大小
      ctx.fillText("北米・中米", 220, 150); // 绘制文本
      ctx.font = "bold 16px Arial"; // 设置粗体样式和大小
      ctx.fillText(this.NorthAmericaCount + this.CentralAmericaCount, 340, 150); // 绘制文本

      ctx.font = "13px Arial"; // 设置字体样式和大小
      ctx.fillText("オセアニア", 22, 180); // 绘制文本
      ctx.font = "bold 16px Arial"; // 设置粗体样式和大小
      ctx.fillText(this.OceaniaCount, 165, 180); // 绘制文本

      ctx.font = "13px Arial"; // 设置字体样式和大小
      ctx.fillText("南米", 220, 180); // 绘制文本
      ctx.font = "bold 16px Arial"; // 设置粗体样式和大小
      ctx.fillText(this.SouthAmericaCount, 340, 180); // 绘制文本

      ctx.fillText('世界遺産の旅', 22, 550); // 绘制文本
      ctx.fillText('Doyounknowtheway.jp', 22, 570); // 绘制文本

      // 绘制背景图片
      ctx.drawImage('../../static/img.png', 0, 250, imageX, 180);

      // 为背景图的每个大洲添加打卡标识
      // 北美洲
      ctx.fillStyle = "#FFFFFF"; // 设置文本颜色
      let SouthAmericaFlagX = 58;
      ctx.drawImage('../../static/images/share_page_map_states_flag.png', SouthAmericaFlagX, 300, 24, 24);
      ctx.font = 'bold 13px Arial';
      let SouthAmericaCountX = 66;
      let SouthAndCentralAmericaCount = this.NorthAmericaCount + this.CentralAmericaCount
      if (SouthAndCentralAmericaCount < 10 && SouthAndCentralAmericaCount >= 0) {
        SouthAmericaCountX = 66;
      } else if (SouthAndCentralAmericaCount >= 10 && SouthAndCentralAmericaCount < 100) {
        SouthAmericaCountX = 63;
      } else if (SouthAndCentralAmericaCount >= 100 && SouthAndCentralAmericaCount < 1000) {
        SouthAmericaCountX = 59;
      }
      ctx.fillText(SouthAndCentralAmericaCount, SouthAmericaCountX, 316)


      // 南美洲
      let NorthAmericaFlagX = 98;
      ctx.drawImage('../../static/images/share_page_map_states_flag.png', NorthAmericaFlagX, 370, 24, 24);
      // 进行像素判断
      let CentralAmericaCountX = 107;
      if (this.SouthAmericaCount < 10 && this.SouthAmericaCount >= 0) {
        CentralAmericaCountX = 107;
      } else if (this.SouthAmericaCount >= 10 && this.SouthAmericaCount < 100) {
        CentralAmericaCountX = 103;
      } else if (this.SouthAmericaCount >= 100 && this.SouthAmericaCount < 1000) {
        CentralAmericaCountX = 99;
      }
      ctx.fillText(this.SouthAmericaCount, CentralAmericaCountX, 386)

      // 非洲
      let AfricaFlagX = 180;
      ctx.drawImage('../../static/images/share_page_map_states_flag.png', AfricaFlagX, 350, 24, 24);
      let AfricaCountX = 189;
      if (this.AfricaCount < 10 && this.AfricaCount >= 0) {
        AfricaCountX = 189;
      } else if (this.AfricaCount >= 10 && this.AfricaCount < 100) {
        AfricaCountX = 185;
      } else if (this.AfricaCount >= 100 && this.AfricaCount < 1000) {
        AfricaCountX = 181;
      }
      ctx.fillText(this.AfricaCount, AfricaCountX, 366)


      // 亚洲
      let AsiaCountX = 279;
      let AsiaFlagX = 270;
      ctx.drawImage('../../static/images/share_page_map_states_flag.png', AsiaFlagX, 310, 24, 24);
      if (this.AsiaCount < 10 && this.AsiaCount >= 0) {
        AsiaCountX = 279;
      } else if (this.AsiaCount >= 10 && this.AsiaCount < 100) {
        AsiaCountX = 275;
      } else if (this.AsiaCount >= 100 && this.AsiaCount < 1000) {
        AsiaCountX = 271;
      }
      ctx.fillText(this.AsiaCount, AsiaCountX, 326)


      // 欧洲
      let EuropeCountX = 189;
      let EuropeFlagX = 180;
      ctx.drawImage('../../static/images/share_page_map_states_flag.png', EuropeFlagX, 290, 24, 24);
      if (this.EuropeCount < 10 && this.EuropeCount >= 0) {
        EuropeCountX = 189;
      } else if (this.EuropeCount >= 10 && this.EuropeCount < 100) {
        EuropeCountX = 185;
      } else if (this.EuropeCount >= 100 && this.EuropeCount < 1000) {
        EuropeCountX = 181;
      }
      ctx.fillText(this.EuropeCount, EuropeCountX, 306)


      // 大洋洲
      let OceaniaCountX = 299;
      let OceaniaFlagX = 290;
      ctx.drawImage('../../static/images/share_page_map_states_flag.png', OceaniaFlagX, 370, 24, 24);
      if (this.OceaniaCount < 10 && this.OceaniaCount >= 0) {
        OceaniaCountX = 299;
      } else if (this.OceaniaCount >= 10 && this.OceaniaCount < 100) {
        OceaniaCountX = 295;
      } else if (this.OceaniaCount >= 100 && this.OceaniaCount < 1000) {
        OceaniaCountX = 291;
      }
      ctx.fillText(this.OceaniaCount, OceaniaCountX, 386)


      const canvas = new Canvas(ctx);
      const tree = Node.fromHtml(content);
      tree.setStyle("width", "375px");
      tree.setStyle("height", "650px");
      tree
          .layout(ctx)
          .then(() => {
            canvas.draw(tree);
            ctx.draw(false, () => {
              setTimeout(() => {
                uni.canvasToTempFilePath({
                  fileType: "jpg",
                  quality: 1,
                  x: 0,
                  y: 0,
                  scale: 4,
                  dpi: 300,
                  width: tree.boxWidth().value(),
                  height: tree.boxHeight().value(),
                  destWidth: 375,
                  destHeight: 600,
                  canvasId: "canvas-share",
                  success: (res) => {
                    this.shareImgUrl = res.tempFilePath;
                    if (is_show) {
                      uni.previewImage({
                        urls: [this.shareImgUrl],
                        current: this.shareImgUrl
                      });
                    }
                    uni.hideLoading();
                  },
                  fail: () => {
                    this.showToast('生成图片失败')
                  },
                });
              }, 1000);
            });
          })
          .catch(() => {
            this.showToast('生成图片失败')
          });
    }
  },
}
</script>

<style lang="scss" scoped>
.share-page {
  padding: 0 1rem;
}
.text {
  font-size: 12px;
  color: #666;
  margin-top: 5px;
}

.canvas-dom {
  position: fixed;
  top: 99999999999px;
}
/* 社交网络图标样式 */
.sns-login-style {
  height: 2.3rem;
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
  margin-top: 0.6rem;
}

/* 弹窗样式 */
.pop-login-list {
  width: 100%;
  height: 12rem;
}
</style>
