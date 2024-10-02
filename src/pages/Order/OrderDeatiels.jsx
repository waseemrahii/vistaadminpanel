import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { FaMapLocation } from "react-icons/fa6";
import { IoIosPrint } from "react-icons/io";
import { IoPersonSharp } from "react-icons/io5";
import { FaMapMarkerAlt } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateOrderStatus } from "../../components/redux/orderSlice";
import ApiUrl from "../../ApiUrl";
import ImageApiUrl from "../../ImageApiUrl";

const OrderDetails = () => {
  const { id } = useParams(); // Get the order ID from URL parameters
  const dispatch = useDispatch();
  const [order, setOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(true);
  const fallbackImage = "/E-bazar.png"; // Replace with the path to your fallback image

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const token = localStorage.getItem("token"); // Retrieve the token from local storage
        const response = await axios.get(`${ApiUrl}/orders/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Set the Authorization header
          },
        });
        setOrder(response.data.doc);
      } catch (error) {
        console.error("There was an error fetching the order details!", error);
        toast.error("Failed to fetch order details.");
      }
    };

    fetchOrderDetails();
  }, [id]);

  const printInvoice = () => {
    window.print();
  };

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleUpdateStatus = async (orderId, status) => {
    try {
      console.log("status==", status);
      console.log("orderId==", orderId);
      await dispatch(updateOrderStatus({ orderId, status })).unwrap();
      setOrder((prevOrder) => ({ ...prevOrder, orderStatus: status }));
      toast.success("Order status updated successfully!");
    } catch (error) {
      toast.error("Failed to update order status.");
    }
  };

  const togglePaymentStatus = () => {
    setPaymentStatus(!paymentStatus);
  };

  if (!order) {
    return <div>Loading...</div>; // Display a loading state until data is fetched
  }

  const {
    customer,
    vendors,
    products,
    orderStatus,
    totalAmount,
    paymentMethod,
    shippingAddress,
    billingAddress,
  } = order;

  return (
    <>
      <div className="bg-[#F9F9FB] w-full px-4 py-8">
        <div className="flex items-center gap-2">
          <img
            src="https://6valley.6amtech.com/public/assets/back-end/img/all-orders.png"
            alt=""
            className="w-5 h-5"
          />
          <h1 className="text-xl font-bold">Order Details</h1>
        </div>
        <br />

        <div className="grid grid-cols-1 lg:grid-cols-6 gap-5">
          <div className="col-span-1 lg:col-span-4 bg-white rounded h-full border-gray-400 hover:shadow-md p-2">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-[1rem] font-bold pb-5">
                  Order ID #{order._id}
                </h2>
                <p>{new Date(order.createdAt).toLocaleString()}</p>
              </div>
              <div className="flex items-center gap-2">
                <div>
                  <Button variant="primary" onClick={handleShow}>
                    Show Product
                  </Button>
                </div>
                <button
                  className="border rounded px-3 py-2 bg-[#A1CB46] flex items-center gap-2 text-white hover:bg-[#7e9f37]"
                  onClick={printInvoice}
                >
                  <IoIosPrint /> Print Invoice
                </button>
              </div>
            </div>
            <div className="text-end pt-2">
              <h1>
                Status :
                <span
                  className={`bg-green-100 font-bold p-1 rounded border text-green-500`}
                >
                  {orderStatus}
                </span>
              </h1>
              <h1 className="pt-3 text-md">
                Payment Method :
                <span className="font-bold text-md">{paymentMethod}</span>
              </h1>
              <h1 className="pt-3 text-md">
                Payment Status :
                <span className={`font-bold text-green-500 ms-3`}>
                  {paymentStatus ? "Paid" : "Unpaid"}
                </span>
              </h1>
              <h1 className="pt-3 text-md">
                Order verification code :
                <span className="font-bold ms-3">
                  {" "}
                  {order._id.substring(0, 6)}
                </span>
              </h1>
            </div>
            <div className="container p-4">
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-[#F7FAFF] text-gray-700">
                      <th className="px-4 py-2 text-center font-semibold text-lg whitespace-nowrap">
                        SL
                      </th>
                      <th className="px-4 py-2 text-center font-semibold text-lg whitespace-nowrap">
                        Item Details
                      </th>
                      <th className="px-4 py-2 text-center font-semibold text-lg whitespace-nowrap">
                        Item Price
                      </th>
                      <th className="px-4 py-2 text-center font-semibold text-lg whitespace-nowrap">
                        Tax
                      </th>
                      <th className="px-4 py-2 text-center font-semibold text-lg whitespace-nowrap">
                        Item Discount
                      </th>
                      <th className="px-4 py-2 text-center font-bold text-lg whitespace-nowrap">
                        Total Price
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product, index) => (
                      <tr className="hover:bg-gray-100" key={product._id}>
                        <td className="px-4 py-2 text-center">{index + 1}</td>
                        <td className="px-4 py-2 w-full">
                          <div className="flex items-center whitespace-nowrap">
                            <img
                              src={
                                product.thumbnail
                                  ? `${ImageApiUrl}/${product.thumbnail}`
                                  : fallbackImage
                              }
                              alt={product.name}
                              className="w-10 h-10 object-cover rounded mr-3"
                              onError={(e) => (e.target.src = fallbackImage)} // Fallback image if load fails
                            />
                            <div>
                              <div>{product.name}</div>
                              <div>Qty : {product.qty}</div>
                              <div>
                                Unit price : ${product.price.toFixed(2)} (Tax:{" "}
                                {product.taxAmount}%)
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-2 text-center">
                          ${product.price.toFixed(2)}
                        </td>
                        <td className="px-4 py-2 text-center">
                          ${product.taxAmount.toFixed(2)}
                        </td>
                        <td className="px-4 py-2 text-center">
                          ${product.discountAmount.toFixed(2)}
                        </td>
                        <td className="px-4 py-2 text-center">
                          ${(product.price + product.taxAmount).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4">
                <div className="flex justify-between border-t pt-2">
                  <span>Item price</span>
                  <span>${totalAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Item Discount</span>
                  <span>- $0.00</span>
                </div>
                <div className="flex justify-between">
                  <span>Sub Total</span>
                  <span>${totalAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Coupon discount</span>
                  <span>- $0.00</span>
                </div>
                <div className="flex justify-between">
                  <span>VAT/TAX</span>
                  {/* <span>${order.vatTax.toFixed(2)}</span> */}
                </div>
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  {/* <span>${order.deliveryFee.toFixed(2)}</span> */}
                </div>
                <div className="flex justify-between font-bold border-t pt-2">
                  <span>Total</span>
                  <span>${totalAmount.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-1 lg:col-span-2">
            <div className="px-4 py-3 bg-white rounded-xl shadow-md space-y-4">
              <div className="space-y-2">
                <h2 className="text-xl font-semibold text-center">
                  Order & Shipping Info
                </h2>
                <div>
                  <label className="block">
                    <span className="text-gray-700 font-semibold">
                      Change Order Status
                    </span>
                    <select
                      className="form-select mt-1 bg-white border border-gray-400 px-3 py-2 rounded block w-full"
                      value={order.orderStatus}
                      onChange={(e) =>
                        handleUpdateStatus(order._id, e.target.value)
                      }
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="delivered">Delivered</option>
                      <option value="canceled">Cancelled</option>
                      <option value="packaging">Packaging</option>
                      <option value="out_for_delivery">Out_for_delivery</option>
                      <option value="failed_to_deliver">
                        Failed_to_deliver
                      </option>
                      <option value="returned">Returned</option>
                    </select>
                  </label>
                  <label className="mt-3 flex justify-between items-center bg-white border border-gray-400 px-3 py-2 rounded">
                    <span className="text-gray-700">Payment Status</span>
                    <div className="flex items-center mt-1">
                      <span className="mr-2 text-[#A1CB46]">Paid</span>
                      <button
                        onClick={togglePaymentStatus}
                        className={`relative inline-flex items-center h-6 rounded-full w-11 focus:outline-none ${
                          paymentStatus ? "bg-blue-600" : "bg-gray-200"
                        }`}
                      >
                        <span
                          className={`${
                            paymentStatus ? "translate-x-6" : "translate-x-1"
                          } inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-200 ease-in-out`}
                        />
                      </button>
                    </div>
                  </label>
                </div>
              </div>
            </div>
            <div className="px-4 py-3 bg-white rounded-xl shadow-md space-y-4 mt-5">
              <div className="space-y-2">
                <h2 className="text-md flex items-center gap-2 font-semibold">
                  <IoPersonSharp /> Customer information
                </h2>
                <div className="flex items-center space-x-4">
                  <div>
                    <img
                      src="https://6valley.6amtech.com/storage/app/public/profile/2022-10-12-63464cd299fc3.png"
                      alt="Avatar"
                      className="w-16 h-16 rounded-full"
                    />
                  </div>
                  <div className="pt-5">
                    <p className="text-md font-medium">{customer?.firstName}</p>
                    <p className="text-gray-500">17 Orders</p>
                    <p className="text-gray-500">{customer?.phoneNumber}</p>
                    <p className="text-gray-500">{customer?.email}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-4 py-3 bg-white rounded-xl shadow-md space-y-4 mt-5">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <h2 className="text-md font-semibold flex gap-2">
                    <IoPersonSharp /> Shipping Address
                  </h2>
                  <MdEdit className="text-[2rem] p-1 border hover:bg-green-700 hover:text-white rounded border-green-600 text-green-300" />
                </div>
                <div className="space-y-1">
                  <p className="text-md font-medium">{customer?.firstName}</p>
                  <p className="text-gray-500">
                    Contact: {customer?.phoneNumber}
                  </p>
                  <p className="text-gray-500">
                    Country: {shippingAddress.country}
                  </p>
                  <p className="text-gray-500">City: {shippingAddress.city}</p>
                  <p className="text-gray-500">
                    Zip Code: {shippingAddress.zipCode}
                  </p>
                  <p className="text-gray-500">
                    address: {shippingAddress.address}
                  </p>
                </div>
              </div>
            </div>
            <div className="px-4 py-3 bg-white rounded-xl shadow-md space-y-4 mt-5">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <h2 className="text-md font-semibold flex gap-2">
                    <IoPersonSharp /> Billing Address
                  </h2>
                  <MdEdit className="text-[2rem] p-1 border hover:bg-green-700 hover:text-white rounded border-green-600 text-green-300" />
                </div>
                <div className="space-y-1">
                  <p className="text-gray-500">
                    Country: {billingAddress.country}
                  </p>
                  <p className="text-gray-500">City: {billingAddress.city} </p>
                  <p className="text-gray-500">
                    Zip Code: {billingAddress.zipCode}
                  </p>
                  <p className="text-gray-500">
                    Address: {billingAddress.address}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Vendor Information</h2>
              {vendors.map((vendor, index) => (
                <div
                  key={index}
                  className="mb-4 p-4 bg-white rounded shadow-md"
                >
                  <h3 className="text-lg font-semibold">
                    Name : {vendor.firstName}
                  </h3>
                  <img
                    src={`${ImageApiUrl}/${vendor.vendorImage}`}
                    alt={vendor.name}
                    className="w-16 h-16 object-cover rounded mb-2"
                  />
                  <div>
                    <p className="text-lg font-bold ">
                      {" "}
                      Shop:{vendor.shopName}
                    </p>
                    <p className="text-gray-500 pt-3">
                      Vendor Orders :9 Orders Served
                    </p>
                    <p className="text-gray-500 ">
                      Vendor No:{vendor.phoneNumber}
                    </p>
                    <p className="text-gray-500 flex justify-center gap-2">
                      <FaMapMarkerAlt className="text-xl" />
                      {vendor.address}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderDetails;
