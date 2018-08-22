<template>
  <div>
    <b-row>
      <b-col>
        <b-card>
          <template slot="header">
            {{ project.name }}
            <b-badge :variant="getBadge(project.status)">{{project.status}}</b-badge>

            <div class="card-header-actions">

              <b-link :title="project.language" :href="'#/technologies/' + project.language" class="card-header-action btn-close">
                <img
                  :src="'img/tech-icons/' + project.language + '.png'"
                  class="img-icon" />
              </b-link>
              <span v-for="(library, index) in project.libraries" :key="`library-${index}`">
                <b-link :title="library" :href="'#/technologies/' + library" class="card-header-action btn-close">
                  <img
                    :src="'img/tech-icons/' + library + '.png'"
                    class="img-icon" />
                </b-link>
              </span>
           </div>
          </template>
          <b-list-group>
            <b-list-group-item>
              <div class="d-flex w-100 justify-content-between">
                <h2 class="mb-1">Web Sites</h2>
                <i class="fa fa-sitemap"></i>
              </div>
                <figure v-if="project.url !== ''"  title="Live Site" class="figure d-inline-block">
                  <a :href="project.url" :target="$route.params.slug">
                    <img
                    :src="project.url + '/favicon.ico'"
                    class="figure-img img-fluid rounded" />
                    <figcaption class="figure-caption text-center">Live</figcaption>
                  </a>
                </figure>
                <figure v-if="project.stagingUrl !== ''"  title="Staging Site" class="figure d-inline-block">
                  <a :href="project.stagingUrl" :target="$route.params.slug">
                    <img
                      :src="project.stagingUrl + '/' + project.icon"
                      class="figure-img img-fluid rounded" />
                    <figcaption class="figure-caption text-center">Staging</figcaption>
                  </a>
                </figure>
                <figure title="Dev Site" class="figure d-inline-block">
                  <a :href="'http://' + $route.params.slug + '.' + project.tld" :target="$route.params.slug">
                    <img
                      :src="'http://' + $route.params.slug + '.' + project.tld + '/' + project.icon"
                      class="figure-img img-fluid rounded" />
                    <figcaption class="figure-caption text-center">Dev</figcaption>
                  </a>
                </figure>
            </b-list-group-item>

            <b-list-group-item>
              <div class="d-flex w-100 justify-content-between">
                <h2 class="mb-1">Editors</h2>
                <i class="fa fa-code" style="font-weight:bold;"></i>
              </div>
              <p>
                <span v-for="(editor, index) in project.editors" :key="`editor-${index}`">
                  <figure title="Edit projects code with Visual Studio Code" v-if="editor === 'code'" class="figure d-inline-block">
                    <a :href="'telnet:///usr/local/bin/' + editor + ' ' + project.root">
                      <img
                        src="img/tech-icons/vscode.png"
                        class="figure-img img-fluid rounded" />
                      <figcaption class="figure-caption text-center">VS Code</figcaption>
                    </a>
                  </figure>
                  <figure title="Edit projects code with Sublime Text" v-if="editor === 'subl'" class="figure d-inline-block">
                    <a :href="'telnet:///usr/local/bin/' + editor + ' ' + project.root">
                      <img
                        src="img/tech-icons/sublime-text.png"
                        class="figure-img img-fluid rounded" />
                      <figcaption class="figure-caption text-center">Sublime</figcaption>
                    </a>
                  </figure>
                </span>
              </p>
            </b-list-group-item>

            <b-list-group-item>
              <div class="d-flex w-100 justify-content-between">
                <h2 class="mb-1">Data</h2>
                <i class="fa fa-database"></i>
              </div>
              <p>
                <figure title="Open Sequel Pro"  class="figure d-inline-block">
                  <a :href="'telnet:///usr/bin/open ' + project.root + 'docker.spf'">
                    <img
                      src="img/tech-icons/sequel-pro.png"
                      class="figure-img img-fluid rounded" />
                    <figcaption class="figure-caption text-center">MySql</figcaption>
                  </a>
                </figure>
                <figure title="Edit Json Data for Project"  class="figure d-inline-block">
                  <a :href="project.log">
                    <img
                      src="img/tech-icons/json.png"
                      class="figure-img img-fluid rounded" />
                    <figcaption class="figure-caption text-center">Json</figcaption>
                  </a>
                </figure>
            </b-list-group-item>

            <b-list-group-item>
              <div class="d-flex w-100 justify-content-between">
                <h2 class="mb-1">Logs</h2>
                <i class="fa fa-heartbeat"></i>
              </div>
                <figure title="View Error Logs" class="figure d-inline-block">
                  <a :href="'telnet:///usr/bin/open ' + project.log">
                    <img
                      src="img/tech-icons/console.png"
                      class="figure-img img-fluid rounded" />
                    <figcaption class="figure-caption text-center">Error Logs</figcaption>
                  </a>
                </figure>
            </b-list-group-item>

            <b-list-group-item>
              <div class="d-flex w-100 justify-content-between">
                <h2 class="mb-1">Repositories</h2>
                <i class="fa fa-git"></i>
              </div>
                <figure title="Open Git Tower for this project" class="figure d-inline-block">
                  <a :href="'telnet:///usr/local/bin/gittower ' + project.root">
                    <img
                      src="img/tech-icons/git-tower.png"
                      class="figure-img img-fluid rounded" />
                    <figcaption class="figure-caption text-center">Tower</figcaption>
                  </a>
                </figure>
                <figure title="Open Bitbucket for this project" class="figure d-inline-block">
                  <a :href="project.remoteRepo" target="bitbucket">
                    <img
                      src="img/tech-icons/bitbucket.png"
                      class="figure-img img-fluid rounded" />
                    <figcaption class="figure-caption text-center">Bitbucket</figcaption>
                  </a>
                </figure>
            </b-list-group-item>

            <b-list-group-item>
              <div class="d-flex w-100 justify-content-between">
                <h2 class="mb-1">Configurations</h2>
                <i class="fa fa-gear"></i>
              </div>
                <figure v-if="project.conf !== ''" title="Configure dev server settings" class="figure d-inline-block">
                  <a :href="'telnet:///usr/bin/open  ' + project.conf">
                    <img
                      src="img/tech-icons/nginx.png"
                      class="figure-img img-fluid rounded" />
                    <figcaption class="figure-caption text-center">Nginx</figcaption>
                  </a>
                </figure>
                <figure v-if="project.env === true" title="Configure project's application settings" class="figure d-inline-block">
                  <a :href="'telnet:///usr/bin/open  ' + project.root + '.env'">
                    <img
                      src="img/tech-icons/laravel.png"
                      class="figure-img img-fluid rounded" />
                    <figcaption class="figure-caption text-center">Application</figcaption>
                  </a>
                </figure>
                <figure v-if="project.deploy === true" title="Configure deployment for this project" class="figure d-inline-block">
                  <a  :href="'telnet:///usr/bin/open ' + project.root + 'deploy.yml'">
                    <img
                      src="img/tech-icons/ansible.png"
                      class="figure-img img-fluid rounded" />
                    <figcaption class="figure-caption text-center">Deployment</figcaption>
                  </a>
                </figure>
                <figure v-if="project.composer === true" title="Install project vendor scripts" class="figure d-inline-block">
                  <a  :href="'telnet:///usr/bin/open ' + project.root + 'composer.json'">
                    <img
                      src="img/tech-icons/composer.png"
                      class="figure-img img-fluid rounded" />
                    <figcaption class="figure-caption text-center">Composer</figcaption>
                  </a>
                </figure>
                <figure v-if="project.npm  === true" title="Install project node modules" class="figure d-inline-block ">
                  <a  :href="'telnet:///usr/bin/open ' + project.root + 'package.json'">
                    <img
                      src="img/tech-icons/npm-2.png"
                      class="figure-img img-fluid rounded" />
                    <figcaption class="figure-caption text-center">NPM</figcaption>
                  </a>
                </figure>
                <figure v-if="config.config.projectsConf !== ''" class="figure d-inline-block" title="Edit this page">
                  <a :href="'telnet:///usr/bin/open ' + config.config.projectsConf + project.slug  + '.json'">
                    <img
                      src="img/tech-icons/coreui.png"
                      class="figure-img img-fluid rounded" />
                    <figcaption class="figure-caption text-center">This Page.</figcaption>
                  </a>
                </figure>
            </b-list-group-item>

            <b-list-group-item>
              <div class="d-flex w-100 justify-content-between">
                <h2 class="mb-1">Performance</h2>
                <i class="fa fa-tachometer"></i>
              </div>
                <figure title="Open sitespeed.io for this project" class="figure d-inline-block">
                  <a :href="'http://127.0.0.1:3000/d/000000045/site-summary?orgId=1&var-base=sitespeed_io&var-path=default&var-group='+project.speedio+'&var-browser=chrome&var-connectivity=native&var-function=median'" target="speedtestio">
                    <img
                      src="img/tech-icons/sitespeedio.png"
                      class="figure-img img-fluid rounded" />
                    <figcaption class="figure-caption text-center">SpeedTestIo</figcaption>
                  </a>
                </figure>
                <figure title="Open WebDash for this project" class="figure d-inline-block">
                  <a :href="'http://localhost:' + webdash" target="speedtestio">
                    <img
                      src="img/tech-icons/webdash.png"
                      class="figure-img img-fluid rounded" />
                    <figcaption class="figure-caption text-center">WebDash</figcaption>
                  </a>
                </figure>
                <figure title="Open Pingdom" class="figure d-inline-block">
                  <a :href="'https://my.pingdom.com/newchecks/checks'" target="pingdom">
                    <img
                      src="img/tech-icons/pingdom.png"
                      class="figure-img img-fluid rounded" />
                    <figcaption class="figure-caption text-center">Uptime</figcaption>
                  </a>
                </figure>
            </b-list-group-item>

            <b-list-group-item>
              <div class="d-flex w-100 justify-content-between">
                <h2 class="mb-1">Servers</h2>
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
              <vue-markdown :source="readme"># README.md</vue-markdown>
              </b-card>
            </b-tab>
            <b-tab>
              <template slot="title">
                <i class="fa fa-bookmark"></i> {{tabs[1]}}
              </template>
              <b-card>
              <template slot="header">
                Project Bookmarks
              </template>
                Here
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
              <div id="terminal" style="width:100%;height:500px;"></div>
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
import { Terminal } from 'xterm'
import * as fit from 'xterm/lib/addons/fit/fit';
Terminal.applyAddon(fit);
import VueMarkdown from 'vue-markdown'
// var term = new Terminal();
// term.open(document.getElementById('terminal'));
// // term.write('Hello from \x1B[1;3;31mxterm.js\x1B[0m $ ')
// term.fit();
export default {
  name: 'Project',
  components: {
    VueMarkdown
  },
  props: {
    caption: {
      type: String,
      default: 'Project slug'
    },
  },
  computed: {
    project: function () {
      let slug = this.$route.params.slug
      let project = require('../../../projects/' + slug + '.json')
      return project
    },
    readme: function () {
      return this.project.root + 'README.md'
    }

  },
  data () {
    return {
      tabIndex: [0, 0],
      tabs: [
        'README.md',
        'Project Bookmarks',
        'Terminal'
      ],
      config: config,
      fields: [
        {key: 'key'},
        {key: 'value'},
      ],
      webdash: '3456'
    }
  },
  mounted: () => {
    let term = new Terminal();
    term.open(document.getElementById('terminal'));
    term.write('Hello from \x1B[1;3;31mxterm.js\x1B[0m $ ')
    // term.fit();
  },
  methods: {
    goBack() {
      this.$router.go(-1)
      // this.$router.replace({path: '/users'})
    },
    runSpeedtestio() {
      '/Users/gts/Documents/Projects/Server/sitespeed.io/web/docker-compose run sitespeed.io http://' + this.$route.params.slug + this.project.tld + ' --graphite.host=graphite'
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
@import "../../../node_modules/xterm/dist/xterm.css";
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
