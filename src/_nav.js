import config from '@/_config'
// console.log(config)
var items = []
let dashboard = {
  name: 'Dashboard',
  url: '/dashboard',
  icon: 'icon-speedometer',
  badge: {
    variant: 'primary',
    text: 'NEW'
  }
}
items.push(dashboard)

let projects = {
  title: true,
  name: 'Projects',
  class: '',
  wrapper: {
    element: '',
    attributes: {}
  }
}
items.push(projects)


for (let key in config.projects) {
  var variant = ''
  var text = ''
  if (config.projects[key].status === 'live') {
    variant = 'success'
    text = 'Live'
  }
  if (config.projects[key].status === 'staging') {
    variant = 'secondary'
    text = 'Staging'
  }
  if (config.projects[key].status === 'dev') {
    variant = 'warning'
    text = 'Dev'
  }
  let project = {
    name: config.projects[key].name,
    url: '/projects/' + config.projects[key].slug,
    badge: {
      variant: variant,
      text: text
    }

    // children: [{
    //     name: 'View',
    //     url: config.projects[key].displayName,
    //     icon: 'icon-web',
    //   },
    //   {
    //     name: 'Edit',
    //     url: config.projects[key].editor,
    //     icon: 'fa fa-code',
    //   }
    // ]
  }
  items.push(project)
}

let tools = {
  title: true,
  name: 'Tools',
  class: '',
  wrapper: {
    element: '',
    attributes: {}
  }
}
items.push(tools)
for (let key in config.devTools) {
  let tool = {
    name: config.devTools[key].name,
    url: config.devTools[key].url,
    icon: config.devTools[key].icon,
    target: '_blank'
  }
  items.push(tool)
}


// console.log(items)

