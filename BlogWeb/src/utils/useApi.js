import {useState} from 'react';
import Axios from 'axios';

import { extractObjectProperties, insertObjectProperties} from './objectPropertiesCache';


function useApi(baseUrl, queryString = '') {
  const [data, setData] = useState([]);
  const [isQuerying, setIsQuerying] = useState(false);

  const list = async () => {
    setIsQuerying(true);
    const url = `${baseUrl}?${queryString}`;
    const res = await fetch(url);
    const resData = await res.json();
    setData(resData);
    setIsQuerying(false);
  };

  const add = async (title) => {
    setIsQuerying(true);
    const res = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        "Content-Type": "application/json",
      },
      body: JSON.stringify({title})
    });
    const resData = await res.json();
    setData([...data, { id: resData.id, title }]);
    setIsQuerying(false);
  }

  const edit = async (id, newObject) => {
    setIsQuerying(true);

    // "unpopulate props" for the http request
    const cachedProperties = extractObjectProperties(newObject);
    const url = `${baseUrl}/${id}`;
    const res = await fetch(url, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newObject),
    });

    // "populate props" again
    insertObjectProperties(newObject, cachedProperties);
    const copy = [...data];
    const index = copy.findIndex((item) => item._id === id);
    copy[index] = newObject;
    setData(copy);
    setIsQuerying(false);
  }

  const remove = async (id) => {
    const deleteOk = window.confirm('really delete?');
    if (deleteOk) {
      setIsQuerying(true);
      try {
        await Axios({
          method: 'DELETE',
          withCredentials: true,
          url: `${baseUrl}/${id}`,
        });
        const copy = [...data];
        const deleteItemIndex = copy.findIndex((item) => item._id === id);
        copy.splice(deleteItemIndex, 1);
        setData(copy);
      } catch (e) {
        console.log(e.message);
      } finally {
        setIsQuerying(false);
      }
    }
  }

  const login = async (loginData) => {
    setIsQuerying(true);
    const res = await Axios({
      method: 'POST',
      data: loginData,
      withCredentials: true,
      url: `${baseUrl}/login`,
    });
    if (res.status === 200) {
      setData(res.data.user);
    }
    setIsQuerying(false);
  }

  const me = async () => {
    setIsQuerying(true);
    try {
      const res = await Axios({
        method: 'GET',
        withCredentials: true,
        url: `${baseUrl}/me`,
      });
      if (res.status === 200) {
        setData(res);
      } else {
        setData([]);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsQuerying(false);
    }
  }

  const logout = async () => {
    setIsQuerying(true);
    try {
      const res = await Axios({
        method: 'GET',
        withCredentials: true,
        url: `${baseUrl}/logout`,
      });
      setData([]);
      document.cookie = 'connect.sid= ; expires = Thu, 01 Jan 1970 00:00:01 GMT'
    } catch (e) {
      console.error(e);
    } finally {
      setIsQuerying(false);
    }
  }

  const api = {
    list,
    add,
    edit,
    remove,
    login,
    me,
    logout,
  }

  return [data, isQuerying, api];
}

export default useApi;
