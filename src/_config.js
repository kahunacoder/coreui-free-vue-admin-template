// const fs = require("fs")
import config from '../configure.json'
// console.log(config)

var projects = []
for (let key in config.projects) {
  let slug = config.projects[key]
  let project = require('../data/projects/' + slug + '.json')
  projects.push(project)
}

var tools = []
for (let key in config.tools) {
  let slug = config.tools[key]
  let tool = require('../data/tools/' + slug + '.json')
  tools.push(tool)
}

function arrayUnique(array) {
  var a = array.concat();
  for (var i = 0; i < a.length; ++i) {
    for (var j = i + 1; j < a.length; ++j) {
      if (a[i] === a[j])
        a.splice(j--, 1);
    }
  }
  return a;
}

var mergedServers = []
for (let key in projects) {
  if (projects[key].servers !== '') {
    mergedServers = arrayUnique(mergedServers.concat(projects[key].servers))
  }
}

var servers = []
for (let key in mergedServers) {
  let slug = mergedServers[key]
  let server = require('../data/servers/' + slug + '.json')
  var pArray = []
  for (let key1 in projects) {
    if (projects[key1].servers.includes(slug)) {
      pArray.push(projects[key1].slug)
    }
  }
  server.badge = pArray.length
  server.projects = pArray
  servers.push(server)
}

var clients = []
var mergedClients = []
for (let key in projects) {
  if (projects[key].client !== '') {
    mergedClients = arrayUnique(mergedClients.concat(projects[key].client))
  }
}
// console.log(mergedClients)

for (let key in mergedClients) {
  let slug = mergedClients[key]
  let client = require('../data/clients/' + slug + '.json')
  var cArray = []
  for (let key1 in projects) {
    if (projects[key1].client === slug) {
      cArray.push(projects[key1].slug)
    }
  }
  client.badge = cArray.length
  client.projects = pArray
  clients.push(client)
}
// console.log(clients)

var technologies = []
var mergedTechnologies = []
for (let key in projects) {
  if (projects[key].language !== '') {
    mergedTechnologies = arrayUnique(mergedTechnologies.concat(projects[key].language))
  }
  if (projects[key].libraries !== '') {
    mergedTechnologies = arrayUnique(mergedTechnologies.concat(projects[key].libraries))
  }
}
// console.log(mergedTechnologies)

for (let key in mergedTechnologies) {
  let slug = mergedTechnologies[key]
  let technology = require('../data/technologies/' + slug + '.json')
  var tArray = []
  for (let key1 in projects) {
    if (projects[key1].language === slug) {
      tArray.push(projects[key1].slug)
    }
    if (projects[key1].libraries.includes(slug)) {
      tArray.push(projects[key1].slug)
    }
  }
  technology.badge = tArray.length
  technology.projects = tArray
  technologies.push(technology)
}
// console.log(technologies)

export default {
  projects: projects,
  devTools: config.devTools,
  edit: config.edit,
  projectRoot: config.projectRoot,
  tld: config.tld,
  config: config,
  servers: servers,
  clients: clients,
  technologies: technologies,
  tools: tools
}
