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
                  <figure-links v-if="project.url !== ''" :title="'Live Site'" :name="project.name" :link="project.url" :external="true" :icon="project.icon" :status="project.status"></figure-links>
                  <figure-links v-if="project.stagingUrl !== ''" :title="'Staging Site'" :name="project.name" :link="project.stagingUrl" :external="true" :icon="project.icon" :status="'staging'"></figure-links>
                  <figure-links :title="'Dev Site'" :name="project.name" :link="'http://' + $route.params.slug + '.' + project.tld" :external="true" :icon="project.icon" :status="'dev'"></figure-links>
            </b-list-group-item>

            <b-list-group-item>
              <div class="d-flex w-100 justify-content-between">
                <h2 class="mb-1">Editors</h2>
                <i class="fa fa-code" style="font-weight:bold;"></i>
              </div>
                <span v-for="(editor, index) in project.editors" :key="`editor-${index}`">
                    <figure-links v-if="editor === 'code'" title="Edit projects code with Visual Studio Code" name="VS Code" :link="'telnet:///usr/local/bin/' + editor + ' ' + project.root" :external="true" icon="img/tech-icons/vscode.png"></figure-links>
                    <figure-links v-if="editor === 'subl'" title="Edit projects code with Sublime Text" name="Sublime" :link="'telnet:///usr/local/bin/' + editor + ' ' + project.root" :external="true" icon="img/tech-icons/sublime-text.png"></figure-links>
                </span>
            </b-list-group-item>

            <b-list-group-item>
              <div class="d-flex w-100 justify-content-between">
                <h2 class="mb-1">Data</h2>
                <i class="fa fa-database"></i>
              </div>
                <figure-links title="Open Sequel Pro" name="MySql" :link="'telnet:///usr/bin/open ' + project.root + 'docker.spf'" :external="true" icon="img/tech-icons/sequel-pro.png"></figure-links>
                <figure-links title="Edit Json Data for Project" name="Json" :link="project.log" :external="true" icon="img/tech-icons/json.png"></figure-links>
            </b-list-group-item>

            <b-list-group-item>
              <div class="d-flex w-100 justify-content-between">
                <h2 class="mb-1">Logs</h2>
                <i class="fa fa-heartbeat"></i>
              </div>
                <figure-links title="View Error Logs" name="Error Logs" :link="'telnet:///usr/bin/open ' + project.log" :external="true" icon="img/tech-icons/console.png"></figure-links>
            </b-list-group-item>

            <b-list-group-item>
              <div class="d-flex w-100 justify-content-between">
                <h2 class="mb-1">Repositories</h2>
                <i class="fa fa-git"></i>
              </div>
                <figure-links title="Open Git Tower for this project" name="Tower" :link="'telnet:///usr/local/bin/gittower ' + project.root" :external="true" icon="img/tech-icons/git-tower.png"></figure-links>
                <figure-links title="Open Bitbucket for this project" name="Bitbucket" :link="project.remoteRepo" target="bitbucket" :external="true" icon="img/tech-icons/bitbucket.png"></figure-links>
            </b-list-group-item>

            <b-list-group-item>
              <div class="d-flex w-100 justify-content-between">
                <h2 class="mb-1">Configurations</h2>
                <i class="fa fa-gear"></i>
              </div>
                <figure-links v-if="project.conf !== ''" title="Configure dev server settings" name="Nginx" :link="'telnet:///usr/bin/open  ' + project.conf" :external="true" icon="img/tech-icons/nginx.png"></figure-links>
                <figure-links v-if="project.env === true" title="Configure project's application settings" name="Application" :link="'telnet:///usr/bin/open  ' + project.root + '.env'" :external="true" icon="img/tech-icons/laravel.png"></figure-links>
                <figure-links v-if="project.deploy === true" title="Configure deployment for this project" name="Deployment" :link="'telnet:///usr/bin/open ' + project.root + 'deploy.yml'" :external="true" icon="img/tech-icons/ansible.png"></figure-links>
                <figure-links v-if="project.composer === true" title="Install project vendor scripts" name="Composer" :link="'telnet:///usr/bin/open ' + project.root + 'composer.json'" :external="true" icon="img/tech-icons/composer.png"></figure-links>
                <figure-links v-if="project.npm === true" title="Install project node modules" name="NPM" :link="'telnet:///usr/bin/open ' + project.root + 'package.json'" :external="true" icon="img/tech-icons/npm-2.png"></figure-links>
                <figure-links v-if="config.config.projectsConf !== ''" title="Edit this page" name="This Project" :link="'telnet:///usr/bin/open ' + config.config.projectsConf + project.slug  + '.json'" :external="true" icon="img/brand/workspace.png"></figure-links>
            </b-list-group-item>

            <b-list-group-item>
              <div class="d-flex w-100 justify-content-between">
                <h2 class="mb-1">Performance</h2>
                <i class="fa fa-tachometer"></i>
              </div>
                <figure-links title="Open sitespeed.io for this project" name="SpeedTestIo" :link="'http://127.0.0.1:3000/d/000000045/site-summary?orgId=1&var-base=sitespeed_io&var-path=default&var-group='+project.speedio+'&var-browser=chrome&var-connectivity=native&var-function=median'" target="speedio" :external="true" icon="img/tech-icons/sitespeedio.png"></figure-links>
                <figure-links title="Open WebDash for this project" name="WebDash" :link="'http://localhost:' + webdash" target="webdash" :external="true" icon="img/tech-icons/webdash.png"></figure-links>
                <figure-links title="Open Pingdom" name="Uptime" :link="'https://my.pingdom.com/newchecks/checks'" target="pingdom" :external="true" icon="img/tech-icons/pingdom.png"></figure-links>
            </b-list-group-item>

            <b-list-group-item>
              <div class="d-flex w-100 justify-content-between">
                <h2 class="mb-1">Servers</h2>
                <i class="fa fa-server"></i>
              </div>
                <figure-links title="Open Cloud at Cost" name="Cloud at Cost" :link="'https://panel.cloudatcost.com/index.php'" target="cloudatcost" :external="true" icon="img/tech-icons/cloudatcost.png"></figure-links>
                <figure-links title="Open Docker" name="Docker" :link="'http://localhost:9000/#/dashboard'" target="docker" :external="true" icon="img/tech-icons/docker.png"></figure-links>
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
              <vue-markdown># README.md</vue-markdown>
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
              <b-list-group v-for="bookmark in project.bookmarks" :key="bookmark.url">
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
import FigureLinks from '@/FigureLinks'
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
    VueMarkdown,
    FigureLinks
  },
  props: {
    caption: {
      type: String,
      default: 'Project slug'
    },
  },
  computed: {
    project: function () {
      var matched = {}
      for (let key in config.projects) {
        if ( config.projects[key].slug === this.$route.params.slug) {
          matched = config.projects[key]
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
</style>
