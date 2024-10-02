import React from "react";

const InstagramLoginComponent = () => {
  return (
    <div className="card overflow-hidden">
      <form
        action="https://6valley.6amtech.com/admin/social-login/update/instagram"
        method="post"
      >
        <input
          type="hidden"
          name="_token"
          value="NUpqhZtm7pRjhaqQhQPJVPmT5ShZIbb5yd6KyYU7"
          autoComplete="off"
        />
        <div className="card-header">
          <div className="d-flex align-items-center gap-2">
            <img
              width="16"
              src="https://6valley.6amtech.com/public/assets/back-end/img/instagram-logo.png"
              alt=""
            />
            <h4 className="mb-0">Instagram Login</h4>
          </div>
          <label className="switcher">
            <input
              className="switcher_input toggle-switch-message"
              type="checkbox"
              name="status"
              id="instagram-id"
              value="1"
              checked
              data-modal-id="toggle-modal"
              data-toggle-id="instagram-id"
              data-on-image="social/instagram-on.png"
              data-off-image="social/instagram-off.png"
              data-on-title="Want to turn ON Instagram login?"
              data-off-title="Want to turn OFF Instagram login?"
              data-on-message="<p>If enabled customers can log in to their account using their Instagram credentials</p>"
              data-off-message="<p>If disabled customers cannot log in to their account using their Instagram credentials</p>"
            />
            <span className="switcher_control"></span>
          </label>
        </div>
        <div className="card-body">
          <div className="d-flex justify-content-end mb-2">
            <button
              className="btn-link text-capitalize text-green-500 d-flex align-items-center gap-2"
              type="button"
              data-toggle="modal"
              data-target="#instagram-modal"
            >
              Credential setup
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="svg replaced-svg"
                viewBox="0 0 16 16"
              >
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"></path>
                <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"></path>
              </svg>
            </button>
          </div>
          <div className="form-group">
            <div className="d-flex mb-2 gap-2 align-items-center">
              <label className="title-color font-weight-bold text-capitalize mb-0">
                Callback URI
              </label>
              <span
                data-toggle="tooltip"
                data-title="Add the OAuth authorization URL"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="svg replaced-svg"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"></path>
                  <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"></path>
                </svg>
              </span>
            </div>
            <div className="form-control d-flex align-items-center justify-content-between py-1 pl-3 pr-2">
              <span className="form-ellipsis d-flex" id="id_instagram">
                https://6valley.6amtech.com/customer/auth/login/instagram/callback
              </span>
              <span
                className="btn-link copy-to-clipboard"
                data-id="#id_instagram"
              >
                <i className="tio-copy"></i>
              </span>
            </div>
          </div>
          <div className="form-group">
            <div className="d-flex mb-2 gap-2 align-items-center">
              <label className="title-color font-weight-bold text-capitalize mb-0">
                Store Client ID
              </label>
              <span
                data-toggle="tooltip"
                data-title="Add the unique client ID "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="svg replaced-svg"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"></path>
                  <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"></path>
                </svg>
              </span>
            </div>
            <input
              type="text"
              className="form-control form-ellipsis"
              name="client_id"
              placeholder="Ex:Client ID"
              value=""
            />
          </div>
          <div className="form-group">
            <div className="d-flex mb-2 gap-2 align-items-center">
              <label className="title-color font-weight-bold text-capitalize mb-0">
                Store Client Secret Key
              </label>
              <span data-toggle="tooltip" data-title="Store Client Secret Key">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="svg replaced-svg"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"></path>
                  <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"></path>
                </svg>
              </span>
            </div>
            <input
              type="text"
              className="form-control form-ellipsis"
              name="client_secret"
              placeholder="Ex:Client secret key"
              value=""
            />
          </div>
          <div className="d-flex justify-content-end flex-wrap gap-3">
            <button type="reset" className="btn btn-secondary px-5">
              Reset
            </button>
            <button
              type="button"
              className="btn px-4 py-2 bg-[#A1CB46] text-white hover:bg-[#7e9f37] call-demo"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default InstagramLoginComponent;
