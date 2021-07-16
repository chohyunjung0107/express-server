const router = global.express.Router();
const members = global.mocks.members;
const jwtAuth = require('../middlewares/jwtAuth.js');


//로그인 api
router.post('/login/', function(request, response) {
  // TODO: 로그인 가능한 회원인지 확인
  jwtAuth.tokenCreate(request, response, request.body);
});

//미들웨어는 경로와 함수 사이에 넣어준다.
router.get('/login/', jwtAuth.tokenCheck, function(request, response) {
  response.status(200).send({
    decoded: request.decoded
  });
});

//멤버스 api
router.post('/', function(request, response) {
  members.push(request.body);
  console.log('Done members post', members);
  response.status(200).send({
    result: 'Created'
  });
});

router.get('/', function(request, response) {
  console.log('Done members get', members);
  //요청하고 200(정상)응답
  response.status(200).send({
    result: 'Readed',
    members: members
  });
});

router.patch('/', function(request, response) {
  members[request.body.index] = request.body.member;
  console.log('Done members patch', members);
  response.status(200).send({
    result: 'Updated'
  });
});

router.delete('/:index', function(request, response) {
  const index = Number(request.params.index);
  members.splice(index, 1);
  console.log('Done members delete', members);
  response.status(200).send({
    result: 'Deleted'
  });
});

module.exports = router;
