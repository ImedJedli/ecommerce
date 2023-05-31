import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loadUser, updateProfile } from "../../actions/userAction";
import { UPDATE_PROFILE_RESET } from "../../constants/userConstantes";
import Infos from "../layout/Infos";
import { toast } from "react-toastify";

const UpdateProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(
    "/assets/images/avatar.png"
  );

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { error, isUpdated, loading } = useSelector((state) => state.user);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      if (user.avatar) {
        setAvatarPreview(user.avatar);
      } else {
        setAvatarPreview("/assets/images/avatar.png");
      }
    }
    if (isUpdated) {
      toast.success("user updated !");
      dispatch(loadUser());
      navigate("/me");
      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
    }
  }, [dispatch, toast, error, navigate, isUpdated]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("name", name);
    formData.set("email", email);
    if (avatar) {
      formData.set("avatar", avatar);
    }

    dispatch(updateProfile(formData));
  };

  const onChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatar(file);
      setAvatarPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <Fragment>
      <Infos title={"Update profile"} />

      <section className="">
        <div className="">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-xl-10">
              <div className="card" style={{ borderRadius: "1rem" }}>
                <div className="row g-0">
                  <div className="col-md-6 col-lg-5 d-none d-md-block">
                    <img
                      src="/assets/images/update.jpg"
                      alt="login form"
                      className="img-fluid"
                      style={{ borderRadius: "1rem 0 0 1rem" }}
                    />
                  </div>
                  <div className="col-md-6 col-lg-7 d-flex align-items-center">
                    <div className="card-body p-4 p-lg-5 text-black">
                      <form
                        onSubmit={submitHandler}
                        encType="multipart/form-data"
                      >
                        <h5
                          className="fw-normal mb-3 pb-3"
                          style={{ letterSpacing: "1px" }}
                        >
                          Update your profile
                        </h5>

                        <div className="form-outline mb-4">
                          <input
                            type="text"
                            id="name_field"
                            value={name || ""}
                            onChange={(e) => setName(e.target.value)}
                            className="form-control form-control-lg"
                            placeholder="Full name"
                          />
                        </div>

                        <div className="form-outline mb-4">
                          <input
                            type="email"
                            id="email_field"
                            value={email || ""}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-control form-control-lg"
                            placeholder="Email address"
                          />
                        </div>

                        <div className="form-group">
                          <label htmlFor="avatar_upload">Avatar</label>
                          <div className="d-flex align-items-center">
                            <div>
                              <figure className="avatar mr-3 item-rtl">
                                <img
                                  src={
                                    avatarPreview ||
                                    "/assetes/images/avatar.png"
                                  }
                                  className="rounded-circle"
                                  alt="Avatar Preview"
                                />
                              </figure>
                            </div>
                            <div className="custom-file">
                              <input
                                type="file"
                                name="avatar"
                                className="custom-file-input"
                                id="customFile"
                                accept="image/*"
                                onChange={onChange}
                              />
                              <label
                                className="custom-file-label"
                                htmlFor="customFile"
                              >
                                Choose Avatar
                              </label>
                            </div>
                          </div>
                        </div>

                        <div className="pt-1 mb-4">
                          <button
                            className="btn btn-main mt-3 btn-block"
                            type="submit"
                            disabled={loading ? true : false}
                          >
                            Update
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};
export default UpdateProfile;
