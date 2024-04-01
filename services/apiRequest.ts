import axios from 'axios';


type ApiRequest = {
    get: (endpoint: string) => Promise<any>
    post: (endpoint: string, data: any) => Promise<any>
    put?: (endpoint: string, data: any) => Promise<any>
    delete?: (endpoint: string) => Promise<any>
}


function getHeader() {
    return {
        'Content-Type': 'application/json',
    }
}

async function post(endpoint: string, data: any) {
    return axios.post(endpoint, data, {
        headers: getHeader()
    })
}

async function get(endpoint: string) {
    return await axios.get(endpoint, {
        headers: getHeader()
    })
}

export const apiRequest: ApiRequest = {
    post: post,
    get: get
}


