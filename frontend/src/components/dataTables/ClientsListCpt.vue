<template>
    <div>
        <h1>Ici c'est le compsant datatable pour {{ infos }}</h1>
        <div>
            <DataTable :columns="columns" :data="dataBis" class="display" width="100%">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Position</th>
                        <th>Office</th>
                        <th>Extn.</th>
                        <th>Start date</th>
                        <th>Salary</th>
                    </tr>
                </thead>
            </DataTable>

            <DataTable :columns="fakeColumns" :options="options" :data="fakeOrders" class="display" width="100%">
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
                        <th>Orders</th>
                    </tr>
                </thead>
            </DataTable>
        </div>
    </div>
</template>

<script>
import DataTable from "datatables.net-vue3";
import DataTablesCore from "datatables.net";
import 'datatables.net-buttons';
import 'datatables.net-buttons/js/buttons.html5';
import 'datatables.net-responsive';
import 'datatables.net-select';

DataTable.use(DataTablesCore);

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
                { data: "name" },
                { data: "position" },
                { data: "office" },
                { data: "extn" },
                { data: "start_date" },
                { data: "salary" },
            ],
            fakeColumns: [
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
                { data: "orders" },
            ],
        };
    },
    computed: {
        fakeOrders() {
            return [
                {
                    id: 0,
                    last_name: "ing",
                    first_name: "string",
                    delivery_adress: "string",
                    delivery_zip_code: 0,
                    delivery_city: "string",
                    billing_adress: "string",
                    billing_zip_code: 0,
                    billing_city: "string",
                    email: "string",
                    phone: "string",
                    orders: [
                        {
                            id: 0,
                            order_number: 0,
                            client_id: 0,
                            order_date: 0,
                            delivery_date: 0,
                            quantity: 0,
                            log_size: 0,
                            comments: [
                                {
                                    id: 0,
                                    date: 0,
                                    content: "string",
                                    order: "string",
                                },
                            ],
                            payment_status: true,
                            delivery_status: {
                                id: 0,
                                name: "string",
                            },
                        },
                    ],
                },
                {
                    id: 0,
                    last_name: "string",
                    first_name: "string",
                    delivery_adress: "string",
                    delivery_zip_code: 0,
                    delivery_city: "string",
                    billing_adress: "string",
                    billing_zip_code: 0,
                    billing_city: "string",
                    email: "string",
                    phone: "string",
                    orders: [
                        {
                            id: 0,
                            order_number: 0,
                            client_id: 0,
                            order_date: 0,
                            delivery_date: 0,
                            quantity: 0,
                            log_size: 0,
                            comments: [
                                {
                                    id: 0,
                                    date: 0,
                                    content: "string",
                                    order: "string",
                                },
                            ],
                            payment_status: true,
                            delivery_status: {
                                id: 0,
                                name: "string",
                            },
                        },
                    ],
                },
                {
                    id: 0,
                    last_name: "string",
                    first_name: "string",
                    delivery_adress: "string",
                    delivery_zip_code: 0,
                    delivery_city: "string",
                    billing_adress: "string",
                    billing_zip_code: 0,
                    billing_city: "string",
                    email: "string",
                    phone: "string",
                    orders: [
                        {
                            id: 0,
                            order_number: 0,
                            client_id: 0,
                            order_date: 0,
                            delivery_date: 0,
                            quantity: 0,
                            log_size: 0,
                            comments: [
                                {
                                    id: 0,
                                    date: 0,
                                    content: "string",
                                    order: "string",
                                },
                            ],
                            payment_status: true,
                            delivery_status: {
                                id: 0,
                                name: "string",
                            },
                        },
                    ],
                },
            ];
        },

        dataBis() {
            return [
                {
                    id: "1",
                    name: "Tiger Nixon",
                    position: "System Architect",
                    salary: "$320,800",
                    start_date: "2011/04/25",
                    office: "Edinburgh",
                    extn: "5421",
                },
                {
                    id: "2",
                    name: "Garrett Winters",
                    position: "Accountant",
                    salary: "$170,750",
                    start_date: "2011/07/25",
                    office: "Tokyo",
                    extn: "8422",
                },
                {
                    id: "3",
                    name: "Ashton Cox",
                    position: "Junior Technical Author",
                    salary: "$86,000",
                    start_date: "2009/01/12",
                    office: "San Francisco",
                    extn: "1562",
                },
                {
                    id: "4",
                    name: "Cedric Kelly",
                    position: "Senior Javascript Developer",
                    salary: "$433,060",
                    start_date: "2012/03/29",
                    office: "Edinburgh",
                    extn: "6224",
                },
                {
                    id: "5",
                    name: "Airi Satou",
                    position: "Accountant",
                    salary: "$162,700",
                    start_date: "2008/11/28",
                    office: "Tokyo",
                    extn: "5407",
                },
            ];
        },
    },
};
</script>

<style>
@import 'datatables.net-dt';
@import 'datatables.net-buttons-dt';
@import 'datatables.net-responsive-dt';
@import 'datatables.net-select-dt';
.display {
    text-align: left;
}
</style>
