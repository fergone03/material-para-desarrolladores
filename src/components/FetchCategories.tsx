const [categories, setCategories] = useState<Category[]>([]);
useEffect(() => {
  fetchCategories();
}, []);

const fetchCategories = async () => {
  setLoading(true);
  const { data, error } = await supabase
    .from<Category>("categories")
    .select("*")
    .order("name");
  if (error) console.error(error);
  else setCategories(data || []);
  setLoading(false);
};
