<template>
  <div class="app">
    <AppHeader fixed>
      <SidebarToggler class="d-lg-none" display="md" mobile />
      <b-link class="navbar-brand" to="#">
        <img class="navbar-brand-full" src="img/brand/workspace.png"  height="25" alt="WebDev Workspace"> Workspace
        <img class="navbar-brand-minimized" src="img/brand/workspace.svg" width="30" height="30" alt="WebDev Workspace">
      </b-link>
      <SidebarToggler class="d-md-down-none" display="lg" />
      <b-navbar-nav class="d-md-down-none">
        <b-nav-item class="px-3">
          <i class="fa fa-cogs"></i>
          Settings
        </b-nav-item>
        <b-nav-item class="px-3" to="/dashboard">
        <i class="fa fa-tachometer"></i>
        Dashboard
        </b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown right no-caret>
          <template slot="button-content">
            <slot name="header">
              <i class="fa fa-globe"></i>
              <b-badge pill variant="secondary">{{config.projects.length}}</b-badge>
            </slot>
          </template>
          <slot name="dropdown">
            <div :style="{ right: 'auto', height: '200px' }">
              <b-list-group v-for="project in config.projects" :key="project.slug">

                <b-list-group-item :to="'/projects/' + project.slug">
                    <img
                      :src="project.icon"
                      class="img-icon" />
                    {{ truncate(project.name) }}
                </b-list-group-item>

               </b-list-group>
            </div>
          </slot>
        </b-nav-item-dropdown>

        <b-nav-item-dropdown right no-caret>
          <template slot="button-content">
            <slot name="header">
              <i class="fa fa-server"></i>
              <b-badge pill variant="secondary">{{config.servers.length}}</b-badge>
            </slot>
          </template>
          <slot name="dropdown">
            <div>
              <b-list-group v-for="server in config.servers" :key="server.slug">

                <b-list-group-item :to="'/servers/' + server.slug">
                    <img
                      :src="server.icon"
                      class="img-icon" />
                    {{ truncate(server.name) }}
                </b-list-group-item>

               </b-list-group>
            </div>
          </slot>
        </b-nav-item-dropdown>

        <b-nav-item-dropdown right no-caret>
          <template slot="button-content">
            <slot name="header">
              <i class="fa fa-cubes"></i>
              <b-badge pill variant="secondary">{{config.platforms.length}}</b-badge>
            </slot>
          </template>
          <slot name="dropdown">
            <div>
              <b-list-group v-for="platform in config.platforms" :key="platform.slug">

                <b-list-group-item :to="'/platforms/' + platform.slug">
                    <img
                      :src="platform.icon"
                      class="img-icon" />
                    {{ truncate(platform.name) }}
                </b-list-group-item>

               </b-list-group>
            </div>
          </slot>
        </b-nav-item-dropdown>

        <b-nav-item-dropdown right no-caret>
          <template slot="button-content">
            <slot name="header">
              <i class="fa fa-users"></i>
              <b-badge pill variant="secondary">{{config.clients.length}}</b-badge>
            </slot>
          </template>
          <slot name="dropdown">
            <div>
              <b-list-group v-for="client in config.clients" :key="client.slug">

                <b-list-group-item :to="'/clients/' + client.slug">
                    <img
                      :src="client.icon"
                      class="img-icon" />
                    {{ truncate(client.name) }}
                </b-list-group-item>

               </b-list-group>
            </div>
          </slot>
        </b-nav-item-dropdown>

        <b-nav-item-dropdown right no-caret>
          <template slot="button-content">
            <slot name="header">
              <i class="fa fa-microchip"></i>
              <b-badge pill variant="secondary">{{config.technologies.length}}</b-badge>
            </slot>
          </template>
          <slot name="dropdown">
            <div>
              <b-list-group v-for="technology in config.technologies" :key="technology.slug">

                <b-list-group-item :to="'/technologies/' + technology.slug">
                    <img
                      :src="technology.icon"
                      class="img-icon" />
                    {{ truncate(technology.name) }}
                </b-list-group-item>

               </b-list-group>
            </div>
          </slot>
        </b-nav-item-dropdown>

        <b-nav-item-dropdown right no-caret>
          <template slot="button-content">
            <slot name="header">
              <i class="fa fa-wrench"></i>
              <b-badge pill variant="secondary">{{config.tools.length}}</b-badge>
            </slot>
          </template>
          <slot name="dropdown">
            <div>
              <b-list-group v-for="tool in config.tools" :key="tool.slug">

                <b-list-group-item :to="'/tools/' + tool.slug">
                    <img
                      :src="tool.icon"
                      class="img-icon" />
                    {{ truncate(tool.name) }}
                </b-list-group-item>

               </b-list-group>
            </div>
          </slot>
        </b-nav-item-dropdown>

        <DefaultHeaderDropdownAccnt/>
      </b-navbar-nav>
      <AsideToggler class="d-none d-lg-block" />
      <!--<AsideToggler class="d-lg-none" mobile />-->
    </AppHeader>
    <div class="app-body">
      <AppSidebar fixed>
        <SidebarHeader/>
        <SidebarForm/>
        <DefaultSidebarNav :navItems="nav"></DefaultSidebarNav>
        <SidebarFooter/>
        <SidebarMinimizer/>
      </AppSidebar>
      <main class="main">
        <Breadcrumb :list="list"/>
        <div class="container-fluid">
          <router-view></router-view>
        </div>
      </main>
      <AppAside fixed>
        <!--aside-->
        <DefaultAside/>
      </AppAside>
    </div>
    <TheFooter>
      <!--footer-->
      <div>
        <a href="https://kahunacoder.com">WebDev Workspace</a>
        <span class="ml-1">&copy; 2018 Gary Smith.</span>
      </div>
      <div class="ml-auto">
        <span class="mr-1">Powered by</span>
        <a href="https://coreui.io">WebDev Workspace</a>
      </div>
    </TheFooter>
  </div>
