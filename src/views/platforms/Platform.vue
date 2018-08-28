<template>
  <div>
    <b-row>
      <b-col>
        <b-card>
          <template slot="header">
            <img
              :src="platform.icon"
              class="img-icon"
              />
            {{ platform.name }}
             has <b-badge variant="primary">{{platform.badge}}</b-badge> projects.
          </template>

          <b-list-group>

            <b-list-group-item>
              <div class="d-flex w-100 justify-content-between">
                <h2 class="mb-1">Projects</h2>
                <i class="fa fa-globe"></i>
              </div>
              <span v-for="project in projects" :key="project.slug">
                <figure-links :name="project.name" :link="project.slug" :icon="project.icon" :status="project.status"></figure-links>
              </span>
            </b-list-group-item>

          </b-list-group>
        </b-card>
      </b-col>
    </b-row>

    <b-row>
      <b-col>
        <b-card>
          <template slot="header">
            <img
              :src="platform.icon"
              class="img-icon"
              />
            {{ platform.name }}
          </template>
          <b-tabs v-model="tabIndex[0]">
            <b-tab active>
              <template slot="title">
                <i class="icon-speedometer"></i> {{tabs[0]}}
              </template>
              <b-card>
              <template slot="header">
                Speedtestio
                <div class="card-header-actions">

                </div>
              </template>

              </b-card>
            </b-tab>
            <b-tab>
              <template slot="title">
                <i class="fa fa-bookmark"></i> {{tabs[1]}}
              </template>
              <b-card>
              <template slot="header">
                Tool Bookmarks
              </template>
              <b-list-group v-for="bookmark in platform.bookmarks" :key="bookmark.uri">
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
import FigureLinks from '@/FigureLinks'
export default {
  name: 'Platform',
  components: {
    FigureLinks
  },
  props: {
    caption: {
      type: String,
      default: 'Platform'
    },
  },
  computed: {
    platform: function () {
      var needle = this.$route.params.slug; // what to look for
      // console.log(needle)
      var matched = {}
      for (let key in config.platforms) {
        if ( config.platforms[key].slug === needle) {
          matched = config.platforms[key]
        }
      }
      // console.log(matched)
      return matched
    },
    projects: function () {
      var matched = []
      for (let key in config.projects) {
        if ( this.platform.projects.includes(config.projects[key].slug)) {
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
        'Speedtestio',
        'Webdash',
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
  margin-right: 5%;
  width: 64px;
  height: 64px;
  border: 1px;
  cursor: pointer;
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
