import { defineStore } from "pinia";
import { useUtilsStore } from "./utilsStore";
import Axios from "../_services/callerService";

export const useOrdersStore = defineStore("orders", {
    state: () => ({
        orders: [],
        createOderForm: {
            clientId: "",
            orderDate: "",
            orderDeliveryDate: "",
            quantity: "",
            logSize: "",
            userId: "",
            deliveryPrice: "",
            orderPrice: ""
        }

    }),
    getters: {
        getOrders: (state) => {
            return state.orders;
        },

    },
    actions: {
        async getOrdersAction() {
            const utilsStore = useUtilsStore();
            try {
                utilsStore.toggleIsLoadingValue();               
                const token = localStorage.getItem("woodStockPlainTextToken");
                const response = await Axios.get(`/api/orders`, { headers : { "Authorization": `Bearer ${token}` } });
                console.log(response);
                this.orders = [];
                response.data.order.forEach(order => {
                    this.orders.push(order);
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
                const token = localStorage.getItem("woodStockPlainTextToken");
                const response = await Axios.delete(`/api/orders/${orderIdToDelete}`, { headers : { "Authorization": `Bearer ${token}` } });
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
            this.updateUserForm[field] = value;
        },
    }
});