import { useState, useEffect } from 'react';
import supabase from '../utils/supabase';

type Category = {
  id: string;
  name: string;
};

export default function FetchCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchCategories() {
    setLoading(true);
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name');
    if (error) console.error(error);
    else setCategories(data || []);
    setLoading(false);
  }

  return null; // or render categories as needed
}
