import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";
import type { NoteTag } from "@/types/note";

interface NotesPageProps {
  params: { slug: string[] };
}

export default async function NotesPage({ params }: NotesPageProps) {
  const queryClient = new QueryClient();

  const tag = params.slug?.[0];

  await queryClient.prefetchQuery({
    queryKey: ["notes", "", 1, tag],
    queryFn: () =>
      fetchNotes(1, 12, tag === "all" ? undefined : (tag as NoteTag)),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}
