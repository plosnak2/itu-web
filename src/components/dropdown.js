/**
 * Author: Jozef Čásar (xcasar)
 * This is logical and graphic component that displays the filter, where user can choose the ingredients
 */
import React, {useState, useEffect} from 'react';
import { IngredientRef } from '../firebase';
import Select from 'react-select';

const Dropdown = ({set}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState([]);
  const [items, setItems] = useState([]);

  //get all ingredients used in recipes from database
  useEffect(() => {
    (async () => {
        IngredientRef.onSnapshot((QuerySnapshot) => {
            let ingredients_data = [];
            QuerySnapshot.forEach((ingredients) => {               
                ingredients.data().values.map(item => {
                    ingredients_data.push({label: item, value: item})
              })                
            });
            setItems(ingredients_data)
        });
    })();
 }, [])

 //add value to items on change in filter
 const onChange = async(values) => {
     let vals = []
    values.map(item => {vals.push(item.value)}) 
    setValue(values)
    set(vals)
 }

  return (
    <Select
    i
    isMulti
    placeholder="Vyberte ingrediencie"
    name="Ingrediencie"
    value={value}
    options={items}
    onChange={(value) => {onChange(value)}}
    className="basic-multi-select"
    classNamePrefix="select"
    styles={{ menu: provided => ({ ...provided, zIndex: 9999 })}}
    />
  );
}
export default Dropdown

