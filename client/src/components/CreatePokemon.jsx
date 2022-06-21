import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { postPokemon, getTypes, getPokemons } from '../actions';
import '../styles/CreatePokemon.css';

export default function CreatePokemon() {
    const dispatch = useDispatch();
    const types = useSelector((state) => state.types);
    const pokemons = useSelector((state) => state.pokemons);
    const navigate = useNavigate(); //me redirige a la ruta que quiero, que le indico
    const[errors, setErrors] = useState({required: true});

    useEffect(() => {
        !types.length && dispatch(getTypes())
        !pokemons.length && dispatch(getPokemons())
  }, [dispatch])

    const [input, setInput] = useState({ //en el setInput es donde guardo todo
        name: '',
        hp: '',
        attack: '',
        defense: '',
        speed: '',
        height: '',
        weight: '',
        image: '',
        types: []  
    });

    

function Validate(input) {
    let errors = {required: false};
    console.log(errors);

    if(!input.name) {
        errors.name ='Name is required';
        errors.required = true;
    } else if(!/\S{1,15}[^0-9]/.test(input.name)) {
        errors.name = 'The name is invalid';
        errors.required = true;
    } else if(pokemons.find((p) => p.name.toLowerCase() === input.name.toLowerCase())) {
        errors.name = `Pokemon name ${input.name} already exists`;
        errors.required = true;
          
    } else if(!input.hp) {
        errors.hp = 'HP is required';
        errors.required = true;
    } else if(input.hp <= 0 || input.hp > 150) {
       errors.hp = 'HP cannot be less than or equal to 0 and cannot be greater than 150 points';
       errors.required = true;
          
    } else if(!input.attack) {
        errors.attack ='Attack is required';
        errors.required = true;
    } else if(input.attack <= 0 || input.attack > 150) {
        errors.attack ='Attack cannot be less than or equal to 0 and cannot be greater than 150 points';
        errors.required = true;
          
    } else if(!input.defense) {
        errors.defense ='Defense is required';
        errors.required = true;
    } else if(input.defense <= 0 || input.defense > 150) {
        errors.defense ='Defense cannot be less than or equal to 0 and cannot be greater than 150 points';
        errors.required = true;
          
    } else if(!input.speed) {
        errors.speed ='Speed is required';
        errors.required = true;
    } else if(input.speed <= 0 || input.speed > 150) {
        errors.speed ='Speed cannot be less than or equal to 0 and cannot be greater than 150 points';
        errors.required = true;
          
    } else if(!input.height) {
        errors.height ='Height is required';
        errors.required = true;
    } else if(input.height <= 0 || input.height > 150) {
        errors.height ='Height cannot be less than or equal to 0 and cannot be greater than 150 points';
        errors.required = true;
          
    } else if(!input.weight) {
        errors.weight ='Weight is required';
        errors.required = true;
    } else if(input.weight <= 0 || input.weight >150) {
        errors.weight ='Weight cannot be less than or equal to 0 and cannot be greater than 150 points';
        errors.required = true;
        
    } else if(!input.image.includes("https://")) {
        errors.image = 'Image is required';
        errors.required = true;
    } else if (input.types.length === 0) errors.types = "You must select the pokemon types"
        else if (input.types.length > 2) errors.types = "Max 2 types"

        return errors;
};

function handleChange(e) {
       setInput ({
            ...input,
            [e.target.name]: e.target.value
        })
        console.log(input);
       setErrors(Validate({
            ...input,
            [e.target.name]: e.target.value
        }, pokemons))
};

function handleSelect(e) {
    e.preventDefault();
    const existingType = input.types.find(type => type === e.target.value)
        if (existingType) return
            if (input.types.length > 1) return
            setInput({
                  ...input,
                  types: [...input.types, e.target.value]
            })
    //   setInput({
    //         ...input,
    //         types: [...input.types, e.target.value] //el types es lo que necsita el post, cuando le mando el types
    //         //traeme lo que ya habia-> ...input.types y concatenale el target.value, agrega en un arreglo todo lo 
    //         //que selecciono
    //     })
      setErrors(Validate({
            ...input,
            types: [...input.types, e.target.value]
            // [e.target.name]: e.target.value
        }, pokemons))
};

useEffect(() => {
    if(input.types.length === 0) {
        setErrors({
            ...errors,
            required: true,
            types: 'You must select the pokemon types'
        })
    }
}, [input.types, errors.required]);

function handleDelete(e) {
    setInput({
        ...input,
        types: input.types.filter(t => t !== e)
    })
};
function handleSubmit(e) {
    if(errors.required) {
        e.preventDefault(); //sin esto se nos actualiza la pagina y perdemos el estado
        alert('You must complete all the required information')
    } else {
        e.preventDefault();
        console.log(input.types)
        dispatch(postPokemon(input))
        dispatch(getPokemons()) 
            alert('¡Pokemon Created!')
            navigate('/home');
            setInput({
                name: '',
                hp: '',
                attack: '',
                defense: '',
                speed: '',
                height: '',
                weight: '',
                image: '',
                types: []   
            })
    }
};

useEffect(() => {
    dispatch(getTypes())
}, [dispatch]);

return (
    <div className='container-Created'>
        <Link to='/home'>
            <button className='btn-home'>Home</button>
        </Link>
        <h1>Create your Pokemon</h1>
        <form className='form' onSubmit={(e) => handleSubmit(e)}>
            <div className='container-form'>
                <div>
                    <label>Name:</label>
                    <input className='input' type='text' value={input.name} name='name' onChange={(e) => handleChange(e)} />
                    {
                        !errors.name ? null : (<span className='error'>{errors.name}</span>)
                    }
                </div>
                <div>
                    <label>HP:</label>
                    <input className='input' type='number' value={input.hp} name='hp' onChange={(e) => handleChange(e)} />
                    {
                        !errors.hp ? null : (<span className='error'>{errors.hp}</span>)
                    }
                </div>
                <div>
                    <label>Attack:</label>
                    <input className='input' type='number' value={input.attack} name='attack' onChange={(e) => handleChange(e)} />
                    {
                        !errors.attack ? null : (<span className='error'>{errors.attack}</span>)
                    }
                </div>
                <div>
                    <label>Defense:</label>
                    <input className='input' type='number' value={input.defense} name='defense' onChange={(e) => handleChange(e)} />
                    {
                        !errors.defense ? null : (<span className='error'>{errors.defense}</span>)
                    }
                </div>
                <div>
                    <label>Speed:</label>
                    <input className='input' type='number' value={input.speed} name='speed' onChange={(e) => handleChange(e)} />
                    {
                        !errors.speed ? null : (<span className='error'>{errors.speed}</span>)
                    }
                </div>
                <div>
                    <label>Height:</label>
                    <input className='input' type='number' value={input.height} name='height' onChange={(e) => handleChange(e)} />
                    {
                        !errors.height ? null : (<span className='error'>{errors.height}</span>)
                    }
                </div>
                <div>
                    <label>Weight:</label>
                    <input className='input' type='number' value={input.weight} name='weight' onChange={(e) => handleChange(e)} />
                    {
                        !errors.weight ? null : (<span className='error'>{errors.weight}</span>)
                    }
                </div>
                <div>
                    <label>Image:</label>
                    <input className='input' type='text' value={input.image} name='image' onChange={(e) => handleChange(e)} />
                    {
                        !errors.image ? null : (<span className='error'>{errors.image}</span>)
                    }
                </div>
                <div className='input-type'>
                    <label>Types:</label>
                    <select  disabled={input.types.length > 1}  onChange={(e) => handleSelect(e)} >
                        <option >TYPES:</option>
                        {/* <option className='navbar_option'>ALL TYPES</option> */}
                        {
                           types && types.map((t) => (<option value={t.name} key={t.name}>{t.name.toUpperCase()}</option>))
                        }
                        
                    </select>
                    {!errors.types ? null : (<span className='error'>{errors.types}</span>)}
                    {
                        input.types?.map((t) => {
                            return(
                            <div className='list_types' key={t}>
                                <p className='type'>- {t}</p>
                                <button className='btn-delete' value={t} onClick={() => handleDelete(t)}>X</button>
                            </div>
                            )
                        })
                    }
                </div>
            </div>
            <button className='btn_form' type='submit'>Create Pokemon</button>
        </form>
    </div>
)



}