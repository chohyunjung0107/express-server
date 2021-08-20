// import = 전역변수. require 
const express = global.express = require('express');
const app = express();

// Swagger
const swaggerUi = require('swagger-ui-express');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(require('./swagger.json')));

// Mock data
global.mocks = {
  members: require('./mocks/members.json'),
  records: require('./mocks/records.json')
};

// CROSS, Methods, Headers
app.use(function(request, response, next) {
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'OPTIONS, PUT, PATCH, DELETE'); //옵션: 올바른 권한을 가졌는지 확인 
  // response.setHeader('Access-Control-Allow-Headers', 'Content-Type'); //통신 시 제이슨 or xml 타입 체크 
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-jwt-token'); //헤더에 x-jwt-token 추가
  next();
});

// API router
app.use(express.json()); //제이슨 형식을 사용하겟다(바디부분에 포스트, 패치부분을 허용)
app.use('/api/v1/members', require('./routes/members.js')); 
app.use('/api/v1/records', require('./routes/records.js')); 
app.use('/api/v1/search', require('./routes/search.js'));

// Start server
global.location = new URL('http://localhost:3100');
//서버를 듣겠다.
app.listen(global.location.port, function() {
  console.log('Express server listening on ' + global.location.origin + '/api/v1/members');
  console.log('Swagger on ' + global.location.origin + '/api-docs');
});
