import {
  getUsers,
} from '../../services/user'
import {grantAccess} from '../../security/auth'

const routes = (app) => {
  app
    .route(`${process.env.BASE_PATH}/users`)
    .get(grantAccess('readAny', 'user'), getUsers)
}

export default routes
