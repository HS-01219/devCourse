import { useEffect, useState } from "react"
import { Order, OrderListItem } from "../model/order.model"
import { fetchOrder, fetchOrders } from "../api/order.api";

export const useOrders = () => {
    const [orders, setOrders] = useState<OrderListItem[]>([]);
    const [selectedItemId, setSelectedItemId] = useState<number | null>(null);

    const selectOrderItem = (orderId : number) => {
        // 이미 해당 orderId에 detail이 있다면 fetch X
        if (orders.filter((item) => item.id === orderId)[0].detail) {
            setSelectedItemId(orderId);
            return;
        }

        fetchOrder(orderId).then((orderDetail) => {
            setSelectedItemId(orderId);
            setOrders(
                orders.map((item) => {
                    if(item.id === orderId) {
                        return {
                            ...item,
                            detail : orderDetail,
                        }
                    }

                    return item;
                })
            );
        });
    }

    useEffect(() => {
        fetchOrders().then((orders) => {
            setOrders(orders);
        });
    }, []);

    return { orders, selectedItemId, selectOrderItem };
}