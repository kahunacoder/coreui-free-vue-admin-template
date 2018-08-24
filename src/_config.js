// const fs = require("fs")
import config from '../configure.json'
// console.log(config)

var projects = []
for (let key in config.projects) {
  let slug = config.projects[key]
  let project = require('../projects/' + slug + '.json')
  projects.push(project)
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
  if (projects[key].Servers !== '') {
    mergedServers = arrayUnique(mergedServers.concat(projects[key].Servers))
  }
}

var servers = []
for (let key in mergedServers) {
  let slug = mergedServers[key]
  let server = require('../servers/' + slug + '.json')
  var pArray = []
  for (let key1 in projects) {
    if (projects[key1].Servers.includes(slug)) {
      pArray.push(projects[key1].slug)
    }
  }
  server.badge = pArray.length
  server.projects = pArray
  servers.push(server)
}
// console.log(servers)

export default {
  projects: projects,
  devTools: config.devTools,
  edit: config.edit,
  projectRoot: config.projectRoot,
  tld: config.tld,
  config: config,
  servers: servers
}
