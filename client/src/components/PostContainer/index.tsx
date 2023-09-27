'use client';

import { useGlobalStateStore } from '@/providers/GlobalState';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import postApi from '@/services/postApi';
import { PostParams } from '@/interfaces/post.interfaces';
import PostContainerUI from './ui';
import LoadingIndicator from '../LoadingIndicator';

export default function PostContainer() {
  const state = useGlobalStateStore((state) => state);
  const [posts, setPosts] = useState<PostParams[]>([]);
  const token = state.user?.token;

  const { isLoading, isError, data } = useQuery({
    queryKey: ['posts', token],
    queryFn: async () => {
      if (state.checkingUser) return null;

      if (!token) return console.error('Unauthorized user');

      const { data } = await postApi.get(token);

      return data;
    }
  });

  useEffect(() => {
    if (state.checkingUser || isLoading) return;

    setPosts(data);
  }, [state.checkingUser, isLoading, data]);

  if (state.checkingUser || !state.user || isLoading)
    return (
      <section className='flex h-screen w-1/3 flex-col items-center justify-center'>
        <LoadingIndicator />
      </section>
    );

  if (isError) return <span>Error</span>;

  return <PostContainerUI posts={posts} />;
}
