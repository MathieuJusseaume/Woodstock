import { createRouter, createWebHistory  } from 'vue-router';

// views import
import LoginView from "../views/LoginView.vue";
import OrdersView from "../views/OrdersView.vue";
import ClientsView from "../views/ClientsView.vue";
import SingleClientView from "../views/SingleClientView.vue";
import SingleOrderView from "../views/SingleOrderView.vue";
import LayoutView from "../views/LayoutView.vue";

const routes = [
    {
        path: "/login",
        name: "login",
        component: LoginView
    },
    {
        path: "/",
        redirect: "/commandes"
    },
    {
        path: "/",
        name: "layout",
        component: LayoutView,
        children: [
            {
                path: "commandes",
                name: "OrdersView",
                component: OrdersView
            },
            {
                path: "commandes/:id",
                name: "SingleOrderView",
                component: SingleOrderView
            },
            {
                path: "clients",
                name: "ClientsView",
                component: ClientsView
            },
            {
                path: "clients/:id",
                name: "SingleClientView",
                component: SingleClientView
            },
        ]
    },
    {
        // si la route demandé n'existe pas on redirige vers la home (on pourrait aussi jouer une vue erreur)
        path: '/:pathMatch(.*)*', redirect: '/commandes',
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

const authGuard = () => {
    const isLogged = localStorage.getItem("user");   
    if(isLogged) {
        return true;
    }
    router.push("/login");
};

router.beforeEach((to, from, next) => {
    // all routes trigger guard
    if(to.matched[0].name !== "login") {
        authGuard();
    }
    // on login route if user is connected redirect to orders view
    if(to.matched[0].name === "login") {
        const isLogged = localStorage.getItem("user");
        if(isLogged) {
            router.push("/commandes");
        }
    }
     next();
});

export default router;