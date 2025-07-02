import { useEffect } from 'react';
import supabase from '../utils/supabase';



export default function FetchCategories() {


  useEffect(() => {
    fetchCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchCategories() {

    const { error } = await supabase
      .from('categories')
      .select('*')
      .order('name');
    if (error) console.error(error);


  }

  return null; // or render categories as needed
}
