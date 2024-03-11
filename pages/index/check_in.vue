<template>
  <view>

    <!-- 顶部个人中心组件 -->
    <tab-list
        v-if="deviceType === 'phone'"
        :user-info="userInfo"
        :tab-index="tabIndex"
        :show-about="false"
        ref="tabList"
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

      <!-- 通知组件 -->
      <u-toast ref="uToast"></u-toast>
      <!-- 通知组件 -->

      <!-- 下拉选择框区域 -->
      <u-row customStyle="margin-bottom: 10px">
        <u-col span="7">
          <view style="padding: 0 5px 0 0; font-size: 10px; margin-top: 10px;">
            <view>
              <uni-data-select
                  v-model="listQuery.country"
                  :clear="true"
                  :localdata="categoryMainData"
                  :placeholder="categoryMainPlaceholder"
                  @change="countryChange"
              ></uni-data-select>
            </view>
          </view>
        </u-col>
        <u-col span="5">
          <view style="padding: 0 0 0 5px">
            <view class="select-area" style="margin-top: 10px;">
              <uni-data-select
                  :clear="true"
                  v-model="listQuery.category_sub"
                  :localdata="categorySubData"
                  :placeholder="categorySubPlaceholder"
                  @change="categorySubChange"
              ></uni-data-select>
            </view>
          </view>
        </u-col>
      </u-row>
      <!-- 下拉选择框区域 -->
    </view>
    <!-- 头部内容 -->

    <!-- 核心内容区域 -->
    <view v-if="deviceType === 'phone'" class="list-area" style="margin-top: 10px;">

      <scroll-view
          :scroll-top="scrollTop"
          scroll-y="true"
          class="scroll-Y"
          :style="{
				  maxHeight: $u.addUnit(scrollViewHeight)
			    }"
          @scrolltolower="scrolltolower">
        <view v-for="(country, countryIndex) in checkInListData">
          <u-row>
            <u-col span="9">
              <view style="display: flex; padding: 0 0 0 11px;">
                <i v-if="country.name_en === 'China'" :class="`em em-${country.iso_code}`" aria-role="presentation" style="height: 30rpx;width: 35rpx;  margin-right: 15rpx;"></i>
                <i v-else :class="`em em-flag-${country.iso_code}`" aria-role="presentation" style="height: 30rpx; width: 35rpx; margin-right: 15rpx;"></i>
                <u--text v-if="currentLanguage === 'jp'" :text="country.name_jp" lines="2" size="13px" color="#1C3B53"></u--text>
                <u--text v-else-if="currentLanguage === 'en'" :text="country.name_en" lines="2" size="13px" color="#1C3B53"></u--text>
                <u--text v-else :text="country.name_cn" lines="2" size="13px" color="#1C3B53"></u--text>
              </view>
            </u-col>
            <u-col span="3">
              <view style="font-size: 12px; color: #1C3B53; margin-left: 100rpx;">
                <span>{{ country.selected_count ? country.selected_count : 0 }}/ {{ country.app_data.length }}</span>
              </view>
            </u-col>
          </u-row>
          <u-grid :border="false" col="2">
            <u-grid-item
                v-for="(appDataItem, appDataIndex) in country.app_data"
                :key="appDataIndex"
                :style="{border: appDataItem.is_selected ? '3px solid #72CD18' : 'none'}"
                style="height: 130px;justify-content: normal; padding: 10px; margin: 3px 3px; width: 48%;  position: relative;"
                @click="appDataClick(appDataItem, appDataIndex, countryIndex)">
              <view>
                <u--image :showLoading="true" :src="getCoverImageUrl(appDataItem.cover_img)" width="178" height="70px" style="text-align: center"></u--image>
                <svg v-if="appDataItem.category === 'Cultural'" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" class="heritage-list-svg">
                  <circle cx="8" cy="8" r="8" fill="#A57AED"/>
                  <path d="M4.84211 6.85714V9.85714H6.10526V6.85714H4.84211ZM7.36842 6.85714V9.85714H8.63158V6.85714H7.36842ZM4 12H12V10.7143H4V12ZM9.89474 6.85714V9.85714H11.1579V6.85714H9.89474ZM8 3L4 5.14286V6H12V5.14286L8 3Z" fill="white"/>
                </svg>

                <svg v-if="appDataItem.category === 'Natural'" width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg" class="heritage-list-svg">
                  <ellipse cx="9.08523" cy="8" rx="8.21951" ry="8" fill="#4E9CA1"/>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M11.2831 3.92202C10.9684 4.10451 10.8606 4.50867 11.0423 4.82474L12.1387 6.73242C12.3204 7.0485 12.7228 7.1568 13.0374 6.97431C13.3521 6.79182 13.4599 6.38766 13.2782 6.07158L12.1818 4.1639C12.0001 3.84783 11.5977 3.73953 11.2831 3.92202ZM10.3948 4.94594L7.13443 6.83679C6.71489 7.08011 6.57114 7.61899 6.81337 8.04043L6.87591 8.14924L6.86826 8.15354L5.25258 9.09055L5.08474 8.79852C4.99817 8.6479 4.80253 8.59411 4.64778 8.67837C4.49302 8.76263 4.43775 8.95304 4.52432 9.10366L5.1822 10.2483C5.26878 10.3989 5.46441 10.4527 5.61917 10.3684C5.77392 10.2842 5.8292 10.0938 5.74262 9.94313L5.56621 9.6362L7.18948 8.6948L7.25195 8.8035C7.49418 9.22493 8.03065 9.36933 8.4502 9.12601L9.03682 8.7858L7.33032 12.0241C7.24939 12.1777 7.31169 12.3661 7.46948 12.4448C7.62726 12.5236 7.82077 12.4629 7.90169 12.3094L9.80895 8.69008L11.7162 12.3094C11.7971 12.4629 11.9906 12.5236 12.1484 12.4448C12.3062 12.3661 12.3685 12.1777 12.2876 12.0241L10.2196 8.09985L11.7157 7.2322C11.6647 7.17256 11.6187 7.10757 11.5784 7.03755L10.482 5.12987C10.4476 5.0701 10.4186 5.0086 10.3948 4.94594Z" fill="white"/>
                </svg>

                <svg v-if="appDataItem.category === 'Mixed'" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" class="heritage-list-svg">
                  <circle cx="8" cy="8" r="8" fill="#82A0EE"/>
                  <circle cx="8" cy="5" r="2" fill="white"/>
                  <circle cx="5" cy="10" r="2" fill="white"/>
                  <circle cx="11" cy="10" r="2" fill="white"/>
                </svg>

                <u--text v-if="currentLanguage === 'jp'" :text="appDataItem.name_jp" size="12" :lines="2"></u--text>
                <u--text v-else-if="currentLanguage === 'en'" :text="appDataItem.name_en" lines="2" size="13px" color="#1C3B53"></u--text>
                <u--text v-else :text="appDataItem.name_cn" lines="2" size="13px" color="#1C3B53"></u--text>
              </view>
            </u-grid-item>
          </u-grid>
        </view>
      </scroll-view>
    </view>
    <view v-else class="list-area" style="margin-top: 10px; padding: 0 60px">
      <scroll-view
          :scroll-top="scrollTop"
          scroll-y="true"
          class="scroll-Y">
        <view v-for="(country, countryIndex) in checkInListData">
          <u-row>
            <u-col span="8">
              <view>
                <view style="display: flex;">
                  <i v-if="country.name_en === 'China'" :class="`em em-${country.iso_code}`" aria-role="presentation" style="height: 30rpx;width: 35rpx;  margin-right: 15rpx;"></i>
                  <i v-else :class="`em em-flag-${country.iso_code}`" aria-role="presentation" style="height: 30rpx; width: 35rpx; margin-right: 15rpx;"></i>
                  <u--text v-if="currentLanguage === 'jp'" :text="country.name_jp" lines="2" size="13px" color="#1C3B53"></u--text>
                  <u--text v-else-if="currentLanguage === 'en'" :text="country.name_en" lines="2" size="13px" color="#1C3B53"></u--text>
                  <u--text v-else :text="country.name_cn" lines="2" size="13px" color="#1C3B53"></u--text>
                </view>
              </view>
            </u-col>
            <u-col span="4">
              <view>
                <u--text color="#1C3B53" align="right" :text="`${country.selected_count ? country.selected_count : 0}/ ${country.heritages.length}`" size="12" :lines="1" style="margin-right: 40px; margin-left: -23px"></u--text>
              </view>
            </u-col>
          </u-row>
          <u-grid :border="false" col="6">
            <u-grid-item
                v-for="(appDataItem, appDataIndex) in country.app_data"
                :key="appDataIndex"
                :style="{border: appDataItem.is_selected ? '3px solid #72CD18' : 'none'}"
                style="height: 168px; justify-content: normal; margin: 3px 3px;  position: relative;"
                @click="appDataClick(appDataItem, appDataIndex, countryIndex)">
              <view style="position: relative;">
                <u--image :showLoading="true" :src="getCoverImageUrl(appDataItem.cover_img)" width="250" height="100px" style="text-align: center"></u--image>
                <svg v-if="appDataItem.category === 'Cultural'" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" class="heritage-list-svg-pc">
                  <circle cx="8" cy="8" r="8" fill="#A57AED"/>
                  <path d="M4.84211 6.85714V9.85714H6.10526V6.85714H4.84211ZM7.36842 6.85714V9.85714H8.63158V6.85714H7.36842ZM4 12H12V10.7143H4V12ZM9.89474 6.85714V9.85714H11.1579V6.85714H9.89474ZM8 3L4 5.14286V6H12V5.14286L8 3Z" fill="white"/>
                </svg>

                <svg v-if="appDataItem.category === 'Natural'" width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg" class="heritage-list-svg-pc">
                  <ellipse cx="9.08523" cy="8" rx="8.21951" ry="8" fill="#4E9CA1"/>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M11.2831 3.92202C10.9684 4.10451 10.8606 4.50867 11.0423 4.82474L12.1387 6.73242C12.3204 7.0485 12.7228 7.1568 13.0374 6.97431C13.3521 6.79182 13.4599 6.38766 13.2782 6.07158L12.1818 4.1639C12.0001 3.84783 11.5977 3.73953 11.2831 3.92202ZM10.3948 4.94594L7.13443 6.83679C6.71489 7.08011 6.57114 7.61899 6.81337 8.04043L6.87591 8.14924L6.86826 8.15354L5.25258 9.09055L5.08474 8.79852C4.99817 8.6479 4.80253 8.59411 4.64778 8.67837C4.49302 8.76263 4.43775 8.95304 4.52432 9.10366L5.1822 10.2483C5.26878 10.3989 5.46441 10.4527 5.61917 10.3684C5.77392 10.2842 5.8292 10.0938 5.74262 9.94313L5.56621 9.6362L7.18948 8.6948L7.25195 8.8035C7.49418 9.22493 8.03065 9.36933 8.4502 9.12601L9.03682 8.7858L7.33032 12.0241C7.24939 12.1777 7.31169 12.3661 7.46948 12.4448C7.62726 12.5236 7.82077 12.4629 7.90169 12.3094L9.80895 8.69008L11.7162 12.3094C11.7971 12.4629 11.9906 12.5236 12.1484 12.4448C12.3062 12.3661 12.3685 12.1777 12.2876 12.0241L10.2196 8.09985L11.7157 7.2322C11.6647 7.17256 11.6187 7.10757 11.5784 7.03755L10.482 5.12987C10.4476 5.0701 10.4186 5.0086 10.3948 4.94594Z" fill="white"/>
                </svg>

                <svg v-if="appDataItem.category === 'Mixed'" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" class="heritage-list-svg-pc">
                  <circle cx="8" cy="8" r="8" fill="#82A0EE"/>
                  <circle cx="8" cy="5" r="2" fill="white"/>
                  <circle cx="5" cy="10" r="2" fill="white"/>
                  <circle cx="11" cy="10" r="2" fill="white"/>
                </svg>

                <u--text :text="appDataItem.name_jp" size="12" :lines="3"></u--text>
              </view>
            </u-grid-item>
          </u-grid>
        </view>
      </scroll-view>
    </view>
    <!-- 核心内容区域 -->

    <!-- 底部固定按钮 -->
    <view class="bottom-button-area">
      <view style="display: flex; justify-content: space-between; align-items: center; text-align: center; width: 100%">
        <view class="bottom-button" style="margin: 0 0.8rem;" @click="popupShow = true">
          {{ selectedText }}（{{ selectCheckedIds.length }}件）
        </view>
        <view class="bottom-button" style="margin: 0 1rem;"  @click="redirectToSharePage">{{ checkBtnText }}</view>
      </view>
    </view>
    <!-- 底部固定按钮 -->

    <!-- 选择遗产列表弹出框部分 -->
    <view>
      <u-popup :show="popupShow" mode="center"  @close="popupShow = false">
        <view style="height: 555px;">
          <view style="text-align: center; font-size: 15px; margin-top: 14px; font-weight: 400; margin-bottom: 10px;">
            <span>{{ selectedText }}（{{ selectCheckedIds.length }}件）</span>
          </view>

          <!--已选中的数据滚动区域-->
          <view>
            <scroll-view
                :scroll-top="scrollTop"
                scroll-y="true"
                style="height: 450px">
              <view class="select-heritage-list" style="width: 343px;">
                <u-checkbox-group
                    v-model="selectCheckedIds"
                    placement="column"
                    style="height: 200px">
                  <u-checkbox
                      shape="circle"
                      activeColor="#72CD18"
                      @change="selectAppDataClick(item)"
                      :checked="item.is_checked"
                      style="margin: 8px 15px; font-size: 15px"
                      :customStyle="{marginBottom: '8px'}"
                      v-for="(item, index) in selectedListData"
                      :key="index"
                      :label="getCheckBoxLabelText(item)"
                      :name="item.id"
                  >
                  </u-checkbox>
                </u-checkbox-group>
              </view>
            </scroll-view>
            <view
                style="
                position: relative;
                display: flex;
                justify-content: space-between;
                align-items: center;
                text-align: center;
                width: 100%;">
              <view class="bottom-button" style="margin: 0 30rpx;" @click="clearCheckSelected">{{ popupClearBtn }}</view>
              <view class="bottom-button" style="margin: 0 30rpx;" @click="confirmSelected">{{ popupConfirmBtn }}</view>
            </view>
          </view>
          <!--已选中的数据滚动区域-->


        </view>
      </u-popup>
    </view>
    <!-- 选择遗产列表弹出框部分 -->

    <!-- 分享页面弹出框 -->
    <view>
      <u-popup :show="sharePageShow" mode="center" closeIconPos="top-left" :closeable="true" @close="sharePageShow = false">
        <view style="text-align: center; font-size: 15px; font-weight: 400; margin-top: 15px;">
          <span style="color: #1C3B53; font-size: 15px">SNSにシェアする</span>
        </view>

        <view style="height: 650px; width: 400px">
          <view style="padding: 0 40px">
            <view style="font-size: 13px; color: #1C3B53; font-style: normal; margin-left: 5px; margin-top: 40px">達成状況</view>
            <view style="font-size: 30px; color: #1C3B53; font-style: normal;">
              🌍 世界遺産の旅
            </view>


            <view>
              <!-- 左右排列显示 -->
              <u-row customStyle="margin-top: 40px">
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
                      <view style="font-size: 14px; font-weight: 700; text-align: right; color: #1C3B53">{{ SouthAmericaCount + CentralAmericaCount }}</view>
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


            <view style="margin-top: 20rpx;">
              <!-- 地图背景图 -->
              <img v-if="pageImageUrl" :src="pageImageUrl" alt="" id="share-image" width="100%" height="200px">
              <!-- 地图背景图 -->
            </view>

            <view v-if="pageImageUrl" style="margin-top: 60px;">
              <u-button type="primary" color="#1C3B53" text="SNSにシェアする" @click="shareToSNS"></u-button>
              <u-button type="primary" color="#1C3B53" text="ギャラリーに保存する" style="margin-top: 10px" @click="showMapFlagImage"></u-button>
            </view>

          </view>
        </view>
      </u-popup>
    </view>
    <!-- 分享页面弹出框 -->

    <!-- 分享到社交平台 -->
    <u-popup
        :show="sharePopupShow"
        @close="sharePopupShow = false"
        @open="sharePopupShow = true"
        mode="center"
        :closeable="true"
        bgColor="#87CEFA"
        closeIconPos="top-left">
      <view style="padding: 0 20rpx;">

        <view style="text-align: center; font-size: 15px; font-weight: 400; margin-bottom: 20px; margin-top: 15px;">
          <span>ソーシャルログイン</span>
        </view>
        <view class="pop-login-list">
          <view class="sns-icon-area" style="display:flex; flex-direction: column; align-items: center">
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
    <!-- 分享到社交平台 -->

    <!-- Canvas 占位 -->
    <view class="canvas-dom">
      <canvas canvas-id="canvas-bg-img" style="width: 566px; height: 1014px" />
    </view>

    <view  class="canvas-dom">
      <canvas canvas-id="canvas-share" id="canvas-share" style="width: 566px; height: 1014px" />
    </view>
    <!-- Canvas 占位 -->



  </view>
