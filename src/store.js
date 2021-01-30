import { createStore } from "vuex";

export const store = createStore({
  state () {
    return {
      viewedPackageName: "",
      viewedPackageStringified: {},
      modalVisible: false
    };
  },
  getters: {
        isModalVisible: state => state.modalVisible,
        packageName: state => state.viewedPackageName,
        viewedPackage: state => JSON.parse(state.viewedPackageStringified)
  },
  mutations: {
      setViewedPackageName: function(state, name) {
          state.viewedPackageName = name;
      },
      setModalVisible: function(state, bool) {
          state.modalVisible = bool;
      },
      setViewedPackageStringified: function(state, str) {
          state.viewedPackageStringified = str;
      }
  }
});