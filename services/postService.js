
import { baseUrl } from "./../utils";
export const postService = {
  delete: _delete
}

function _delete(id) {
  return fetch(`${baseUrl}/api/posts/${id}`, {method: 'DELETE'});
}