// a helper function to get username on various situations
// import {l}


export function getName() {
    const sess = sessionStorage.getItem("username")
    const loca = localStorage.getItem("username")

    if (sess == null && loca == null) {
        return null
    } else if (sess !== null) {
        return sess
    } else if (loca !== null) {
        return loca
    }
    return null
}

export function getUserID() {
    const sess = sessionStorage.getItem("userID")
    const loca = localStorage.getItem("userID")

    if (sess == null && loca == null) {
        return null
    } else if (sess !== null) {
        return sess
    } else if (loca !== null) {
        return loca
    }
    return null
}

export function logOut() {
    sessionStorage.removeItem("username")
    sessionStorage.removeItem("userID")
    sessionStorage.removeItem("token")
    localStorage.removeItem("username")
    localStorage.removeItem("userID")
    localStorage.removeItem("token")

}
