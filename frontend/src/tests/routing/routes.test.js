import { mount } from '@vue/test-utils'
import { expect, describe, it } from 'vitest';
import LoginView from "@/views/LoginView.vue";

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
        await wrapper.vm.$nextTick();
        // check si le composant de la nouvelle route est rendu
        expect(wrapper.find(LoginView).exists()).toBe(true);
      });
      
});