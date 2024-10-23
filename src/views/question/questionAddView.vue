<template>
  <div id="questionAddView">
    <div style="margin-left: 28px">
      <h2>创建题目</h2>
    </div>
    <a-form
      :model="form"
      :style="{ width: '600px' }"
      @submit="handleSubmit"
      label-align="right"
    >
      <a-form-item field="title" label="标题" style="min-width: 800px">
        <a-input v-model="form.title" placeholder="请输入标题" />
      </a-form-item>

      <a-form-item field="tags" label="标签" style="min-width: 800px">
        <a-input-tag v-model="form.tags" placeholder="请输入标签" allow-clear />
      </a-form-item>
      <a-form-item field="content" label="题目内容" style="min-width: 800px">
        <MdEditor :value="form.content" :handle-change="onContentChange" />
      </a-form-item>
      <a-form-item field="answer" label="答案" style="min-width: 800px">
        <MdEditor :value="form.answer" :handle-change="onAnswerChange" />
      </a-form-item>

      <a-form-item
        label="判题配置"
        :content-flex="false"
        :merge-props="false"
        style="min-width: 800px"
      >
        <a-space direction="vertical" fill>
          <a-form-item field="judgeConfig.memoryLimit" label="内存限制">
            <a-input-number
              v-model="form.judgeConfig.memoryLimit"
              min="0"
              mode="button"
              class="input-demo"
              placeholder="请输入内存限制"
            />
          </a-form-item>
          <a-form-item field="judgeConfig.stackLimit" label="堆栈限制">
            <a-input-number
              v-model="form.judgeConfig.stackLimit"
              min="0"
              mode="button"
              class="input-demo"
              placeholder="请输入堆栈限制"
            />
          </a-form-item>
          <a-form-item field="judgeConfig.timeLimit" label="时间限制">
            <a-input-number
              v-model="form.judgeConfig.timeLimit"
              min="0"
              mode="button"
              class="input-demo"
              placeholder="请输入时间限制"
            />
          </a-form-item>
        </a-space>
      </a-form-item>
      <a-form-item
        label="测试用例配置"
        :content-flex="false"
        :merge-props="false"
        style="min-width: 800px"
      >
        <a-form-item
          v-for="(judgeCaseItem, index) of form.judgeCase"
          :field="`judgeCase[${index}].value`"
          :label="`测试用例 - ${index}`"
          style="min-width: 480px"
          :key="index"
        >
          <a-space direction="vertical" fill>
            <a-form-item
              :field="`judgeCase[${index}].value.input`"
              :label="`输入用例 - ${index}`"
              style="min-width: 480px"
              :key="index"
            >
              <a-input
                v-model="judgeCaseItem.input"
                placeholder="请输入测试输入用例"
              />
            </a-form-item>
            <a-form-item
              :field="`judgeCase[${index}].value.output`"
              :label="`输出用例 - ${index}`"
              style="min-width: 480px"
              :key="index"
            >
              <a-input
                v-model="judgeCaseItem.output"
                placeholder="请输入测试输出用例"
              />
            </a-form-item>
            <a-button
              @click="handleDelete(index)"
              :style="{ marginLeft: '10px' }"
              status="danger"
              >删除
            </a-button>
          </a-space>
        </a-form-item>
        <div>
          <a-button @click="handleAdd" type="outline" status="success"
            >新增测试用例
          </a-button>
        </div>
      </a-form-item>
      <a-form-item>
        <a-button
          html-type="submit"
          type="primary"
          style="min-width: 200px; margin-top: 16px"
          >提交
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import MdEditor from "@/components/MdEditor.vue";
import { QuestionControllerService } from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRoute } from "vue-router";

const route = useRoute();
const updatePage = route.path.includes("update");
let form = ref({
  answer: "暴力破解",
  content: "题目内容",
  judgeCase: [{ input: "1 2", output: "3 4" }],
  judgeConfig: {
    memoryLimit: 1000,
    stackLimit: 1000,
    timeLimit: 1000,
  },
  tags: ["栈", "简单"],
  title: "A + B",
});
const loadData = async () => {
  const id = route.query.id;
  if (!id) {
    return;
  }
  const res = await QuestionControllerService.getQuestionByIdUsingGet(
    id as any
  );
  if (res.code === 0) {
    form.value = res.data as any;
    if (!form.value.judgeCase) {
      form.value.judgeCase = [
        {
          input: "",
          output: "",
        },
      ];
    } else {
      form.value.judgeCase = JSON.parse(form.value.judgeCase as any);
    }
    if (!form.value.judgeConfig) {
      form.value.judgeConfig = {
        memoryLimit: 1000,
        stackLimit: 1000,
        timeLimit: 1000,
      };
    } else {
      form.value.judgeConfig = JSON.parse(form.value.judgeConfig as any);
    }
    if (!form.value.tags) {
      form.value.tags = [];
    } else {
      form.value.tags = JSON.parse(form.value.tags as any);
    }
  } else {
    message.error("获取题目信息失败");
  }
};
onMounted(() => {
  loadData();
});

const handleAdd = () => {
  form.value.judgeCase.push({
    input: "",
    output: "",
  });
};
const handleDelete = (index: number) => {
  form.value.judgeCase.splice(index, 1);
};
const handleSubmit = async () => {
  if (updatePage) {
    const res = await QuestionControllerService.updateQuestionUsingPost(
      form.value
    );
    if (res.code === 0) {
      message.success("更新成功");
    } else {
      message.error("更新失败");
    }
  } else {
    const res = await QuestionControllerService.addQuestionUsingPost(
      form.value
    );
    if (res.code === 0) {
      message.success("提交成功");
    } else {
      message.error("提交失败" + res.message);
    }
  }
};
const onContentChange = (value: string) => {
  form.value.content = value;
};
const onAnswerChange = (value: string) => {
  form.value.answer = value;
};
</script>

<style scoped>
#questionAddView {
}
</style>
