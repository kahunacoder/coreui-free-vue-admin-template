<template>
  <b-row>
    <b-col cols="12" xl="6">
      <transition name="slide">
      <b-card :header="caption">
        <b-table :hover="hover" :striped="striped" :bordered="bordered" :small="small" :fixed="fixed" responsive="sm" :items="items" :fields="fields" :current-page="currentPage" :per-page="perPage" @row-clicked="rowClicked">
          <template slot="id" slot-scope="data">
            <strong>{{data.item.slug}}</strong>
          </template>
          <template slot="name" slot-scope="data">
            <strong>{{data.item.name}}</strong>
          </template>
          <template slot="status" slot-scope="data">
            <b-badge :variant="getBadge(data.item.status)">{{data.item.status}}</b-badge>
          </template>
        </b-table>
        <nav>
          <b-pagination size="sm" :total-rows="getRowCount(items)" :per-page="perPage" v-model="currentPage" prev-text="Prev" next-text="Next" hide-goto-end-buttons/>
        </nav>
      </b-card>
      </transition>
    </b-col>
  </b-row>
</template>

<script>
import config from '@/_config'
export default {
  name: 'Platforms',
  props: {
    caption: {
      type: String,
      default: 'Tools'
    },
    hover: {
      type: Boolean,
      default: true
    },
    striped: {
      type: Boolean,
      default: true
    },
    bordered: {
      type: Boolean,
      default: false
    },
    small: {
      type: Boolean,
      default: false
    },
    fixed: {
      type: Boolean,
      default: false
    }
  },
  data: () => {
    return {
      //       "slug": "wikikaukau",
      // "docroot": "web",
      // "icon": "assets/images/favicon.ico",
      // "adminurl": "http://wikikaukau.gts/admin",
      // "editor": "vscode://file/Users/gts/Documents/Projects/Server/wikikaukau/wikikaukau.code-workspace",
      // "log": "vscode://file/Users/gts/Documents/Projects/Server/wikikaukau/logs/wikikaukau_error.log"

      // items: config.projects.filter((user) => user.id < 42),
      items: config.platforms,
      fields: [
        {key: 'name'},
        {key: 'slug'}// ,
        // {key: 'type'},
        // {key: 'editor'},
        // {key: 'log'}
      ],
      currentPage: 1,
      perPage: 5,
      totalRows: 0
    }
  },
  computed: {
  },
  methods: {
    getBadge (status) {
      return status === 'live' ? 'success'
        : status === 'staging' ? 'secondary'
          : status === 'dev' ? 'warning'
            : status === 'Banned' ? 'danger' : 'primary'
    },
    getRowCount (items) {
      return items.length
    },
    projectLink (slug) {
      return `platforms/${slug}`
    },
    rowClicked (item) {
      const projectLink = this.projectLink(item.slug)
      this.$router.push({path: projectLink})
    }

  }
}
</script>

<style scoped>
.card-body >>> table > tbody > tr > td {
  cursor: pointer;
}
</style>
