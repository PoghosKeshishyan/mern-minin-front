import { useCallback, useContext, useEffect, useState } from "react"
import {useParams} from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { LinkCard } from "../components/LinkCard";

export function DetailPage() {
  const {token} = useContext(AuthContext);
  const [link, setLink] = useState(null);
  const {id} = useParams();

  useEffect(() => {
    getLink();
  }, [])

  const getLink = useCallback(async() => {

    try {
      const resp = await axios.get('https://busy-crow-beanie.cyclic.app/api/link/' + id, {
        headers: {
          Authorization: 'Bearer ' + token,
        }
      });

      setLink(resp.data);


    } catch (error) {
      console.log(error);
    }

  }, [token, id])

  return (
    <>
      {
        link && <LinkCard link={link} />
      }
    </>
  )
}
