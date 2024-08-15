const baseURL = "http://localhost:8000/api/";


export const getTales = async() => {
    const response = await fetch(`${baseURL}tales-list/`, {
        // credentials: 'include',
    })
    const result = await response.json()
    const data = Object.values(result)

    return data
}