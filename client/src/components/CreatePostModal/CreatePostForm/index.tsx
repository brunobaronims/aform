'use client';

import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import CreatePostFormUI from './ui';
import { PostDescription, PostParams } from '@/interfaces/post.interfaces';
import postApi from '@/services/postApi';
import { useGlobalStateStore } from '@/providers/GlobalState';

export default function CreatePostForm() {
  const state = useGlobalStateStore((state) => state);

  const createPostMutation = useMutation({
    mutationFn: async (postData: PostParams) => {
      if (!state.user?.token) return console.error('Unauthorized user');

      await postApi.create(postData, state.user.token);
    },
    onSuccess() {
      toast.info('Success');
    },
    onError(e: Error) {
      toast.error(e.message);
    }
  });

  const onSubmit = (postDescription: PostDescription) => {
    if (!state.user?.handle || !state.user?.id) {
      return console.error('Unauthorized user');
    }

    const postData: PostParams = {
      description: postDescription.description,
      handle: state.user.handle,
      userId: state.user.id
    };
    createPostMutation.mutate(postData);
  };

  return (
    <CreatePostFormUI
      isLoading={createPostMutation.isLoading}
      onSubmit={onSubmit}
    />
  );
}
