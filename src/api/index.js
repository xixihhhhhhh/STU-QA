//当前这个模块：api进行统一管理
import requests from './require'

export const login = (params) => requests({ url: '/login', method: 'post', data: params })

export const regist = (params) => requests({ url: '/regist', method: 'post', data: params })

export const getUser = () => requests({ url: '/personal', method: 'get' })

export const getPersonalArticles = () => requests({ url: '/personal/articles', method: 'get' })

export const getPersonalPosts = () => requests({ url: '/personal/posts', method: 'get' })

export const getPersonalThreads = () => requests({ url: '/personal/threads', method: 'get' })

export const getThreads = (id) => requests({ url: `/thread/pagelist/${id}`, method: 'get' })

export const upbateUser = (params) =>
  requests({
    url: 'personal',
    method: 'put',
    data: params,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
  })

export const upbateAvatar = (params) =>
  requests({
    url: '/personal/icon',
    method: 'PUT',
    data: params,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

export const upbateBackground = (params) =>
  requests({
    url: '/background/create',
    method: 'PUT',
    data: params,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

export const submitArticle = (params) => requests({ url: '/article', method: 'post', data: params })

export const upbateArticle = (id, params) => requests({ url: `/article/${id}`, method: 'put', data: params })

export const submitQA = (params) => requests({ url: '/post', method: 'post', data: params })

export const upbateQA = (id, params) => requests({ url: `/post/${id}`, method: 'put', data: params })

export const upbateThread = (id, params) => requests({ url: `/thread/${id}`, method: 'put', data: params })

export const getArticleList = (params) => requests({ url: '/article/pagelist', method: 'GET', params: params })

export const getPostList = (params) => requests({ url: '/post/pagelist', method: 'GET', params: params })

export const getArticle = (id) => requests({ url: `/article/${id}`, method: 'get' })

export const getPost = (id) => requests({ url: `/post/${id}`, method: 'get' })

export const createthread = (id, params) => requests({ url: `/thread/${id}`, method: 'post', data: params })

export const getOneUser = (id) => requests({ url: `/personal/${id}`, method: 'get' })

export const deleteArticle = (id) => requests({ url: `/article/${id}`, method: 'delete' })

export const deleteQA = (id) => requests({ url: `/post/${id}`, method: 'delete', data: { pt: true } })

export const deleteThread = (thread_id) => requests({ url: `/thread/${thread_id}`, method: 'delete' })

export const getcode = (id) => requests({ url: `/verify/${id}`, method: 'get' })

export const findPassword = (params) => requests({ url: '/security', method: 'put', data: params })

export const updatepass = (params) => requests({ url: '/updatepass', method: 'put', data: params })

export const getUserBack = () => requests({ url: '/background/show', method: 'get' })

export const upbUserBack = (id) => requests({ url: `/background/update/${id}`, method: 'PUT' })
