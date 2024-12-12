import styled from "styled-components"
import ProductCard from "./ProductCard"

const ProductSection = () => {
    const ProductList = [
       {
            id: 1,
            name: "ChocoPower Bank",
            price: 30,
            stock: 30,
            des: "some des",
            detail: "some detail",
            reviews:[
                {"customersId": 1, "comment": "is so good"},
                {"customersId": 2, "comment": "is so good"}
            ],
            img: ["http://localhost:3000/powerBank1.png", "http://localhost:3000/powerBank2.png", "http://localhost:3000/powerBank3.png"]
        }
    ]

    return (
        <StlyedProductSection>
            <Wrapper>
                <h3>Get All You want!</h3>
                <StlyedProductCardContainer>
                    <ProductCard productInf={ProductList[0]}/>
                    <ProductCard productInf={ProductList[0]}/>
                    <ProductCard productInf={ProductList[0]}/>
                    <ProductCard productInf={ProductList[0]}/>
                    <ProductCard productInf={ProductList[0]}/>
                    <ProductCard productInf={ProductList[0]}/>
                </StlyedProductCardContainer>
            </Wrapper>
        </StlyedProductSection>
    )
}

export default ProductSection 

const StlyedProductSection = styled.section`
    padding: 16px;

    h3:first-child{
        width: 100%;
        text-align: center;
        font-size: 48px;
        margin-bottom: 16px;
    }
`

const Wrapper = styled.div`
    width: 100%;
    border-radius: 20px;
    background-color: #C68642;
    padding-top: 16px;
`

const StlyedProductCardContainer = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));

    @media screen and (max-width: 746px){
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    }
`