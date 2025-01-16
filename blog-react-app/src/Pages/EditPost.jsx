/* eslint-disable react-refresh/only-export-components */
import { Form, redirect, useActionData, useLoaderData } from "react-router-dom";
import apiClient from "../assets/axios/interceptor";
import { PostForm } from "../assets/PostForm";
import { useState } from "react";

export async function loader({ params }) {
  const res = await apiClient(`/userposts/${params?.id}/`);
  return res.data;
}

export async function action(obj) {
  const { request, params } = obj;

  if (request.method === "PUT") {
    const formData = await request.formData();

    try {
      // Submit the form data using Axios instance
      const response = await apiClient.put(
        `/userposts/${params?.id}/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        return redirect("/userblogs");
      } else {
        throw new Error("Failed to update the post.");
      }
    } catch (error) {
      console.error("Error submitting the form:", error);
      return error.response?.data || { message: "An error occurred" };
    }
  } else if (request.method === "DELETE") {
    const response = await apiClient.delete(`/userposts/${params?.id}/`);
    if (response.status === 204) {
      return redirect("/userblogs");
    } else {
      return { error: "Failed to delete the post." };
    }
  }
}

export function Component() {
  const actionData = useActionData();
  const loaderData = useLoaderData();
  const [showModal, setShowModal] = useState(false);

  const handleDelete = () => {
    setShowModal(true); // Show the confirmation modal
  };

  const closeModal = () => {
    setShowModal(false); // Close the modal without deleting
  };

  return (
    <>
      <header className="container pt-5 mt-5">
        <div className=" px-4 py-3 px-lg-5">
          <div className="row gx-4 gx-lg-5 justify-content-center">
            <div className="col-md-10 col-lg-8 col-xl-7">
              <div className="post-heading">
                <h1>Edit Blog Post</h1>
              </div>
            </div>
          </div>
        </div>
        <hr />
      </header>
      <section className="container my-3">
        <PostForm
          actionData={actionData}
          defaultValues={loaderData}
          method={"PUT"}
        />
        <button
          type="button"
          className="btn btn-outline-danger my-2 w-100"
          onClick={handleDelete}
        >
          Delete
        </button>

        {/* Bootstrap Modal for Delete Confirmation */}
        {showModal && (
          <div className="modal fade show" tabIndex="-1" role="dialog">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Confirm Deletion</h5>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                    onClick={closeModal}
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <p>Are you sure you want to delete this blog post?</p>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                  <Form method="DELETE">
                    <button type="submit" className="btn btn-danger">
                      Delete
                    </button>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
