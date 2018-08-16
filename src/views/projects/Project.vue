<template>
<div>
  <div>

      <b-col xs="12" lg="6">
        <b-card>
          <div slot="header">
            Tabs with icons
          </div>
          <b-tabs v-model="tabIndex[0]">
            <b-tab active>
              <template slot="title">
                <i class="icon-calculator"></i> {{tabs[0]}}
              </template>
              <br> 1. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore
              et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
              aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
              dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
              officia deserunt mollit anim id est laborum.
            </b-tab>
            <b-tab>
              <template slot="title">
                <i class="icon-basket-loaded"></i> {{tabs[1]}}
              </template>
              <br>2. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore
              et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
              aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
              dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
              officia deserunt mollit anim id est laborum.
            </b-tab>
            <b-tab>
              <template slot="title">
                <i class="icon-pie-chart"></i> {{tabs[2]}}
              </template>
              <br>3. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore
              et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
              aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
              dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
              officia deserunt mollit anim id est laborum.
            </b-tab>
          </b-tabs>
        </b-card>
      </b-col>

  <b-row>
    <b-col cols="12" lg="6">
      <b-card no-header>
        <template slot="header">
          Project slug:  {{ $route.params.slug }}
        </template>
        <b-table striped small fixed responsive="sm" :items="items($route.params.slug)" :fields="fields">
          <template slot="value" slot-scope="data">
            <strong>{{data.item.value}}</strong>
          </template>
        </b-table>
        <template slot="footer">
          <b-button @click="goBack">Back</b-button>
        </template>
      </b-card>
    </b-col>
  </b-row>
  </div>
  <div class="card">
    <div class="card-header">
      Headings {{ project.name }}
    </div>
    <div class="card-body">
      <p>Documentation and examples for Bootstrap typography, including global settings, headings, body text, lists, and more.</p>
    </div>
  </div>
</div>
</template>

<script>
import config from '@/_config'
export default {
  name: 'Project',
  props: {
    caption: {
      type: String,
      default: 'Project slug'
    },
  },
  data: () => {
    return {
      tabIndex: [0, 0],
      tabs: [
        'Calculator',
        'Shopping cart',
        'Charts'
      ],
      items: function (slug) {
        const project = config.projects.find( project => project.slug === slug)
        this.project = project
        const projectDetails = project ? Object.entries(project) : [['slug', 'Not found']]
        return projectDetails.map(([key, value]) => {return {key: key, value: value}})
      },
      project: '',
      fields: [
        {key: 'key'},
        {key: 'value'},
      ],
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
      // this.$router.replace({path: '/users'})
    }
  }
}
</script>
