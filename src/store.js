import { observable } from "mobx";

export const store = observable({
         points: {
           health: 0,
           relationships: 0,
           environment: 0,
           vocation: 0,
           prosperity: 0,
           selfImprovement: 0,
           brightnessOfLife: 0,
           spirituality: 0
         },
         subFields: [
           {
             title: ""
           }
         ],
         todos: {
            health: [],
            relationships: [],
            environment: [],
            vocation: [],
            prosperity: [],
            selfImprovement: [],
            brightnessOfLife: [],
            spirituality: []
         },
         seconds: 15
 });
