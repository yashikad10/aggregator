
export async function getCollectionBySlug(slug: string) {
  
  const response = await fetch(`/api/collections/${slug}`);
  if (!response.ok) {
    throw new Error('Failed to fetch collection');
  }
  return response.json();
}

