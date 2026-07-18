import axios from "axios";
import { useState, useEffect } from "react";

import Loader from "../components/loader.jsx";
import ViewOrderInfoCustomer from "../components/viewOrderInfoCustomer.jsx";

export default function OrdersPage() {
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
      });
    }
  }, [loaded]);

  return (
    <div className="w-full min-h-screen bg-background flex justify-center p-4 md:p-8 font-velvet">
      
      <div className="w-full max-w-[1400px] bg-white/50 backdrop-blur-md shadow-[0_20px_50px_rgba(0,0,0,0.05)] rounded-[2rem] border border-white/60 overflow-x-auto">
        {loaded ? (
          <table className="w-full table-auto text-left border-collapse min-w-[1000px]">
            <thead className="bg-secondary text-primary uppercase text-xs tracking-[0.15em]">
              <tr>
                <th className="px-6 py-5 font-extrabold">Order ID</th>
                <th className="px-6 py-5 font-extrabold">Customer email</th>
                <th className="px-6 py-5 font-extrabold">Customer name</th>
                <th className="px-6 py-5 font-extrabold">Date</th>
                <th className="px-6 py-5 font-extrabold">Status</th>
                <th className="px-6 py-5 font-extrabold">Total</th>
                <th className="px-6 py-5 font-extrabold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-secondary/50 text-text text-sm">
              {orders.map((order, index) => (
                <tr key={index} className="hover:bg-secondary/30 transition-colors">
                  <td className="px-6 py-5 font-semibold">{order.orderId}</td>
                  <td className="px-6 py-5">{order.email}</td>
                  <td className="px-6 py-5">{order.name}</td>
                  <td className="px-6 py-5">{new Date(order.date).toLocaleDateString()}</td>
                  <td className="px-6 py-5 font-bold text-accent">{order.status}</td>
                  <td className="px-6 py-5">LKR. {order.total.toFixed(2)}</td>
                  <td className="px-6 py-5">
                    <ViewOrderInfoCustomer order={order} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="p-20">
            <Loader />
          </div>
        )}
      </div>
      
    </div>
  );
}