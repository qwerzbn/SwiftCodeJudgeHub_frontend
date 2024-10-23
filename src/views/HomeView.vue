<template>
  <div class="home">
    <CodeEditor :value="codeValue" :handle-change="onCodeChange" />
    <MdEditor :value="mdValue" :handle-change="onMdChange" />
  </div>
</template>

<script setup lang="ts">
import MdEditor from "@/components/MdEditor.vue";
import { ref } from "vue";
import CodeEditor from "@/components/CodeEditor.vue";

const mdValue = ref("");
const codeValue = ref("");
const onMdChange = (val: string) => {
  mdValue.value = val;
  console.log(val);
};
const onCodeChange = (val: string) => {
  codeValue.value = val;
  console.log(val);
};
</script>
