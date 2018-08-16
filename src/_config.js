// const fs = require("fs")
import config from '../projects.json'
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

// console.log(options)

export default {
  projects: config.projects,
  devTools: config.devTools,
  edit: config.edit,
  projectRoot: config.projectRoot,
  tld: config.tld
}
