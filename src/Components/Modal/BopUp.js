import React from "react";
import { useDispatch } from "react-redux";
import { UpdatePost } from "../../network/postsApis";
import { ToastContainer, toast } from "react-toastify"; // استيراد toast و ToastContainer

import "react-toastify/dist/ReactToastify.css";

function BopUp({ editPost, isEdit, setIsEdit, setEditPost }) {
  const dispatch = useDispatch();

  const handleUpdate = (newUpdatePost) => {
    dispatch(UpdatePost({ id: editPost.id, newUpdatePost }))
      .then(() => {
        setEditPost({ id: "", title: "", body: "" });
        toast.success("Post updated successfully!"); // عرض رسالة نجاح
        setIsEdit(false);
      })
      .catch((error) => {
        toast.error("Error updating post: " + error.message); // عرض رسالة خطأ
      });
  };

  return (
    <>
      <div
        className="modal"
        tabIndex="-1"
        role="dialog"
        style={{ display: "block" }}
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header d-flex align-content-between">
              <h5 className="modal-title">Update Post</h5>
            </div>
            <div className="modal-body">
              <div className="form-group mb-4">
                <label htmlFor="exampleInputEmail1">Title</label>
                <input
                  type="text"
                  className="form-control mt-2"
                  id="title"
                  value={editPost.title}
                  aria-describedby="emailHelp"
                  placeholder="Enter title"
                  onChange={(e) =>
                    setEditPost({ ...editPost, title: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">body</label>
                <textarea
                  type="text"
                  rows={"4"}
                  className="form-control mt-2"
                  id="body"
                  value={editPost.body}
                  placeholder="Enter body"
                  onChange={(e) =>
                    setEditPost({ ...editPost, body: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => handleUpdate(editPost)}
              >
                Update Post
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                onClick={() => setIsEdit(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* إضافة ToastContainer لعرض الرسائل */}
    </>
  );
}

export default BopUp;
