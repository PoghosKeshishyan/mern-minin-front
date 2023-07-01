import { useCallback, useContext, useEffect, useState } from "react"
import { AuthContext } from '../context/AuthContext';
import { LinksList } from "../components/LinksList";
import axios from 'axios';

export function LinksPage() {
  const [links, setLinks] = useState();
  const {token} = useContext(AuthContext);

  useEffect(() => {
    fetchLinks();
  }, [])

  const fetchLinks = useCallback(async() =>{
    try {

      const resp = await axios.get('http://localhost:3000/api/link/', {
        headers: {
          Authorization: 'Bearer ' + token,
        }
      });

      setLinks(resp.data);

    } catch (error) {
      console.log(error);
    }
  }, [])

  return (
    <>
      <LinksList links={links} />
    </>
  )
}
