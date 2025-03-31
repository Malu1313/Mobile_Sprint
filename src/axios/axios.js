import axios from "axios";

const api = axios.create({
    baseURL: "http://10.89.240.68:5000/projeto_senai/",
    headers:{
        'accept':'application/json'
    }
});

const sheets = {
    postLogin:(usuario)=>api.post("login/", usuario),
    postUser:(usuario)=>api.post("usuario", usuario)
}

export default sheets;