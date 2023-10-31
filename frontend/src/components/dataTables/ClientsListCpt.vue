<template>
    <div>
        <h1>Liste des clients</h1>
        <div class="datatable__clients">
            <DataTable id="dataTable" :columns="columns" :options="options" :data="orders" class="display" width="100%">
                <thead>
                    <tr>
                        <th>Lastname</th>
                        <th>Firstname</th>
                        <th>Delivery address</th>
                        <th>Delivery Zipcode</th>
                        <th>Delivery city</th>
                        <th>Billing address</th>
                        <th>Billing Zipcode</th>
                        <th>Billing city</th>
                        <th>Email</th>
                        <th>Phone number</th>
                        <th>modifier</th>
                        <th>supprimer</th>
                        <th>détails</th>
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
import { useUtilsStore } from "@/stores/utilsStore.js";
import router from "@/router";

DataTable.use(DataTablesCore);
import { useClientsStore } from "@/stores/clientsStore.js";

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
                { data: "last_name" },
                { data: "first_name" },
                { data: "delivery_address" },
                { data: "delivery_zip_code" },
                { data: "delivery_city" },
                { data: "billing_address" },
                { data: "billing_zip_code" },
                { data: "billing_city" },
                { data: "email" },
                { data: "phone" },
                {
                    data: "id",
                    render: (data) => {
                        return `<a id="${data}" class="button touch edit updateclientbutton"></a>`
                    }
                },
                {
                    data: "id",
                    render: (data) => {
                        return `<a id="${data}" class="button touch delete deleteclientbutton"></a>`
                    }
                },
                {
                    data: "id",
                    render: (data) => {
                        return `<button class="selectclientbutton" id="${data}">Voir</button>`
                    }
                }
            ],
        };
    },
    computed: {
        orders() {
            const clientStore = useClientsStore();
            return clientStore.getClients;
        },
        succes() {
            const utilsStore = useUtilsStore();
            return utilsStore.getSucces;
        }
    },
    methods: {

    },
    mounted() {
        const clientStore = useClientsStore();
        clientStore.getClientsAction();
    },
    updated() {
        const clientStore = useClientsStore();
        const utilsStore = useUtilsStore();
        const dataTable = document.querySelector(".dataTable");
        dataTable.addEventListener("click", async (event) => {
            if (event.target.classList.contains("updateclientbutton")) {
                utilsStore.setFormName("EditClientForm");
                clientStore.updateClientInStore(event.target.id);
                console.log("Id du client à modifier => " + event.target.id);
            } else if (event.target.classList.contains("deleteclientbutton")) {
                console.log("Id du client à supprimer => " + event.target.id);
                clientStore.deleteClientAction(event.target.id);
            } else if (event.target.classList.contains("selectclientbutton")) {
                console.log("Id du client à sélectionner => " + event.target.id);
                await clientStore.getClientById(event.target.id).then(() => { router.push(`/clients/${event.target.id}`); });

            }

        });
    },
};
</script>

<style>
@import 'datatables.net-dt';
@import 'datatables.net-responsive-dt';

.display {
    text-align: left;
}

.datatable__clients {
    display: flex;
    justify-content: center;
}
.datatable {
    max-width: 85%;
}
</style>
