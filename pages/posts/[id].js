import React from "react";
import { useRouter } from "next/router";
import { baseUrl } from "../../utils";
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'


export default function Post({ post }) {
  const {
    id,
    title,
    description,
    created_at,
    updated_at,
    created_by,
    updated_by,
  } = post[0];

  TimeAgo.addLocale(en)

  const timeAgo = new TimeAgo('en-US')

  function editPost(id) {
    console.log('edit post ', id);
  }

  function deletePost(id){
    console.log('deleting post ', id)
  }
  return (
    <>
      <div>
        <div className="card">
          <div className="card-body">
            <section className="card-title">{title}</section>
            <div className="card-text">{description}</div>
          </div>
          <div className="card-footer">

            <div className="">
              <button 
                className="btn btn-outline-info mr-5" 
                style={{marginRight: '5px'}}
                onClick={() => editPost(id)}
                >Edit</button>
              <button className="btn btn-outline-danger mr-5"
                onClick={() => deletePost(id)}
              >Delete</button>

            </div>
            <div className="">
              <span className="d-block float-right">posted { timeAgo.format(new Date(created_at)) }</span> 
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getStaticProps({ params }) {
  const res = await fetch(`${baseUrl}/api/posts/${params.id}`);
  const post = await res.json();
  console.log(post);
  if (!post) {
    return {
      notFound: true,
    };
  }
  return {
    props: { post },
  };
}

export async function getStaticPaths() {
  const res = await fetch(`${baseUrl}/api/posts`);
  const posts = await res.json();
  const paths = posts.map((post) => ({
    params: { id: post.id.toString() },
  }));
  return { paths, fallback: false };
}
