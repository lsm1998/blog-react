// 基础配置
export const DEFAULT_PAGE_SIZE = 10;
export const API_TIMEOUT_MS = 5000;

// 分页配置
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 4,
  MAX_PAGE_SIZE: 50,
  ALL_PAGE_SIZE: 1000
};

 // 默认头像 URL
export const DEFAULT_AVATAR = "https://avatars.githubusercontent.com/u/5803001?v=4";

// 正则表达式 (表单验证常用)
export const REGEX = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^\d{11}$/
};