import {useState, useEffect} from 'react'
// this creates a localStorage by getting the item from key if there is a key then there is something in localStorage so it gets parsed by JSON and that value is returned.  Else we check to see if there's a default value from a function and return that default value if not then just return the default value. Finally we return value and setValue
export default function useLocalStorage(key, defaultValue){
    const [value, setValue] = useState(() => {
        const jsonValue = localStorage.getItem(key)
        if(jsonValue != null) return JSON.parse(jsonValue)

        if(typeof defaultValue === "function"){
            return defaultValue()
        } else {
            return defaultValue
        }
    })
    //whenever the value changes this will update with the current JSON version of that value
    useEffect(() => {
      localStorage.setItem(key, JSON.stringify(value))
    }, [key, value]);
    
      return [value, setValue]
}