</template>

<script>
import nav from '@/_nav'
import config from '@/_config'
import { Header as AppHeader, SidebarToggler, Sidebar as AppSidebar, SidebarFooter, SidebarForm, SidebarHeader, SidebarMinimizer, Aside as AppAside, AsideToggler, Footer as TheFooter, Breadcrumb } from '@coreui/vue'
import DefaultAside from './DefaultAside'
import DefaultHeaderDropdownAccnt from './DefaultHeaderDropdownAccnt'
import DefaultSidebarNav from './DefaultSidebarNav'

export default {
  name: 'full',
  components: {
    AsideToggler,
    AppHeader,
    AppSidebar,
    AppAside,
    TheFooter,
    Breadcrumb,
    DefaultAside,
    DefaultHeaderDropdownAccnt,
    // SidebarNav,
    SidebarForm,
    SidebarFooter,
    SidebarToggler,
    SidebarHeader,
    DefaultSidebarNav,
    SidebarMinimizer
  },
  data () {
    return {
      nav: nav.items,
      config: config
    }
  },
  computed: {
    name () {
      return this.$route.name
    },
    list () {
      return this.$route.matched.filter((route) => route.name || route.meta.label )
    }
  },
  methods: {
    truncate (str) {
      let maxLength = 15
      let suffix = '...'
      if (str.length > maxLength) {
        str = str.substring(0, maxLength + 1);
        str = str.substring(0, Math.min(str.length, str.lastIndexOf(" ")));
        str = str + suffix;
      }
      return str;
    }
  }
}
</script>
<style scoped lang="css">
.img-icon {
  width: 16px;
}
.figure-img {
  width: 16px;
  margin-bottom: 0;
}
.list-group-item {
  padding: 0.75rem 0.75rem;
  margin-bottom: -1px;
  background-color: none;
  color: #2f353a;

  border: 1px solid rgba(0, 0, 0, 0.125);
}
</style>
