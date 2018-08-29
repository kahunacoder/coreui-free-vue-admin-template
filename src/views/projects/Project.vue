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
            <div class="card-header-actions">
              <text-reader label="Readme" :types="['.md', '.markdown']" @load="input = $event"></text-reader>
              <button type="button" v-on:click="saveFile()">saveFile</button>
           </div>
              </template>
             <div id="editor">
                <!-- <textarea v-model="input" @input="update"></textarea> -->
                <textarea-autosize
                  placeholder="Click readme button to open your current readme file"
                  ref="someName"
                  v-model="input"
                  :min-height="30"
                  @input="update"
                ></textarea-autosize>
                <div v-html="compiledMarkdown"></div>
              </div>
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
import TextReader from '@/TextReader'

import marked from 'marked';
import _ from 'lodash';

// import { Terminal } from 'xterm'
// import * as fit from 'xterm/lib/addons/fit/fit';
// Terminal.applyAddon(fit);
// var term = new Terminal();
// term.open(document.getElementById('terminal'));
// // term.write('Hello from \x1B[1;3;31mxterm.js\x1B[0m $ ')
// term.fit();

export default {
  name: 'Project',
  components: {
    FigureLinks,
    TextReader
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
    },
    compiledMarkdown: function () {
      return marked(this.input, { sanitize: true })
    }
    // readme: function () {
    //   return this.project.root + 'README.md'
    // },

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
      webdash: '3456',
      input: ''
    }
  },
  methods: {
    update: _.debounce(function (e) {
      // console.log('Hi')
        // let height = document.getElementById('editor').scrollHeight
        console.log(e)
        this.input = e.target.value
        // this.input.style.height = height
      }, 300),
      saveFile: function() {
          const data = this.input
          const blob = new Blob([data], {type: 'text/plain'})
          const e = document.createEvent('MouseEvents'),
          a = document.createElement('a');
          a.download = "README.md";
          a.href = window.URL.createObjectURL(blob);
          a.dataset.downloadurl = ['text/plain', a.download, a.href].join(':');
          e.initEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
          a.dispatchEvent(e);
      },
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
/* @import "../../../node_modules/xterm/dist/xterm.css"; */
#editor {
  height: 100%;
}
#editor textarea,
#editor div {
  display: inline-block;
  width: 49%;
  height: 100%;
  vertical-align: top;
  box-sizing: border-box;
  padding: 0 20px;
}

textarea {
  border: none;
  border-right: 1px solid #ccc;
  resize: none;
  outline: none;
  background-color: #f6f6f6;
  font-size: 14px;
  font-family: "Monaco", courier, monospace;
  padding: 20px;
}

code {
  color: #f66;
}
</style>
