import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state:{
        isLogin: false,
        currentLanguage: uni.getStorageSync('local_lang') || 'en',
        setMapViewType: uni.getStorageSync('map_view_type') || 'ADMINISTRATIVE_AREA_LEVEL_1',
    },
    mutations: {
        login(state, response) {
            if (response) {
                uni.setStorageSync('auth_token', response.data.auth_token);
                uni.setStorageSync('cur_user', response.data.user);
                uni.setStorageSync('is_login', true);
            }
            state.isLogin = true;
        },
        logout(state) {
            state.isLogin = false;
            uni.removeStorageSync('auth_token');
            uni.removeStorageSync('cur_user');
            uni.removeStorageSync('is_login');
        },
        refreshToken(state, token) {
            uni.setStorageSync('auth_token', token);
        },
        setLocalLanguage(state, lang) {
            uni.setStorageSync('local_lang', lang);
        },
        setMapViewType(state, type) {
            uni.setStorageSync('map_view_type', type);
        }
    },
    actions: {
        notLogin({commit}) {
            commit('logout');
        },
        refreshToken({ commit }, token) {
            commit('refreshToken', token);
        }
    }
})

export default store;
