import { mount } from '@vue/test-utils'
import { expect, describe, it } from 'vitest';
import { createPinia } from 'pinia';
import App from '@/App.vue';
import router from '@/router'; // les routes de l'application

const pinia = createPinia();

const wrapper = mount(App, {
    global: {
      plugins: [router, pinia],
    },
});

describe("Routes test", async () => {
    it("Navigate to login view", async () => {
        await router.push('/login');
        // Attendere que le composant de la nouvelle route soit rendu
        await router.isReady();
        // check si le composant de la nouvelle route est rendu
        const currentRoute = router.currentRoute.value;
        expect(currentRoute.name).toBe("login");
      });
    it("Navigate to login view", async () => {
        await router.push('/commande');
        localStorage.setItem();
        // Attendere que le composant de la nouvelle route soit rendu
        await router.isReady();
        // check si le composant de la nouvelle route est rendu
        const currentRoute = router.currentRoute.value;
        expect(currentRoute.name).toBe("layout");
    });  
});