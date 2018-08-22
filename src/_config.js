// const fs = require("fs")
import config from '../configure.json'
// console.log(config)

// const getConfig = (projectRoot) => {
//   let config = {}
//   if (fs.existsSync(`${projectRoot}/project.json`)) {
//     config = require(`${projectRoot}/project.json`)
//   }
//   return config
// }
// var options = []
// for (let key in config.projects) {
//   let name = config.projects[key].name
//   let dir = config.projects[key].dir
//   options[name] = require(dir)
//   // console.log(config.projects[key].name)
// }
var servers = {}
for (let key in config.projects) {
  if (config.projects[key].Servers !== '') {
    servers = { ...servers,
      ...config.projects[key].Servers
    }
  }
}
console.log(servers)
// console.log(options)

export default {
  projects: config.projects,
  devTools: config.devTools,
  edit: config.edit,
  projectRoot: config.projectRoot,
  tld: config.tld,
  config: config,
  servers: servers
}
