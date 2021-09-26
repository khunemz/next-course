import React from "react";
import { useRouter } from "next/router";
import { baseUrl } from "../../utils";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import styles from "./../../styles/post.module.css";
import axios from "axios";

export default function Post({ post }) {
  console.log(post);
  const {
    id,
    title,
    description,
    created_at,
    updated_at,
    created_by,
    updated_by,
  } = post[0];

  TimeAgo.addLocale(en);

  const timeAgo = new TimeAgo("en-US");

  function editPost() {
    console.log("edit post ", id);
  }

  function deletePost(id) {
    var answer = window.confirm("Delete data?");
    if (answer) {
      console.log("answer : ", answer);
      fetch(`${baseUrl}/api/posts/${id}`, { method: 'DELETE'});
      // axios.delete(`${baseUrl}/api/posts/${id}`, {});
    }
    // if(answer) {
    //   axios.delete(`${baseUrl}/api/posts/${id}`, {
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     data: {}
    //   })
    //   .then((response) => {
    //     console.log(response);
    //   })
    // }
  }
  return (
    <>
      <div>
        <div className="card">
          <div className="card-body">
            <section className="card-title">{title}</section>
            <div className="card-text">{description}</div>
          </div>
          <div className={styles.footerBlock}>
            <button
              className="btn btn-outline-info mr-5"
              style={{ marginRight: "5px" }}
              onClick={() => editPost()}
            >
              Edit
            </button>
            <button
              className="btn btn-outline-danger mr-5"
              onClick={() => deletePost()}
            >
              Delete
            </button>
            <span>posted {timeAgo.format(new Date(created_at))}</span>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps({ params }) {
  const res = await fetch(`${baseUrl}/api/posts/${params.id}`);
  const post = await res.json();
  // if (!post) {
  //   return {
  //     notFound: true,
  //   };
  // }
  return {
    props: { post },
  };
}

// export async function getStaticPaths() {
//   const res = await fetch(`${baseUrl}/api/posts`);
//   const posts = await res.json();
//   console.log("POST", posts);
//   const paths = posts.map((post) => ({
//     params: { id: post.id.toString() },
//   }));
//   return { paths, fallback: false };
// }
