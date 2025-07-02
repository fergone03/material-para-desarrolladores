import { Card, Button, Container } from 'react-bootstrap';
import { FaExternalLinkAlt, FaEdit, FaTrash, FaCheck, FaTimes } from 'react-icons/fa';
import './DashboardLayout.css';

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
  category?: Category;
  is_common: boolean;
};

type DashboardLayoutProps = {
  pages: Page[];
  categories: Category[];
  selectedCategory: string;
  onCategorySelect: (categoryId: string) => void;
  onEditPage: (page: Page) => void;
  onDeletePage: (pageId: string, isCommon: boolean) => void;
  loading?: boolean;
  role?: string | null;
  onAddCategory?: (name: string) => Promise<any>;
  onEditCategory?: (id: string, newName: string) => Promise<any>;
  onDeleteCategory?: (id: string) => Promise<any>;
};

// Helper function to split array into chunks
const chunkArray = <T,>(array: T[], chunkSize: number): T[][] => {
  return Array(Math.ceil(array.length / chunkSize)).fill(null).map((_, i) => array.slice(i * chunkSize, i * chunkSize + chunkSize));
};

import { useState } from 'react';


export default function DashboardLayout(props: DashboardLayoutProps) {
  const [newCategoryName, setNewCategoryName] = useState('');
  const [editingCategoryId, setEditingCategoryId] = useState<string|null>(null);
  const [editingCategoryName, setEditingCategoryName] = useState('');

  const {
    pages,
    categories,
    selectedCategory,
    onCategorySelect,
    onEditPage,
    onDeletePage,
    loading = false,
    role,
    onAddCategory,
    onEditCategory,
    onDeleteCategory
  } = props;

  // Filter pages by selected category
  const filteredPages = selectedCategory === 'all' 
    ? pages 
    : pages.filter(page => page.category_id === selectedCategory);

  // Group pages by category
  const pagesByCategory = filteredPages.reduce((acc, page) => {
    const categoryName = page.category?.name || 'Uncategorized';
    if (!acc[categoryName]) {
      acc[categoryName] = [];
    }
    acc[categoryName].push(page);
    return acc;
  }, {} as Record<string, Page[]>);

  // Split categories into two columns
  const categoryEntries = Object.entries(pagesByCategory);
  const categoryColumns = chunkArray(categoryEntries, Math.ceil(categoryEntries.length / 2));

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
    <Container className="py-4">
      
      {/* Categories Filter */}
      <div className="d-flex flex-wrap gap-2 justify-content-center mb-4 align-items-center">
        {role === 'admin' && (
          <div className="d-flex gap-2 align-items-center me-3" style={{ minWidth: 220 }}>
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="Nueva categoría"
              value={newCategoryName}
              onChange={e => setNewCategoryName(e.target.value)}
              style={{ maxWidth: 120 }}
              onKeyDown={async (e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  if (!newCategoryName.trim()) return;
                  const err = await onAddCategory?.(newCategoryName.trim());
                  if (err) alert('Error al añadir categoría');
                  else setNewCategoryName('');
                }
              }}
            />
            <Button
              size="sm"
              style={{ backgroundColor: '#008cba', borderColor: '#008cba' }}
              onClick={async () => {
                if (!newCategoryName.trim()) return;
                const err = await onAddCategory?.(newCategoryName.trim());
                if (err) alert('Error al añadir categoría');
                else setNewCategoryName('');
              }}
            >Añadir</Button>
          </div>
        )}

        <Button 
          variant={selectedCategory === 'all' ? 'primary' : 'outline-primary'}
          className="rounded-pill px-3"
          onClick={() => onCategorySelect('all')}
          style={{
            color: selectedCategory === 'all' ? '#fff' : '#008cba',
            backgroundColor: selectedCategory === 'all' ? '#008cba' : '#fff',
            borderColor: '#008cba'
          }}
        >
          Todas
        </Button>
        {categories.map(category => (
          <div key={category.id} className="d-flex align-items-center gap-1">
            {role === 'admin' && editingCategoryId === category.id ? (
              <>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  value={editingCategoryName}
                  onChange={e => setEditingCategoryName(e.target.value)}
                  style={{ maxWidth: 100 }}
                  autoFocus
                />
                <Button size="sm" variant="success" onClick={async () => {
                  if (!editingCategoryName.trim()) return;
                  const err = await onEditCategory?.(category.id, editingCategoryName.trim());
                  if (err) alert('Error al editar categoría');
                  setEditingCategoryId(null);
                  setEditingCategoryName('');
                }}><FaCheck /></Button>
                <Button size="sm" variant="secondary" onClick={() => {
                  setEditingCategoryId(null);
                  setEditingCategoryName('');
                }}><FaTimes /></Button>
              </>
            ) : (
              <>
                <Button
                  variant={selectedCategory === category.id ? 'primary' : 'outline-primary'}
                  className="rounded-pill px-3"
                  onClick={() => onCategorySelect(category.id)}
                  style={{
                    color: selectedCategory === category.id ? '#fff' : '#008cba',
                    backgroundColor: selectedCategory === category.id ? '#008cba' : '#fff',
                    borderColor: '#008cba'
                  }}
                >
                  {category.name}
                </Button>
                {role === 'admin' && (
                  <>
                    <Button size="sm" variant="outline-secondary" onClick={() => {
                      setEditingCategoryId(category.id);
                      setEditingCategoryName(category.name);
                    }}><FaEdit /></Button>
                    <Button size="sm" variant="outline-danger" onClick={async () => {
                      if (window.confirm('¿Seguro que quieres borrar esta categoría?')) {
                        const err = await onDeleteCategory?.(category.id);
                        if (err) alert('Error al borrar categoría');
                      }
                    }}><FaTrash /></Button>
                  </>
                )}
              </>
            )}
          </div>
        ))}
      </div>

      {/* Two-column layout for categories */}
      <div className="row g-3 g-md-4 mt-2 mt-md-4">
        {categoryColumns.map((column: [string, Page[]][], colIndex: number) => (
          <div key={colIndex} className="col-12 col-md-6">
            {column.map(([category, categoryPages]: [string, Page[]]) => (
              <div key={category} className="mb-5">
                <h2 className="h4 mb-3 text-center">{category}</h2>
                <div className="row g-3 g-md-4">
                  {categoryPages.map((page: Page) => (
                    <div key={page.id} className="col-12">
                      <Card className="h-100 shadow-sm">
                        <Card.Body className="d-flex flex-column">
                          <div className="d-flex justify-content-between align-items-center mb-2">
                            <span className="h5 mb-0">{page.title}</span>
                            {(role === 'admin' || !page.is_common) && (
                              <div className="d-flex gap-2 page-action-buttons">
                                <Button 
                                  variant="outline-primary" 
                                  size="sm"
                                  onClick={() => onEditPage(page)}
                                  className="edit-btn"
                                  title="Editar"
                                  style={{ borderColor: '#008cba', color: '#008cba', background: 'transparent', transition: 'all 0.15s' }}
                                >
                                  <FaEdit />
                                </Button>
                                <Button 
                                  variant="outline-danger" 
                                  size="sm"
                                  onClick={() => onDeletePage(page.id, page.is_common)}
                                  className="delete-btn"
                                  title="Borrar"
                                  style={{ borderColor: '#dc3545', color: '#dc3545', background: 'transparent', transition: 'all 0.15s' }}
                                >
                                  <FaTrash />
                                </Button>
                              </div>
                            )}
                          </div>
                          <Card.Text className="text-muted mb-2">
                            {page.description || 'Sin descripción'}
                          </Card.Text>
                          <div className="mt-auto d-flex justify-content-end">
                            <a 
                              href={page.url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-decoration-none"
                            >
                              <Button variant="link" className="p-0" style={{ color: '#008cba' }}>
                                Visitar <FaExternalLinkAlt className="ms-1" />
                              </Button>
                            </a>
                          </div>
                        </Card.Body>
                      </Card>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>  
        {filteredPages.length === 0 && (
          <div className="text-center py-5">
            <p className="text-muted">Sin páginas para mostrar en esta categoría.</p>
          </div>
        )}
    </Container>
  );
}
