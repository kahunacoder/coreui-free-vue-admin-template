import config from '@/_config'
// console.log(config)
function Truncate(str, maxLength, suffix) {
  if (str.length > maxLength) {
    str = str.substring(0, maxLength + 1);
    str = str.substring(0, Math.min(str.length, str.lastIndexOf(" ")));
    str = str + suffix;
  }
  return str;
}

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
  let name = Truncate(config.projects[key].name, 15, '...')
  let project = {
    name: name,
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
  let name = Truncate(config.servers[key].name, 15, '...')
  let server = {
    name: name,
    url: '/servers/' + config.servers[key].slug,
    icon: config.servers[key].icon,
    badge: {
      variant: 'secondary',
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
  let name = Truncate(config.clients[key].name, 15, '...')
  let client = {
    name: name,
    url: '/clients/' + config.clients[key].slug,
    icon: config.clients[key].icon,
    badge: {
      variant: 'secondary',
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
  let name = Truncate(config.technologies[key].name, 15, '...')
  let technology = {
    name: name,
    url: '/technologies/' + config.technologies[key].slug,
    icon: config.technologies[key].icon,
    badge: {
      variant: 'secondary',
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
  let name = Truncate(config.tools[key].name, 15, '...')
  let tool = {
    name: name,
    url: '/tools/' + config.tools[key].slug,
    icon: config.tools[key].icon,
  }
  items.push(tool)
}

export default {
  items: items
}
