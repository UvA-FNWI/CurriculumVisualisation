import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import RootState from '@/models/RootState';
import { Curriculum, Course } from '@/models/Curriculum';
import _ from 'lodash';

Vue.use(Vuex);

const blockWidth = 200;
const blockHeight = 100;
const colors = ['darkgreen', 'darkblue', 'darkred', 'darkorange', 'darkviolet'];

export default new Vuex.Store<RootState>({
  state: {
    Curriculum: null,
  },
  mutations: {
    setCurriculum: (state, data) => state.Curriculum = data,
  },
  actions: {
    retrieveCurriculum({ commit }) {
      axios.get('https://api.datanose.nl/Curriculum/BSc_PB').then((d) => {
      const curr: Curriculum = d.data;

      const colorMapping = new Map<string, string>();
      let cIndex = 0;

      for (const year of curr.Years) {
        const maxHeight = [-1, 0, 0, 0, 0, 0, 0];
        year.Courses = _.filter(year.Courses, (c) => c.IsMandatory);
        for (const course of _.sortBy(year.Courses, [(o: Course) => _.min(o.Periods), (o: Course) => -(_.max(o.Periods) || 0)])) {
          const minPeriod = _.min(course.Periods) || 0;
          const maxPeriod = _.max(course.Periods) || 0;

          course.Width = maxPeriod - minPeriod + 1;
          course.Position = _.max(_.slice(maxHeight, minPeriod, maxPeriod + 1)) || 0;
          for (let i = minPeriod; i <= maxPeriod; i++) {
            maxHeight[i] = course.Position + 1;
          }

          course.Style = {
            width: course.Width * blockWidth + 'px',
            bottom: course.Position * blockHeight + 'px',
            left: (minPeriod - 1) * blockWidth + 'px',
          };

          for (const traj of course.Trajectories) {
            if (!colorMapping.has(traj.Code)) {
              colorMapping.set(traj.Code, colors[cIndex++]);
            }
            traj.MaxLevel = _.orderBy(traj.Levels, (l) => l.Level, 'desc')[0];
            traj.Style = {
              backgroundColor: colorMapping.get(traj.Code),
              height: traj.MaxLevel.Level * 10 + 'px',
            };
          }
        }

        year.Height = (_.max(maxHeight) || 0) * blockHeight + 'px';
      }

      commit('setCurriculum', curr);
    });
  },
},
});
