<template>
    <div>
        <OrdersListCpt />
    </div>
</template>

<script>
import OrdersListCpt from "@/components/dataTables/OrdersListCpt.vue";
import { useOrdersStore } from "@/stores/ordersStore";

export default {
    name: "OrdersView",
    components: {
        OrdersListCpt
    },
    data() {
        return {

        }
    },
    mounted() {
        const ordersStore = useOrdersStore();
        ordersStore.getOrdersAction();
    }
};
</script>
