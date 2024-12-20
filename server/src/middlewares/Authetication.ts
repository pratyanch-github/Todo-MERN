import jwt from "jsonwebtoken";

export const AuthenticateUser = (req: any, res: any, next: any) => {

    const username: string = req.body.user || req.query.user;
    const authHeader: string = req.headers.authorization;
    const JWT_SECRET: string = process.env.JWT_SECRET!;

    // console.log("in auth middleware")
    // console.log(username, TOKEN)

    if (username && authHeader) {
        const TOKEN: string = authHeader.split(" ")[1]

        // console.log(TOKEN)

        if (TOKEN) {
            try {
                // console.log(jwt.verify(TOKEN, JWT_SECRET))

                const decode: any = jwt.verify(TOKEN, JWT_SECRET);
                if (decode.username === username) {
                    next()
                }
                else {
                    console.log("User authentication failed: " + username + " " + TOKEN)
                    res.status(403).json({
                        msg: "Authentication failed!"
                    })
                }
            }
            catch (err) {
                console.log("User authentication failed: " + username + " " + TOKEN)
                res.status(403).json({
                    msg: "Authentication failed!"
                })
            }
        }
        else {
            console.log("User authentication failed: " + username + " " + "NO TOKEN")
            res.status(403).json({
                msg: "Authentication failed!"
            })
        }
    }
    else {
        console.log("User authentication failed: " + "username and TOKEN are not provided in Headers")
        res.status(403).json({
            msg: "Authentication failed!"
        })
    }
}

