import './App.css';
import { Component } from 'react';
import React from 'react';
import { Calendar } from 'primereact/calendar';
import { Checkbox } from 'primereact/checkbox';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { MultiSelect } from 'primereact/multiselect';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toolbar } from 'primereact/toolbar';
import { Card } from 'primereact/card';
import { Image } from 'primereact/image';

//realizamos la comunicacion con la clase que creamos y empezamos a generar con los componentes
export default class App extends Component{
        //creamos el comoponente del tipo contructor, este va a ir creciendo con cada uno de los diferentes servicios
        constructor(){
            //variables con las que se trabajaran
            super();
            //estado o objeto que va a ir tomando la clase
            this.state={
                idcodigo:null,
                nombre:null,
                gramaje:null,          
                caracteristicas:null,
                existencias:null,
            },
            selectedMedicamento;{

            };
        }
    }
                        
                                
        
        
        
        

