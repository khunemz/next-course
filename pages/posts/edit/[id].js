import React from 'react'
import { baseUrl } from "../../../utils";

export default function Edit({ post }) {
  const { id, title ,description , slug } = post;

  function updatePost() {
      
  }

  return (
    <>
      <h3>Edit page</h3>
      <div className="card">
        <div className="card-body">
          <form>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">Post title</label>
              <input type="text" name="title" placeholder="Title" className="form-control" value={title} />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">Post description</label>
              <input type="text" name="description" placeholder="Description" className="form-control" value={description} />
            </div>
            <div className="mb-3">
              <label htmlFor="slug" className="form-label">Post slug</label>
              <input type="text" name="slug" placeholder="Slug" className="form-control" value={slug} />
            </div>

            <div>
              <button className="btn btn-outline-success"
                onClick={ () => updatePost() }
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