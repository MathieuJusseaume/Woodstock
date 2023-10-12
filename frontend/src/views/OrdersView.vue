<template>
    <div>
        <OrdersListCpt />
    </div>
</template>

<script>
import OrdersListCpt from "@/components/dataTables/OrdersListCpt.vue";
export default {
    name: "OrdersView",
    components: {
        OrdersListCpt
    },
    data() {
        return {
            
        }
    }
};
</script>
