import axios from 'axios';

const request = axios.create({
    headers: {
        'Content-Type': 'application/json',
    }
})


export async function post(endpoint: string, data: any) {
    return request.post(endpoint, data)
}

export async function get(endpoint: string) {
    return await request.get(endpoint)
}



