import React, { useState } from 'react'
import { baseUrl } from "../../../utils";
import axios from 'axios'
import { useRouter } from "next/router";


export default function Create() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('')
  const [slug, setSlug] = useState('')

  async function createPost(e) {
    e.preventDefault();
    
    var answer = window.confirm("Save data?");
    if (answer) {
      const data = {
        title, description, slug
      };
      await axios.post(`${baseUrl}/api/posts/store`, data);
      router.push('/posts');
    }
  }

  return (
    <>
      <h3>Create POST</h3>
      <div className="card">
        <div className="card-body">
          <form onSubmit={(e) => createPost(e)}>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">Post title</label>
              <input type="text" name="title" placeholder="Title" className="form-control" onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">Post description</label>
              <input type="text" name="description" placeholder="Description" className="form-control" onChange={(e) => setDescription(e.target.value)} />
            </div>
            <div className="mb-3">
              <label htmlFor="slug" className="form-label">Post slug</label>
              <input type="text" name="slug" placeholder="Slug" className="form-control" onChange={(e) => setSlug(e.target.value)} />
            </div>

            <div>
              <button type="submit" className="btn btn-outline-success">Save</button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
