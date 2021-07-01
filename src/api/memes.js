//manage the api request for meme related actions
import request_memes from "@/utils/request_memes";

export function get_meme(meme_id) {
    return request_memes({
        url:'/api_meme/meme',
        method: 'get',
        params: {
            id : meme_id,
        }
    })
}

export function create_meme(data) {
    return request_memes({
        url: '/api_meme/meme',
        method: 'POST',
        //headers: {'Access-Control-Allow-Origin': '*'},
        data
    })
}

export function update_meme(data, userName, meme_id) {
    return request_memes({
        url: '/api_meme/meme',
        method: 'PUT',
        //headers: {'Access-Control-Allow-Origin': '*'},
        params: {
            id: meme_id,
            username: userName,
        },
        data
    })
}

export function add_view(meme_id) {
    return request_memes({
        url: '/api_meme/view',
        method: 'POST',
        params: {
            id: meme_id
        }
    })
}

export function add_like(meme_id, userID) {
    return request_memes({
        url: '/api_meme/upvoting',
        method: 'GET',
        params: {
            id: meme_id,
            user_id: userID
        }
    })
}

export function upload_pic(data, meme_id) {
    return request_memes({
        url: '/api_meme/uploadPic',
        method: 'POST',
        params: {
          id: meme_id
        },
        data
    })
}

export function search_meme_cat(meme_name, meme_cat) {
    return request_memes({
        url: '/api_meme/search',
        method: 'GET',
        params: {
            name: meme_name,
            category: meme_cat
        },
    })
}

export function search_meme(meme_name) {
    return request_memes({
        url: '/api_meme/search',
        method: 'GET',
        params: {
            name: meme_name,
        },
    })
}

export function get_trending(number) {
    return request_memes({
        url: '/api_meme/trending',
        method: 'GET',
        params: {
            num: number,
        },
    })
}

export function get_recent(number) {
    return request_memes({
        url: '/api_meme/recent_edited',
        method: 'GET',
        params: {
            num: number,
        },
    })
}