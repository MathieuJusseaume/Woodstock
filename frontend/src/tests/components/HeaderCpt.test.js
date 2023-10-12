import { mount } from '@vue/test-utils'
import { expect, describe, it } from 'vitest';
import HeaderCpt from '@/components/HeaderCpt.vue';

const childrenComponentClasses = [
    ".headerlayout__img",
    ".headerlayout__account__buttons",
    ".headerlayout__account__buttons__useraccount",
    ".headerlayout__account__buttons__logout"
];

describe("MyComponent", async () => {

    it("renders correctly", () => {
        const wrapper = mount(HeaderCpt);
        expect(wrapper.exists()).toBe(true);
    });

    it("Display specified text", () => {
        const wrapper = mount(HeaderCpt);
        expect(wrapper.text()).toContain("Mon compte");
        expect(wrapper.text()).toContain("Deconnexion");
    });

    it("Had spcecified class", async () => {
        const wrapper = mount(HeaderCpt);
        let wrapperClasses = wrapper.classes();
        expect(wrapperClasses).toContain("headerlayout");
    });

    it("Check children spcecified class exist", async () => {
        const wrapper = mount(HeaderCpt);
        for (let classe = 0; classe < childrenComponentClasses.length; classe++) {
            expect(wrapper.find(childrenComponentClasses[classe]).exists()).toBe(true);  
        } 
    });
});