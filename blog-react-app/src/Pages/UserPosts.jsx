/* eslint-disable react-refresh/only-export-components */
import { Link, useLoaderData } from "react-router-dom";
import apiClient from "../assets/axios/interceptor";

export async function loader() {
  const res = await apiClient("/userposts");
  return res.data;
}

export function Component() {
  const data = useLoaderData();
  console.log(data);
  return (
    <>
      <header className="container pt-5 mt-5">
        <div className=" px-4 py-3 px-lg-5">
          <div className="row gx-4 gx-lg-5 justify-content-center">
            <div className="col-md-10 col-lg-8 col-xl-7">
              <div className="post-heading">
                <h1>Your Blog Posts</h1>

                <span className="meta">Explore your blog posts</span>
              </div>
            </div>
          </div>
        </div>
        <hr />
      </header>
      <section className="container mt-4">
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Image</th>
                <th>Author</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
              {data.map((post) => (
                <tr key={post.id}>
                  <td>
                    <Link
                      to={`/userblogs/${post.id}`}
                      className="text-decoration-none"
                    >
                      {post.id}
                    </Link>
                  </td>
                  <td>
                    <Link
                      to={`/userblogs/${post.id}`}
                      className="text-decoration-none"
                    >
                      {post.title}
                    </Link>
                  </td>
                  <td>
                    <Link
                      to={`/userblogs/${post.id}`}
                      className="text-decoration-none"
                    >
                      {post.image ? (
                        <img
                          src={post.image}
                          alt={post.title}
                          style={{ width: "100px", height: "auto" }}
                        />
                      ) : (
                        "No Image"
                      )}
                    </Link>
                  </td>
                  <td>
                    <Link
                      to={`/userblogs/${post.id}`}
                      className="text-decoration-none"
                    >
                      {post.author}
                    </Link>
                  </td>
                  <td>
                    <Link
                      to={`/userblogs/${post.id}`}
                      className="text-decoration-none"
                    >
                      {new Date(post.created_at).toLocaleDateString()}
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
