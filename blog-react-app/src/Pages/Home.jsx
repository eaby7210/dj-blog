/* eslint-disable react-refresh/only-export-components */
import { Link, useLoaderData } from "react-router-dom";
import apiClient from "../assets/axios/interceptor";

export async function loader() {
  const res = await apiClient("/posts/");
  return res.data;
}
export function Component() {
  const postData = useLoaderData();
  console.log(postData);
  return (
    <>
      <header className="masthead">
        <div className="container position-relative px-4 px-lg-5">
          <div className="row gx-4 gx-lg-5 justify-content-center">
            <div className="col-md-10 col-lg-8 col-xl-7">
              <div className="site-heading">
                <h1>Clean Blog</h1>
                <span className="subheading">Explore Blogs</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container px-4 px-lg-5">
        <div className="row gx-4 gx-lg-5 justify-content-center">
          <div className="col-md-10 col-lg-8 col-xl-7">
            {postData?.map((post) => (
              <>
                <Link to={`blog/${post?.id}`}>
                  <div className="post-preview">
                    <h2 className="post-title">{post?.title}</h2>
                    <p className="post-meta">
                      Posted by {post?.author}
                      {/* on September 24, 2023 */}
                    </p>
                  </div>
                </Link>

                <hr className="my-4" />
              </>
            ))}

            {/* <div className="d-flex justify-content-center mb-4">
              <a className="btn btn-sm btn-primary text-uppercase" href="#!">
                Older Posts
              </a>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
}
