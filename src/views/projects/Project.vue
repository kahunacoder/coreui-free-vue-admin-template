<template>
<div>
  <div>
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
      Headings
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
      items: (slug) => {
        const project = config.projects.find( project => project.slug === slug)
        const projectDetails = project ? Object.entries(project) : [['slug', 'Not found']]
        return projectDetails.map(([key, value]) => {return {key: key, value: value}})
      },
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
