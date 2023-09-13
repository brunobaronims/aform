import api from "./api";
import { PostParams } from "@/interfaces/post.interfaces";

async function create(params: PostParams) {
  const result = await api.post('post', params);

  return result;
}

const postApi = {
  create
};

export default postApi;