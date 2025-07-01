import { useEffect, useState } from 'react';
import supabase from '../utils/supabase';
import { Button, Form, Modal } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa';
import DashboardLayout from '../components/DashboardLayout';
import type { Page, Category } from '../types';
import type { User } from '@supabase/supabase-js';

const Dashboard = () => {
  // ...otros estados

  // Handler para borrar categoría
  const handleDeleteCategory = async (categoryId: string) => {
    if (role !== 'admin') {
      alert('Solo los administradores pueden borrar categorías');
      return;
    }
    if (!window.confirm('¿Seguro que quieres borrar esta categoría?')) return;
    try {
      // 1. Verificar si existen páginas asociadas a la categoría en 'pages'
      const { count: countPages, error: countPagesError } = await supabase
        .from('pages')
        .select('id', { count: 'exact', head: true })
        .eq('category_id', categoryId);
      if (countPagesError) throw countPagesError;
      if ((countPages ?? 0) > 0) {
        alert('No puedes borrar una categoría que contiene páginas públicas. Elimina o reasigna las páginas primero.');
        return;
      }
      // 2. Verificar si existen páginas asociadas a la categoría en 'user_pages'
      const { count: countUserPages, error: countUserPagesError } = await supabase
        .from('user_pages')
        .select('page_id', { count: 'exact', head: true })
        .eq('category_id', categoryId);
      if (countUserPagesError) throw countUserPagesError;
      if ((countUserPages ?? 0) > 0) {
        alert('No puedes borrar una categoría que contiene páginas privadas de usuarios. Elimina o reasigna las páginas primero.');
        return;
      }
      // 3. Si no hay páginas asociadas, borrar la categoría
      const { error } = await supabase
        .from('categories')
        .delete()
        .eq('id', categoryId);
      if (error) throw error;
      await fetchCategories();
    } catch (error: any) {
      // Mejor feedback de error
      const message = error?.message || error?.details || JSON.stringify(error) || 'Error desconocido';
      console.error('Error borrando categoría:', message, error);
      alert('Error borrando categoría: ' + message);
    }
  };


  // Handler para editar categoría
  const handleEditCategory = async (categoryId: string, newName: string) => {
    if (role !== 'admin') {
      alert('Solo los administradores pueden editar categorías');
      return;
    }
    if (!newName.trim()) {
      alert('El nombre no puede estar vacío');
      return;
    }
    try {
      const { error } = await supabase
        .from('categories')
        .update({ name: newName.trim() })
        .eq('id', categoryId);
      if (error) throw error;
      await fetchCategories();
    } catch (error) {
      console.error('Error editando categoría:', error);
      alert('Error editando categoría');
    }
  };

  // Handler para añadir categoría
  const handleAddCategory = async (name: string) => {
    if (role !== 'admin') {
      alert('Solo los administradores pueden añadir categorías');
      return;
    }
    if (!name.trim()) {
      alert('El nombre no puede estar vacío');
      return;
    }
    try {
      const { error } = await supabase
        .from('categories')
        .insert([{ name: name.trim() }]);
      if (error) throw error;
      await fetchCategories();
    } catch (error) {
      console.error('Error añadiendo categoría:', error);
      alert('Error añadiendo categoría');
    }
  };

  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [pages, setPages] = useState<Page[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>('all');
  const [editingPage, setEditingPage] = useState<Page | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    url: '',
    description: '',
    category_id: '',
    is_common: false
  });

  // Fetch categories on component mount
  useEffect(() => {
    fetchCategories();
    fetchUser();
  }, []);

  // Fetch pages when user changes
  useEffect(() => {
    if (user) {
      fetchPages();
    }
  }, [user]);

  const fetchCategories = async () => {
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .order("name");
    if (error) console.error(error);
    else setCategories(data || []);
  };

  const fetchUser = async () => {
    const { data } = await supabase.auth.getUser();
    if (data.user) {
      setUser(data.user);
      const { data: profileData } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", data.user.id)
        .single();
      setRole(profileData?.role || null);
    }
    setLoading(false);
  };

  const fetchPages = async () => {
    setLoading(true);
    try {
      // Fetch public pages
      const { data: publicPages, error: publicError } = await supabase
        .from("pages")
        .select("*, category:category_id(name)")
        .eq("is_common", true)
        .order("title");

      if (publicError) throw publicError;

      let userPages: Page[] = [];
      if (user) {
        // Fetch user's private pages
        const { data: userPagesData, error: userPagesError } = await supabase
          .from("user_pages")
          .select(`page:page_id(*, category:category_id(name))`)
          .eq("user_id", user.id);

        if (userPagesError) throw userPagesError;
        userPages = userPagesData.map((item: any) => ({
          ...item.page,
          is_common: false
        }));
      }

      // Combine and deduplicate pages
      const allPages = [...(publicPages || []), ...userPages];
      const uniquePages = Array.from(new Map(allPages.map(p => [p.id, p])).values());
      
      setPages(uniquePages as Page[]);
    } catch (error) {
      console.error("Error fetching pages:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategorySelect = (categoryId: string | null) => {
    setSelectedCategory(categoryId);
  };

  const handleEditPage = (page: Page) => {
    setEditingPage(page);
    setFormData({
      title: page.title,
      url: page.url,
      description: page.description || '',
      category_id: page.category_id || '',
      is_common: page.is_common
    });
    setShowForm(true);
  };

  const handleDeletePage = async (pageId: string, isCommon: boolean) => {
    if (!window.confirm('Are you sure you want to delete this page?')) return;
    
    try {
      if (isCommon && role !== 'admin') {
        alert('Only admins can delete common pages');
        return;
      }

      if (isCommon) {
        // Delete common page
        const { error } = await supabase
          .from('pages')
          .delete()
          .eq('id', pageId);
        
        if (error) throw error;
      } else if (user) {
        // Remove user-page association
        const { error } = await supabase
          .from('user_pages')
          .delete()
          .eq('user_id', user.id)
          .eq('page_id', pageId);
        
        if (error) throw error;
      }

      // Refresh pages
      await fetchPages();
    } catch (error) {
      console.error('Error deleting page:', error);
      alert('Error deleting page');
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
  
    if (!user) return;

    try {
    console.log('handleSubmit - formData:', formData);
    const pageData = {
      title: formData.title.trim(),
      url: formData.url.trim(),
      description: formData.description.trim() || null,
      category_id: formData.category_id || null,
      is_common: formData.is_common && role === 'admin'
    };
    console.log('handleSubmit - pageData:', pageData);

    if (editingPage) {
      console.log('Actualizando página existente...');
      // Update existing page
      const { error } = await supabase
        .from('pages')
        .update(pageData)
        .eq('id', editingPage.id);
      console.log('Resultado update page:', { error });

      if (error) {
        console.error('Error al actualizar página:', error);
        throw error;
      }
    } else {
      console.log('Creando nueva página...');
      // Create new page
      const { data, error } = await supabase
        .from('pages')
        .insert([pageData])
        .select();
      console.log('Resultado insert page:', { data, error });

      if (error) {
        console.error('Error al insertar página:', error);
        throw error;
      }
      console.log('Página insertada correctamente:', data);

      // If it's a private page, create the user-page association
      if (!pageData.is_common && data?.[0]?.id) {
        console.log('Asociando página al usuario...');
        const userPagesResult = await supabase
          .from('user_pages')
          .insert([{
            user_id: user.id,
            page_id: data[0].id
          }]);
        const userPageError = userPagesResult?.error;
        console.log('Resultado de asociación user_pages:', userPagesResult);

        if (userPageError) {
          if (
            userPageError.message?.includes('duplicate key value') ||
            userPageError.message?.includes('already exists')
          ) {
            // No mostrar error
          } else {
            const msg = userPageError.message || userPageError.details || JSON.stringify(userPageError);
            alert('La página se guardó, pero no se pudo asociar al usuario: ' + msg);
          }
        }
      }
    }

    // Refresh data
    console.log('Refrescando datos...');
    await fetchPages();
    setShowForm(false);
  } catch (error: any) {
    console.error('Error saving page (raw):', error);
    let msg = '';
    if (error) {
      msg = error.message || error.details || JSON.stringify(error);
    } else {
      msg = 'Error desconocido (error es null o undefined)';
    }
    alert('Error saving page: ' + msg);
      [name]: value
    }));
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setFormData(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  // Filter pages based on selected category
  const filteredPages = selectedCategory === 'all' 
    ? pages 
    : pages.filter(page => page.category_id === selectedCategory);

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container p-3">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="mb-0">Dashboard</h1>
        <Button 
          variant="primary" 
          onClick={() => {
            setEditingPage(null);
            setFormData({
              title: '',
              url: '',
              description: '',
              category_id: '',
              is_common: role === 'admin'
            });
            setShowForm(true);
          }}
          className="d-flex align-items-center"
        >
          <FaPlus className="me-2" /> Add Page
        </Button>
      </div>

      <DashboardLayout
        pages={filteredPages}
        categories={categories}
        selectedCategory={selectedCategory}
        onCategorySelect={handleCategorySelect}
        onEditPage={handleEditPage}
        onDeletePage={handleDeletePage}
        loading={loading}
        role={role}
        onAddCategory={handleAddCategory}
        onEditCategory={handleEditCategory}
        onDeleteCategory={handleDeleteCategory}
      />

      {/* Add/Edit Page Modal */}
      <Modal show={showForm} onHide={() => setShowForm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editingPage ? 'Edit Page' : 'Add New Page'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Title *</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>URL *</Form.Label>
              <Form.Control
                type="url"
                name="url"
                value={formData.url}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={formData.description}
                onChange={handleInputChange}
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Select
                name="category_id"
                value={formData.category_id || ''}
                onChange={handleInputChange}
              >
                <option value="">Select category</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            
            {(role === 'admin' || !editingPage) && (
              <Form.Group className="mb-3">
                <Form.Check
                  type="checkbox"
                  label="Common page (visible to all users)"
                  name="is_common"
                  checked={formData.is_common}
                  onChange={handleCheckboxChange}
                  disabled={role !== 'admin' && editingPage?.is_common}
                />
              </Form.Group>
            )}
            
            <div className="d-flex justify-content-end gap-2">
              <Button variant="secondary" onClick={() => setShowForm(false)}>
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                {editingPage ? 'Save Changes' : 'Add Page'}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Dashboard;
