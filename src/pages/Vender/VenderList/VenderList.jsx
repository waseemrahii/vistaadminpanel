import React, { useEffect, useState, Suspense, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchVendors,
  deleteVendor,
  updateVendorStatus,
} from "../../../components/redux/vendorSlice";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { AiOutlinePlus } from "react-icons/ai";

// Lazy load VendorSearch and VendorTable components
import VendorSearch from "./VendorList/VendorSearch";
import VendorTable from "./VendorList/VendorTable";
import ExportButton from "../../../components/ActionButton/Export";
import { FaDownload } from "react-icons/fa";
import LoadingSpinner from "../../../components/LoodingSpinner/LoadingSpinner";

const VendorList = () => {
  const dispatch = useDispatch();
  const [imageLoading, setImageLoading] = useState({});
  const vendors = useSelector((state) => state.vendor?.vendors || []);
  const loading = useSelector((state) => state.vendor?.loading || false);
  const error = useSelector((state) => state.vendor?.error || null);

  useEffect(() => {
    dispatch(fetchVendors());
  }, [dispatch]);

  const handleDeleteVendor = async (vendorId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this vendor!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      dispatch(deleteVendor(vendorId));
      Swal.fire("Deleted!", "Vendor has been deleted.", "success");
    }
  };

  const handleUpdateStatus = async (vendorId, currentStatus) => {
    const newStatus = currentStatus === "active" ? "inactive" : "active";
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `Are you sure you want to update the status to ${newStatus}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!",
    });

    if (result.isConfirmed) {
      dispatch(updateVendorStatus({ vendorId, status: newStatus }));
      Swal.fire(
        "Updated!",
        `Vendor status has been updated to ${newStatus}.`,
        "success"
      );
    }
  };

  const memoizedVendors = useMemo(() => vendors, [vendors]);

  if (loading)
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="content container-fluid">
      <div className="mb-4 p-4">
        <h2 className="h1 mb-2 text-capitalize d-flex align-items-center gap-2">
          <img src="/add-new-seller.png" alt="" />
          Vendor List
          <span className="badge badge-soft-dark radius-50 fz-16 text-capitalize">
            {vendors.length}
          </span>
        </h2>
        <div className="card">
          <div className="card-body">
            <div className="d-flex flex-col sm:flex-row justify-between mb-3">
              <Suspense fallback={<div>Loading Search...</div>}>
                <VendorSearch />
              </Suspense>
              <div className="flex items-center gap-4">
                <Link
                  to="/addvenderform"
                  className="px-4 py-2 rounded-md bg-primary text-white hover:text-white hover:bg-primary-dark flex items-center gap-2 justify-center  sm:mt-0"
                >
                  <AiOutlinePlus /> Add New Vendor
                </Link>
                <ExportButton
                  data={vendors} // Pass the data to export
                  filename="VendorList" // Optional filename for the exported file
                  icon={FaDownload} // Icon for the button
                  label="Export " // Button label
                  className="bg-primary text-white hover:bg-primary-dark" // Tailwind classes for styling
                  style={{ color: "white" }} // Optional inline styles
                />
              </div>
            </div>
            <Suspense fallback={<div>Loading Table...</div>}>
              <VendorTable
                vendors={memoizedVendors}
                onDeleteVendor={handleDeleteVendor}
                onUpdateStatus={handleUpdateStatus}
                setImageLoading={setImageLoading}
                imageLoading={imageLoading}
              />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorList;
