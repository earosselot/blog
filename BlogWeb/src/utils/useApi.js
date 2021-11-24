import {useState} from 'react';
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
    setIsQuerying(true);
    await fetch(`${baseUrl}/${id}`, {
      method: 'DELETE',
    });
    const copy = [...data];
    // TODO: agregar una confirmacion para eliminar.
    // TODO: los eliminados no se actualizan en el front (si en el server y despues de actualizar)
    console.log(copy);
    copy.slice(data.findIndex((item) => item._id === id), 1);
    console.log(copy);
    setData(copy);
    setIsQuerying(false);
  }

  const api = {
    list,
    add,
    edit,
    remove,
  }

  return [data, isQuerying, api];
}

export default useApi;
