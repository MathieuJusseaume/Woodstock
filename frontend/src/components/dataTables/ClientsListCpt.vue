<template>
    <div>
        <h1>Liste des clients</h1>
        <div>
            <DataTable id="dataTable" :columns="columns" :options="options" :data="orders" class="display" width="100%">
                <thead>
                    <tr>
                        <th>Lastname</th>
                        <th>Firstname</th>
                        <th>Delivery Adress</th>
                        <th>Delivery Zipcode</th>
                        <th>Delivery city</th>
                        <th>Billing Adress</th>
                        <th>Billing Zipcode</th>
                        <th>Billing city</th>
                        <th>Email</th>
                        <th>Phone number</th>
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
                { data: "delivery_adress" },
                { data: "delivery_zip_code" },
                { data: "delivery_city" },
                { data: "billing_adress" },
                { data: "billing_zip_code" },
                { data: "billing_city" },
                { data: "email" },
                { data: "phone" },
                {
                    data: "id",
                    render: (data) => {
                        return `<button class="updateclientbutton" id="${data}">Modifier</button>`
                    }
                },
                {
                    data: "id",
                    render: (data) => {
                        return `<button class="deleteclientbutton" id="${data}">Supprimer</button>`
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
    },
    methods: {
        test(event) {
            console.log(event.target.id);
        }
    },
    mounted() {
        const clientStore = useClientsStore();
        clientStore.getClientsAction();
        const dataTable = document.querySelector(".dataTable");
        dataTable.addEventListener("click", (event) => {
            if(event.target.classList.contains("updateclientbutton")) {
                console.log("Id du client à modifier => " + event.target.id);
            } else if (event.target.classList.contains("deleteclientbutton")) {
                console.log("Id du client à supprimer => " + event.target.id);
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
