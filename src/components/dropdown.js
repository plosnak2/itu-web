import React, {useState, useEffect} from 'react';
import { IngredientRef } from '../firebase';
import Select from 'react-select';

const Dropdown = ({set}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState([]);
  const [items, setItems] = useState([]);

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
       /*const ingredients = await IngredientRef.doc("7pvY5SCEhJWcJt7IBcY9").get();
       let ingredients_data = []; 
       console.log(ingredients.data())
       ingredients.data().values.map(item => {
            ingredients_data.push({label: item, value: item})
      }) 
       setItems(ingredients_data)*/
    })();
 }, [])

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

