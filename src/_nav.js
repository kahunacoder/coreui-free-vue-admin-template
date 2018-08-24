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
    icon: config.projects[key].icon,
    badge: {
      variant: variant,
      text: text
    }
  }
  items.push(project)
}

let serversHead = {
  title: true,
  name: 'Servers',
  class: '',
  wrapper: {
    element: '',
    attributes: {}
  }
}
items.push(serversHead)
for (let key in config.servers) {
  let server = {
    name: config.servers[key].name,
    url: '/servers/' + config.servers[key].slug,
    icon: config.servers[key].icon,
    badge: {
      variant: 'primary',
      text: config.servers[key].badge
    }
  }
  items.push(server)
}

export default {
  items: items
}
