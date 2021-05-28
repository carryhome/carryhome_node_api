import {
    getTeams,
    getSingleTeam,
    updateTeam,
    deleteTeam,
    createTeam,
  } from '../../services/team'
  
  const routes = (app) => {
    app
      .route(`${process.env.BASE_PATH}/teams`)  //get all teams
      .get(getTeams)
    app
      .route(`${process.env.BASE_PATH}/teams/:_id`) // get single user in teams
      .get(getSingleTeam)
    app
      .route(`${process.env.BASE_PATH}/teams/:_id`) // update single user team record
      .put(updateTeam)
    app
      .route(`${process.env.BASE_PATH}/teams/:_id`) // delete single user team record
      .delete(deleteTeam)
    app
      .route(`${process.env.BASE_PATH}/teams`) // create new user team record
      .post(createTeam)
  }
  
  export default routes
