import { Col, Card, Button, CarouselItem } from "react-bootstrap"
import useBebidas from "../hooks/useBebidas"

const Bebida = ({bebida}) => {

    const {idDrink, strDrink, strDrinkThumb } = bebida

    const { handleModalClick, handleBebidaIdClick } = useBebidas()

  return (
    /** a las 12 columnas en una pantalla lg las voy a dividir en 3 => lg={3} entonces voy a tener 4 columnas. Asi funciona */
    <Col md={6} lg={3}>
        <Card className="mb-4">
            <Card.Img 
                variant="top"
                src={strDrinkThumb}
                alt={`Imagen de ${strDrink}`}
            />
            <Card.Body>
                <Card.Title>{strDrink}</Card.Title>
                <Button
                    variant='warning'
                    className="w-100 text-uppercase mt-2"
                    onClick={() => {
                        handleModalClick()
                        handleBebidaIdClick(idDrink)
                    }}
                >
                    Ver Receta
                </Button>
            </Card.Body>
        </Card>
    </Col>
    )
}
export default Bebida