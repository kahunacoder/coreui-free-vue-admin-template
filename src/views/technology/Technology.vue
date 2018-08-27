<template>
  <div>

    <b-row>
      <b-col>
        <b-card>
          <template slot="header">
            <img
              :src="tech.icon"
              class="img-icon"
              />
            {{ tech.name }}
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
                Technology Bookmarks
              </template>
              <b-list-group v-for="bookmark in tech.bookmarks" :key="bookmark.uri">
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
export default {
  name: 'Technology',
  props: {
    caption: {
      type: String,
      default: 'Project Technology'
    },
  },
  computed: {
    tech: function () {
      var needle = this.$route.params.tech; // what to look for
      // console.log(needle)
      var matched = {}
      for (let key in config.technologies) {
        if ( config.technologies[key].slug === needle) {
          matched = config.technologies[key]
        }
      }
      // console.log(matched)
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
    // imageLoadError(event) {
    //   event.target.src = 'img/tech-icons/cloudatcost.png'
    //   // this.$router.replace({path: '/users'})
    // },
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
