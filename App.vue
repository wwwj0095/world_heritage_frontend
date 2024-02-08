<script>
	export default {
		onLaunch: function() {
      // 读取全局变量
      const isLogin = uni.getStorageSync('is_login');
      if (isLogin) {
        this.$store.commit('login');
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

</style>
