
let path = location.pathname

const getUser = () =>   {
    if (path.charAt(path.length - 1) == '/') {
        return path.split("").slice(1, -1).join("")
    } else  {
        return path.replace('/', "")
                    .replace('/techs', "")
                    .replace('/repos', "")
                    .replace('/')
    }
}

export default getUser();