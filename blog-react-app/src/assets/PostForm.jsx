/* eslint-disable react/prop-types */
import { useState } from "react";
import { Form, useNavigation } from "react-router-dom";

export function PostForm({
  actionData,
  defaultValues = null,
  method = "POST",
}) {
  const navigation = useNavigation();
  const isSubmitting = navigation.state == "submitting";

  const [selectedimage, setSelectedimage] = useState(null);
  function handleImage(event) {
    const file = event.target.files[0];
    console.log(file);
    console.log(event.target.files[0]);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedimage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }
  console.log(selectedimage);
  return (
    <Form method={method} encType="multipart/form-data">
      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          Title
        </label>
        <input
          type="text"
          className="form-control"
          id="title"
          name="title"
          defaultValue={defaultValues?.title || ""}
          placeholder="Enter the title"
        />
        {actionData?.title && (
          <span className="text-danger">{actionData?.title[0]}</span>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="content" className="form-label">
          Content
        </label>
        <textarea
          className="form-control"
          id="content"
          name="content"
          rows="8"
          placeholder="Write the content here"
          defaultValue={defaultValues?.content || ""}
        ></textarea>
        {actionData?.content && (
          <span className="text-danger">{actionData?.content[0]}</span>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="image" className="form-label">
          Image
        </label>
        {(selectedimage || defaultValues?.image) && (
          <div className="mb-3">
            <img
              src={selectedimage || defaultValues.image}
              alt="Blog Image"
              className="img-thumbnail"
              width="150"
            />
          </div>
        )}
        <input
          type="file"
          className="form-control"
          id="image"
          name="image"
          accept="image/*"
          onChange={handleImage}
        />
        {actionData?.image && (
          <span className="text-danger">{actionData?.image[0]}</span>
        )}
      </div>

      {actionData?.error && (
        <div className="alert alert-danger">{actionData.error}</div>
      )}

      {actionData?.detail && (
        <div className="alert alert-success">{actionData.detail}</div>
      )}

      <button
        type="submit"
        className="btn btn-primary w-100"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <div
            className="spinner-border spinner-border-sm text-light"
            role="status"
          ></div>
        ) : (
          "Submit"
        )}
      </button>
    </Form>
  );
}
