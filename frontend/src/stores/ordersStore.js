import { defineStore } from "pinia";
import { useUtilsStore } from "./utilsStore";
import Axios from "../_services/callerService";

export const useOrdersStore = defineStore("orders", {
    state: () => ({
        orders: [],
        createOrderForm: {
            order_number: "",
            client_id: "",
            order_date: "",
            delivery_date: "",
            quantity: "",
            log_size: "",
            userId: "",
            delivery_price: "",
            orderPrice: ""
        },
        updateOrderForm: {},
        deliveryStatus: []
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
        },
        getDeliveryStatus: (state) => {
            return state.deliveryStatus;
        },
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
        async getOrderByIdAction(orderId) {
            const utilsStore = useUtilsStore();
            try {
                utilsStore.toggleIsLoadingValue();
                const response = await Axios.get(`/api/orders/${orderId}`);
                console.log(response);
                this.updateOrderForm = response.data.order;
            } catch (error) {
                if(error?.response?.status === 401) {
                    utilsStore.redirectToLogin();
                }
                console.log(error);
            } finally {
                utilsStore.toggleIsLoadingValue();
            }
        },
        async createOrderAction() {
            const utilsStore = useUtilsStore();
            try {
                utilsStore.toggleIsLoadingValue();
                const body = {
                    order_number: this.createOrderForm.order_number,
                    client_id: this.createOrderForm.client_id,
                    delivery_date: this.createOrderForm.delivery_date,
                    order_date: this.createOrderForm.order_date,
                    delivery_price: this.createOrderForm.delivery_price,
                    order_price: this.createOrderForm.orderPrice,
                    log_size: this.createOrderForm.log_size,
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
            const utilsStore = useUtilsStore();
            try {
                utilsStore.toggleIsLoadingValue();
                const body = {
                    order_number: this.updateOrderForm.order_number,
                    client_id: this.updateOrderForm.client_id,
                    delivery_date: this.updateOrderForm.delivery_date,
                    order_date: this.updateOrderForm.order_date,
                    delivery_price: this.updateOrderForm.delivery_price,
                    order_price: this.updateOrderForm.orderPrice,
                    log_size: this.updateOrderForm.log_size,
                    quantity: this.updateOrderForm.quantity,
                    delivery_status_id: this.updateOrderForm.delivery_status_id,
                    payment_status: this.updateOrderForm.payment_status,
                    user_id: localStorage.getItem("connectedUserId")
                };
                const response = await Axios.put(`/api/orders/${this.updateOrderForm.id}`, body);
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
        async getDeliveryStatusAction() {
            const utilsStore = useUtilsStore();
            try {
                utilsStore.toggleIsLoadingValue();
                const response = await Axios.get(`/api/deliveryStatus`);
                console.log(response);
                this.deliveryStatus = response.data.deliveryStatus;
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
                order_number: "",
                client_id: "",
                order_date: "",
                delivery_date: "",
                quantity: "",
                log_size: "",
                userId: "",
                delivery_price: "",
                orderPrice: ""
            };
            this.updateOrderForm = {
                order_number: "",
                client_id: "",
                order_date: "",
                delivery_date: "",
                quantity: "",
                log_size: "",
                userId: "",
                delivery_price: "",
                orderPrice: ""
            };
        }
    }
});