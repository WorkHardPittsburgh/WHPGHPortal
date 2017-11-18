import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import ClientsReducer from './reducer_clients';
import TasksReducer from './reducer_tasks';
import ProjectsReducer from './reducers_projects';
import UptakesReducer from './reducers_uptakes';
import MilestonesReducer from './reducer_milestones';

const rootReducer = combineReducers({
    clients: ClientsReducer,
    tasks: TasksReducer,
    projects: ProjectsReducer,
    uptakes: UptakesReducer,
    milestones: MilestonesReducer,
    form: formReducer
});

export default rootReducer;