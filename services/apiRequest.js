import axios from 'axios';



const http = axios.create({
    headers: {
        "Content-Type": 'application/json',
    },
});

async function get(url, params) {
    if (url && params) {
        const res= await http.get(url, {params});
    }
}

export  {
    get,
}