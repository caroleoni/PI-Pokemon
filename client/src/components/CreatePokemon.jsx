import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { postPokemon, getTypes } from '../actions';

export default function CreatePokemon() {
    const dispatch = useDispatch();
    const types = useSelector((state) => state.types);
    const pokemons = useSelector((state) => state.pokemons);
    const navigate = useNavigate(); //me redirige a la ruta que quiero, que le indico
    const[errors, setErrors] = useState({required: true});

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

    useEffect(() => {
        dispatch(getTypes())
    }, [dispatch]);

function Validate(input) {
    let errors = {required: false};
    console.log(errors);

    if(!input.name) {
        errors.name ='Name is required';
        errors.required = true;
    } else if(typeof input.name !== 'string' || input.name.length < 2) {
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
    }
        return errors;
};

function handleChange(e) {
       setInput ({
            ...input,
            [e.target.name] : e.target.value
        })
        console.log(input);
       setErrors(Validate({
            ...input,
            [e.target.name] : e.target.value
        }))
};
function handleSelect(e) {
      setInput({
            ...input,
            types: [...input.types, e.target.value] //el types es lo que necsita el post, cuando le mando el types
            //traeme lo que ya habia-> ...input.types y concatenale el target.value, agrega en un arreglo todo lo 
            //que selecciono
        })
      setErrors(Validate({
            ...input,
            // types: [...input.types, e.target.value]
            [e.target.name] : e.target.value
        }))
};

useEffect(() => {
    if(input.types.length === 0) {
        setErrors({
            ...errors,
            required: true,
            types: 'Please choose at least one type'
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
        e.preventDefault();
        alert('You must complete all the required information')
    } else {
        e.preventDefault();
        dispatch(postPokemon(input))    
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

// function Validate(input) {
//     let errors = {};
//     console.log(errors, 'validar')

//     if(!input.name) {
//         errors.name ='Name is required';
//       } else if(typeof input.name !== 'string' || input.name.length < 2) {
//         errors.name = 'The name is invalid';
//       } else if(pokemons.find((p) => p.name.toLowerCase() === input.name.toLowerCase())) {
//         errors.name = `Pokemon name ${input.name} already exists`;
  
//       } else if(!input.hp) {
//         errors.hp = 'HP is required';
//       } else if(input.hp <= 0 || input.hp > 150) {
//         errors.hp = 'HP cannot be less than or equal to 0 and cannot be greater than 150 points';
  
//       } else if(!input.attack) {
//         errors.attack ='Attack is required';
//       } else if(input.attack <= 0 || input.attack > 150) {
//         errors.attack ='Attack cannot be less than or equal to 0 and cannot be greater than 150 points';
  
//       } else if(!input.defense) {
//         errors.defense ='Defense is required';
//       } else if(input.defense <= 0 || input.defense > 150) {
//         errors.defense ='Defense cannot be less than or equal to 0 and cannot be greater than 150 points';
  
//       } else if(!input.speed) {
//         errors.speed ='Speed is required';
//       } else if(input.speed <= 0 || input.speed > 150) {
//         errors.speed ='Speed cannot be less than or equal to 0 and cannot be greater than 150 points';
  
//       } else if(!input.height) {
//         errors.height ='Height is required';
//       } else if(input.height <= 0 || input.height > 150) {
//         errors.height ='Height cannot be less than or equal to 0 and cannot be greater than 150 points';
  
//       } else if(!input.weight) {
//         errors.weight ='Weight is required';
//       } else if(input.weight <= 0 || input.weight >150) {
//         errors.weight ='Weight cannot be less than or equal to 0 and cannot be greater than 150 points';

//       } else if(!input.image) {
//         errors.image = 'Image is required';
//       }
//       return errors;
// };


// function handleSubmit(e) {
//     e.preventDefault();
//     let errors = {};
//     console.log(errors, 'validar')

//     if(!input.name) {
//         return alert('Name is required')
//       } else if(typeof input.name !== 'string' || input.name.length < 1) {
//         return alert( 'The name is invalid')
//       } else if(pokemons.find((p) => p.name.toLowerCase() === input.name.toLowerCase())) {
//         return alert( `Pokemon name ${input.name} already exists`)
  
//       } else if(!input.hp) {
//         return alert( 'HP is required')
//       } else if(input.hp <= 0 || input.hp > 150) {
//         return alert( 'HP cannot be less than or equal to 0 and cannot be greater than 150 points')
  
//       } else if(!input.attack) {
//         return alert('Attack is required')
//       } else if(input.attack <= 0 || input.attack > 150) {
//         return alert('Attack cannot be less than or equal to 0 and cannot be greater than 150 points')
  
//       } else if(!input.defense) {
//         return alert('Defense is required')
//       } else if(input.defense <= 0 || input.defense > 150) {
//         return alert('Defense cannot be less than or equal to 0 and cannot be greater than 150 points')
  
//       } else if(!input.speed) {
//         return alert('Speed is required')
//       } else if(input.speed <= 0 || input.speed > 150) {
//         return alert('Speed cannot be less than or equal to 0 and cannot be greater than 150 points')
  
//       } else if(!input.height) {
//         return alert('Height is required')
//       } else if(input.height <= 0 || input.height > 150) {
//         return alert('Height cannot be less than or equal to 0 and cannot be greater than 150 points')
  
//       } else if(!input.weight) {
//         return alert('Weight is required')
//       } else if(input.weight <= 0 || input.weight >150) {
//         return alert('Weight cannot be less than or equal to 0 and cannot be greater than 150 points')
//       }

//     dispatch(postPokemon(input))    
//     alert('¡Pokemon Created!')
//     navigate('/home');
//     setInput({
//         name: '',
//         hp: '',
//         attack: '',
//         defense: '',
//         speed: '',
//         height: '',
//         weight: '',
//         image: '',
//         types: []   
//     })
    
// };

return (
    <div className='container-Created'>
        <Link to='/home'>
            <button className='btn-home'>Home</button>
        </Link>
        <h1>Create your Pokemon</h1>
        <form onSubmit={(e) => handleSubmit(e)}>
            <div className='container-form'>
                <div>
                    <label>Name:</label>
                    <input type='text' value={input.name} name='name' onChange={(e) => handleChange(e)} />
                    {
                        !errors.name ? null : (<span>{errors.name}</span>)
                    }
                </div>
                <div>
                    <label>HP:</label>
                    <input type='number' value={input.hp} name='hp' onChange={(e) => handleChange(e)} />
                    {
                        !errors.hp ? null : (<span>{errors.hp}</span>)
                    }
                </div>
                <div>
                    <label>Attack:</label>
                    <input type='number' value={input.attack} name='attack' onChange={(e) => handleChange(e)} />
                    {
                        !errors.attack ? null : (<span>{errors.attack}</span>)
                    }
                </div>
                <div>
                    <label>Defense:</label>
                    <input type='number' value={input.defense} name='defense' onChange={(e) => handleChange(e)} />
                    {
                        !errors.defense ? null : (<span>{errors.defense}</span>)
                    }
                </div>
                <div>
                    <label>Speed:</label>
                    <input type='number' value={input.speed} name='speed' onChange={(e) => handleChange(e)} />
                    {
                        !errors.speed ? null : (<span>{errors.speed}</span>)
                    }
                </div>
                <div>
                    <label>Height:</label>
                    <input type='number' value={input.height} name='height' onChange={(e) => handleChange(e)} />
                    {
                        !errors.height ? null : (<span>{errors.height}</span>)
                    }
                </div>
                <div>
                    <label>Weight:</label>
                    <input type='number' value={input.weight} name='weight' onChange={(e) => handleChange(e)} />
                    {
                        !errors.weight ? null : (<span>{errors.weight}</span>)
                    }
                </div>
                <div>
                    <label>Image:</label>
                    <input type='text' value={input.image} name='image' onChange={(e) => handleChange(e)} />
                    {
                        !errors.image ? null : (<span>{errors.image}</span>)
                    }
                </div>
                <div className='input-type'>
                    <label>Types:</label>
                    <select name='types' onChange={(e) => handleSelect(e)}>
                        {
                           types.map((t) => (
                                <option value={t.name} key={t.id}>{t.name}</option>
                            ))
                        }
                    </select>
                    {
                        input.types.map((t, i) => {
                            return(
                            <div key={i}>
                                <p>- {t}</p>
                                <button value={t} onClick={() => handleDelete(t)}>X</button>
                            </div>
                            )
                        })
                    }
                </div>
            </div>
            <button type='submit'>Create Pokemon</button>
        </form>
    </div>
)



}