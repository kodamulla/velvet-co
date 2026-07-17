import axios from "axios";
import { useState, useEffect } from "react";
import Loader from "../../components/loader.jsx";

import ViewOrderInfo from "../../components/ViewOrderInfo.jsx"; 

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!loaded) {
      axios.get(import.meta.env.VITE_BACKEND_URL + "/orders", {
        headers: { Authorization: `Bearer ${token}` }
      }).then((res) => {
        console.log(res.data);
        setOrders(res.data);
        setLoaded(true);
      }).catch((error) => {
        console.error("Error fetching orders:", error);
        setLoaded(true); 
      });
    }
  }, [loaded]);

  return (
    <div className="w-full min-h-screen bg-[#FAF4F0] p-6 md:p-12 flex flex-col items-center">
      
      {/* Page Header */}
      <div className="w-full max-w-7xl mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-stone-900">Manage Orders</h1>
          <p className="text-stone-500 mt-2">View and manage all customer orders</p>
        </div>
      </div>

      {/* Table Container */}
      <div className="w-full max-w-7xl bg-white rounded-3xl shadow-sm border border-stone-100 overflow-hidden flex flex-col min-h-[400px]">
        
        {!loaded ? (
          <div className="flex-1 flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <div className="overflow-x-auto w-full">
            <table className="w-full table-auto text-left border-collapse whitespace-nowrap">
              
              {/* Table Head */}
              <thead className="bg-stone-50 border-b border-stone-100 text-stone-500 text-xs font-bold uppercase tracking-widest">
                <tr>
                  <th className="px-6 py-5">Order ID</th>
                  <th className="px-6 py-5">Customer Email</th>
                  <th className="px-6 py-5">Customer Name</th>
                  <th className="px-6 py-5">Date</th>
                  <th className="px-6 py-5">Status</th>
                  <th className="px-6 py-5">Total</th>
                  <th className="px-6 py-5 text-center">Actions</th>
                </tr>
              </thead>
              
              {/* Table Body */}
              <tbody className="divide-y divide-stone-100 text-stone-700 text-sm">
                
                {orders.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="px-6 py-12 text-center text-stone-400 font-medium">
                      No orders found.
                    </td>
                  </tr>
                ) : (
                  orders.map((order, index) => (
                    <tr key={index} className="hover:bg-[#FAF4F0]/50 transition-colors duration-200">
                      
                      <td className="px-6 py-4 font-mono font-bold text-stone-900">
                        {order.orderId}
                      </td>
                      
                      <td className="px-6 py-4 text-stone-600">
                        {order.email}
                      </td>
                      
                      <td className="px-6 py-4 font-medium capitalize text-stone-900">
                        {order.name}
                      </td>
                      
                      <td className="px-6 py-4 text-stone-500">
                        {new Date(order.date).toLocaleDateString()}
                      </td>
                      
                      <td className="px-6 py-4">
                        {/* Status Badge */}
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          order.status?.toLowerCase() === 'pending' ? 'bg-orange-100 text-orange-700' :
                          order.status?.toLowerCase() === 'completed' || order.status?.toLowerCase() === 'delivered' ? 'bg-green-100 text-green-700' :
                          order.status?.toLowerCase() === 'cancelled' ? 'bg-red-100 text-red-700' :
                          'bg-stone-100 text-stone-700'
                        }`}>
                          {order.status || 'Pending'}
                        </span>
                      </td>
                      
                      <td className="px-6 py-4 font-bold text-stone-900">
                        Rs. {order.total.toLocaleString()}
                      </td>
                      
                      {/* අලුතින් එකතු කරපු Actions Column එක */}
                      <td className="px-6 py-4 flex justify-center">
                        <ViewOrderInfo order={order} />
                      </td>
                      
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}