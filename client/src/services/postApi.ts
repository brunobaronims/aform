import api from './api';
import { PostParams } from '@/interfaces/post.interfaces';

async function create(params: PostParams, token: string) {
  await api.post('post', params, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}

async function get(token: string) {
  const { data } = await api.get('post', {
    headers: {
      Authorization: `Bearer ${token}`
    },
    params: {
      take: 10
    }
  });

  return data;
}

const postApi = {
  create,
  get
};

export default postApi;
