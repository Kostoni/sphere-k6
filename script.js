import http from 'k6/http';

const TARGET_HOST = __ENV.TARGET_HOST;

export default function () {
  let headers = {
    'Content-Type': 'application/json',
  }

  let res = http.get(`http://${TARGET_HOST}/auth`, {
    headers: headers,
  });

  if ("members" in res.json() && Array.isArray(res.json("members"))) {
    let ids = [];
    for (let item of res.json("members")) {
      ids.push(item["id"]);
    }
    console.log(ids);
  } else {
    let randomKey = Object.keys(res.json())[Math.floor(Object.keys(Math.random()*res.json()).length)];

    console.log(randomKey, res.json(randomKey));
  }
  
  const token = res.json('token');

  headers = {
    'Content-Type': 'application/json',
    'Authorization': token
  };

  const body = { 
    'userName': 'Test user',
    'userMail': 'testuser@mail.com',
  };

  res = http.post(`http://${TARGET_HOST}/post`, JSON.stringify(body), {
    headers: headers,
  });

  // Задание 6

}