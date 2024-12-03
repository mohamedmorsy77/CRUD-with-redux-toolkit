import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, addPost, deletePost } from "./postsSlice";
import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrash,
  faPlus,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import BopUp from "../../Components/Modal/BopUp";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";

const PostsList = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.postsData.posts);
  const postsData = useSelector((state) => state.postsData);

  const [editPost, setEditPost] = useState({
    id: "",
    title: "",
    body: "",
  });

  const [isEdit, setIsEdit] = useState(null);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  // Add Post Formik
  const formik = useFormik({
    initialValues: {
      title: "",
      body: "",
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .min(10, "Title must be at least 10 characters")
        .max(30, "Title must not exceed 30 characters")
        .required("Title is required"),
      body: Yup.string()
        .min(20, "Body must be at least 20 characters")
        .max(100, "Body must not exceed 100 characters")
        .required("Body is required"),
    }),
    onSubmit: (values, { resetForm }) => {
      dispatch(addPost(values)).then(() => {
        resetForm();
        toast.success("Post added successfully");
      });
    },
  });

  // Delete Post
  const handleDeletePost = (id) => {
    dispatch(deletePost(id)).then(() => {
      toast.success("Post deleted successfully");
    });
  };

  // Update Post
  const handleUpdatePost = (post) => {
    setEditPost({
      id: post.id,
      title: post.title,
      body: post.body,
    });
    setIsEdit(true);
  };

  return (
    <>
      <div className="posts-container">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              {postsData.error ? (
                <p>{postsData.error}</p>
              ) : (
                posts &&
                posts.map((post) => (
                  <div className="card post-item" key={post.id}>
                    <div className="card-body">
                      <h5>
                        {post.id} - {post.title}
                      </h5>
                      <p className="card-text">{post.body}</p>
                      <div className="postControlButtons">
                        <button
                          className="btn btn-primary"
                          onClick={() => handleUpdatePost(post)}
                        >
                          <FontAwesomeIcon icon={faEdit} /> Update
                        </button>
                        <Link className="btn btn-info" to={`/posts/${post.id}`}>
                          <FontAwesomeIcon icon={faEye} /> View Post
                        </Link>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleDeletePost(post.id)}
                        >
                          <FontAwesomeIcon icon={faTrash} /> Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="col-lg-4">
              <form onSubmit={formik.handleSubmit} className="add-post-form">
                <input
                  type="text"
                  name="title"
                  className={`form-control mb-2 ${
                    formik.touched.title && formik.errors.title
                      ? "is-invalid"
                      : ""
                  }`}
                  placeholder="Title"
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.title && formik.errors.title && (
                  <div className="text-danger">{formik.errors.title}</div>
                )}

                <textarea
                  name="body"
                  className={`form-control mb-2 ${
                    formik.touched.body && formik.errors.body
                      ? "is-invalid"
                      : ""
                  }`}
                  placeholder="Body"
                  rows="4"
                  value={formik.values.body}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.body && formik.errors.body && (
                  <div className="text-danger">{formik.errors.body}</div>
                )}

                <button
                  type="submit"
                  className="btn btn-success"
                  disabled={!formik.isValid || !formik.dirty}
                >
                  <FontAwesomeIcon icon={faPlus} /> Add Post
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      {isEdit && (
        <BopUp
          editPost={editPost}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          setEditPost={setEditPost}
        />
      )}
      <ToastContainer />
    </>
  );
};

export default PostsList;
