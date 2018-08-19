<template>
<div>
  <div>
    <b-row>
      <b-col>
        <b-card>
          <div slot="header">
            {{ project.name }}
            <div class="card-header-actions">
              <b-link title="Dev Site" :href="'http://' + project.slug + '.' + project.tld" :target="project.slug" class="card-header-action btn-close" v-on:click="runSpeedtestio">
                <i class="fa fa-sitemap"></i>
              </b-link>
              <b-link title="Open Editor" :href="project.editor" target="_blank" class="card-header-action btn-close" v-on:click="runSpeedtestio">
                <i class="fa fa-code"></i>
              </b-link>
              <b-link title="View Logs" :href="project.log" target="_blank" class="card-header-action btn-close" v-on:click="runSpeedtestio">
                <i class="fa fa-life-ring"></i>
              </b-link>
              <b-link title="View Repo" :href="'telnet:///usr/local/bin/gittower ' + project.localRepo" target="_blank" class="card-header-action btn-close" v-on:click="runSpeedtestio">
                <i class="fa fa-git"></i>
              </b-link>
              <b-link title="View Repo" :href="project.remoteRepo" target="bitbucket" class="card-header-action btn-close" v-on:click="runSpeedtestio">
                <i class="fa fa-bitbucket"></i>
              </b-link>
            </div>
              <b-badge :variant="getBadge(project.status)">{{project.status}}</b-badge>
          </div>
          <b-tabs v-model="tabIndex[0]">
            <b-tab active>
              <template slot="title">
                <i class="icon-speedometer"></i> {{tabs[0]}}
              </template>
              <b-card>
              <template slot="header">
                Speedtestio
                <div class="card-header-actions">
                  <b-link title="run speedtest.io" href="#" class="card-header-action btn-close" v-on:click="runSpeedtestio">
                    <i class="icon-control-play"></i>
                  </b-link>
                </div>
              </template>
              <br><iframe :src="speedtestio" frameborder="0" width="100%" height="500"></iframe>
              </b-card>
            </b-tab>
            <b-tab>
              <template slot="title">
                <i class="icon-wrench"></i> {{tabs[1]}}
              </template>
              <b-card>
              <template slot="header">
                Webdash
              </template>
              <br><iframe :src="'http://localhost:' + webdash" frameborder="0" width="100%" height="500"></iframe>
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
              <!-- <a :href="'telnet:///usr/local/bin/gittower ' + project.localRepo">Tower</a> -->
              <!-- <br><iframe :src="project.repo" frameborder="0" width="100%" height="500"></iframe> -->
              </b-card>
            </b-tab>
          </b-tabs>
        </b-card>
      </b-col>
  </b-row>
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
</div>
</template>

<script>
import config from '@/_config'
import { Terminal } from 'xterm'
import * as fit from 'xterm/lib/addons/fit/fit';
Terminal.applyAddon(fit);
// var term = new Terminal();
// term.open(document.getElementById('terminal'));
// // term.write('Hello from \x1B[1;3;31mxterm.js\x1B[0m $ ')
// term.fit();
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
      tabIndex: [0, 0],
      tabs: [
        'Speedtestio',
        'Webdash',
        'Terminal'
      ],
      items: function (slug) {
        const project = config.projects.find( project => project.slug === slug)
        this.project = project
        const projectDetails = project ? Object.entries(project) : [['slug', 'Not found']]
        return projectDetails.map(([key, value]) => {return {key: key, value: value}})
      },
      project: '',
      fields: [
        {key: 'key'},
        {key: 'value'},
      ],
      speedtestio: 'http://127.0.0.1:3000/d/000000045/site-summary?orgId=1&var-base=r_kc_gs&var-path=default&var-group=r_kc_gs&var-browser=chrome&var-connectivity=native&var-function=median',
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
      '/Users/gts/Documents/Projects/Server/sitespeed.io/web/docker-compose run sitespeed.io http://' + this.project.slug + this.project.tld + ' --graphite.host=graphite'
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
<style>
@import "../../../node_modules/xterm/dist/xterm.css";
</style>
