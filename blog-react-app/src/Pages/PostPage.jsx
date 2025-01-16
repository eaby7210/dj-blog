import { useLoaderData } from "react-router-dom";
import apiClient from "../assets/axios/interceptor";

/* eslint-disable react-refresh/only-export-components */
export async function loader({ params }) {
  const res = await apiClient(`/posts/${params.id}`);
  return res.data;
}

export function Component() {
  const post = useLoaderData();
  console.log(post);
  return (
    <>
      <header
        className="masthead"
        style={{ backgroundImage: `url(${post?.image})` }}
      >
        <div className="container position-relative px-4 px-lg-5">
          <div className="row gx-4 gx-lg-5 justify-content-center">
            <div className="col-md-10 col-lg-8 col-xl-7">
              <div className="post-heading">
                <h1>{post?.title}</h1>

                <span className="meta">Posted by {post?.author}</span>
              </div>
            </div>
          </div>
        </div>
      </header>
      <article className="mb-4">
        <div className="container px-4 px-lg-5">
          <div className="row gx-4 gx-lg-5 justify-content-center">
            <div className="col-md-10 col-lg-8 col-xl-7">
              <p>{post?.content}</p>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
