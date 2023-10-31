<template>
    <div>
        <h1>Liste des commandes</h1>
        <div class="datatable__orders">
            <DataTable id="dataTable" :columns="columns" :options="options" :data="orders" class="display" width="100%">
            </DataTable>
        </div>
    </div>
</template>

<script scoped>
import DataTable from "datatables.net-vue3";
import DataTablesCore from "datatables.net";
import 'datatables.net-responsive';

DataTable.use(DataTablesCore);
import { useOrdersStore } from "@/stores/ordersStore";
import { useUtilsStore } from "@/stores/utilsStore";

export default {
    name: "OrdersListCpt",
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
            ordersStore: useOrdersStore(),
            utilsStore: useUtilsStore(),
            columns: [
                { data: "order_number", title: "Numéro commande" },
                this.$route.name !== "OrdersView" ? { data: "client_id", title: "Client", visible: false } : { data: "client.first_name", title: "Client" },
                { data: "order_date", title: "Date de commande" },
                { data: "delivery_date", title: "Date de livraison" },
                { data: "quantity", title: "Quantité" },
                { data: "log_size", title: "Taille des bûches" },
                { data: "delivery_status.name", title: "Statut de livraison" },
                {
                    data: "payment_status", title: "Statut de paiement",
                    render: (data) => {
                        if (!data) {
                            return `<p>non payée</p>`
                        }
                        return `<p>payée</p>`
                    }
                },
                { data: "order_price", title: "Prix de la commande" },
                { data: "delivery_price", title: "Prix de livraison" },
                {
                    data: "id", title: "Modifier",
                    render: (data) => {
                        return `<a id="${data}" class="button touch edit updateOrderButton"></a>`;
                    }
                },
                {
                    data: "id", title: "Supprimer",
                    render: (data) => {
                        return `<a id="${data}" class="button touch delete deleteOrderButton"></a>`;
                    }
                }
            ],
        };
    },
    computed: {
        orders() {
            return this.ordersStore.getOrders;
        },
    },
    mounted() {
        this.ordersStore.getOrdersAction();
        const dataTable = document.querySelector("#dataTable");

        dataTable.addEventListener("click", (event) => {
            if (event.target.classList.contains("updateOrderButton")) {
                console.log("Id de la commande à modifier => " + event.target.id);
                this.utilsStore.setFormName("Modification de commande");
                this.ordersStore.getOrderByIdAction(event.target.id);
            } else if (event.target.classList.contains("deleteOrderButton")) {
                console.log("Id de la commande à supprimer => " + event.target.id);
                this.ordersStore.deleteOrderByIdAction(event.target.id);
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

.datatable__orders {
    display: flex;
    justify-content: center;
}

.datatable {
    max-width: 85%;
}

.button {
    cursor: pointer;
    font-family: 'Open Sans';
    font-size: 16px;
    font-weight: 400;
    display: inline-block;
    color: #FFF;
    border-radius: .25em;
    text-shadow: -1px -1px 0px rgba(0, 0, 0, 0.4);
}

.primary:hover,
.touch:hover {
    opacity: 0.7;
}

.primary {
    line-height: 40px;
    transition: ease-in-out .2s;
    padding: 0 16px;
}

.touch {
    border: 1px solid;
    transition: ease-in-out .2s;
    line-height: 40px;
    width: 40px;
    padding: 0px;
    text-align: center;
}

.edit:before,
.delete:before {
    font-family: FontAwesome;
    display: inline-block;
    font-size: 1rem;
    padding-right: 12px;
    background: none;
    color: #FFF;
}

.condensed.edit:before,
.condensed.delete:before {
    content: none;
}

.touch.edit:before,
.touch.delete:before {
    width: 100%;
    text-align: center;
    font-size: 1.25rem;
}

.delete {
    background: rgb(192, 57, 43);
}

.delete:before {
    content: "\f1f8";
}

.edit {
    background: rgb(52, 152, 219);
}

.edit:before {
    content: "\f040";
}
</style>
