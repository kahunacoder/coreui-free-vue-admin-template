<template>
  <div>
    <b-row>
      <b-col>
        <b-card>
          <template slot="header">
            <img
              :src="server.icon"
              class="img-icon"
              @error="imageLoadError"
              />
            {{ server.name }}
            is a {{ server.type }} server that has <b-badge variant="primary">{{server.badge}}</b-badge> projects running on it.
          </template>

          <b-list-group>

            <b-list-group-item>
              <div class="d-flex w-100 justify-content-between">
                <h2 class="mb-1">Projects</h2>
                <i class="fa fa-globe"></i>
              </div>
              <span v-for="project in projects" :key="project.slug">
                <figure class="figure d-inline-block">
                  <router-link :to="'/projects/' + project.slug" class="mx-auto">
                    <img
                      :src="project.icon"
                      class="figure-img img-fluid rounded" />
                    <figcaption :class="'figure-caption text-center bg-' + getBadge(project.status)">{{ project.name }}</figcaption>
                  </router-link>
                </figure>
                </span>
            </b-list-group-item>

          </b-list-group>
        </b-card>
      </b-col>
    </b-row>

    <b-row>
      <b-col>
        <b-card>
          <b-tabs v-model="tabIndex[0]">
            <b-tab active>
              <template slot="title">
                <i class="fa fa-road"></i> {{tabs[0]}}
              </template>
              <b-card>
              <template slot="header">
                README.md
              </template>
              </b-card>
            </b-tab>
            <b-tab>
              <template slot="title">
                <i class="fa fa-bookmark"></i> {{tabs[1]}}
              </template>
              <b-card>
              <template slot="header">
                Server Bookmarks
              </template>
              <b-list-group v-for="bookmark in server.bookmarks" :key="bookmark.guid">
                <b-list-group-item>
                  <img
                    :src="bookmark.iconuri"
                    class="img-icon" />
                  <a :href="bookmark.uri">
                    {{bookmark.title}}
                  </a>
                  <p>{{bookmark.description}}</p>
                </b-list-group-item>
              </b-list-group>
              </b-card>
            </b-tab>
            <b-tab>
              <template slot="title">
                <i class="fa fa-terminal"></i> {{tabs[2]}}
              </template>
              <b-card>
              <template slot="header">
                Terminal
              </template>

              </b-card>
            </b-tab>
          </b-tabs>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import config from '@/_config'
// import func from './vue-temp/vue-editor-bridge';

export default {
  name: 'Server',
  props: {
    caption: {
      type: String,
      default: 'Server slug'
    },
  },
  computed: {
    server: function () {
      var needle = this.$route.params.slug; // what to look for
      var matched = {}
      for (let key in config.servers) {
        if ( config.servers[key].slug === needle) {
          matched = config.servers[key]
        }
      }
      // console.log(matched)
      return matched
    },
    projects: function () {
      var matched = []
      for (let key in config.projects) {
        if ( this.server.projects.includes(config.projects[key].slug)) {
          matched.push(config.projects[key])
        }
      }
      return matched
    }
  },
  data () {
    return {
      tabIndex: [0, 0],
      tabs: [
        'README.md',
        'Server Bookmarks',
        'Terminal'
      ],
      config: config
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
      // this.$router.replace({path: '/users'})
    },
    imageLoadError(event) {
      event.target.src = 'img/tech-icons/cloudatcost.png'
      // this.$router.replace({path: '/users'})
    },
    getBadge (status) {
      return status === 'live' ? 'success'
        : status === 'staging' ? 'secondary'
          : status === 'dev' ? 'warning'
            : status === 'Banned' ? 'danger' : 'primary'
    },
  }
}
</script>
<style scoped lang="css">
.figure {
  margin-bottom: 4px;
  margin-right: 1%;
  width: 96px;
  height: 96px;
  cursor: pointer;
  overflow: visible;
}
.figure a {
  display: block;
  width: 80%;
  height: 80%;
}
.img-icon {
  width: 24px;
}
.figure-img {
  width: 100%;
  height: 100%;
}
.figure-caption {
  font-size: 75%;
  color: #262626;
}
</style>
