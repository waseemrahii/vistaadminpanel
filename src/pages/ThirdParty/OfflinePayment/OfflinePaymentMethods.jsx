// OfflinePaymentMethods.js

import React, { useState } from "react";

const OfflinePaymentMethods = () => {
  const [currentTab, setCurrentTab] = useState("all"); // State to manage active tab

  // Sample data - Replace with your actual data or fetch from API
  const methods = [
    {
      id: 1,
      name: "MFTS",
      paymentInfo: "Service Name : Mobile Banking",
      requiredInfo: ["Mobile Number", "Reference", "Date"],
      status: true, // Example status, true for active, false for inactive
    },
    {
      id: 2,
      name: "Bank Payment",
      paymentInfo: "Bank Name : EX: Bank XYZ",
      requiredInfo: ["Account Number", "Amount", "Reference"],
      status: true, // Example status, true for active, false for inactive
    },
    // Add more methods as needed
  ];

  // Filter methods based on currentTab state
  const filteredMethods =
    currentTab === "all"
      ? methods
      : currentTab === "active"
      ? methods.filter((method) => method.status === true)
      : methods.filter((method) => method.status === false);

  // Function to handle tab change
  const handleTabChange = (tab) => {
    setCurrentTab(tab);
  };

  return (
    <div className="content container-fluid snipcss-MIkKz">
      <nav>
        <div className="nav nav-tabs mb-3 border-0" role="tablist">
          <button
            className={`nav-link ${currentTab === "all" ? "active" : ""}`}
            onClick={() => handleTabChange("all")}
          >
            All
          </button>
          <button
            className={`nav-link ${currentTab === "active" ? "active" : ""}`}
            onClick={() => handleTabChange("active")}
          >
            Active
          </button>
          <button
            className={`nav-link ${currentTab === "inactive" ? "active" : ""}`}
            onClick={() => handleTabChange("inactive")}
          >
            Inactive
          </button>
        </div>
      </nav>

      <div className="tab-content" id="nav-tabContent">
        <div
          className="tab-pane fade show active"
          id="nav-all"
          role="tabpanel"
          aria-labelledby="nav-all-tab"
        >
          <div className="card">
            <div className="px-3 py-4">
              {/* Search and Add New Method form section */}
              <div className="row g-2 flex-grow-1">
                {/* Search form */}
                <div className="col-sm-8 col-md-6 col-lg-4">
                  <form
                    action="https://6valley.6amtech.com/admin/business-settings/offline-payment-method/index"
                    method="GET"
                  >
                    <div className="input-group input-group-custom input-group-merge">
                      <div className="input-group-prepend">
                        <div className="input-group-text">
                          <i className="tio-search"></i>
                        </div>
                      </div>
                      <input
                        id="datatableSearch_"
                        type="search"
                        name="searchValue"
                        className="form-control"
                        placeholder="Search by payment method name"
                        value=""
                        required=""
                      />
                      <button
                        type="submit"
                        className="btn px-4 py-2 bg-[#A1CB46] text-white hover:bg-[#7e9f37] input-group-text"
                      >
                        Search
                      </button>
                    </div>
                  </form>
                </div>
                {/* Add New Method button */}
                <div className="col-sm-4 col-md-6 col-lg-8 d-flex justify-content-end">
                  <p
                    href="https://6valley.6amtech.com/admin/business-settings/offline-payment-method/add"
                    className="btn btn-- bg-[#A1CB46] text-white hover:bg-[#7e9f37]  hover:text-white "
                  >
                    Add New Method
                  </p>
                </div>
              </div>
            </div>

            {/* Method list table */}
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover table-borderless table-thead-bordered table-nowrap table-align-middle card-table w-100">
                  <thead className="thead-light thead-50 text-capitalize">
                    <tr>
                      <th>SL</th>
                      <th>Payment Method Name</th>
                      <th>Payment Info</th>
                      <th>Required Info From Customer</th>
                      <th className="text-center">Status</th>
                      <th className="text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Render filtered methods */}
                    {filteredMethods.map((method, index) => (
                      <tr key={method.id}>
                        <td>{index + 1}</td>
                        <td>{method.name}</td>
                        <td>
                          <div className="d-flex flex-column gap-1">
                            <div>{method.paymentInfo}</div>
                          </div>
                        </td>
                        <td>
                          <div className="d-flex flex-column gap-1">
                            {method.requiredInfo.map((info, idx) => (
                              <div key={idx}>{info}</div>
                            ))}
                          </div>
                        </td>
                        <td className="text-center">
                          {/* Toggle status form */}
                          <form
                            action="https://6valley.6amtech.com/admin/business-settings/offline-payment-method/update-status"
                            method="post"
                            id={`method-status-${method.id}-form`}
                            className="method-status-form"
                          >
                            <input
                              type="hidden"
                              name="_token"
                              value="NUpqhZtm7pRjhaqQhQPJVPmT5ShZIbb5yd6KyYU7"
                              autoComplete="off"
                            />
                            <input type="hidden" name="id" value={method.id} />
                            <label className="switcher mx-auto">
                              <input
                                type="checkbox"
                                className="switcher_input toggle-switch-message"
                                id={`method-status-${method.id}`}
                                name="status"
                                defaultChecked={method.status}
                                data-modal-id="toggle-status-modal"
                                data-toggle-id={`method-status-${method.id}`}
                                data-on-image="offline-payment-on.png"
                                data-off-image="offline-payment-off.png"
                                data-on-title="Want to Turn ON Offline Payment Methods?"
                                data-off-title="Want to Turn OFF Offline Payment Methods?"
                                data-on-message="<p>If enabled customers can pay through different payment methods outside your system</p>"
                                data-off-message="<p>If disabled customers can only pay through the system supported payment methods</p>"
                              />
                              <span className="switcher_control"></span>
                            </label>
                          </form>
                        </td>
                        <td className="text-center">
                          <div className="d-flex justify-content-center gap-2">
                            <a
                              className="btn btn-outline-info btn-sm square-btn"
                              title="Edit"
                              href={`https://6valley.6amtech.com/admin/business-settings/offline-payment-method/update/${method.id}`}
                            >
                              <i className="tio-edit"></i>
                            </a>
                            {/* Delete button */}
                            <button
                              className="btn btn-outline-danger btn-sm delete square-btn delete-data"
                              title="Delete"
                              data-id={`delete-method-name-${method.id}`}
                            >
                              <i className="tio-delete"></i>
                            </button>
                            {/* Delete form */}
                            <form
                              action="https://6valley.6amtech.com/admin/business-settings/offline-payment-method/delete"
                              method="post"
                              id={`delete-method-name-${method.id}`}
                            >
                              <input
                                type="hidden"
                                name="_token"
                                value="NUpqhZtm7pRjhaqQhQPJVPmT5ShZIbb5yd6KyYU7"
                                autoComplete="off"
                              />
                              <input
                                type="hidden"
                                value={method.id}
                                name="id"
                                required=""
                              />
                            </form>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="p-3 d-flex justify-content-end">
                  {/* Pagination or other controls */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfflinePaymentMethods;
