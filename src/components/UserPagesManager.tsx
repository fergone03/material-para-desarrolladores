import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import supabase from '../utils/supabase';

type Category = {
  id: string;
  name: string;
};

type Page = {
  id?: string;
  title: string;
  url: string;
  description: string | null;
  category_id: string | null;
  is_common: boolean;
};

interface Props {
  userId: string;
  showForm: boolean;
  setShowForm: (show: boolean) => void;
  onSave: (pageData: Partial<Page>) => Promise<void>;
  pageToEdit: Page | null;
}

const UserPagesManager: React.FC<Props> = ({ userId, showForm, setShowForm, onSave, pageToEdit }) => {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);

  // Reset form when pageToEdit changes
  useEffect(() => {
    if (pageToEdit) {
      setTitle(pageToEdit.title);
      setUrl(pageToEdit.url);
      setDescription(pageToEdit.description || '');
      setCategoryId(pageToEdit.category_id);
    } else {
      resetForm();
    }
  }, [pageToEdit]);

  // Fetch categories on component mount
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name');
    
    if (error) {
      console.error('Error fetching categories:', error);
    } else if (data) {
      setCategories(data);
    }
  };

  const resetForm = () => {
    setTitle('');
    setUrl('');
    setDescription('');
    setCategoryId(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !url.trim()) {
      alert('Por favor completa todos los campos requeridos');
      return;
    }

    try {
      await onSave({
        id: pageToEdit?.id,
        title: title.trim(),
        url: url.trim(),
        description: description.trim() || null,
        category_id: categoryId,
        is_common: false
      });
      
      setShowForm(false);
      resetForm();
    } catch (error) {
      console.error('Error saving page:', error);
      alert('Error al guardar la página');
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
        <Modal.Title>{pageToEdit ? 'Editar Página' : 'Añadir Nueva Página'}</Modal.Title>
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
            style={{ minWidth: '180px' }}
          />
          <input
            type="url"
            placeholder="URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
            className="form-control flex-grow-1"
            style={{ minWidth: '180px' }}
          />
          <select
            value={categoryId || ''}
            onChange={(e) => setCategoryId(e.target.value || null)}
            className="form-select"
            style={{ minWidth: '140px' }}
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
            placeholder="Descripción (opcional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="form-control flex-grow-1"
            style={{ minWidth: '180px' }}
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

export default UserPagesManager;
