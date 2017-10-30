import axios from 'axios';

export const FETCH_TASKS = 'fetch_tasks';

export const FETCH_UPTAKES = 'fetch_uptakes';
export const CREATE_UPTAKE = 'create_uptake';

export const FETCH_PROJECTS = 'fetch_projects';

export const FETCH_CLIENTS = 'fetch_clients';
export const FETCH_CLIENT = 'fetch_client';
export const CREATE_CLIENT = 'create_client';
export const DELETE_CLIENT = 'delete_client';
export const EDIT_CLIENT = 'edit_client';

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

//PROJECTS ACTION
export function fetchProjects() {
    const request = axios.get('http://localhost:3005/Uptakes');
    
    return {
        type: FETCH_PROJECTS,
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