import { useState } from "react";
import Modal from "react-modal";

export default function ViewOrderInfoCustomer(props) {
  const order = props.order;
  const [isModalOpen, setIsModalOpen] = useState(false);

  // order object එකෙන් කෙලින්ම අගයන් ගන්නා නිසා අලුතින් variables දැමීමට අවශ්‍ය නැත.
  // order.status සහ order.notes භාවිතා කිරීම නිවැරදියි.

  return (
    <>
      {/* View Button */}
      <button
        className="bg-primary hover:bg-accent transition-colors px-5 py-3 rounded-xl text-white text-sm font-bold shadow-sm shadow-primary/20 cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        View Info
      </button>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        className="bg-background max-w-4xl w-full mx-auto mt-10 md:mt-16 rounded-[32px] shadow-2xl outline-none border border-secondary relative flex flex-col max-h-[85vh]"
        overlayClassName="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-start z-50 p-4"
      >
        <div className="p-8 overflow-y-auto custom-scrollbar flex-1">
          {/* Header */}
          <div className="flex justify-between items-center mb-8 border-b border-secondary pb-5">
            <h2 className="text-3xl font-bold text-text font-velvet">
              Order Details
            </h2>
            <button
              onClick={() => setIsModalOpen(false)}
              className="text-primary hover:text-accent transition-colors text-2xl font-bold p-2 bg-secondary/30 rounded-full w-10 h-10 flex items-center justify-center"
            >
              ✕
            </button>
          </div>

          {/* Order Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 bg-white border border-secondary p-6 rounded-3xl">
            <div className="space-y-4 text-sm">
              <p className="flex flex-col">
                <span className="text-primary font-semibold text-xs uppercase tracking-wider mb-1">Order ID</span>
                <span className="text-text font-bold text-base">{order.orderId}</span>
              </p>
              <p className="flex flex-col">
                <span className="text-primary font-semibold text-xs uppercase tracking-wider mb-1">Customer</span>
                <span className="text-text font-bold text-base capitalize">{order.name}</span>
              </p>
              <p className="flex flex-col">
                <span className="text-primary font-semibold text-xs uppercase tracking-wider mb-1">Email</span>
                <span className="text-text font-semibold text-base">{order.email}</span>
              </p>
              <p className="flex flex-col">
                <span className="text-primary font-semibold text-xs uppercase tracking-wider mb-1">Phone</span>
                <span className="text-text font-semibold text-base">{order.phone || "—"}</span>
              </p>
            </div>

            <div className="space-y-4 text-sm">
              <p className="flex flex-col">
                <span className="text-primary font-semibold text-xs uppercase tracking-wider mb-1">Order Date</span>
                <span className="text-text font-semibold text-base">{new Date(order.date).toLocaleString()}</span>
              </p>
              
              <div className="flex flex-col">
                <span className="text-primary font-semibold text-xs uppercase tracking-wider mb-2">Status</span>
                <div className="flex items-center gap-4">
                  <span
                    className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider
                      ${
                        order.status === "Pending"
                          ? "bg-orange-100 text-orange-700"
                          : order.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : order.status === "Cancelled"
                          ? "bg-red-100 text-red-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>

              <p className="flex flex-col mt-4">
                <span className="text-primary font-semibold text-xs uppercase tracking-wider mb-1">Total Amount</span>
                <span className="text-text font-bold text-2xl">
                  Rs. {order.total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-text text-lg mb-3">Delivery Address</h3>
              <div className="text-sm text-text font-medium bg-white border border-secondary p-5 rounded-3xl min-h-[100px] flex items-center">
                {order.address}
              </div>
            </div>

            <div>
              <h3 className="font-bold text-text text-lg mb-3">Additional Notes</h3>
              <textarea
                className="text-sm text-text font-medium bg-white border border-secondary p-5 rounded-3xl w-full min-h-[100px] outline-none resize-none"
                value={order.notes || ""} 
                placeholder="No additional notes..."
                disabled
              ></textarea>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-text text-lg mb-4">Ordered Items</h3>
            <div className="space-y-4">
              {order.items.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col sm:flex-row gap-5 items-center bg-white border border-secondary rounded-3xl p-4 transition-all"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-2xl bg-background"
                  />
                  <div className="flex-1 text-center sm:text-left">
                    <h4 className="font-bold text-text text-lg">{item.name}</h4>
                    <p className="text-xs text-primary font-semibold uppercase tracking-wider mt-1">
                      ID: {item.productID}
                    </p>
                  </div>
                  <div className="text-center sm:text-right flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center w-full sm:w-auto px-4 sm:px-0">
                    <p className="text-sm font-semibold text-text mb-1">
                      Rs. {item.price.toLocaleString(undefined, { minimumFractionDigits: 2 })} <span className="text-primary px-1">x</span> {item.quantity}
                    </p>
                    <p className="font-bold text-text text-lg">
                      Rs. {(item.price * item.quantity).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-secondary bg-background rounded-b-[32px] flex justify-end">
          <button
            onClick={() => setIsModalOpen(false)}
            className="px-6 py-3 rounded-2xl bg-white border border-secondary text-text font-bold hover:bg-secondary/30 transition-colors"
          >
            Close
          </button>
        </div>
      </Modal>
    </>
  );
}