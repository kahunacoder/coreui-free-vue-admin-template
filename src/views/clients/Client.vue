<template>
  <div>
    <b-row>
      <b-col>
        <b-card>
          <template slot="header">
            <img
              :src="client.icon"
              class="img-icon"
              @error="imageLoadError"
              />
            {{ client.name }}
            has <b-badge variant="primary">{{client.badge}}</b-badge> projects.
          </template>

          <b-list-group>

            <b-list-group-item>
              <div class="d-flex w-100 justify-content-between">
                <h2 class="mb-1">Projects</h2>
                <i class="fa fa-server"></i>
              </div>
                <figure v-for="project in projects" :key="project.slug" class="figure d-inline-block">
                  <router-link :to="'/projects/' + project.slug" class="mx-auto">
                    <img
                      :src="project.icon"
                      class="figure-img img-fluid rounded" />
                    <figcaption class="figure-caption text-center">{{ project.name }}</figcaption>
                  </router-link>
                </figure>
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
                Client Bookmarks
              </template>
              <b-list-group v-for="bookmark in client.bookmarks" :key="bookmark.url">
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
  name: 'Client',
  props: {
    caption: {
      type: String,
      default: 'Client slug'
    },
  },
  computed: {
    client: function () {
      var needle = this.$route.params.slug; // what to look for
      var matched = {}
      for (let key in config.clients) {
        if ( config.clients[key].slug === needle) {
          matched = config.clients[key]
        }
      }
      return matched
    },
    projects: function () {
      var matched = []
      for (let key in config.projects) {
        if ( this.client.projects.includes(config.projects[key].slug)) {
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
        'Client Bookmarks',
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
  border: 1px;
  cursor: pointer;
  overflow: visible;
}
.figure a {
  display: block;
  width: 80%;
  height: 100%;
}
.img-icon {
  width: 24px;
}
.figure-img {
  width: 100%;
  margin-bottom: 0;
}
.figure-caption {
  font-size: 75%;
  color: #262626;
}
</style>
