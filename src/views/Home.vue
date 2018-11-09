<template>
  <div class="home" v-if="curriculum">
    <h1>{{ curriculum.Name }}</h1>
      <div class="year" v-for="year in curriculum.Years" :key="year.Year">
        <h2>Jaar {{ year.Year }}</h2>
        <div class="courseContainer" v-bind:style="{ height: year.Height }">
          <div class="cb" v-for="course in year.Courses" :key="course.CatalogNumber" v-bind:style="course.Style">
            <div> {{ course.Name }} </div>
            <ul>
              <li v-for="(traj,index) in course.Trajectories" :key="index" :style="{ backgroundColor: traj.Color }">
                <span>{{ traj.Code }}</span>
                <span v-for="(level,index) in traj.Levels" :key="index">
                  {{ level }}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import { Curriculum } from '@/models/Curriculum';

export default Vue.extend({
  name: 'home',
  components: {
    HelloWorld,
  },
  created() {
    this.$store.dispatch('retrieveCurriculum');
  },
  computed: {
    curriculum(): Curriculum {
      return this.$store.state.Curriculum;
    },
  },
});
</script>

<style lang="scss" scoped>
div.cb {
    background-color: #f2f2f2;
    display: inline-block;
    height: 100px;
    border-right: 2px solid white;
    border-left: 2px solid white;
    overflow: hidden;
    position: absolute;

    div:first-child {
        padding: 3px;
        padding-left: 5px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        background-color: #777;
        color: white;
        font-size: 14px;
        z-index: 2;
    }

    ul {
        padding-left: 10px;
        font-size: 12px;
    }

    li {
        list-style: none;

        span:not(:first-child) {
            display: none;
        }

        color: white;
        padding: 2px 4px;
        display: inline-block;
        margin-right: 3px;
    }
}

div.courseContainer 
{
    position: relative;
}
</style>
