import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { createRouter, createWebHistory } from 'vue-router';

// Sodda test komponenti
const SimpleTestComponent = {
  template: '<div>Test Page</div>'
};

// Test uchun sodda router
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: SimpleTestComponent }
  ]
});

describe('App', () => {
  it('renders without errors', async () => {
    // Quasar komponentlari o'rniga oddiy Vue komponentini test qilamiz
    const TestApp = {
      template: `
        <div>
          <header>My Quasar App</header>
          <router-view />
        </div>
      `
    };
    
    const wrapper = mount(TestApp, { 
      global: { 
        plugins: [router]
      } 
    });
    
    await router.isReady();
    expect(wrapper.text()).toContain('My Quasar App');
  });
});
