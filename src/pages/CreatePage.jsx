import { useContext, useState } from "react"
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

export function CreatePage() {
  const auth = useContext(AuthContext);
  const [link, setLink] = useState('');
  const navigate = useNavigate();


  const pressHandler = async (e) => {
    if (e.key === 'Enter') {
      try {

        const data = await axios.post('https://busy-crow-beanie.cyclic.app/api/link/generate', { from: link }, {
          headers: {
            Authorization: 'Bearer ' + auth.token,
          }
        });

        navigate('/detail/' + data.data.link._id);

      } catch (error) {
        console.log(error);
      }



    }
  }

  return (
    <div className="row">
      <div className="col s8 offser-s2" style={{ paddingTop: '2rem' }}>
        <div className="input-field">
          <input placeholder="Вставьте ссылку" value={link} id="link" onChange={e => setLink(e.target.value)} type="text" onKeyPress={pressHandler} />
        </div>
      </div>
    </div>
  )
}
