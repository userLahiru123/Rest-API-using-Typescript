import express from "express";

import { createUser, getUserByEmail } from "../db/users";
import { authentication, random } from "../helpers";

export const register = async (req: express.Request, res: express.Response): Promise<any> => {
    try {
        const { email, password, username } = req.body;

        if (!email || !username || !password) {
            return res.sendStatus(400);
        }

        const existingUser = await getUserByEmail(email);

        if (existingUser) {
            return res.sendStatus(400);
        }

        const salt = random();
        const user = await createUser({
            email,
            username,
            authentication: {
                salt,
                password: authentication(salt, password),
            }
        });

        return res.sendStatus(200).json(user);

    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};