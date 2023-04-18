import { useEffect, useState, createContext } from "react";
import axios from "axios";

const BebidasContext = createContext()

const BebidasProvider = ({children}) => {
    const [bebidas, setBebidas] = useState([]);
    const [modal, setModal] = useState(false);
    const [bebidaId, setBebidaId] = useState(null);
    const [receta, setReceta] = useState({});
    const [cargando, setCargando] = useState(false);

    useEffect(() => {
        setCargando(true)
        const getReceta = async () => {
            if(!bebidaId) return

            try {
                const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${bebidaId}`

                const {data} = await axios(url)
                setReceta(data.drinks[0])
            } catch (error) {
                console.log(error)
            } finally {
                setCargando(false)
            }
        }
        getReceta()
    },[bebidaId])
   
    const getBebidas = async datos => {
        
        const {nombre, categoria} = datos 

        try {
            const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${nombre}&c=${categoria}`

            const { data } = await axios(url)
            setBebidas(data.drinks)

        } catch (error) {
            console.log(error)
        }
    }

    const handleModalClick = () => {
        setModal(!modal)
    }

    const handleBebidaIdClick = id => {
        setBebidaId(id)
    }

    return (
        <BebidasContext.Provider
            value={{
                getBebidas,
                bebidas,
                handleModalClick,
                modal,
                handleBebidaIdClick,
                receta,
                cargando,
            }}
        >
            {children}
        </BebidasContext.Provider>
    )
}

export {
    BebidasProvider
}

export default BebidasContext