//manage the router settings for vue components
import Vue from "vue";
import Router from "vue-router";
import {getName} from '@/utils/userStatus';

const routerOptions = [
    { path: "/", name: "main", component: "Homepage" },
    { path: "/home", name: "home", component: "Homepage" },
    { path: "/search", name: "search", component: "SearchResult" },
    { path: "/search/:name", name: "SearchResult", component: "SearchResult" },
    { path: "/editor", name: "editor_create", component: "WikiEditor"},
    { path: "/editor/:meme_id", name: "editor_update", component: "WikiEditor"},
    { path: "/wiki_page/:meme_id", name: "wiki_page", component: "WikiPage"},
    { path: "/test_comment", name: "testComment", component: "TestComment"},
    { path: "/login", name: "login", component: "Login"},
    { path: "/create_account", name: "createAccount", component: "Register"},
    { path: "/favorite", name: "favorite", component: "UserFav"},
    { path: "/history", name: "history", component: "UserHistory"},
    { path :'*', name: "NotFound", component: "NotFound"},
];

const blockList = ["favorite", "history", "editor_create", "editor_update"]
const switchList = ["login", "register"]

const routes = routerOptions.map(route => {
    return {
        ...route,
        component: () => import(`../components/${route.component}.vue`)
    };
});

Vue.use(Router);

const router = new Router({
    mode: "history",
    routes,
})

// setting up a function to identify if the router page requires authentication
router.beforeEach((to, from, next) => {
    let username = getName()

    let block = false
    blockList.forEach(function (item) {
        if (item === to.name) {
            block = true
        }
    })
    if (username == null) {
        if (block) {
            console.log("success")
            next("/")
        }
    }

    let swi = false
    switchList.forEach(function (item) {
        if (item === to.name) {
            swi = true
        }
    })
    if (username !== null) {
        if (swi) {
            next("/")
        }
    }

    //check if the router is going to search page
    // if (to.name !== "search") {
    //     if (router.params.name !== null) {
    //         console.log("success")
    //         router.params.remove("name")
    //     }
    // }

    next()
})

export default router
