<template>
  <div id="viewQuestionView">
    <a-row :gutter="[24, 24]">
      <a-col :md="12" :xs="24">
        <a-tabs default-active-key="question">
          <a-tab-pane key="question" title="题目">
            <a-card v-if="question" :title="question.title">
              <a-descriptions
                title="判题配置"
                :column="{ xs: 1, md: 2, lg: 3 }"
              >
                <a-descriptions-item label="时间限制">
                  {{ question.judgeConfig.timeLimit ?? 0 }}
                </a-descriptions-item>
                <a-descriptions-item label="内存限制">
                  {{ question.judgeConfig.memoryLimit ?? 0 }}
                </a-descriptions-item>
                <a-descriptions-item label="堆栈限制">
                  {{ question.judgeConfig.stackLimit ?? 0 }}
                </a-descriptions-item>
              </a-descriptions>
              <MdViewer :value="question.content || ''"></MdViewer>
              <template #extra>
                <a-space wrap>
                  <a-tag
                    v-for="(tag, index) of question.tags"
                    :key="index"
                    color="blue"
                    >{{ tag }}
                  </a-tag>
                </a-space>
              </template>
            </a-card>
          </a-tab-pane>
          <a-tab-pane key="comment" title="评论区" disabled></a-tab-pane>
          <a-tab-pane key="题解" title="题解" disabled></a-tab-pane>
        </a-tabs>
      </a-col>
      <a-col :md="12" :xs="24">
        <a-form :model="form" layout="inline">
          <a-form-item
            field="language"
            label="编程语言"
            style="min-width: 200px"
          >
            <a-select
              v-model="form.language"
              placeholder="请选择编程语言"
              style="width: 200px"
            >
              <a-option>java</a-option>
              <a-option>cpp</a-option>
              <a-option>go</a-option>
            </a-select>
          </a-form-item>
        </a-form>

        <CodeEditor
          :value="form.code"
          :language="form.language"
          :handle-change="onChange"
        />
        <a-divider size="0" />
        <a-button
          type="outline"
          status="success"
          size="large"
          block
          style="min-width: 200px; margin-left: 200px"
          @click="doSubmit"
          >提交代码
        </a-button>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import { withDefaults, defineProps, ref, onMounted } from "vue";
import {
  Question,
  QuestionControllerService,
  QuestionSubmitAddRequest,
  QuestionSubmitControllerService,
  QuestionVO,
} from "../../../generated";
import { useRoute } from "vue-router";
import message from "@arco-design/web-vue/es/message";
import CodeEditor from "@/components/CodeEditor.vue";
import MdViewer from "@/components/MdViewer.vue";

interface Props {
  id: string;
}

const route = useRoute();
const question = ref<QuestionVO>();
const props = withDefaults(defineProps<Props>(), {
  id: () => "",
});
const form = ref<QuestionSubmitAddRequest>({
  questionId: props.id as any,
  code: "",
  language: "java",
});
const onChange = (value: string) => {
  form.value.code = value;
};
const loadData = async () => {
  const res = await QuestionControllerService.getQuestionVoByIdUsingGet(
    props.id as any
  );
  if (res.code === 0) {
    question.value = res.data;
  } else {
    message.error("获取题目失败" + res.message);
  }
};
onMounted(() => {
  loadData();
});
const doSubmit = async () => {
  const res = await QuestionSubmitControllerService.addQuestionSubmitUsingPost(
    form.value
  );
  if (res.code === 0) {
    message.success("提交成功");
  } else {
    message.error("提交失败," + res.message);
  }
};
</script>

<style>
#viewQuestionView {
  max-width: 1400px;
  margin: 0 auto;
}

#viewQuestionView .arco-space-horizontal .arco-space-item {
  margin-bottom: 0 !important;
}
</style>
