import axios from 'axios';

import {
  LOAD_METADATA_CONTENT_BY_ID,
  LOAD_METADATA_CONTENT_BY_ID_SUCCESS,
  LOAD_METADATA_CONTENT_BY_ID_ERROR,
  SEARCH_METADATA,
  SEARCH_METADATA_SUCCESS,
  SEARCH_METADATA_ERROR,
  BULK_LOAD_METADATAS_CONTENT,
  BULK_LOAD_METADATAS_CONTENT_SUCCESS,
  BULK_LOAD_METADATAS_CONTENT_ERROR,
  UPDATE_TAGS,
  UPDATE_TAGS_ERROR,
  UPDATE_TAGS_SUCCESS,
} from '../metadataMutationsConsts';

/* eslint-disable no-unused-vars  */

const ENVIDAT_PROXY = process.env.ENVIDAT_PROXY;
const SOLR_PROXY = process.env.SOLR_PROXY;
const API_BASE = '/api/3/action/';
const SOLR_API_BASE = '/solr/ckan_default/';

function urlRewrite(url, baseUrl, proxyUrl) {
  // const from = url;
  // url = url.replace(/&/g, '%26');
  url = url.replace('?', '&');
  url = url.replace("'", '%22');

  url = `${proxyUrl}${baseUrl}${url}`;

  // console.log("from " + from + " to " + url);
  return url;
}


export default {
  async [SEARCH_METADATA]({ commit }, searchTerm) {
    commit(SEARCH_METADATA);

    // tags:SNOW%20AND%20notes:snow
    // maybe use notes:"snow avalanche"
    // select?indent=on&q=tags:${searchTerm}%20AND%20notes:${searchTerm}&wt=json

    const splitSpaces = searchTerm.split(' ');
    if (splitSpaces.length > 1) {
      searchTerm = splitSpaces[0];
      for (let i = 1; i < splitSpaces.length; i++) {
        const el = splitSpaces[i];
        searchTerm += ` OR ${el}`;
      }
    }

    const url = urlRewrite(`select?indent=on&q=notes:${searchTerm} OR title:${searchTerm}&wt=json&rows=1000`, SOLR_API_BASE, SOLR_PROXY);

    axios.get(url)
      .then((response) => {
        commit(SEARCH_METADATA_SUCCESS, response.data.response.docs);
      })
      .catch((reason) => {
        commit(SEARCH_METADATA_ERROR, reason);
      });
  },
  async [LOAD_METADATA_CONTENT_BY_ID]({ commit }, metadataId) {
    commit(LOAD_METADATA_CONTENT_BY_ID);

    const url = urlRewrite(`package_show?id=${metadataId}`, API_BASE, ENVIDAT_PROXY);

    axios.get(url).then((response) => {
      commit(LOAD_METADATA_CONTENT_BY_ID_SUCCESS, response.data.result);
    }).catch((reason) => {
      commit(LOAD_METADATA_CONTENT_BY_ID_ERROR, reason);
    });
  },
  async [BULK_LOAD_METADATAS_CONTENT]({ commit, showRestrictedContent = false }) {
    commit(BULK_LOAD_METADATAS_CONTENT);

    // const url = urlRewrite('package_search', API_BASE, ENVIDAT_PROXY);
    // const url = urlRewrite('select?q=title:*&wt=json&rows=1000', SOLR_API_BASE, SOLR_PROXY);
    const url = `${SOLR_PROXY}${SOLR_API_BASE}select&q=title:*&wt=json&rows=1000`;

    axios.get(url)
      .then((response) => {
        commit(BULK_LOAD_METADATAS_CONTENT_SUCCESS, response.data.response.docs, showRestrictedContent);
      })
      .catch((reason) => {
        commit(BULK_LOAD_METADATAS_CONTENT_ERROR, reason);
      });
  },
  [UPDATE_TAGS]({ commit }) {
    if (this.getters['metadata/updatingTags']) {
      return;
    }

    const filteredContent = this.getters['metadata/filteredContent'];
    const allTags = this.getters['metadata/allTags'];

    if (!filteredContent || !allTags) {
      return;
    }

    commit(UPDATE_TAGS);

    try {
      const updatedTags = [];

      for (let i = 0; i < allTags.length; i++) {
        const tag = allTags[i];
        let found = false;

        for (let j = 0; j < filteredContent.length; j++) {
          const el = filteredContent[j];

          if (el.tags && el.tags.length > 0) {
            const index = el.tags.findIndex(obj => obj.name.includes(tag.name));

            if (index >= 0) {
              found = true;
              break;
            }
          }
        }

        updatedTags.push({ name: tag.name, enabled: found });
      }

      commit(UPDATE_TAGS_SUCCESS, updatedTags);
    } catch (error) {
      commit(UPDATE_TAGS_ERROR, error);
    }
  },

};

