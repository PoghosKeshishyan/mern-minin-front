import { useContext, useEffect, useState } from "react"
// import { useHttp } from "../hooks/http.hook";
import axios from 'axios';
import { AuthContext } from "../context/AuthContext";

export function AuthPage() {
  const auth = useContext(AuthContext);
  // const {loading, request} = useHttp();
  const [loading, setLoading] = useState(false);



  const [form, setForm] = useState({
    email: 'poxos@mail.ru',
    password: 'poxos123',
  });

  const onChangeInput = (e) => {
    setForm({...form, [e.target.name]: e.target.value});
  }

  const registerHandler = async() => {
    try {
      // const data = await request('/api/auth/register', 'POST', {...form});
      const data = await axios.post('https://busy-crow-beanie.cyclic.app/api/auth/register', form);
      setLoading(true);
      alert(data.data.message);
    } catch (error) {}
  }

  const loginHandler = async() => {
    try {
      const data = await axios.post('https://busy-crow-beanie.cyclic.app/api/auth/login', form);
      auth.login(data.data.token, data.data.userId);

    } catch(e){}
  }

  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <h1>Сократи Ссылку</h1>
        <div className="card blue darken-1">
          <div className="card-content white-text">
            <span className="card-title">Авторизация</span>
            <div>
              <div className="input-field">
                <input placeholder="email" value={form.email} id="email" onChange={onChangeInput} type="text" name='email'  style={{background: 'white'}} />
              </div>
              <div className="input-field">
                <input placeholder="password" value={form.password} id="password" onChange={onChangeInput} type="password" name='password' style={{background: 'white'}} />
              </div>
            </div>
          </div>
          <div className="card-action">
            <button 
              disabled={loading}
              onClick={loginHandler}
              className="btn yellow darken-4" style={{ marginRight: '10px' }}
            >
                Войти
            </button>

            <button 
              disabled={loading}
              onClick={registerHandler}
              className="btn grey lighten-1 black-text" 
            >
              Регистрация
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
