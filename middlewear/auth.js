const jwt = require('jsonwebtoken')
function auth(req,res,next){
    const token = req.headers.authorization?.split(' ')[1]
    console.log(token);
    if(token){
        const decoded = jwt.verify(token,'masai')
        if(decoded){
            console.log(decoded);
            req.body.userID = decoded.userID
            req.body.user = decoded.user
            next()
        }
        else{
            res.send({msg:'Please Login!'})
        }

    }
    else{
        res.send({msg:'Please Login token missing!'})
    }
}
module.exports = {
    auth
}