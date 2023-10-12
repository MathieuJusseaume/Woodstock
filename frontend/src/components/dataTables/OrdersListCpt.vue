<template>
    <div>
        <h1>Liste des commandes</h1>
        <div>
            <DataTable id="dataTable" :columns="columns" :options="options" :data="orders" class="display" width="100%">
                <thead>
                    <tr>
                        <th>Numéro commande</th>
                        <th>Client</th>
                        <th>Date de commande</th>
                        <th>Date de livraison</th>
                        <th>Quantité</th>
                        <th>Taille des bûches</th>
                        <th>Statut de livraison</th>
                        <th>Statut de paiement</th>
                        <th>Prix de la commande</th>
                        <th>Prix de livraison</th>
                        <th>Utilisateur</th>
                        <th>modifier</th>
                        <th>supprimer</th>
                    </tr>
                </thead>
            </DataTable>
        </div>
    </div>
</template>

<script>
import DataTable from "datatables.net-vue3";
import DataTablesCore from "datatables.net";
import 'datatables.net-responsive';

DataTable.use(DataTablesCore);
import { useOrdersStore } from "@/stores/ordersStore";

export default {
    name: "ClientsListCpt",
    components: {
        DataTable,
    },
    data() {
        return {
            options: {
                dom: 'Bftip',
                responsive: true,
                select: true,
            },
            columns: [
                { data: "order_number" },
                { data: "client_id" },
                { data: "order_date" },
                { data: "delivery_date" },
                { data: "quantity" },
                { data: "log_size" },
                { data: "delivery_status_id" },
                { data: "payment_status" },
                { data: "order_price" },
                { data: "delivery_price" },
                { data: "user_id" },
                {
                    data: "id",
                    render: (data) => {
                        return `<button class="updateOrderButton" id="${data}">Modifier</button>`
                    }
                },
                {
                    data: "id",
                    render: (data) => {
                        return `<button class="deleteOrderButton" id="${data}">Supprimer</button>`
                    }
                }
            ],
        };
    },
    computed: {
        orders() {
            const ordersStore = useOrdersStore();
            return ordersStore.getOrders;
        },
    },
    mounted() {
        const ordersStore = useOrdersStore();
        ordersStore.getOrdersAction();
        const dataTable = document.querySelector("#dataTable");
        dataTable.addEventListener("click", (event) => {
            if(event.target.classList.contains("updateOrderButton")) {
                console.log("Id de la commande à modifier => " + event.target.id);
            } else if (event.target.classList.contains("deleteOrderButton")) {
                console.log("Id de la commande à supprimer => " + event.target.id);
            }

        });
    }
};
</script>

<style>
@import 'datatables.net-dt';
@import 'datatables.net-responsive-dt';
.display {
    text-align: left;
}
</style>
