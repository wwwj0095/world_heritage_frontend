import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state:{
        isLogin: false,
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