export default {
  items: items
  // items: [{
  //     name: 'Dashboard',
  //     url: '/dashboard',
  //     icon: 'icon-speedometer',
  //     badge: {
  //       variant: 'primary',
  //       text: 'NEW'
  //     }
  //   },
  //   {
  //     title: true,
  //     name: 'Projects',
  //     class: '',
  //     wrapper: {
  //       element: '',
  //       attributes: {}
  //     }
  //   },
  //   {
  //     title: true,
  //     name: 'Tools',
  //     class: '',
  //     wrapper: {
  //       element: '',
  //       attributes: {}
  //     }
  //   },
  //   {
  //     name: 'Base',
  //     url: '/base',
  //     icon: 'icon-puzzle',
  //     children: [{
  //         name: 'Breadcrumbs',
  //         url: '/base/breadcrumbs',
  //         icon: 'icon-puzzle'
  //       },
  //       {
  //         name: 'Cards',
  //         url: '/base/cards',
  //         icon: 'icon-puzzle'
  //       },
  //       {
  //         name: 'Carousels',
  //         url: '/base/carousels',
  //         icon: 'icon-puzzle'
  //       },
  //       {
  //         name: 'Collapses',
  //         url: '/base/collapses',
  //         icon: 'icon-puzzle'
  //       },
  //       {
  //         name: 'Forms',
  //         url: '/base/forms',
  //         icon: 'icon-puzzle'
  //       },
  //       {
  //         name: 'Jumbotrons',
  //         url: '/base/jumbotrons',
  //         icon: 'icon-puzzle'
  //       },
  //       {
  //         name: 'List Groups',
  //         url: '/base/list-groups',
  //         icon: 'icon-puzzle'
  //       },
  //       {
  //         name: 'Navs',
  //         url: '/base/navs',
  //         icon: 'icon-puzzle'
  //       },
  //       {
  //         name: 'Navbars',
  //         url: '/base/navbars',
  //         icon: 'icon-puzzle'
  //       },
  //       {
  //         name: 'Paginations',
  //         url: '/base/paginations',
  //         icon: 'icon-puzzle'
  //       },
  //       {
  //         name: 'Popovers',
  //         url: '/base/popovers',
  //         icon: 'icon-puzzle'
  //       },
  //       {
  //         name: 'Progress Bars',
  //         url: '/base/progress-bars',
  //         icon: 'icon-puzzle'
  //       },
  //       {
  //         name: 'Switches',
  //         url: '/base/switches',
  //         icon: 'icon-puzzle'
  //       },
  //       {
  //         name: 'Tables',
  //         url: '/base/tables',
  //         icon: 'icon-puzzle'
  //       },
  //       {
  //         name: 'Tabs',
  //         url: '/base/tabs',
  //         icon: 'icon-puzzle'
  //       },
  //       {
  //         name: 'Tooltips',
  //         url: '/base/tooltips',
  //         icon: 'icon-puzzle'
  //       }
  //     ]
  //   },
  //   {
  //     name: 'Buttons',
  //     url: '/buttons',
  //     icon: 'icon-cursor',
  //     children: [{
  //         name: 'Buttons',
  //         url: '/buttons/standard-buttons',
  //         icon: 'icon-cursor'
  //       },
  //       {
  //         name: 'Button Dropdowns',
  //         url: '/buttons/dropdowns',
  //         icon: 'icon-cursor'
  //       },
  //       {
  //         name: 'Button Groups',
  //         url: '/buttons/button-groups',
  //         icon: 'icon-cursor'
  //       },
  //       {
  //         name: 'Brand Buttons',
  //         url: '/buttons/brand-buttons',
  //         icon: 'icon-cursor'
  //       }
  //     ]
  //   },
  //   {
  //     name: 'Charts',
  //     url: '/charts',
  //     icon: 'icon-pie-chart'
  //   },
  //   {
  //     name: 'Icons',
  //     url: '/icons',
  //     icon: 'icon-star',
  //     children: [{
  //         name: 'CoreUI Icons',
  //         url: '/icons/coreui-icons',
  //         icon: 'icon-star',
  //         badge: {
  //           variant: 'info',
  //           text: 'NEW'
  //         }
  //       },
  //       {
  //         name: 'Flags',
  //         url: '/icons/flags',
  //         icon: 'icon-star'
  //       },
  //       {
  //         name: 'Font Awesome',
  //         url: '/icons/font-awesome',
  //         icon: 'icon-star',
  //         badge: {
  //           variant: 'secondary',
  //           text: '4.7'
  //         }
  //       },
  //       {
  //         name: 'Simple Line Icons',
  //         url: '/icons/simple-line-icons',
  //         icon: 'icon-star'
  //       }
  //     ]
  //   },
  //   {
  //     name: 'Notifications',
  //     url: '/notifications',
  //     icon: 'icon-bell',
  //     children: [{
  //         name: 'Alerts',
  //         url: '/notifications/alerts',
  //         icon: 'icon-bell'
  //       },
  //       {
  //         name: 'Badges',
  //         url: '/notifications/badges',
  //         icon: 'icon-bell'
  //       },
  //       {
  //         name: 'Modals',
  //         url: '/notifications/modals',
  //         icon: 'icon-bell'
  //       }
  //     ]
  //   },
  //   {
  //     name: 'Widgets',
  //     url: '/widgets',
  //     icon: 'icon-calculator',
  //     badge: {
  //       variant: 'primary',
  //       text: 'NEW'
  //     }
  //   },
  //   {
  //     divider: true
  //   },
  //   {
  //     title: true,
  //     name: 'Servers'
  //   },
  //   {
  //     name: 'Pages',
  //     url: '/pages',
  //     icon: 'icon-star',
  //     children: [{
  //         name: 'Login',
  //         url: '/pages/login',
  //         icon: 'icon-star'
  //       },
  //       {
  //         name: 'Register',
  //         url: '/pages/register',
  //         icon: 'icon-star'
  //       },
  //       {
  //         name: 'Error 404',
  //         url: '/pages/404',
  //         icon: 'icon-star'
  //       },
  //       {
  //         name: 'Error 500',
  //         url: '/pages/500',
  //         icon: 'icon-star'
  //       }
  //     ]
  //   } // ,
  //   // {
  //   //   name: 'Download CoreUI',
  //   //   url: 'http://coreui.io/vue/',
  //   //   icon: 'icon-cloud-download',
  //   //   class: 'mt-auto',
  //   //   variant: 'success'
  //   // },
  //   // {
  //   //   name: 'Try CoreUI PRO',
  //   //   url: 'http://coreui.io/pro/vue/',
  //   //   icon: 'icon-layers',
  //   //   variant: 'danger'
  //   // }
  // ]
}
// items.push(projects)
