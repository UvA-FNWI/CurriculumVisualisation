<template>
  <div class="home" v-if="curriculum">
    <h1>{{ curriculum.Name }}</h1>
      <div class="year" v-for="year in curriculum.Years" :key="year.Year">
        <h2>Jaar {{ year.Year }}</h2>
        <div class="courseContainer" v-bind:style="{ height: year.Height }">
          <div class="cb" v-for="course in year.Courses" :key="course.CatalogNumber" v-bind:style="course.Style">
            <div> {{ course.Name }} </div>
            <ul>
              <li class='obj-list' v-for="(traj,index) in course.Trajectories" :key="index" :style="traj.Style">
                <PopoverLink>
                  <span>{{ traj.Code }}</span>
                  <template slot='popover'>
                    <div style='font-weight: bold; white-space: nowrap; min-width: 400px'>{{ traj.Name }}</div>
                    <div style='font-size: smaller'>Niveau: <template v-for="(dom, index) in traj.Domains"><template v-if="index > 0">, </template>{{ dom.MaxLevel.LevelName.toLowerCase() }} ({{ dom.DomainName.toLowerCase() }})</template></div>

                    <div style='margin-top: 10px; margin-bottom: 5px;'>Leerdoelen:</div>
                    <ol>
                      <li v-for="obj in traj.Objectives" :key="obj.Index" :value="obj.Index">
                        {{ obj.Description }}
                      </li>
                    </ol>
                  </template>
                </PopoverLink>
                <div v-for="dom in traj.Domains" :key="dom.Domain" class="domain-block" :style="{ left: dom.Domain * 14 + 'px' }"></div>
              </li>
            </ul>
          </div>
        </div>
      </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Curriculum } from '@/models/Curriculum';
import PopoverLink from '@/components/PopoverLink.vue';

export default Vue.extend({
  name: 'home',
  components: {
    PopoverLink,
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
    //overflow: hidden;
    position: absolute;

    > div:first-child {
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
        margin-top: 8px;
    }

    li.obj-list {
        list-style: none;
        position: relative;
        min-width: 35px;
        text-align: center;

        span:not(:first-child) {
            display: none;
        }

        span {
          color: white;
        }
        padding: 2px 4px;
        display: inline-block;
        margin-right: 3px;
    }
}

ol {
  padding-left: 30px;
  li {
    margin-bottom: 4px;
  }
}

div.courseContainer 
{
    position: relative;
}

.domain-block
{
  display: inline-block;
  width: 14px;
  height: 8px;
  background-color: inherit;
  position: absolute;
  bottom: -3px;
}
</style>
