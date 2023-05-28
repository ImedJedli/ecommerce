

const sendToken=(user,statusCode,res)=> {
      
      const token = user.getJwToken();

      const options = {
            expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000
      ),
      httpOnly:true
      
      };

      const { _id, email, role } = user;
      
      res.status(statusCode).cookie('token', token,options).json({
            success :true,
            token,
            user: {
                  _id,
                  email,
                  role,
                }, 
      });
}

module.exports = sendToken;