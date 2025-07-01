import React, { useEffect, useState } from "react";
import supabase from "../utils/supabase";
import { Modal, Button } from 'react-bootstrap';

type Category = {
  id: string;
  name: string;
};

type Page = {
  id: string;
  title: string;
  url: string;
  description: string | null;
  category_id: string | null;
  category?: {
    id: string;
    name: string;
  };
  is_common: boolean;
};

interface Props {
  showForm: boolean;
  setShowForm: (show: boolean) => void;
  onSave: (pageData: Partial<Page>) => Promise<void>;
  pageToEdit: Page | null;
}

const PublicPagesManager: React.FC<Props> = ({ showForm, setShowForm, onSave, pageToEdit }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState<string | null>(null);

  // Reset form when editing a page
  useEffect(() => {
    if (pageToEdit) {
      setTitle(pageToEdit.title);
      setUrl(pageToEdit.url);
      setDescription(pageToEdit.description || "");
      setCategoryId(pageToEdit.category_id);
    } else {
      setTitle("");
      setUrl("");
      setDescription("");
      setCategoryId(null);
    }
  }, [pageToEdit]);

  const resetForm = () => {
    setTitle("");
    setUrl("");
    setDescription("");
    setCategoryId(null);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .order("name");
    if (error) {
      console.error('Error fetching categories:', error);
    } else if (data) {
      // Filter out any categories with null names and ensure name is a string
      const validCategories = data
        .filter(cat => cat && typeof cat.name === 'string')
        .map(cat => ({
          id: cat.id,
          name: String(cat.name)
        }));
      setCategories(validCategories);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !url.trim()) return alert("Título y URL obligatorios");
    if (!categoryId) return alert("Por favor, selecciona una categoría");

    try {
      await onSave({
        id: pageToEdit?.id,
        title: title.trim(),
        url: url.trim(),
        description: description.trim() || null,
        category_id: categoryId,
        is_common: true,
      });
      
      setShowForm(false);
    } catch (error) {
      console.error('Error saving page:', error);
    }
  };

  return (
    <Modal 
      show={showForm} 
      onHide={() => {
        setShowForm(false);
        resetForm();
      }}
      centered
      size="lg"
      backdrop="static"
    >
      <Modal.Header closeButton>
        <Modal.Title>{pageToEdit ? 'Editar Página Pública' : 'Añadir Nueva Página Pública'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit} className="d-flex gap-2 mb-3 flex-wrap">
          <input
            type="text"
            placeholder="Título"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="form-control flex-grow-1"
            style={{ minWidth: "180px" }}
          />
          <input
            type="url"
            placeholder="URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
            className="form-control flex-grow-1"
            style={{ minWidth: "180px" }}
          />
          <select
            value={categoryId || ""}
            onChange={(e) => setCategoryId(e.target.value || null)}
            className="form-select"
            style={{ minWidth: "140px" }}
            required
          >
            <option value="" disabled>
              Selecciona una categoría
            </option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Descripción"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="form-control flex-grow-1"
            style={{ minWidth: "180px" }}
          />
          <div className="w-100 d-flex justify-content-end gap-2 mt-3">
            <Button 
              variant="outline-secondary"
              type="button"
              onClick={() => {
                setShowForm(false);
                resetForm();
              }}
            >
              Cancelar
            </Button>
            <Button type="submit" variant="primary">
              {pageToEdit ? 'Actualizar' : 'Añadir'}
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default PublicPagesManager;
