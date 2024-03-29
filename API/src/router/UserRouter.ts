import { Request, Response } from "express";
import { DAL } from "../database/DAL";
import { User } from "../database/models/User";
import BaseRouter from "./BaseRouter";


export default class ApiRouter extends BaseRouter {
    constructor() {
        super();
        this.initRoutes();
    }

    private initRoutes(): void {
        this.RegisterPostRoute("/user", this.getUser.bind(this));
        this.RegisterPostRoute("/create", this.createUser.bind(this));
        this.RegisterPostRoute("/edit", this.editUser.bind(this));
        this.RegisterPostRoute("/delate", this.delateUser.bind(this));
    }

    private async getUser(req: Request, res: Response): Promise<void> {
        const { userId } = req.body;

        const user: User = await User.findByPk(userId);

        res.json({ user });
    }

    private async createUser(req: Request, res: Response): Promise<void> {
        const { newUser } = req.body;

        const user: User = await User.create({ ...newUser });

        res.json({ user });
    }

    private async editUser(req: Request, res: Response): Promise<void> {
        const { update } = req.body;

        const user: User = await DAL.tryGetUser(req.body.token.user.id);
        await user.update({ ...update });

        res.json({ user });
    }

    private async delateUser(req: Request, res: Response): Promise<void> {
        const user: User = await User.findByPk(req.body.token.user.id);
        user.destroy();

        res.json({ message: "ok" });
    }
}
