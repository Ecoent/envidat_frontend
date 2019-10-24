/**
 * @summary story of ProjectCard for sandbox testing
 * @author Dominik Haas-Artho
 *
 * Created at     : 2019-10-23 16:34:51 
 * Last modified  : 2019-10-23 16:53:25
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */

/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from "@storybook/vue";
import { action } from "@storybook/addon-actions";
import './js/vuetify-components';

import ProjectCard from "@/components/Cards/ProjectCard.vue";

// get Project test data and enhance it
import projectJSON from "@/testdata/projects";
import projectDataFactory from "@/factories/projectsDataFactory";
const enhancedProjects = projectDataFactory.enhanceSubprojectsFromExtras(projectJSON.result);
const projectsCards = enhancedProjects;

import globalMethods from "@/factories/globalMethods";
const imgPaths = require.context( '../assets/cards/forest/', false, /\.jpg$/);
const imgName = 'c_b_forest_texture_bark2';
const images = globalMethods.methods.mixinMethods_importImages(imgPaths, imgName);
const defaultImg = images[`./${imgName}.jpg`];

export const methods = {
  onCardClick: action("clicked on card"),
  onTagClick: action("clicked on tag"),
  projectsCardsParents() {
    let noSubs = [];

    for (let i = 0; i < this.projectsCards.length; i++) {
      const p = this.projectsCards[i];
      if (!p.parent){
        noSubs.push(p);
      }
    }

    return noSubs;
  },
  projectsCardsChilds() {
    let noSubs = [];

    for (let i = 0; i < this.projectsCards.length; i++) {
      const p = this.projectsCards[i];
      if (p.parent){
        noSubs.push(p);
      }
    }

    return noSubs;
  }
};

storiesOf("3 Cards | Projects Cards", module)
  .add("collection of Parents", () => ({
    components: { ProjectCard },
    template: `
    <v-container grid-list-lg fluid pa-0>
    <v-layout row wrap>

      <v-flex xs3
        v-for="(project, index) in projectsCardsParents()"
        :key="index"
      >
        <project-card
          :id="project.id"
          :title="project.title"
          :img="project.image_url"
          :defaultImg="defaultImg"
          :description="project.description"
          :subProjects="project.subProjects"
          @cardClick="onCardClick"
        />
      </v-flex>

    </v-layout>
    </v-container>
    `,
    methods,
    data: () => ({
      projectsCards,
      defaultImg,
    })
  }))
  .add("collection of Children", () => ({
    components: { ProjectCard },
    template: `
    <v-container grid-list-lg fluid pa-0>
    <v-layout row wrap>

      <v-flex xs3
        v-for="(project, index) in projectsCardsChilds()"
        :key="index"
      >
        <project-card
          :id="project.id"
          :title="project.title"
          :img="project.image_url"
          :defaultImg="defaultImg"
          :description="project.description"
          :subProjects="project.subProjects"
          @cardClick="onCardClick"
        />
      </v-flex>

    </v-layout>
    </v-container>
    `,
    methods,
    data: () => ({
      projectsCards,
      defaultImg,
    })
  }));
