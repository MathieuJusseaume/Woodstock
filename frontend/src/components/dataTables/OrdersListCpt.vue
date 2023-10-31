<template>
    <div>
        <h1>Liste des commandes</h1>
        <div class="datatable__orders">
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

<script scoped>
import DataTable from "datatables.net-vue3";
import DataTablesCore from "datatables.net";
import 'datatables.net-responsive';

DataTable.use(DataTablesCore);
import { useOrdersStore } from "@/stores/ordersStore";
import { useUtilsStore } from "@/stores/utilsStore";

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
                        return `<a id="${data}" class="button touch edit updateOrderButton"></a>`;
                    }
                },
                {
                    data: "id",
                    render: (data) => { 
                        return `<a id="${data}" class="button touch delete deleteOrderButton"></a>`;
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
        const utilsStore = useUtilsStore();
        ordersStore.getOrdersAction();
        const dataTable = document.querySelector("#dataTable");
        dataTable.addEventListener("click", (event) => {
            if(event.target.classList.contains("updateOrderButton")) {
                console.log("Id de la commande à modifier => " + event.target.id);
                utilsStore.setFormName("Modification de commande");
            } else if (event.target.classList.contains("deleteOrderButton")) {
                console.log("Id de la commande à supprimer => " + event.target.id);
                ordersStore.deleteOrderByIdAction(event.target.id);
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
    font-family:'Open Sans';
    font-size: 16px;
    font-weight:400;
    display:inline-block;
    color:#FFF;
    border-radius: .25em;
    text-shadow: -1px -1px 0px rgba(0,0,0,0.4);
}
.primary:hover, .touch:hover {
    opacity: 0.7;
}
.primary {
  line-height:40px;
  transition:ease-in-out .2s;
  padding: 0 16px;
}
.touch {
    border: 1px solid;
    transition:ease-in-out .2s;
    line-height:40px;
    width:40px;
    padding: 0px;
    text-align: center;
}
.edit:before, .delete:before {
    font-family: FontAwesome;
    display: inline-block;
    font-size:1rem;
    padding-right:12px;
    background:none;
    color:#FFF;
}

.condensed.edit:before, .condensed.delete:before {
    content:none;
}
.touch.edit:before, .touch.delete:before {
    width:100%;
    text-align:center;
    font-size:1.25rem;
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
