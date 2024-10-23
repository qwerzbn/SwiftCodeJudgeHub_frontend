import { RouteRecordRaw } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import AboutView from "@/views/AboutView.vue";
import UserLayout from "@/layout/UserLayout.vue";
import LoginView from "@/views/user/UserLoginView.vue";
import RegisterView from "@/views/user/UserRegisterView.vue";
import QuestionAddView from "@/views/question/questionAddView.vue";
import ACCESS_ENUM from "@/access/accessEnum";
import QuestionMangeView from "@/views/question/questionMangeView.vue";
import questionsView from "@/views/question/questionsView.vue";
import viewQuestionView from "@/views/question/viewQuestionView.vue";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/user",
    name: "用户布局",
    component: UserLayout,
    children: [
      {
        path: "/user/login",
        name: "登录",
        component: LoginView,
      },
      {
        path: "/user/register",
        name: "注册",
        component: RegisterView,
      },
    ],
    meta: {
      hideInMenu: true, // 隐藏在菜单中
    },
  },
  {
    path: "/add/question",
    name: "添加题目",
    component: QuestionAddView,
    meta: {
      access: ACCESS_ENUM.ADMIN,
    },
  },
  {
    path: "/update/question",
    name: "更新题目",
    component: QuestionAddView,
    meta: {
      access: ACCESS_ENUM.ADMIN,
      hideInMenu: true,
    },
  },
  {
    path: "/manage/question",
    name: "管理题目",
    component: QuestionMangeView,
    meta: {
      access: ACCESS_ENUM.ADMIN,
    },
  },
  {
    path: "/",
    name: "浏览题目",
    component: questionsView,
  },
  {
    path: "/view/question/:id",
    name: "在线做题",
    component: viewQuestionView,
    props: true,
    meta: {
      access: ACCESS_ENUM.USER,
      hideInMenu: true,
    },
  },
  {
    path: "/about",
    name: "关于我的",
    component: AboutView,
  },
];
