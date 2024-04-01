// noinspection TypeScriptValidateJSTypes

import type {NextApiRequest, NextApiResponse} from 'next'
import hashPassword, {comparePassword} from "@/utils/password";
import {Prisma, prisma} from "@/services/prismaClient";
import jwt from "jsonwebtoken";
import UserCreateInput = Prisma.UserCreateInput;


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const {param} = req.query
    try {
        switch (param) {
            case "login":
                if (req.method === "POST") {
                    const body = req.body
                    const loginResult = await login(body)
                    if (!loginResult) {
                        res.status(200).json({message: "Tài khoản hoặc mật khẩu không đúng"})
                    } else {
                        res.status(200).json(loginResult)
                    }
                }
                break;
            case "register":
                if (req.method === "POST") {
                    const user = req.body
                    const registerResult = await register(user)
                    if (registerResult) {
                        res.status(201).json({message: "Đăng ký thành công"})
                    } else {
                        res.status(302).json({message: "Người dùng đã tồn tại"})
                    }
                }
                break;
            case "logout":
                logout().then(() => {
                    res.status(200).json({message: "Đăng xuất thành công"})
                });
                break;

        }
    } catch (e) {
        res.status(500).json({message: "Lỗi hệ thống"})
        res.status(200).json(param)
    }

    async function logout() {
        res.setHeader("Set-Cookie", `token=; HttpOnly; Path=/; SameSite=Strict; Secure`)
    }

    async function login(params: any) {
        const user = await prisma.user.findUnique({
            where: {
                username: params.username
            },
        });

        if (!user) {
            return null
        }
        const result = await comparePassword(params.password, user.password)
        if (result) {
            const resUser = {...user, password: undefined}
            let expires = "3h"
            if (params.remember) expires= "7d"
            const token = jwt.sign(resUser, process.env.JWT_SECRET!, {algorithm:"HS256",expiresIn: expires})
            res.setHeader("Set-Cookie", `token=${token}; HttpOnly; Path=/; SameSite=Strict; Secure`)
            return {...user, password: undefined, token: token}
        }
        return null
    }

    async function register(user: UserCreateInput) {
        if (!user) return null
        const existedUser = await prisma.user.findUnique({
            where: {
                username: user.username
            }
        })

        if (!existedUser) {
            if (user.role) return
            const hashPass = await hashPassword(user.password)
            await prisma.user.create({
                data: {
                    ...user,
                    password: hashPass
                }
            })

            return true
        }
    }
}