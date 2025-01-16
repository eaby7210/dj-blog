/* eslint-disable react-refresh/only-export-components */
import { redirect, useActionData } from "react-router-dom";
import apiClient from "../assets/axios/interceptor";
import { PostForm } from "../assets/PostForm";

export async function action({ request }) {
  const formData = await request.formData();

  try {
    // Submit the form data using Axios instance
    const response = await apiClient.post("/userposts/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.status === 201) {
      return redirect("/userblogs");
    } else {
      throw new Error("Failed to create the post.");
    }
  } catch (error) {
    console.error("Error submitting the form:", error);
    return error.response?.data || { message: "An error occurred" };
  }
}

export function Component() {
  const actionData = useActionData();
  console.log(actionData);
  return (
    <>
      <header className="container pt-5 mt-5">
        <div className=" px-4 py-3 px-lg-5">
          <div className="row gx-4 gx-lg-5 justify-content-center">
            <div className="col-md-10 col-lg-8 col-xl-7">
              <div className="post-heading">
                <h1>Add New Blog Post</h1>
              </div>
            </div>
          </div>
        </div>
        <hr />
      </header>
      <section className="container my-3">
        <PostForm actionData={actionData} />
      </section>
    </>
  );
}
