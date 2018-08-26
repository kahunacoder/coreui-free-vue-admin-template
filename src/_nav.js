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

let clientsHead = {
  title: true,
  name: 'Clients',
  class: '',
  wrapper: {
    element: '',
    attributes: {}
  }
}
items.push(clientsHead)
for (let key in config.clients) {
  let client = {
    name: config.clients[key].name,
    url: '/clients/' + config.clients[key].slug,
    icon: config.clients[key].icon,
    badge: {
      variant: 'primary',
      text: config.clients[key].badge
    }
  }
  items.push(client)
}

let technologiesHead = {
  title: true,
  name: 'Technologies',
  class: '',
  wrapper: {
    element: '',
    attributes: {}
  }
}
items.push(technologiesHead)
for (let key in config.technologies) {
  let technology = {
    name: config.technologies[key].name,
    url: '/technologies/' + config.technologies[key].slug,
    icon: config.technologies[key].icon,
    badge: {
      variant: 'primary',
      text: config.technologies[key].badge
    }
  }
  items.push(technology)
}

let toolsHead = {
  title: true,
  name: 'Tools',
  class: '',
  wrapper: {
    element: '',
    attributes: {}
  }
}
items.push(toolsHead)
for (let key in config.tools) {
  let tool = {
    name: config.tools[key].name,
    url: '/tools/' + config.tools[key].slug,
    icon: config.tools[key].icon,
  }
  items.push(tool)
}

export default {
  items: items
}
