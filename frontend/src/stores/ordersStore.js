import { defineStore } from "pinia";
import { useUtilsStore } from "./utilsStore";
import Axios from "../_services/callerService";

export const useOrdersStore = defineStore("orders", {
    state: () => ({
        orders: [],
        createOrderForm: {
            orderNumber: "",
            clientId: "",
            orderDate: "",
            orderDeliveryDate: "",
            quantity: "",
            logSize: "",
            userId: "",
            deliveryPrice: "",
            orderPrice: ""
        },
        updateOrderForm: {
            orderNumber: "",
            clientId: "",
            orderDate: "",
            orderDeliveryDate: "",
            quantity: "",
            logSize: "",
            userId: "",
            deliveryPrice: "",
            orderPrice: ""
        },
    }),
    getters: {
        getOrders: (state) => {
            return state.orders;
        },
        getupdateOrderForm: (state) => {
            return state.updateOrderForm;
        },
        getCreateOrderForm: (state) => {
            return state.createOrderForm;
        }

    },
    actions: {
        async getOrdersAction() {
            const utilsStore = useUtilsStore();
            try {
                utilsStore.toggleIsLoadingValue();               
                const response = await Axios.get(`/api/orders`);
                console.log(response);
                this.orders = [];
                response.data.order.map(order => {
                    const orderToPush = {
                        order_number: order.order_number,
                        client_id: order.client.first_name,
                        order_date: order.order_date,
                        delivery_date: order.delivery_date,
                        quantity: order.quantity,
                        log_size: order.log_size,
                        delivery_status_id: order.delivery_status.name,
                        payment_status: order.payment_status ? "payé" : "à payer",
                        order_price: order.order_price,
                        delivery_price: order.delivery_price,
                        user_id: order.user.first_name,
                        id: order.id
                    };
                    this.orders.push(orderToPush);
                });   
            } catch (error) {
                if(error?.response?.status === 401) {
                    utilsStore.redirectToLogin();
                }
                console.log(error);
            } finally {
                utilsStore.toggleIsLoadingValue();
            }
        },
        async deleteOrderByIdAction(orderIdToDelete) {
            const utilsStore = useUtilsStore();
            try {
                utilsStore.toggleIsLoadingValue();               
                const response = await Axios.delete(`/api/orders/${orderIdToDelete}`);
                console.log(response);
                this.orders = this.orders.filter(order => order.id !== parseInt(orderIdToDelete, 10));
            } catch (error) {
                if(error?.response?.status === 401) {
                    utilsStore.redirectToLogin();
                }
                console.log(error);
            } finally {
                utilsStore.toggleIsLoadingValue();
            }
        },
        setCreateOrderFormField(value, field) {
            this.createOrderForm[field] = value;
        },
        setUpdateOrderFormField(value, field) {
            this.updateOrderForm[field] = value;
        },
        resetOrderForm() {
            this.createOrderForm = {
                orderNumber: "",
                clientId: "",
                orderDate: "",
                orderDeliveryDate: "",
                quantity: "",
                logSize: "",
                userId: "",
                deliveryPrice: "",
                orderPrice: ""
            };
        },
        async createOrderAction() {
            const utilsStore = useUtilsStore();
            try {
                utilsStore.toggleIsLoadingValue();
                const body = {
                    order_number: this.createOrderForm.orderNumber,
                    client_id: this.createOrderForm.clientId,
                    delivery_date: this.createOrderForm.orderDeliveryDate,
                    order_date: this.createOrderForm.orderDate,
                    delivery_price: this.createOrderForm.deliveryPrice,
                    order_price: this.createOrderForm.orderPrice,
                    log_size: this.createOrderForm.logSize,
                    quantity: this.createOrderForm.quantity,
                    user_id: localStorage.getItem("connectedUserId")
                };
                const response = await Axios.post(`/api/orders`, body);
                console.log(response);
                this.resetOrderForm();     
                this.getOrdersAction();
                utilsStore.setFormName("");
            } catch (error) {
                if(error?.response?.status === 401) {
                    utilsStore.redirectToLogin();
                }
                console.log(error);
            } finally {
                utilsStore.toggleIsLoadingValue();    
            }
        },
        async updateOrderAction() {
            try {
                
            } catch (error) {
                console.log(error);
            } finally {

            }
        },
    }
});