</template>

<script>
import {getCheckInInfo, getListData, getUserInfo, getUserTokenByTokenKey} from '@/util/request/api.js';
import {Canvas, Node} from '@/pages/components/html2canvas/index';
import tab_list_jp from "@/common/tab_list_jp.json";
import tab_list_en from "@/common/tab_list_en.json";
import tab_list_cn from "@/common/tab_list_cn.json";
import {s3Path} from "@/common/config";

export default {
  data() {
    return {
      tabIndex: 1,
      value: 0,
      popupShow: false,
      sharePageShow: false,
      tempPath: '', // 海报临时路径
      canvasShow: false, // 海报显示
      sharePopupShow: false,
      isAllSelectCheckedIds: true,
      pageImageUrl: '', // 分享框背景地图URL
      saveImageUrl: '', // 保存到本地的图片URL
      categoryMainPlaceholder: '国家：全て',
      deviceType: 'phone',
      EuropeCount: 0,
      AfricaCount: 0,
      AsiaCount: 0,
      scrollViewHeight: 0,
      NorthAmericaCount: 0,
      OceaniaCount: 0,
      shareImgUrl: '',
      CentralAmericaCount: 0,
      SouthAmericaCount: 0,
      selectedListDataCount: 0,
      selectedListData: [],
      scrollTop: 0,
      tabListData: [],
      categorySubPlaceholder: '',
      checkInListData: [],
      checkInListAllData: [],
      checkInListPage: 1,
      checkInListLimit: 10,
      currentLanguage: 'cn',
      // 已选中的数据Id集合
      selectCheckedIds: [],
      // 已选中的数据集合，该集合用于处理页面上的边框
      selectCheckedList: [],
      categorySubData: [
        {value: 0, text: '全て'}
      ],
      continentData: [
        {value: 'All', text: '全て'}
      ],
      categoryMainData: [
        {value: 0, text: '国家：全て'}
      ],
      // 已选中的遗产统计数据
      selectedHeritageStatistics: {
        rate: '0/0',
        continent_data_list: []
      },
      userInfo: {
        id: '',
        name: '',
        email: '',
        avatar: ''
      },
      listQuery: {
        country: '',
        continent: '',
        category_sub: ''
      },
      shareInfoQuery: {
        params: ''
      },
      indexList: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
      indexListIndex: 0,
    };
  },
  computed: {
    isLogin() {
      return this.$store.state.isLogin;
    },
    selectedText() {
      if (this.currentLanguage === 'jp') {
        return '選択済'
      } else if (this.currentLanguage === 'en') {
        return 'Selected'
      } else {
        return '已选择'
      }
    },
    checkBtnText() {
      if (this.currentLanguage === 'jp') {
        return '登録'
      } else if (this.currentLanguage === 'en') {
        return 'Check-in'
      } else {
        return '打卡'
      }
    },
    popupClearBtn() {
      if (this.currentLanguage === 'jp') {
        return 'クリア'
      } else if (this.currentLanguage === 'en') {
        return 'Clear'
      } else {
        return '清空'
      }
    },
    popupConfirmBtn() {
      if (this.currentLanguage === 'jp') {
        return '確認'
      } else if (this.currentLanguage === 'en') {
        return 'OK'
      } else {
        return '确认'
      }
    },
  },
  onLoad(options) {
    let systemInfo = uni.$u.sys()
    this.deviceType = systemInfo.deviceType
    if (options.token_key && !this.isLogin) {
      this.getUserTokenKey(options.login_type, options.token_key);
    }
    this.currentLanguage = uni.getStorageSync('local_lang');
    if (this.currentLanguage === 'jp') {
      this.tabListData = tab_list_jp
      this.categorySubPlaceholder= 'エリア：全て'
      this.categoryMainPlaceholder = '国：全て'
      this.categorySubData = [
        {value: 0, text: '全て'}
      ]
    } else if (this.currentLanguage === 'en') {
      this.tabListData = tab_list_en
      this.categorySubPlaceholder= 'Area: All'
      this.categoryMainPlaceholder = 'Country: All'
      this.categorySubData = [
        {value: 0, text: 'All'}
      ]
      this.continentData = [
        {value: 'All', text: 'All'}
      ]
    } else {
      this.tabListData = tab_list_cn
      this.categorySubPlaceholder= '地区：全部'
      this.categoryMainPlaceholder = '国家：全部'
      this.categorySubData = [
        {value: 0, text: '全部'}
      ]
      this.continentData = [
        {value: 'All', text: '全部'}
      ]
    }
    if (this.isLogin) {
      this.userInfo = uni.getStorageSync('cur_user');
    }
    this.getCategoryMainJson()
    this.getCategorySubJson()
    // this.getContinentData()
    this.getCheckListJson()
    this.genStateBgImage(372, true)
    this.scrollInit()
  },
  methods: {
    // 获取左侧筛选数据
    getCategoryMainJson() {
      let requestUrl = `${s3Path}country_${this.currentLanguage}.json?time=` + new Date().getTime()
      uni.$u.http.get(requestUrl).then(res => {
        this.categoryMainData = res
      })
    },
    getContinentData() {
      let requestUrl = `${s3Path}continent_${this.currentLanguage}.json?time=` + new Date().getTime()
      uni.$u.http.get(requestUrl).then(res => {
        this.categorySubData = this.categorySubData.concat(res)
      })
    },
    // 获取右侧筛选数据
    getCategorySubJson() {
      let requestUrl = `${s3Path}category/category_sub_${this.currentLanguage}.json?time=` + new Date().getTime()
      uni.$u.http.get(requestUrl).then(res => {
        this.categorySubData = this.categorySubData.concat(res)
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
    getCheckBoxLabelText(item) {
      if (this.currentLanguage === 'jp') {
        return item.name_jp
      } else if (this.currentLanguage === 'en') {
        return item.name_en
      } else {
        return item.name_cn
      }
    },
    // 获取列表的数据
    getCheckListJson() {
      // let requestUrl = `${s3Path}check_in/check_in_list.json`
      let requestUrl = `${s3Path}list/list_data.json?time=` + new Date().getTime()
      uni.showLoading({
        title: 'Loading'
      })
      uni.$u.http.get(requestUrl).then(res => {
        this.checkInListAllData = res
        this.checkInListData = this.checkInListAllData.slice(0, this.checkInListLimit)
        uni.hideLoading()
      }).catch(() => {
        uni.hideLoading()
      })
    },
    scrollInit() {
      this.scrollViewHeight = uni.$u.sys().windowHeight - 100
    },
    // 遗迹大洲切换
    countryChange(e) {
      this.checkInListData = []
      this.listQuery.country = e
      if ((e === 'All' || e === '') && (this.listQuery.category_sub === 'All' || this.listQuery.category_sub === '')) {
        this.checkInListLimit = 10;
        this.checkInListData = this.checkInListAllData.slice(0, this.checkInListLimit);
      } else {
        this.requestListData();
      }
    },
    categorySubChange(e) {
      this.checkInListData = []
      this.listQuery.category_sub = e
      if ((e === 'All' || e === '') && (this.listQuery.category_sub === 'All' || this.listQuery.category_sub === '')) {
        this.checkInListLimit = 10;
        this.checkInListData = this.checkInListAllData.slice(0, this.checkInListLimit);
      } else {
        this.requestListData();
      }
    },
    // 遗迹点击事件
    appDataClick(appDataItem, appDataIndex, countryIndex) {
      this.$set(
          this.checkInListData[countryIndex].app_data[appDataIndex],
          'is_selected',
          !this.checkInListData[countryIndex].app_data[appDataIndex].is_selected
      );
      this.$forceUpdate()
      if (this.checkInListData[countryIndex].app_data[appDataIndex].is_selected) {
        this.selectedListDataCount++
        appDataItem.is_checked = true
        this.selectedListData.push(appDataItem)
      } else {
        this.selectedListDataCount--
        let index = this.selectedListData.findIndex(item => item.id === appDataItem.id)
        // 如果存在, 那么就删除
        if (index > -1) {
          this.selectedListData.splice(index, 1)
        }
      }
      this.selectCheckedIds = this.selectedListData.map(item => item.id)
      // 计算已经选择的国家的数量
      this.checkInListData[countryIndex].selected_count = this.checkInListData[countryIndex].app_data.filter(item => item.is_selected).length
    },
    getUserTokenKey(login_type, token_key) {
      getUserTokenByTokenKey({ params: { login_type: login_type , token_key: token_key}}).then((response) => {
        if (response.data) {
          uni.setStorageSync('auth_token', response.data);
          this.getUserInfoByToken(response.data.login_type, response.data.token_key)
        }
      })
    },
    // 获取用户信息
    getUserInfoByToken(login_type, token_key) {
      uni.showLoading({ title: 'Loading' });
      getUserInfo({ custom: { auth: true, login_type: login_type , token_key: token_key}}).then((response) => {
        this.$store.commit('login', response);
        this.userInfo = response.data.user;
        uni.hideLoading()
      })
    },
    // 遗迹选择框确认按钮
    confirmSelected() {
      this.selectedListData = this.selectedListData.filter(item => item.is_checked)
      this.popupShow = false
    },
    // 已选择的遗迹的点击事件,
    selectAppDataClick(appDataItem) {
      appDataItem.is_checked = !appDataItem.is_checked
      appDataItem.is_selected = !appDataItem.is_selected
      this.$forceUpdate()
    },
    // 清空所有选中状态
    clearCheckSelected() {
      this.selectedListData.forEach((item, index) => {
        item.is_checked = false
        item.is_selected = false
      })
      this.selectCheckedIds = []
      this.$forceUpdate()
    },
    // 跳转到分享页面
    redirectToSharePage() {
      // 判断有没有选择了遗产数据, 如果没有则弹框提示
      if (!this.selectCheckedIds.length) {
        this.showToast('選択された遺産がありません')
        return
      }

      // 如果是在移动设备上, 那么就跳转到分享页面, 否则就生成海报
      if (this.deviceType === 'phone') {
        uni.$u.route({
          url: 'pages/index/share',
          params: {
            params: this.selectCheckedIds.length ? this.selectCheckedIds.join(',') : ' '
          }
        })
      } else {
        // 去请求数据
        this.shareInfoQuery.params = response.data.join(',')
        getCheckInInfo({ heritage_ids: this.selectCheckedIds} ).then((response) => {
          if (response.code === 1) {
            this.showToast(response.msg)
          }
          if (response.code === 0) {
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
              if (item.name_en === "Oceania") {
                this.OceaniaCount = item.count
              }
              if (item.name_en === "Central America") {
                this.CentralAmericaCount = item.count
              }
            })
            this.genStateBgImage(372, true)
            this.sharePageShow = true
          }
        }).catch((error) => {
          this.showToast('データの取得に失敗しました')
        })
      }
    },
    // 分享到社交平台
    shareToSNS() {
      this.sharePopupShow = true
    },
    // 弹出图片页面，保存到本地。
    showMapFlagImage() {
      this.genShareBgImage(342, true)
    },
    // 获取遗产列表
    requestListData() {
      uni.showLoading({
        title: 'Loading'
      });
      getListData({
        custom: { auth: false },
        params: this.listQuery
      })
          .then(response => {
            if (this.checkInListData.length) {
              this.checkInListData = this.checkInListData.concat(
                  response.data.countries
              );
            } else {
              this.checkInListData = response.data;
            }
            uni.hideLoading()
          })
          .catch(error => {
            uni.hideLoading()
          });
    },
    // 列表滚动触底事件
    scrolltolower() {
      // 当触底之后, 证明是第一次数据已经加载完毕，列表上显示的已经是0-20的数据，触底之后，就去加载21-40的数据，但是要记住，如果21-40的数据已经加载过了，就需要判断是否加载完毕，如果加载完毕了，就不再加载数据
      this.checkInListPage++
      // 计算当前页数的数据，offset = (page - 1) * limit
      let offset = (this.checkInListPage - 1) * this.checkInListLimit
      let limit = this.checkInListPage * this.checkInListLimit
      let checkInListData = this.checkInListAllData.slice(offset, limit)
      // 添加一个Loading
      uni.showLoading({
        title: 'Loading'
      })
      // 添加500毫秒延迟，模拟网络请求，然后隐藏Loading
      setTimeout(() => {
        if (checkInListData.length) {
          this.checkInListData = this.checkInListData.concat(checkInListData)
        }
        uni.hideLoading()
      }, 500)
      return;
    },
    // 生成大洲背景海报
    genStateBgImage(imageX) {
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
      ctx.drawImage('../../static/images/share_page_map_states_flag.png', SouthAmericaFlagX, 90, 26, 26);
      ctx.font = 'bold 13px Arial';
      let SouthAmericaCountX = 68;
      let SouthAndCentralAmericaCount = this.SouthAmericaCount + this.CentralAmericaCount
      if (SouthAndCentralAmericaCount < 10 && SouthAndCentralAmericaCount >= 0) {
        SouthAmericaCountX = 68;
      } else if (SouthAndCentralAmericaCount >= 10 && SouthAndCentralAmericaCount < 100) {
        SouthAmericaCountX = 64;
      } else if (SouthAndCentralAmericaCount >= 100 && SouthAndCentralAmericaCount < 1000) {
        SouthAmericaCountX = 61;
      }
      ctx.fillText(SouthAndCentralAmericaCount, SouthAmericaCountX, 108)
      // 南美洲
      let NorthAmericaFlagX = 107;

      ctx.drawImage('../../static/images/share_page_map_states_flag.png', NorthAmericaFlagX, 170, 26, 26);
      // 进行像素判断
      let CentralAmericaCountX = 116;
      if (this.NorthAmericaCount < 10 && this.NorthAmericaCount >= 0) {
        CentralAmericaCountX = 116;
      } else if (this.NorthAmericaCount >= 10 && this.NorthAmericaCount < 100) {
        CentralAmericaCountX = 113;
      } else if (this.NorthAmericaCount >= 100 && this.NorthAmericaCount < 1000) {
        CentralAmericaCountX = 109;
      }
      ctx.fillText(this.NorthAmericaCount, CentralAmericaCountX, 187)

      // 非洲
      let AfricaFlagX = 195;
      ctx.drawImage('../../static/images/share_page_map_states_flag.png', AfricaFlagX, 150, 26, 26);
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
      let AsiaCountX = 305;
      let AsiaFlagX = 295;
      ctx.drawImage('../../static/images/share_page_map_states_flag.png', AsiaFlagX, 99, 26, 26);
      if (this.AsiaCount < 10 && this.AsiaCount >= 0) {
        AsiaCountX = 305;
      } else if (this.AsiaCount >= 10 && this.AsiaCount < 100) {
        AsiaCountX = 302;
      } else if (this.AsiaCount >= 100 && this.AsiaCount < 1000) {
        AsiaCountX = 297;
      }
      ctx.fillText(this.AsiaCount, AsiaCountX, 117)


      // 欧洲
      let EuropeCountX = 204;
      let EuropeFlagX = 195;
      ctx.drawImage('../../static/images/share_page_map_states_flag.png', EuropeFlagX, 65, 26, 26);
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
      ctx.drawImage('../../static/images/share_page_map_states_flag.png', OceaniaFlagX, 193, 26, 26);
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
    genShareBgImage(imageX) {
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
      ctx.fillText(this.SouthAmericaCount + this.CentralAmericaCount, 340, 150); // 绘制文本

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
      let SouthAmericaFlagX = 50;
      ctx.drawImage('../../static/images/share_page_map_states_flag.png', SouthAmericaFlagX, 300, 24, 24);
      ctx.font = 'bold 13px Arial';
      let SouthAmericaCountX = 59;
      let SouthAndCentralAmericaCount = this.SouthAmericaCount + this.CentralAmericaCount
      if (SouthAndCentralAmericaCount < 10 && SouthAndCentralAmericaCount >= 0) {
        SouthAmericaCountX = 59;
      } else if (SouthAndCentralAmericaCount >= 10 && SouthAndCentralAmericaCount < 100) {
        SouthAmericaCountX = 55;
      } else if (SouthAndCentralAmericaCount >= 100 && SouthAndCentralAmericaCount < 1000) {
        SouthAmericaCountX = 51;
      }
      ctx.fillText(SouthAndCentralAmericaCount, SouthAmericaCountX, 316)


      // 南美洲
      let NorthAmericaFlagX = 98;
      ctx.drawImage('../../static/images/share_page_map_states_flag.png', NorthAmericaFlagX, 370, 24, 24);
      // 进行像素判断
      let CentralAmericaCountX = 107;
      if (this.NorthAmericaCount < 10 && this.NorthAmericaCount >= 0) {
        CentralAmericaCountX = 107;
      } else if (this.NorthAmericaCount >= 10 && this.NorthAmericaCount < 100) {
        CentralAmericaCountX = 103;
      } else if (this.NorthAmericaCount >= 100 && this.NorthAmericaCount < 1000) {
        CentralAmericaCountX = 99;
      }
      ctx.fillText(this.NorthAmericaCount, CentralAmericaCountX, 386)

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
                  quality: 0,
                  x: 0,
                  y: 0,
                  width: tree.boxWidth().value(),
                  height: tree.boxHeight().value(),
                  destWidth: 375,
                  destHeight: 600,
                  canvasId: "canvas-share",
                  success: (res) => {
                    this.saveImageUrl = res.tempFilePath;
                    // Base64格式的图片数据
                    const base64String = this.saveImageUrl;
                    const byteCharacters = atob(base64String.split(",")[1]);
                    const arrayBuffer = new ArrayBuffer(byteCharacters.length);
                    const bytes = new Uint8Array(arrayBuffer);

                    for (let i = 0; i < byteCharacters.length; i++) {
                      bytes[i] = byteCharacters.charCodeAt(i);
                    }
                    const blob = new Blob([arrayBuffer], { type: "image/png" });
                    const link = document.createElement("a");
                    link.href = URL.createObjectURL(blob);
                    let randomFileName = Math.random().toString(36).substr(2, 8);
                    link.download = "世界遺産の旅_" + randomFileName + '.png';
                    link.style.display = "none";
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    return false;
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
    // 通知
    showToast(message) {
      this.$refs.uToast.show({
        type: 'default',
        title: 'Success',
        message: message
      })
    },
    // 跳转到Google分享页面
    shareToGoogle() {
      window.location.href = 'https://plus.google.com/share?url=https://doyounknowtheway.jp'
    },
    // 跳转到FaceBook分享页面
    shareToFaceBook() {
      window.location.href = 'https://www.facebook.com/sharer/sharer.php?u=https://doyounknowtheway.jp'
    },
    // 跳转到Twitter分享页面
    shareToTwitter() {
      window.location.href = 'https://twitter.com/intent/tweet?text=https://doyounknowtheway.jp'
    },
  },
}
</script>

<style lang="scss" scoped>
.scroll-Y {
  height: 100%;
}
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
.heritage-list-svg{
  position: absolute;
  right: 14px;
  top: 13px
}
.heritage-list-svg-pc{
  position: absolute;
  right: 15rpx;
  top: 10rpx
}
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

.canvas-dom {
  position: fixed;
  top: 99999999999px;
}

/* 社交网络图标样式 */
.sns-login-style {
  height: 40px;
  width: 50%;
  flex-shrink: 0;
  border-radius: 7px;
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
  margin-top: 20px;
}

/* 弹窗样式 */
.pop-login-list {
  width: 100%;
  height: 200px;
}
</style>
