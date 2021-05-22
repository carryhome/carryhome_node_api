import { login, } from '../../services/user'

const routes = (app) => {
    app
        .route(`${process.env.BASE_PATH}/users/login`)
        .post(login)
}

export default routes
