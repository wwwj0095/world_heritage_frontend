<script>
  export default {
		onLaunch: function() {
      // 读取全局变量
      const isLogin = uni.getStorageSync('is_login');
      let languageData =  uni.getStorageSync('local_lang');
      let mapViewType = uni.getStorageSync('map_view_type');
      if (mapViewType) {
        this.$store.commit('setMapViewType', mapViewType);
      } else {
        this.$store.commit('setMapViewType', 'ADMINISTRATIVE_AREA_LEVEL_1');
      }
      if (isLogin) {
        this.$store.commit('login');
      }

      if (languageData) {
        this.$store.commit('setLocalLanguage', languageData);
      } else {
        this.$store.commit('setLocalLanguage', 'jp');
      }

		},
		onShow: function() {

		},
		onHide: function() {

		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import "@/uni_modules/uview-ui/index.scss";
	@import "common/demo.scss";
  @import "common/emoji.css";

</style>
