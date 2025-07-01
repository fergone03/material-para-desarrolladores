import { useEffect, useState, useRef } from 'react';
import { Button, Form, Modal, Spinner } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaPlus } from 'react-icons/fa';
import DashboardLayout from '../components/DashboardLayout';
import Footer from '../components/Footer';
import supabase from '../utils/supabase';
import '../styles/dashboard.css';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pages, setPages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [editingPage, setEditingPage] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    // For Add Page button scroll behavior
  });
  const footerRef = useRef(null);
  const addBtnRef = useRef(null);
  const [addBtnOffset, setAddBtnOffset] = useState(32);

  // Dynamically adjust Add Page button position to never overlap footer
  useEffect(() => {
    function handlePosition() {
      if (!footerRef.current || !addBtnRef.current) return;
      const footerRect = footerRef.current.getBoundingClientRect();
      const btnRect = addBtnRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      // If button would overlap footer, move it up
      if (btnRect.bottom > footerRect.top) {
        const overlap = btnRect.bottom - footerRect.top;
        setAddBtnOffset(32 + overlap + 16); // 16px extra spacing
      } else {
        setAddBtnOffset(32);
      }
    }
    handlePosition();
    window.addEventListener('scroll', handlePosition);
    window.addEventListener('resize', handlePosition);
    return () => {
      window.removeEventListener('scroll', handlePosition);
      window.removeEventListener('resize', handlePosition);
    };
  }, []);


  // Fetch categories on component mount
  useEffect(() => {
    const fetchData = async () => {
      await fetchCategories();
      await fetchUser();
    };
    fetchData();
  }, []);

  // Fetch pages when user changes
  useEffect(() => {
    if (user) {
      fetchPages();
    } else {
      // Fetch only common pages for guests
      fetchCommonPages();
    }
  }, [user]);

  // Fetch only common pages for guests
  const fetchCommonPages = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('pages')
      .select('*, category:categories(*)')
      .eq('is_common', true)
      .order('title');
    if (error) {
      setPages([]);
    } else {
      setPages(data || []);
    }
    setLoading(false);
  };

  // Toast helpers
  const notifyPageAdded = () => toast.success('Página agregada');
  const notifyPageEdited = () => toast.info('Página editada');
  const notifyPageDeleted = () => toast.info('Página eliminada');

  const fetchCategories = async () => {
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .order("name");
    if (error) console.error(error);
    else setCategories(data || []);
  };

  const fetchUser = async () => {
    try {
      const { data: { user: currentUser } } = await supabase.auth.getUser();
      if (currentUser) {
        setUser(currentUser);
        const { data: profileData } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", currentUser.id)
          .single();
        setRole(profileData?.role || null);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    } finally {
      setLoading(false);
    }
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

      let userPages = [];
      if (user) {
        // Fetch user's private pages
        const { data: userPagesData, error: userPagesError } = await supabase
          .from("user_pages")
          .select(`page:page_id(*, category:category_id(name))`)
          .eq("user_id", user.id);

        if (userPagesError) throw userPagesError;
        userPages = (userPagesData || []).map(item => ({
          ...item.page,
          is_common: false
        }));
      }

      // Combine and deduplicate pages
      const allPages = [...(publicPages || []), ...userPages];
      const uniquePages = Array.from(new Map(allPages.map(p => [p.id, p])).values());

      setPages(uniquePages);
    } catch (error) {
      console.error("Error fetching pages:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const handleEditPage = (page) => {
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

  const handleDeletePage = async (pageId, isCommon) => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar esta página?')) return;

    try {
      if (isCommon && role !== 'admin') {
        toast.error('Solo los administradores pueden eliminar páginas comunes');
        return;
      }

      if (isCommon) {
        // Solo admins pueden eliminar páginas comunes
        const { error } = await supabase
          .from('pages')
          .delete()
          .eq('id', pageId);

        if (error) {
          toast.error('Error al eliminar la página');
        } else {
          fetchPages();
          notifyPageDeleted();
        }
      } else if (user) {
        // Eliminar relación en user_pages
        const { error: relationError } = await supabase
          .from('user_pages')
          .delete()
          .eq('user_id', user.id)
          .eq('page_id', pageId);

        if (relationError) {
          toast.error('Error al eliminar la página');
          return;
        }

        // También eliminar la página privada del usuario
        const { error: pageError } = await supabase
          .from('pages')
          .delete()
          .eq('id', pageId); // elimina la página sin importar el creador

        if (pageError) {
          toast.error('Error al eliminar la página');
        } else {
          fetchPages();
          notifyPageDeleted();
        }
      }
    } catch (error) {
      console.error('Error deleting page:', error);
      toast.error('Error al eliminar la página');
    }
  };


  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!user) return;

    try {
      const pageData = {
        title: formData.title?.trim(),
        url: formData.url?.trim(),
        description: formData.description?.trim() || null,
        category_id: formData.category_id || null,
        is_common: formData.is_common && role === 'admin'
      };

      let userPageError = null;

      if (editingPage) {
        // Update existing page
        const { error } = await supabase
          .from('pages')
          .update(pageData)
          .eq('id', editingPage.id);

        if (error) {
          toast.error('Error al actualizar la página');
          return;
        }

        notifyPageEdited();
      } else {
        // Create new page
        const { data, error } = await supabase
          .from('pages')
          .insert([pageData])
          .select();

        if (error) {
          toast.error('Error al agregar la página');
          return;
        }

        // If it's a private page, create the user-page association
        if (!pageData.is_common && data?.[0]?.id) {
          const { error: insertError } = await supabase
            .from('user_pages')
            .insert([{
              user_id: user.id,
              page_id: data[0].id
            }]);

          userPageError = insertError;

          if (insertError) {
            toast.error('Error al asociar la página al usuario');
          }
        }

        notifyPageAdded();
      }

      // Actualizar lista de páginas
      await fetchPages();
      setShowForm(false);

      if (userPageError) throw userPageError;
    } catch (error) {
      console.error('Error saving page:', error);
      alert('Error saving page');
    }
  };


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (event) => {
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
        <Spinner animation="border" />
      </div>
    );
  }

  const handleAddClick = () => {
    setEditingPage(null);
    setFormData({
      title: '',
      url: '',
      description: '',
      category_id: '',
      is_common: role === 'admin'
    });
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  return (
    <div className="dashboard-container">
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      {/* Add Page Floating Button solo si user está logueado */}
      {user && (
        <Button
          ref={addBtnRef}
          className="add-page-btn"
          style={{
            position: 'fixed',
            bottom: addBtnOffset,
            right: 32,
            zIndex: 1050,
            backgroundColor: '#008cba',
            borderColor: '#008cba',
            borderRadius: '50%',
            width: 56,
            height: 56,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 24
          }}
          onClick={handleAddClick}
        >
          <FaPlus />
        </Button>
      )}

      <div className="main-content">
        <DashboardLayout
          pages={filteredPages}
          categories={categories}
          selectedCategory={selectedCategory}
          onCategorySelect={handleCategorySelect}
          onEditPage={handleEditPage}
          onDeletePage={handleDeletePage}
          loading={loading}
          role={role}
          onAddCategory={async (name) => {
            const { data, error } = await supabase.from('categories').insert([{ name }]).select();
            if (!error && data) setCategories(prev => [...prev, ...data]);
            return error;
          }}
          onEditCategory={async (id, newName) => {
            const { error } = await supabase.from('categories').update({ name: newName }).eq('id', id);
            if (!error) setCategories(prev => prev.map(cat => cat.id === id ? { ...cat, name: newName } : cat));
            return error;
          }}
          onDeleteCategory={async (id) => {
            const { error } = await supabase.from('categories').delete().eq('id', id);
            if (!error) setCategories(prev => prev.filter(cat => cat.id !== id));
            return error;
          }}
        />
      </div>

      {/* Modal para añadir/editar página */}
      {user && (
        <Modal show={showForm} onHide={handleCloseForm} centered>
          <Modal.Header closeButton>
            <Modal.Title>{editingPage ? 'Editar página' : 'Añadir página'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Título *</Form.Label>
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
                <Form.Label>Descripción</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Categoría</Form.Label>
                <Form.Select
                  name="category_id"
                  value={formData.category_id || ''}
                  onChange={handleInputChange}
                >
                  <option value="">Seleccionar categoría</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              {/* Solo los admins pueden ver la opción de Common page */}
              {role === 'admin' && (
                <Form.Group className="mb-3">
                  <Form.Check
                    type="checkbox"
                    name="is_common"
                    label="Página común (visible a todos los usuarios)"
                    checked={formData.is_common}
                    onChange={handleCheckboxChange}
                  />
                </Form.Group>
              )}
              <div className="d-flex justify-content-end gap-2">
                <Button variant="secondary" onClick={handleCloseForm}>
                  Cancelar
                </Button>
                <Button variant="primary" type="submit" style={{ backgroundColor: '#008cba', borderColor: '#008cba' }}>
                  {editingPage ? 'Guardar cambios' : 'Añadir página'}
                </Button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
}

export default Dashboard;
