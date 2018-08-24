// const fs = require("fs")
import config from '../configure.json'
// console.log(config)

var projects = []
var badges = []
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
    projects[key].Servers.forEach(function (element) {
      badges.push(element)
    })
  }
}

function foo(badges) {
  var a = [],
    b = [],
    prev;

  badges.sort();
  for (var i = 0; i < badges.length; i++) {
    if (badges[i] !== prev) {
      a.push(badges[i]);
      b.push(1);
    } else {
      b[b.length - 1]++;
    }
    prev = badges[i];
  }

  return [a, b];
}
var result = foo(badges);
// console.log(result)

var keys = result[0];
var values = result[1];
for (var i = 0; i < values.length; i++) {
  var obj = {};
  for (var j = 0; j < keys.length; j++) {
    obj[keys[j]] = values[j]
  }
}

var servers = []
for (let key in mergedServers) {
  let slug = mergedServers[key]
  let server = require('../servers/' + slug + '.json')
  // server.badge = 6
  servers.push(server)
}

for (let key in servers) {
  let slug = servers[key].slug
  if (obj.hasOwnProperty(slug)) {
    servers[key].badge = obj[slug]
    // badges[servers[key].slug] = +1
  }
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
