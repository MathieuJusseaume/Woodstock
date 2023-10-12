import { expect, describe, it } from 'vitest';
import router from '@/router';

describe("Routes test", async () => {

    it("When the user is not logged in, navigate to login page", async () => {
        await router.push('/login');
        const currentRoute = router.currentRoute.value;
        expect(currentRoute.name).toBe("login");
    });

    it("When the user is not logged in, navigate to root page; otherwise, redirect to the login page", async () => {
        await router.push('/');
        const currentRoute = router.currentRoute.value;
        expect(currentRoute.name).toBe("login");
    });

    it("When the user is not logged in, navigate to orders page; otherwise, redirect to the login page", async () => {   
        await router.push('/commandes');
        const currentRoute = router.currentRoute.value;
        expect(currentRoute.name).toBe("login");
    }); 

    it("When the user is not logged in, navigate to clients page; otherwise, redirect to the login page", async () => {
        await router.push('/clients');
        const currentRoute = router.currentRoute.value;
        expect(currentRoute.name).toBe("login");
    });

    it("When the user is not logged in, navigate to single order page; otherwise, redirect to the login page", async () => {
        await router.push('/commandes/0');
        const currentRoute = router.currentRoute.value;
        expect(currentRoute.name).toBe("login");
    });

    it("When the user is not logged in, navigate to single client page; otherwise, redirect to the login page", async () => {
        await router.push('/clients/0');
        const currentRoute = router.currentRoute.value;
        expect(currentRoute.name).toBe("login");
    });

    it("When the user is logged in, navigate to orders page", async () => {
        localStorage.setItem("woodStockPlainTextToken", true);   
        await router.push('/commandes');
        const currentRoute = router.currentRoute.value;
        expect(currentRoute.name).toBe("OrdersView");
        localStorage.removeItem("woodStockPlainTextToken");
    });
    
    it("When the user is logged in, navigate to the login page; otherwise, redirect to the orders page", async () => {
        localStorage.setItem("woodStockPlainTextToken", true);  
        await router.push('/login');
        const currentRoute = router.currentRoute.value;
        expect(currentRoute.name).toBe("OrdersView");
        localStorage.removeItem("woodStockPlainTextToken");
    });
    
    it("When the user is logged in, navigate to unknow page; otherwise, redirect to the orders page", async () => {
        localStorage.setItem("woodStockPlainTextToken", true);  
        await router.push('/thisPageDoesNotExists');
        const currentRoute = router.currentRoute.value;
        expect(currentRoute.name).toBe("OrdersView");
        localStorage.removeItem("woodStockPlainTextToken");
    });

    it("When the user is logged in, navigate to clients page", async () => {
        localStorage.setItem("woodStockPlainTextToken", true);  
        await router.push('/clients');
        const currentRoute = router.currentRoute.value;
        expect(currentRoute.name).toBe("ClientsView");
        localStorage.removeItem("woodStockPlainTextToken");
    });

    it("When the user is logged in, navigate to root page; otherwise, redirect to the orders page", async () => {
        localStorage.setItem("woodStockPlainTextToken", true);  
        await router.push('/');
        const currentRoute = router.currentRoute.value;
        expect(currentRoute.name).toBe("OrdersView");
        localStorage.removeItem("woodStockPlainTextToken");
    });

    it("When the user is logged in, navigate to single client page", async () => {
        localStorage.setItem("woodStockPlainTextToken", true);  
        await router.push('/clients/0');
        const currentRoute = router.currentRoute.value;
        expect(currentRoute.name).toBe("SingleClientView");
        localStorage.removeItem("woodStockPlainTextToken");
    });

    it("When the user is logged in, navigate to single order page", async () => {
        localStorage.setItem("woodStockPlainTextToken", true);  
        await router.push('/commandes/0');
        const currentRoute = router.currentRoute.value;
        expect(currentRoute.name).toBe("SingleOrderView");
        localStorage.removeItem("woodStockPlainTextToken");
    });
});