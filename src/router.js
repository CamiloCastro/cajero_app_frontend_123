import vueRouter from 'vue-router'
import User from './components/User'
import UserBalance from './components/UserBalance'
import UserTransaction from './components/UserTransaction'
import UserAuth  from './components/UserAuth'
import UserRole  from './components/UserRole'
import UserCreate  from './components/UserCreate'
import UserModifyBalance  from './components/UserModifyBalance'
import App from './App'

const router = new vueRouter({
    mode: 'history',
    base: __dirname,
    routes: [
        {
            path: '/',
            name: "principal",
            component: App
        },
        {
            path: '/user/:usuario',
            name: "user",
            component: User
        },
        {
            path: '/user/balance/:username',
            name: "user_balance",
            component: UserBalance
        },
        {
            path: '/user/transaction/:username',
            name: "user_transaction",
            component: UserTransaction
        },
        {
            path: '/user/auth',
            name: 'user_auth',
            component: UserAuth
        },
        {
            path: '/user/role/:username',
            name: "user_role",
            component: UserRole
        },
        {
            path: '/user/create/:username',
            name: "user_create",
            component: UserCreate
        },
        {
            path: '/user/modify/balance/:username',
            name: "user_modify_balance",
            component: UserModifyBalance
        }
        
    ]
})
export default router