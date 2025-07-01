import React from "react";

type Page = {
  id: string;
  title: string;
  url: string;
  description?: string | null;
  category?: { id: string; name: string } | null;
};

type GroupedPagesListProps = {
  pages: Page[];
};

type GroupedPages = {
  category: string;
  pages: Page[];
};

const GroupedPagesList: React.FC<GroupedPagesListProps> = ({ pages }) => {
  // Agrupar páginas por categoría
  const groupedPages = pages.reduce((groups: GroupedPages[], page) => {
    const catName = page.category?.name ?? "Sin categoría";
    const group = groups.find((g) => g.category === catName);
    if (group) {
      group.pages.push(page);
    } else {
      groups.push({ category: catName, pages: [page] });
    }
    return groups;
  }, []);

  if (pages.length === 0) {
    return <p>No hay páginas para mostrar.</p>;
  }

  return (
    <>
      {groupedPages.map(({ category, pages }) => (
        <div key={category} className="mb-4">
          <h4>{category}</h4>
          <ul>
            {pages.map((page) => (
              <li key={page.id}>
                <a href={page.url} target="_blank" rel="noopener noreferrer">
                  {page.title}
                </a>
                {page.description ? ` - ${page.description}` : ""}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
};

export default GroupedPagesList;
