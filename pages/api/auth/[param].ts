import type { NextApiRequest, NextApiResponse } from 'next'



export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const { param } = req.query

    switch (param) {
        case 'login':

    }


    res.status(200).json(param)
}

function login(username:string, password:string) {

}