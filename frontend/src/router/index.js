import { createRouter, createWebHashHistory } from 'vue-router'

import LoginView from "../views/LoginView.vue";
import OrdersView from "../views/OrdersView.vue";
import ClientsView from "../views/ClientsView.vue";
//import { authService } from "../services/auth.js";

// ici notre gardien va vérifier si il y a un token dans le local storage
/* const authGuard = () => {
    let token = localStorage.getItem("access_token");
    // si il est présent on retourne true en permettant à la route d'être jouée
    if(token) {
        return true;
    }
    // sinon on redirige vers la page de connexion
    router.push("/login");
} */

// déclaration des routes
const routes = [
    {
        path: "/commandes",
        name: "OrdersView",
        component: OrdersView
    },
    {
        path: "/clients",
        name: "OrdersView",
        component: ClientsView
    },
    {
        path: "/login",
        name: "login",
        component: LoginView
    },
    {
        // si la route demandé n'existe pas on redirige vers la home (on pourrait aussi jouer une vue erreur)
        path: '/:pathMatch(.*)*', redirect: '/commandes',
    },
];

// Gestion de l'historisation du routing
const router = createRouter({
    history: createWebHashHistory(),
    routes
});

// router.beforeEach((to, from, next) => {
//     // sur toutes les routes déclenchement du gardien
//     if(to.matched[0].name !== "login") {
//         authGuard();
//     }
//     // sur la route login on s'assure que le client n'est pas déjà connecté sinon on redirige vers la list des starships
//     if(to.matched[0].name === "login") {
//         const isLogged = authService.isLogged();
//         if(isLogged) {
//             router.push("/");
//         }
//     }
//     next();
// });

export default router