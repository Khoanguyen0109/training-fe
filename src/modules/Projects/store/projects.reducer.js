import * as ProjectActions from "./projects.actions";

const initialState = {
  projectsList: [],
  projectInfo: {},
  tasks: [],
};

const projectReducer = (state = initialState, action) => {
  switch (action.type) {
    case ProjectActions.SET_PROJECTS_LIST:
      return {
        ...state,
        projectsList: action.payload,
      };
    case ProjectActions.UPDATE_PROJECTS_LIST:
      return {
        ...state,
        projectsList: [action.payload, ...state.projectsList],
      };

    case ProjectActions.REDUCE_PROJECT_LIST: {
      return {
        ...state,
        projectsList: state.projectsList.filter(
          (project) => project.id !== action.payload
        ),
      };
    }

    case ProjectActions.SET_PROJECT_INFO: {
      return {
        ...state,
        projectInfo: action.payload,
      };
    }
    case ProjectActions.SET_TASKS_LIST: {
      return {
        ...state,
        tasks: action.payload,
      };
    }

    case ProjectActions.UPDATE_TASK_LIST: {
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };
    }

    case ProjectActions.REDUCE_TASK_LIST: {
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };
    }

    case ProjectActions.UPDATE_TASK_INFO: {
      const taskIndex = state.tasks.findIndex(
        (task) => task.id === action.payload.id
      );
      const newArray = [...state.tasks];
      newArray[taskIndex] = action.payload;
      return {
        ...state,
        tasks: newArray,
      };
    }

    case ProjectActions.UPDATE_TASK_STATUS:
      const taskIndex = state.tasks.findIndex(
        (task) => task.id === action.payload
      );
      const newArray = [...state.tasks];
      newArray[taskIndex].status = !state.tasks[taskIndex].status;
      return {
        ...state,
        tasks: newArray,
      };

    default:
      return state;
  }
};

export default projectReducer;
