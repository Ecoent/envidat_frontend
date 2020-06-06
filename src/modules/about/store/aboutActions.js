/**
 * guidelines store actions
 *
 * @summary guidelines store actions
 * @author Dominik Haas-Artho
 *
 * Created at     : 2019-10-23 16:34:51
 * Last modified  : 2019-10-23 16:34:51
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */

import axios from 'axios';

import {
  GET_GUIDELINES,
  GET_GUIDELINES_SUCCESS,
  GET_GUIDELINES_ERROR,
} from '@/modules/about/store/guidelinesMutationsConsts';

import {
  GET_POLICIES,
  GET_POLICIES_SUCCESS,
  GET_POLICIES_ERROR,
} from '@/modules/about/store/policiesMutationsConsts';

export default {
  [GET_GUIDELINES]({ commit }) {
    commit(GET_GUIDELINES);

    let url = `./guidelines/guidelines.md?nocache=${new Date().getTime()}`;
    if (process.env.NODE_ENV === 'development') {
      url = './testdata/guidelines.md';
    }
    
    axios.get(url)
      .then((response) => {
        commit(GET_GUIDELINES_SUCCESS, response.data);
      })
      .catch((reason) => {
        commit(GET_GUIDELINES_ERROR, reason);
      });
  },
  [GET_POLICIES]({ commit }) {
    commit(GET_POLICIES);

    const url = `./policies/policies.md?nocache=${new Date().getTime()}`;

    axios.get(url)
      .then((response) => {
        commit(GET_POLICIES_SUCCESS, response.data);
      })
      .catch((reason) => {
        commit(GET_POLICIES_ERROR, reason);
      });
  },
};
