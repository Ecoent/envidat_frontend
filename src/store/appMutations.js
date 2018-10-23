import {
  SET_APP_BACKGROUND,
  ADD_CARD_IMAGES,
  ADD_ICON_IMAGE,
} from './mutationsConsts';

export default {
  [SET_APP_BACKGROUND](state, bgImg) {
    state.appBGImage = bgImg;
  },
  [ADD_CARD_IMAGES](state, payload) {
    /* eslint-disable no-underscore-dangle */
    // state.cardBGImages[payload.key] = payload.value;
    this._vm.$set(state.cardBGImages, payload.key, payload.value);
  },
  [ADD_ICON_IMAGE](state, payload) {
    /* eslint-disable no-underscore-dangle */
    // state.cardBGImages[payload.key] = payload.value;
    this._vm.$set(state.iconImages, payload.key, payload.value);
  },
};
