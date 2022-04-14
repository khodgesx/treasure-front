let apiUrl

const apiUrls = {
    production: "https://treasure-trash-api.herokuapp.com",
    development: "http://localhost:8000"
    // development: "https://treasure-trash-api.herokuapp.com"
}

if (window.location.hostname === "localhost") {
    apiUrl = apiUrls.development
} else {
    apiUrl = apiUrls.production
}

export default apiUrl