import axios from 'axios';


const instance = axios.create({
    baseURL:'https://react-my-burger-e0383.firebaseio.com/'
});


export default instance;