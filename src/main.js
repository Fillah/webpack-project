require('./js/defaults')
import { person, sayHello } from './js/lib'

console.log(sayHello(person.name))

async function getPosts() {
    // const response = await fetch('https://jsonplaceholder.typicode.com/posts')
    const response = await fetch('http://localhost:8080/api/users')
    const data = await response.json()

    return data
}

if (window.navigator.onLine) {
    getPosts().then(posts => console.log(posts))
}