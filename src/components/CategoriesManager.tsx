import React, { useEffect, useState } from "react";
import supabase from "../utils/supabase";

type Category = { id: string; name: string };

export default function CategoriesManager() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("categories").select("*").order("name");
    if (error) console.error(error);
    else setCategories(data || []);
    setLoading(false);
  };

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategoryName.trim()) return alert("Nombre no válido");
    const { error } = await supabase.from("categories").insert([{ name: newCategoryName.trim() }]);
    if (error) alert(error.message);
    else {
      setNewCategoryName("");
      fetchCategories();
    }
  };

  return (
    <div className="mb-4">
      <h3>Categorías</h3>
      {loading && <p>Cargando categorías...</p>}
      <ul>
        {categories.map((cat) => (
          <li key={cat.id}>{cat.name}</li>
        ))}
      </ul>
      <form onSubmit={handleAddCategory} className="mt-2">
        <input
          type="text"
          placeholder="Nueva categoría"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          required
        />
        <button type="submit" className="btn btn-sm btn-primary ms-2">
          Añadir
        </button>
      </form>
    </div>
  );
}
