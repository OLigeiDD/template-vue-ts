import Cookies from 'js-cookie'

// App
const sidebarStatuskey = 'sidebar_status'
export const getSidebarStatus = () => Cookies.get(sidebarStatuskey)
export const setSidebarStatus = (sidebarStatus: string) =>
  Cookies.set(sidebarStatuskey, sidebarStatus)

const sizeKey = 'size'
export const getSize = () => Cookies.get(sizeKey)
export const setSize = (size: string) => Cookies.set(sizeKey, size)
// language
const languagekey = 'language'
export const getLanguage = () => Cookies.get(languagekey)
export const setLanguage = (language: string) => Cookies.set(languagekey, language)

// User
const tokenKey = 'vue_typescript_admin_access_token'
export const getToken = () => Cookies.get(tokenKey)
export const setToken = (token: string) => Cookies.set(tokenKey, token)
export const removeToken = () => Cookies.remove(tokenKey)
