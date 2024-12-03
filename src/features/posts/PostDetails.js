import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getPostToView } from "./postsSlice";

function PostDetails() {
  const post = useSelector((state) => state.postsData);

  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPostToView(id));
  }, [id]);
  return (
    <div className="container mt-5">
      {post.loading ? (
        <p>Loading...</p>
      ) : (
        <div className="card">
          <div className="card-body">
            <h1 className="card-title">{post.postDetails.title}</h1>
            <p className="card-text">{post.postDetails.body}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default PostDetails;
