import api from "./api";
import { PostParams } from "@/interfaces/post.interfaces";

async function create(params: PostParams, token: string) {
  const result = await api.post('post', params, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return result;
}

const postApi = {
  create
};

export default postApi;