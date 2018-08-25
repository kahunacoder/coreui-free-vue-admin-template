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
                <h2 class="mb-1">clients</h2>
                <i class="fa fa-server"></i>
              </div>
                <figure title="Open Cloud at Cost" class="figure d-inline-block">
                  <a href="https://panel.cloudatcost.com/index.php" target="cloudatcost">
                    <img
                      src="img/tech-icons/cloudatcost.png"
                      class="figure-img img-fluid rounded" />
                    <figcaption class="figure-caption text-center">Cloud at Cost</figcaption>
                  </a>
                </figure>
                <figure title="Open Docker" class="figure d-inline-block">
                  <a :href="'http://localhost:9000/#/dashboard'" target="docker">
                    <img
                      src="img/tech-icons/docker.png"
                      class="figure-img img-fluid rounded" />
                    <figcaption class="figure-caption text-center">Docker</figcaption>
                  </a>
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
                Server Bookmarks
              </template>
              <b-list-group v-for="bookmark in client.bookmarks" :key="bookmark.url">
                <b-list-group-item>
                  Title: {{bookmark.title}} URL: {{bookmark.url}}
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
        console.log(needle)
        if ( config.clients[key].slug === needle) {
          matched = config.clients[key]
        }
      }
      console.log(matched)
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
