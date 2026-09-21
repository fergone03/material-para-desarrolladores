import { useEffect } from 'react';
import api from '../utils/api';



export default function FetchCategories() {


  useEffect(() => {
    fetchCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchCategories() {

    const { error } = await api
      .from('categories')
      .select('*')
      .order('name');
    if (error) console.error(error);


  }

  return null; // or render categories as needed
}
