const expresss = require("express");
const UserService = require("../services/users");

const userApi = (app) => {
    const router = expresss.Router();
    app.use("/user", router);

    router.get("/:userId", async function (req, res, next) {
        const { userId } = req.params;
        try {
            const user = await UserService.getUser(userId);

            res.status(200).json({
                user,
                message: user
                    ? "Usuario encontrado"
                    : "No se encontró ningún usuario con ese ID",
            });
        } catch (err) {
            next(err);
        }
    });

    router.post("/getUsers", async function (req, res, next) {
        const { body: where } = req;
        try {
            const users = await UserService.getUsers(where);

            res.status(200).json({
                users,
                message:
                    users.length > 0
                        ? "Usuarios listados"
                        : "No se encontraron registros",
            });
        } catch (err) {
            next(err);
        }
    });

    router.post("/", async function (req, res, next) {
        const { body: data } = req;
        try {
            const userCreated = await UserService.createUser(data);
            res.status(201).json({
                userCreated,
            });
        } catch (error) {
            next(error);
        }
    });

    router.put("/:userId", async function (req, res, next) {
        const { body: data } = req;
        const { userId } = req.params;

        try {
            const userUpdated = await UserService.updateUser(data, userId);

            res.status(201).json({
                userUpdated,
            });
        } catch (error) {
            next(error);
        }
    });

    router.delete("/:userId", async function (req, res, next) {
        const { userId } = req.params;
        const { body: data } = req;

        try {
            const userDeleted = await UserService.deleteUser(userId, data);

            res.status(200).json({
                userId: userDeleted,
            });
        } catch (error) {
            next(error);
        }
    });

    router.post("/signin", async function (req, res, next) {
        const { body: data } = req;
        try {
            const user = await UserService.signin(data);
            res.status(201).json({
                user,
            });
        } catch (error) {
            next(error);
        }
    });

    router.put("/changePassword/:userId", async function (req, res, next) {
        const { body: data } = req;
        const { userId } = req.params;

        try {
            const userUpdated = await UserService.changePassword({
                ...data,
                userId,
            });

            res.status(201).json({
                userUpdated,
            });
        } catch (error) {
            next(error);
        }
    });
}

module.exports = userApi;
