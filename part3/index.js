const config = require("./utils/config")
const logger = require("./utils/logger")

const app = require("./app")


logger.info(config.PORT, "here is the port")

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})
