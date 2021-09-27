import React from "react";
import { useRouter } from "next/router";
import { baseUrl } from "../../utils";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import styles from "./../../styles/post.module.css";
import axios from "axios";
import * as postService from "./../../services/index";
import { route } from "next/dist/server/router";

export default function Post({ post }) {
  const router = useRouter()

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
    router.push(`edit/${id}`);
  }

  async function destroyPost(id) {
    var answer = window.confirm("Delete data?");
    if (answer) {
      await axios.post(`${baseUrl}/api/posts/destroy/${id}`, {});
      router.back();
    }
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
              onClick={() => editPost(id)}
            >
              Edit
            </button>
            <button
              className="btn btn-outline-danger mr-5"
              onClick={() => destroyPost(id)}
            >
              Delete
            </button>
            <span>posted {timeAgo.format(new Date(updated_at))}</span>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps({ params }) {
  const res = await fetch(`${baseUrl}/api/posts/${params.id}`);
  const data = await res.json();
  const post = data.data;
  if (!post) {
    return {
      notFound: true,
    };
  }
  return {
    props: { post },
  };
}