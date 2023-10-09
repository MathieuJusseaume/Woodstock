import { createRouter, createWebHistory  } from 'vue-router'

import LoginView from "../views/LoginView.vue";
import OrdersView from "../views/OrdersView.vue";
import ClientsView from "../views/ClientsView.vue";
import SingleClientView from "../views/SingleClientView.vue";
import SingleOrderView from "../views/SingleOrderView.vue";
import LayoutView from "../views/LayoutView.vue";

// ici notre gardien va vérifier si il y a un token dans le local storage
const authGuard = () => {
    //console.log(token);
    const token = "toto";
    // si il est présent on retourne true en permettant à la route d'être jouée
    if(token) {
        return true;
    }
    // sinon on redirige vers la page de connexion
    router.push("/login");
}

// déclaration des routes
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

// Gestion de l'historisation du routing
const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    // sur toutes les routes déclenchement du gardien
         if(to.matched[0].name !== "login") {
            authGuard();
        }
        // sur la route login on s'assure que le client n'est pas déjà connecté sinon on redirige vers la list des commandes
        if(to.matched[0].name === "login") {
            let isLogged = true;
            if(isLogged) {
                router.push("/commandes");
            }
        }
     next();
});

export default router