import React, {useState} from 'react';

import superagent from 'superagent';

function App() {
  const [token, setToken] = useState('');
  const [saved, setSaved] = useState('');

  function login(e) {
    e.preventDefault();
    superagent.get('http://localhost:4000/login')
      .then(response => {
        setToken( response.headers['auth']);
      })
      .catch(err => setToken(err.message));
  }

  function save(e) {
    e.preventDefault();
    superagent.post('http://localhost:4000/save')
      .set('authorization', `bearer ${token}`)
      .then(response => {
        setSaved(response.text);
      })
      .catch(err => setSaved(err.response.text));
  }

  return (
    <div>
      <button onClick={login}>Login</button>
      <button onClick={save}>Save</button>
      <h3>Token: {token}</h3>
      <h3>Save Response: {saved}</h3>
    </div>
  )
}

export default App;
