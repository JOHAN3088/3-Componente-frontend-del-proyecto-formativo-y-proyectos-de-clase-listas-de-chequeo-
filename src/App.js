import './App.css';
import { Component } from 'react';
import React from 'react';
import { MediServices } from './services/MediServices';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Panel } from 'primereact/panel';       
import { Menubar } from 'primereact/menubar';
import { Dialog } from 'primereact/dialog';
import { FloatLabel } from 'primereact/floatlabel';

import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-blue/theme.css";        

//realizamos la comunicacion con la clase que creamos y empezamos a generar con los componentes
export default class App extends Component{
        //creamos el comoponente del tipo contructor, este va a ir creciendo con cada uno de los diferentes servicios
        constructor(){
            //variables con las que se trabajaran
            super();
            //estado o objeto que va a ir tomando la clase
            this.state={
                visible:false,
                medicamentos:{
                    idcodigo:null,
                    nombre:null,
                    gramaje:null,          
                    caracteristicas:null,
                    existencias:null
            },
            selectedMedicamento:{

            }
        };
        //creo el constructor para los items del menu
        this.items=[

            {
                label:"Nuevo",
                icon:"pi pi-fw pi-user-plus",
                command:()=>{this.showSaveDialog()}
            },{
                label:"Editar",
                icon:"pi pi-fw pi-user-edit",
                command:()=>{this.showEditDialog()}
            },{
                label:"Eliminar",
                icon:"pi pi-fw pi-user-minus",
                command:()=>{this.delete()}
            }
         ];
         //apuntar lo que tenemos de la clase en una variable
         this.mediServices = new MediServices();
         this.save=this.save.bind(this);
         this.delete=this.delete.bind(this);
      
         //Boton
         this.footer=(
            <div>
                <Button label='Guardar' onClick={this.save}></Button>
            </div>
         )
        this.Toast= React.createRef();
             //icon="pi pi-check"
    }
    //entregar la informacion que se ingrese en cada uno de los metodos del frontend 
    componentDidMount(){
        //asignamos a la variable que acabamos de crear, los estados que se pueden tener en medicamentos
        this.mediServices.getAll().then(data=>this.setState({medicamento:data}))
    }        
    //metodo para guardar
    save(){
        this.mediServices.save(this.state.medicamentos).then(data=>{
            this.setState({
                visible:false,
                medicamentos:{
                    idcodigo:null,
                    nombre:null,
                    gramaje:null,          
                    caracteristicas:null,
                    existencias:null,
            }
        });
        this.Toast.current.show({severity:"Succes",summary:"Exitoso!",detail:"el medicamento se guardo de forma correcta",})
        this.mediServices.getAll().then(data=>this.setState({medicamento:data}))
        })
    }
    delete(){
        if(window.confirm("¿desea borrar la informacion?")){
            this.mediServices.delete(this.state.selectedMedicamento.idcodigo).then(data=>{
                this.Toast.current.show({severity:"Succes",summary:"Exitoso!",detail:"el medicamento se borro de forma correcta",})
                this.mediServices.getAll().then(data=>this.setState({medicamento:data}))
             
            })
        }
    }
    //metodo render,para definir el componentes por el cual vamos a cargar la informacion
    render(){
        //que nos traiga la informacion en un datable.lo verifico en primerecat
        return(
            <div style={{width:"80%", margin:"40px auto 0px"}}>
                <Menubar model={this.items}/>
                <br/>
              
                <Panel header="MEDICAMENTOS">
                    <DataTable value={this.state.medicamento} paginator rows={5} rowsPerPageOptions={[ 5, 10, 25, 50 ]} selectionMode={"single"} selection={this.state.selectedMedicamento}
                    onSelectionChange={ e =>this.setState({selectedMedicamento: e.value})}>
                        <Column field='idcodigo' header="Codigo"></Column>
                        <Column field='nombre' header="Nombre"></Column>
                        <Column field='gramaje' header="Gramaje"></Column>
                        <Column field='caracteristicas' header="Caracteristicas"></Column>
                        <Column field='existencias' header="Existencias"></Column>
                    </DataTable>
                </Panel>

                <Dialog  header="MEDICAMENTOS" visible={this.state.visible} style={{width:"400px"}} footer={this.footer} modal={true} onHide={()=>this.setState({visible:false})}>
                               
               <FloatLabel>
               <InputText style={{width:"100%"}} value={this.state.medicamentos.nombre} id="nombre" onChange={(e)=>{
                        let val= e.target.value;
                        this.setState(prevState=>{
                            let medicamentos=Object.assign({},prevState.medicamentos);
                            medicamentos.nombre=val;
                            return {medicamentos};
                        })
                    }}/>
                        <label for="nombre">nombre del medicamento</label>
                
                </FloatLabel><br/>
                <FloatLabel>
                <InputText style={{width:"100%"}} value={this.state.medicamentos.gramaje} id="gramaje" onChange={(e)=>{
                        let val= e.target.value;
                        this.setState(prevState=>{
                            let medicamentos=Object.assign({},prevState.medicamentos);
                            medicamentos.gramaje=val;
                            return {medicamentos};
                        })
                    }}/>
                        <label for="gramaje">gramaje</label>
                                
                </FloatLabel><br/>
                <FloatLabel>
                    <InputText style={{width:"100%"}} value={this.state.medicamentos.caracteristicas} id="caracteristicas" onChange={(e)=>{
                        let val= e.target.value;
                        this.setState(prevState=>{
                            let medicamentos=Object.assign({},prevState.medicamentos);
                            medicamentos.caracteristicas=val;
                            return {medicamentos};
                        })
                    }}/>
                        <label for="caracteristicas">caracteristicas</label>
                    
            
                </FloatLabel><br/>
                <FloatLabel>
                    <InputText style={{width:"100%"}} value={this.state.medicamentos.existencias} id="existencias" onChange={(e)=>{
                        let val= e.target.value;
                        this.setState(prevState=>{
                            let medicamentos=Object.assign({},prevState.medicamentos);
                            medicamentos.existencias=val;
                            return {medicamentos};
                        })
                    }}/>
                        <label for="existencias">existencias</label>

                </FloatLabel><br/>
            
               </Dialog>               
               <Toast ref={this.Toast}/> 
            </div>
        );
    }

 showSaveDialog(){
    this.setState({
        visible:true,
        medicamentos:{
            idcodigo:null,
            nombre:null,
            gramaje:null,          
            caracteristicas:null,
            existencias:null,
        }
    });
   }
  showEditDialog(){
    this.setState({
        visible:true,
        medicamentos:{
            idcodigo: this.state.selectedMedicamento.idcodigo,
            nombre:this.state.selectedMedicamento.nombre,
            gramaje:this.state.selectedMedicamento.gramaje,          
            caracteristicas:this.state.selectedMedicamento.caracteristicas,
            existencias:this.state.selectedMedicamento.existencias
        }
    });
  }
}
//export default appe