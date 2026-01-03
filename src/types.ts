// 博客文章类型定义
export interface Article {
  id: number;
  title: string;
  summary: string;
  date: string;
  tags: string[];
  content: string;
}

// 用户资料类型定义
export interface UserProfile {
  username: string;
  description: string;
  headshot: string;
  position: string; // 职位
  bio: string; // 简介
  email: string;
  github: string;
  techStack: string[]; // 技术栈列表
}

// 标签类型定义
export interface Tag {
  name: string;
  count: number;
}