const express = require('express');
const app = express();
app.use(express.json());

// 가상의 DB
const database = {
  nicknames: ['user1', 'user2'],
};

app.post('/api/check-nickname', (req, res) => {
  const { nickname } = req.body;

  if (database.nicknames.includes(nickname)) {
    res.json({ isNicknameAvailable: false });
  } else {
    res.json({ isNicknameAvailable: true });
  }
});

app.listen(3000, () => {
  console.log('서버가 3000 포트에서 실행 중입니다.');
});