export async function CheckIfUserExists(req: any, res: any, next: any, Users: any) {
    const username = req.headers.username;
    let user = await Users.findOne({ username });
    if (user !== null && user.username === username) {
        res.status(409).json({
            msg: "User already exists!"
        })
    }
    else {
        next();
    }
}
