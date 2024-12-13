import { useParams } from "react-router"
import DefaultLayout from "../../components/layout/defaultLayout";
import styled, {css} from "styled-components";
import { useState } from "react";
import StyledImgContainer from "../../components/common/StyledImgContainer";

const ProductPage = () => {
    const {productId} = useParams();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [addAmount, setAddAmount] = useState(1);

    const ProductList = {
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
    
    const handleRight = () => {
        setCurrentIndex(prevIndex => Math.min(prevIndex + 1, ProductList.img.length - 1))
    }

    const handleLeft = () => {
        setCurrentIndex(prevIndex => Math.max(prevIndex - 1, 0))
    }

    const handleAdd = () => {
        setAddAmount(prevAmount => prevAmount + 1)
    }

    const handleDec = () => {
        setAddAmount(prevAmount => Math.max(1, prevAmount - 1))
    }

    return (
        <DefaultLayout>
            <Wrapper>
                <StyledProductPage>
                    <StyledProductImgDisplayer>
                        <StyledProductImgContainer>
                            <StyledArrow onClick={handleLeft} $show={currentIndex != 0} $direction="<">{"<"}</StyledArrow>
                            <StyledProductImgList $currentIndex={currentIndex}>
                                {ProductList.img.map((imgUrl, index) => {
                                    return (    
                                        <StyledProductImg key={index} $imgUrl={imgUrl}/>
                                    )
                                })}
                            </StyledProductImgList>
                            <StyledArrow onClick={handleRight} $show={currentIndex != ProductList.img.length - 1} $direction=">">{">"}</StyledArrow>
                        </StyledProductImgContainer>
                        <StyledProductImgSelecterBar>
                            {ProductList.img.map((imgUrl, index) => {
                                return (    
                                    <StyledProductImgSelecter key={index} $imgUrl={imgUrl} $isSelect={currentIndex === index} onClick={() => {setCurrentIndex(index)}}>
                                        <div/>
                                    </StyledProductImgSelecter>
                                )
                            })}
                        </StyledProductImgSelecterBar>
                    </StyledProductImgDisplayer>
                    <StyledProductInf>
                        <h3>{ProductList.name}</h3>
                        <h4>{ProductList.price}$</h4>
                        <p>{ProductList.des}</p>
                        <StyledAddToCartController>
                            <button onClick={handleAdd}>+</button>
                            <h4>{addAmount}</h4>
                            <button onClick={handleDec}>-</button>
                        </StyledAddToCartController>
                        <StyledAddToCartBtn>
                            Add to cart
                        </StyledAddToCartBtn>
                        <p>{ProductList.detail}</p>
                    </StyledProductInf>
                    <StyledReviewsSection>
                            <h3>Reviews</h3>
                            <StyledReviewList>
                                <StyledReview>
                                    <StyledUserContainer>
                                        <h4>User1</h4>
                                        <StyledUserImgContainer $imgUrl="/img/ReviewsUser.svg">
                                            <div/>
                                        </StyledUserImgContainer>
                                    </StyledUserContainer>
                                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Asperiores, quibusdam odit. Aliquid alias, id quo labore in voluptatem modi? Architecto pariatur temporibus repellendus enim soluta tenetur veniam quae iusto ea?</p>
                                </StyledReview>
                                <StyledReview>
                                    <StyledUserContainer>
                                        <h4>User1</h4>
                                        <StyledUserImgContainer $imgUrl="/img/ReviewsUser.svg">
                                            <div/>
                                        </StyledUserImgContainer>
                                    </StyledUserContainer>
                                    <p>good!!!</p>
                                </StyledReview>
                            </StyledReviewList>
                            <h4>Add Reviews</h4>
                            <StyledAddReviewInput/>

                    </StyledReviewsSection>
                </StyledProductPage>
            </Wrapper>
        </DefaultLayout>

    )
}

export default ProductPage

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    background-color: #c68642b2;
`

const StyledProductPage = styled.div`
    display: flex;
    flex-wrap: wrap;
    max-width: 1000px;
    padding: 16px;
    margin: 0 auto;
    
    
`

const StyledProductInf = styled.div`
    width: 40%;
    padding: 16px;

    & > h3{
        font-size: 36px;
        margin-bottom: 36px;
    }

    & > h4{
        font-size: 36px;
        margin-bottom: 16px;
    }

    p{
        margin: 16px 0px;
    }

    @media screen and (max-width: 746px){
        max-width: 100%;
        width: 100%;
        padding: 16px 0px;
    }
`

const StyledProductImgDisplayer = styled.div`
    width: 60%;
    padding: 16px;

    @media screen and (max-width: 746px){
        max-width: 100%;
        width: 100%;
        padding: 0px;
        padding-bottom: 16px

    }
`

const StyledReviewsSection = styled.div`
    width: 60%;
    padding: 16px;

    & > h3 {
        font-size: 32px;
        margin-bottom: 16px;
    }

    @media screen and (max-width: 746px){
        width: 100%
    }
`

const StyledProductImgContainer = styled.div`
    width: 100%;
    overflow: hidden;

    &::before{
        content: ' ';
        display: block;
        width: 100%;
        padding-top: 100%;
    }
`

const StyledProductImgList = styled.div.attrs((props) => ({
    style: {
        transform: `translateX(${props.$currentIndex && props.$currentIndex * -100}%)`,
    },
}))`
    display: flex;
    width: 100%;
    height: 100%;
    transition: all 0.3s;
    position: absolute;
    top: 0;
    left: 0;
`

const StyledProductImg = styled.div`
    flex: 0 0 100%;
    width: 100%;
    height: 100%;
    background-size: 100%;
    background-repeat: no-repeat;
    background-position: 50% 50%;
    ${props => props.$imgUrl && css`background-image: url(${props.$imgUrl});`}

`
const StyledProductImgSelecterBar = styled.div`
    margin-top: 16px;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 16px
`

const StyledProductImgSelecter = styled(StyledImgContainer)`
    width: 100px;
    border: 3px solid ${props => props.$isSelect ? "#5a3616" : "white"};
    border-radius: 20px;

    @media screen and (max-width: 540px){
        width: 60px;
    }
`

const StyledArrow = styled.button`
    width: 40px;
    height: 40px;
    margin: 0px 16px;
    border: none;
    color: white;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 50%;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 10;
    ${props => props.$direction === '<' ?
                        css`left: 0px;` :
                        props.$direction == '>' ?
                        css`right: 0px;` :
                        ""
    }
    opacity: ${props => props.$show ? 1 : 0};
    transition: all 0.5s;

    @media screen and (max-width: 746px){
        display: none;
    }
`

const StyledAddToCartBtn = styled.button`
    width: 100%;
    margin: 16px 0px;
    padding: 16px 0px;
    font-size: 24px;
    border: none;
    border-radius: 100px;
    color: #ffdd84;
    background-color: #8D5524;
`

const StyledAddToCartController = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin: 16px;

    button{
        width: 90px;
        font-size: 48px;
        line-height: 1;
        border: none;
        border-radius: 100px;
        color: #ffdd84;
        background-color: #8D5524;

    }

    h4{
        font-size: 32px;
    }
`

const StyledReviewList = styled.div`

`

const StyledUserContainer = styled.div`
    text-align: center;
    h4{
        font-size: 18px;
        margin-bottom: 8px;
    }
`

const StyledReview = styled.div`
    display: flex;
    padding: 16px 0px;
    align-items: center;
    gap: 16px;

    p{
        max-height: 120px;
        overflow: scroll;
    }
`

const StyledUserImgContainer = styled(StyledImgContainer)`
    width: 80px;

    @media screen and (max-width: 540px){
        width: 60px;
    }
`

const StyledAddReviewInput = styled.input`
    
`