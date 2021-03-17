import  * as ProjectActions from './projects.actions'

const initialState = {
    projectsList: [],
    projectInfo: {},
    tasks :[]
  };
  

  const projectReducer = (state = initialState, action) => {
      switch (action.type) {
          case ProjectActions.SET_PROJECTS_LIST:
              
              break;
      
          default:
              return state;
      }
  }

  export default projectReducer