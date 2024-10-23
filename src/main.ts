import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import ArcoVue from "@arco-design/web-vue";
import "@arco-design/web-vue/dist/arco.css";
import router from "./router";
import "@/access";
import "bytemd/dist/index.css";

const pinia = createPinia();
createApp(App).use(pinia).use(ArcoVue).use(router).mount("#app");
