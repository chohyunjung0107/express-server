const jwt = require("jsonwebtoken");
const privateKey = "privateKey";
// privateKey를 바탕으로 JWT가 암호환된 토큰을 생성한다.

const tokenCreate = function (request, response, member) {
	//로그인 정보를 암호화 토큰으로 생성
	jwt.sign(
		member,
		privateKey,
		{
			expiresIn: "1d",
			subject: "login",
		},
		function (error, token) {
			if (error)
				return response.status(403).json({
					message: error.message,
				});
			response.status(200).send({
				token: token,
			});
		}
	);
};

const tokenCheck = function (request, response, next) {
	//암호화된 토큰에 로그인 정보를 풀어준다
	const token = request.headers["x-jwt-token"];
	if (!token)
		return response.status(403).json({
			message: "You need to login first",
		});
	jwt.verify(token, privateKey, function (error, decoded) {
		if (error)
			return response.status(403).json({
				message: error.message,
			});
		request.decoded = decoded;
		//미들웨어 함수가 끝났으니 메인 함수로 돌아가
		next();
	});
};

module.exports = {
	tokenCreate: tokenCreate,
	tokenCheck: tokenCheck,
};
