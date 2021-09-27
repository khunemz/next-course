import React, { useState }  from 'react'
import { baseUrl } from "../../../utils";
import axios from 'axios'

export default function Edit({ post }) {
  // const { id, title, description, slug } = post;
  const [id, setId] = useState(post.id ? post.id : 0);
  const [title, setTitle] = useState(post.title ? post.title : '');
  const [description, setDescription] = useState(post.description ? post.description : '')
  const [slug, setSlug] = useState(post.slug ? post.slug : '')
  
  async function updatePost() {
    var answer = window.confirm("Update data?");
    if (answer) {
      await axios.put(`${baseUrl}/api/posts/update/${id}`, { method: 'PUT' });
      router.back();
    }
  }

  return (
    <>
      <h3>Edit POST {id}</h3>
      <div className="card">
        <div className="card-body">
          <form>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">Post title</label>
              <input type="text" name="title" placeholder="Title" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">Post description</label>
              <input type="text" name="description" placeholder="Description" className="form-control" value={description}  onChange={(e) => setDescription(e.target.value)} />
            </div>
            <div className="mb-3">
              <label htmlFor="slug" className="form-label">Post slug</label>
              <input type="text" name="slug" placeholder="Slug" className="form-control" value={slug} onChange={(e) => setSlug(e.target.value)} />
            </div>

            <div>
              <button className="btn btn-outline-success"
                onClick={() => updatePost()}
              >Save</button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}


export async function getServerSideProps({ params }) {
  const res = await fetch(`${baseUrl}/api/posts/${params.id}`);
  const data = await res.json();
  const post = data.data[0];
  if (!post) {
    return {
      notFound: true,
    };
  }
  return {
    props: { post },
  };
}