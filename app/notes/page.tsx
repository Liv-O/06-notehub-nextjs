import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import { fetchNotes } from '@/lib/api';
import NotesClient from './Notes.client';

const Notes = async () => {
  const queryClient = new QueryClient();
  // значення за замовчуванням при SSR
  const initialPage = 1;
  const initialSearch = '';

  await queryClient.prefetchQuery({
    queryKey: ['notes', initialSearch, initialPage],
    queryFn: () => fetchNotes(initialPage, initialSearch),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient />
    </HydrationBoundary>
  );
};

export default Notes;
