import axios from "axios";// me permite hacer la comunicacion con el backend
//creamos la clase
export class mediservices{
//variable donde tengo la url de la conexion y devo validar el nombre en el archivo controlador
    baseUrl="http//localhost:8080/medicamentos"

    //metodo para mostrar toda la informacion
    getAll(){
        //se realiza la parte logica para obtener la informacion
        return axios.get(this.baseUrl + "/mostrar" ).then(res => res.data);
    }
    //crear datos
    save(medicamentos){
        return axios.post(this.baseUrl + "/nuevo",medicamentos).then(res => res.data);
    }
    //eliminar datos
    delete(){
        return axios.get(this.baseUrl + "/mostrar/"+ idcodigo ).then(res => res.data);
    }
}
