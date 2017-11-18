import axios from 'axios';

export const FETCH_TASKS = 'fetch_tasks';
export const UPDATE_TASK = 'update_task';
export const UPDATE_TASK_STATUS = 'update_task_status';

export const FETCH_UPTAKES = 'fetch_uptakes';
export const CREATE_UPTAKE = 'create_uptake';

export const FETCH_PROJECTS = 'fetch_projects';
export const FETCH_PROJECT = 'fetch_project';

export const FETCH_CLIENTS = 'fetch_clients';
export const FETCH_CLIENT = 'fetch_client';
export const CREATE_CLIENT = 'create_client';
export const DELETE_CLIENT = 'delete_client';
export const EDIT_CLIENT = 'edit_client';

export const FETCH_MILESTONES = 'fetch_milestones';
export const FETCH_MILESTONE = 'fetch_milestone';
export const CREATE_MILESTONE = 'create_milestone';
export const EDIT_MILESTONE = 'edit_milestone';
export const DELETE_MILESTONE = 'delete_milestone';

export const TOGGLE_MODAL = 'toggle_modal';

const API_URL = 'http://localhost:3005';

//CLIENT ACTIONS
export function fetchClients() {
    const request = axios.get('http://localhost:3005/Clients');
    
    return {
        type: FETCH_CLIENTS,
        payload: request
    };
}

export function fetchClient(id) {
    const request = axios.get(`${API_URL}/Clients/${id}`);
    
    return {
        type: FETCH_CLIENT,
        payload: request
    };
}

export function createClient(values, callback) {
    const request = axios.post(`${API_URL}/Clients`, values)
        .then(() => callback());

    return {
        type: CREATE_CLIENT,
        payload: request
    }
}

export function deleteClient(id, callback) {
    const request = axios.delete(`${API_URL}/Clients/${id}`)
        .then(() => callback());

    return {
        type: DELETE_CLIENT,
        payload: id
    }
}

export function editClient(id, values, callback) {
    const request = axios.put(`${API_URL}/Clients/${id}`, values)
        .then(() => callback());
    
    return {
        type: EDIT_CLIENT,
        payload: request
    };
}

//TASKS ACTION
export function fetchTasks() {
    const request = axios.get('http://localhost:3005/Tasks');
    
    return {
        type: FETCH_TASKS,
        payload: request
    };
}

export function updateTask(id, values, callback) {
    const request = axios.put(`${API_URL}/Tasks/${id}`, values)
        .then(() => callback());
    
    return {
        type: UPDATE_TASK,
        payload: request
    };
}

export function updateTaskStatus(id, values, callback) {
    const request = axios.patch(`${API_URL}/Tasks/${id}`, values)
        .then(() => callback());

        return {
            type: UPDATE_TASK_STATUS,
            payload: request
        };
}

//PROJECTS ACTION
export function fetchProjects() {
    const request = axios.get('http://localhost:3005/Uptakes');
    
    return {
        type: FETCH_PROJECTS,
        payload: request
    };
}

export function fetchProject(id) {
    const request = axios.get(`${API_URL}/Uptakes/${id}`);
    
    return {
        type: FETCH_PROJECT,
        payload: request
    };
}

//UPTAKES ACTION
export function fetchUptakes() {
    const request = axios.get('http://localhost:3005/Uptakes');
    
    return {
        type: FETCH_UPTAKES,
        payload: request
    };
}

export function createUptake(values, callback) {
    const request = axios.post(`${API_URL}/Uptakes`, values)
        .then(() => callback());

    return {
        type: CREATE_UPTAKE,
        payload: request
    }
}

//MILESTONES ACTION
export function fetchMilestones() {
    const request = axios.get(`${API_URL}/Milestones`);

    return {
        type: FETCH_MILESTONES,
        payload: request
    }
}

export function fetchMilestone(id) {
    const request = axios.get(`${API_URL}/Milestones/${id}`);
    
    return {
        type: FETCH_MILESTONE,
        payload: request
    };
}

export function createMilestone(values, callback) {
    const request = axios.post(`${API_URL}/Milestones`, values)
        .then(() => callback());

    return {
        type: CREATE_MILESTONE,
        payload: request
    }
}

export function deleteMilestone(id, callback) {
    const request = axios.delete(`${API_URL}/Milestones/${id}`)
        .then(() => callback());

    return {
        type: DELETE_MILESTONE,
        payload: id
    }
}

export function editMilestonet(id, values, callback) {
    const request = axios.put(`${API_URL}/Milestones/${id}`, values)
        .then(() => callback());
    
    return {
        type: EDIT_MILESTONE,
        payload: request
    };
}