// import createPersist from 'vuex-localstorage';

import mutations from './mutations';
import actions from './actions';
import categorycards from './categorycards';
import tags from './tags';

const initialState = {
  loadingMetadataIds: false,
  metadataIdsOK: false,
  metadataIds: [],
  loadingMetadatasContent: false,
  metadatasContentOK: false,
  metadatasContent: {},
  loadingCurrentMetadataContent: false,
  currentMetadataContent: {},
  searchedMetadatasContent: {},
  searchingMetadatasContent: false,
  searchingMetadatasContentOK: false,
  filteredMetadataIds: [],
  allTags: tags,
  loadingAllTags: false,
  popularTags: [],
  loadingPopularTags: false,
  error: Object,
  categorycards,
};

export const metadata = {
  namespaced: true,
  state: initialState,
  getters: {
    loadingMetadataIds: state => state.loadingMetadataIds,
    loadingMetadatasContent: state => state.loadingMetadatasContent,
    metadataIds: state => state.metadataIds,
    metadatasContent: state => state.metadatasContent,
    searchedMetadatasContent: state => state.searchedMetadatasContent,
    searchingMetadatasContent: state => state.searchingMetadatasContent,
    searchingMetadatasContentOK: state => state.searchingMetadatasContentOK,
    loadingCurrentMetadataContent: state => state.loadingCurrentMetadataContent,
    currentMetadataContent: state => state.currentMetadataContent,
    allTags: state => state.allTags,
    loadingAllTags: state => state.loadingAllTags,
    popularTags: state => state.popularTags,
    loadingPopularTags: state => state.loadingPopularTags,
    categorycards: state => state.categorycards,
  },
  mutations,
  actions,
};

