//manage the api request for user related actions
import request_users from '@/utils/request_users'

export function register(data) {
    return request_users({
        url: '/api_user/registration',
        method: 'POST',
        //headers: {'Access-Control-Allow-Origin': '*'},
        data
    })

}

export function login(data) {
    return request_users({
        url: '/api_user/login',
        method: 'POST',
        data
    })
}

export function getHistory(id_user) {
    return request_users({
        url: '/api_user/history',
        method: 'GET',
        params: {
            id: id_user,
        }
    })
}

export function addHistory(id_meme, id_user) {
    return request_users({
        url: '/api_user/addHistory',
        method: 'PUT',
        params: {
            id: id_user,
            meme_id: id_meme,
        }
    })
}

export function getFav(id_user) {
    return request_users({
        url: '/api_user/fav',
        method: 'GET',
        params: {
            id: id_user,
        }
    })
}

export function addFav(id_meme, id_user) {
    return request_users({
        url: '/api_user/addFav',
        method: 'PUT',
        params: {
            id: id_user,
            meme_id: id_meme,
        }
    })
}