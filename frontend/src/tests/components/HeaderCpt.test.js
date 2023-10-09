import { mount } from '@vue/test-utils'
import { expect, test, describe, it } from 'vitest';
import HeaderCpt from '@/components/HeaderCpt.vue';

describe("MyComponent", async () => {
    it("renders correctly", () => {
        const wrapper = mount(HeaderCpt);
        expect(wrapper.exists()).toBe(true);
    });
});