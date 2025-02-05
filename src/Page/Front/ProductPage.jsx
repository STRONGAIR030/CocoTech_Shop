import { useParams } from "react-router";
import DefaultLayout from "../../components/layout/defaultLayout";
import styled, { css } from "styled-components";
import { useContext, useEffect, useRef, useState } from "react";
import StyledImgContainer from "../../components/common/StyledImgContainer";
import ListSwitch from "../../components/common/ListSwitch";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { API_HOST } from "../../constants";
import FrontContext from "../../components/context/FrontContext";
import LoadingAnimation from "../../components/common/LoadingAnimation";
import ReviewTipBox from "../../components/FrontComponents/ReviewsTipBox";

const ProductPage = () => {
    const { productId } = useParams();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [addAmount, setAddAmount] = useState(1);
    const [showReviews, setShowReviews] = useState(false);
    const {
        productList,
        productsDataLoaded,
        modifyProductToCart,
        fetchProductsData,
        userInf,
    } = useContext(FrontContext);
    const [productInf, setProductInf] = useState({});
    const [dataloaded, setLoading] = useState(false);
    const [reviewStatus, setReviewStatus] = useState(0);
    const [showReviewTipBox, setShowReveiwTipBox] = useState(false);
    const reviewTextArea = useRef("");

    useEffect(() => {
        if (!productsDataLoaded) {
            setTimeout(() => {
                fetchProductsData();
            }, 3000);
        }
    }, [productsDataLoaded, fetchProductsData]);

    useEffect(() => {
        if (productsDataLoaded) {
            setProductInf(
                productList.find((product) => product.id == productId),
            );
            setLoading(true);
        }
    }, [productsDataLoaded, productList, productId]);

    const handleRight = () => {
        setCurrentIndex((prevIndex) =>
            Math.min(prevIndex + 1, productInf.img.length - 1),
        );
    };

    const handleLeft = () => {
        setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    };

    const handleAdd = () => {
        setAddAmount((prevAmount) => prevAmount + 1);
    };

    const handleDec = () => {
        setAddAmount((prevAmount) => Math.max(1, prevAmount - 1));
    };

    const handleAddToCart = () => {
        modifyProductToCart(
            productInf.id,
            addAmount,
            productInf.name,
            productInf.img[0],
            productInf.price,
        );
    };

    const toggleShowReviews = () => {
        setShowReviews((prevShow) => !prevShow);
    };

    const toggleShowReveiwTipBox = () => {
        setShowReveiwTipBox((prevShow) => !prevShow);
    }

    const handleSubmit = async () => {
        if (!userInf.isSignIn) {
            setReviewStatus(2);
            setShowReveiwTipBox(true);
            return;
        }

        if (reviewTextArea.current.value == "") return;

        try {
            const patchData = {
                reviews: [
                    ...productInf.reviews,
                    {
                        customerId: userInf.id,
                        customerName: userInf.name,
                        comment: reviewTextArea.current.value,
                    },
                ],
            };

            const {data: updatedProduct} = await axios.patch(
                `${API_HOST}/products/${productId}`,
                patchData,
            );
            setReviewStatus(0);
            setShowReveiwTipBox(true);
            setProductInf(updatedProduct)
            console.log(updatedProduct);

            reviewTextArea.current.value = "";

        } catch (err) {
            console.error(err);
            setReviewStatus(1);
            setShowReveiwTipBox(true);
        }
    };

    return (
        <DefaultLayout>
            {dataloaded && productInf ? (
                <StyledProductPage>
                    <StyledProductImgDisplayer>
                        <StyledProductImgContainer>
                            <StyledArrow
                                onClick={handleLeft}
                                $show={currentIndex != 0}
                                $direction="<"
                            >
                                {"<"}
                            </StyledArrow>
                            <StyledProductImgList $currentIndex={currentIndex}>
                                {productInf.img.map((imgUrl) => {
                                    return (
                                        <StyledProductImg
                                            key={uuidv4()}
                                            $imgUrl={imgUrl}
                                        >
                                            <div></div>
                                        </StyledProductImg>
                                    );
                                })}
                            </StyledProductImgList>
                            <StyledArrow
                                onClick={handleRight}
                                $show={
                                    currentIndex != productInf.img.length - 1
                                }
                                $direction=">"
                            >
                                {">"}
                            </StyledArrow>
                        </StyledProductImgContainer>
                        <StyledProductImgSelecterBar>
                            {productInf.img.map((imgUrl, index) => {
                                return (
                                    <StyledProductImgSelecter
                                        key={uuidv4()}
                                        $imgUrl={imgUrl}
                                        $isSelect={currentIndex === index}
                                        onClick={() => {
                                            setCurrentIndex(index);
                                        }}
                                    >
                                        <div />
                                    </StyledProductImgSelecter>
                                );
                            })}
                        </StyledProductImgSelecterBar>
                    </StyledProductImgDisplayer>
                    <StyledProductInf>
                        <h3>{productInf.name}</h3>
                        <h4>{productInf.price}$</h4>
                        <p>{productInf.des}</p>
                        <StyledAddToCartController>
                            <button onClick={handleAdd}>+</button>
                            <h4>{addAmount}</h4>
                            <button onClick={handleDec}>-</button>
                        </StyledAddToCartController>
                        <StyledAddToCartBtn onClick={handleAddToCart}>
                            Add to cart
                        </StyledAddToCartBtn>
                        <p>{productInf.detail}</p>
                    </StyledProductInf>
                    <StyledReviewsSection>
                        <ListSwitch
                            handleClick={toggleShowReviews}
                            switchState={showReviews}
                            hrColor="#5a3616"
                            textSize="32px"
                            text="Reviews"
                        />
                        <StyledReviewList $show={showReviews}>
                            {productInf.reviews.map((review) => {
                                return (
                                    <StyledReview key={uuidv4()}>
                                        <StyledUserContainer>
                                            <h4>{review.customerName}</h4>
                                            <StyledUserImgContainer $imgUrl="/img/ReviewsUser.svg">
                                                <div />
                                            </StyledUserImgContainer>
                                        </StyledUserContainer>
                                        <p>{review.comment}</p>
                                    </StyledReview>
                                );
                            })}
                        </StyledReviewList>
                        <h3>Add Reviews</h3>
                        <StyledAddReviewInput ref={reviewTextArea} />
                        <StyledSubmitBtn onClick={handleSubmit}>
                            Submit
                        </StyledSubmitBtn>
                    </StyledReviewsSection>
                    <ReviewTipBox
                        toggleShow={toggleShowReveiwTipBox}
                        tryAgin={handleSubmit}
                        reviewStatus={reviewStatus}
                        show={showReviewTipBox}
                    />
                </StyledProductPage>
            ) : (
                <LoadingAnimation />
            )}
        </DefaultLayout>
    );
};

export default ProductPage;

const StyledProductPage = styled.div`
    display: flex;
    flex-wrap: wrap;
    max-width: 1000px;
    margin: 0 auto;

    button:active {
        background-color: #5a3616;
    }
`;

const StyledProductImgDisplayer = styled.div`
    width: 60%;
    padding: 16px;

    @media screen and (max-width: 746px) {
        max-width: 100%;
        width: 100%;
        padding: 0px;
        padding-bottom: 16px;
    }
`;

const StyledProductImgContainer = styled.div`
    width: 100%;
    overflow: hidden;
`;

const StyledProductImgList = styled.div.attrs((props) => ({
    style: {
        transform: `translateX(${props.$currentIndex && props.$currentIndex * -100}%)`,
    },
}))`
    display: flex;
    width: 100%;
    height: 100%;
    transition: all 0.3s;
`;

const StyledProductImg = styled(StyledImgContainer)`
    flex: 0 0 100%;
`;
const StyledProductImgSelecterBar = styled.div`
    margin-top: 16px;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
`;

const StyledProductImgSelecter = styled(StyledImgContainer)`
    width: 100px;
    border: 3px solid ${(props) => (props.$isSelect ? "#5a3616" : "white")};
    border-radius: 20px;

    @media screen and (max-width: 540px) {
        width: 60px;
    }
`;

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
    z-index: 1;
    ${(props) =>
        props.$direction === "<"
            ? css`
                  left: 0px;
              `
            : props.$direction == ">"
              ? css`
                    right: 0px;
                `
              : ""}
    opacity: ${(props) => (props.$show ? 1 : 0)};
    transition: all 0.5s;

    @media screen and (max-width: 746px) {
        display: none;
    }
`;

const StyledProductInf = styled.div`
    width: 40%;
    padding: 16px;

    & > h3 {
        font-size: 36px;
        margin-bottom: 36px;
    }

    & > h4 {
        font-size: 36px;
        margin-bottom: 16px;
    }

    p {
        margin: 32px 0px;
    }

    @media screen and (max-width: 746px) {
        max-width: 100%;
        width: 100%;
        padding: 16px 0px;
    }
`;

const StyledAddToCartBtn = styled.button`
    width: 100%;
    margin: 16px 0px;
    padding: 16px 0px;
    font-size: 24px;
    border: none;
    border-radius: 100px;
    color: #ffdd84;
    background-color: #8d5524;
`;

const StyledAddToCartController = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin: 16px;

    button {
        width: 90px;
        font-size: 48px;
        line-height: 1;
        border: none;
        border-radius: 100px;
        color: #ffdd84;
        background-color: #8d5524;
    }

    h4 {
        font-size: 32px;
    }
`;

const StyledReviewsSection = styled.div`
    width: 60%;
    padding: 16px;
    display: flex;
    flex-direction: column;

    & > h3 {
        font-size: 32px;
        margin-bottom: 16px;
    }

    @media screen and (max-width: 746px) {
        max-width: 100%;
        width: 100%;
        padding: 16px 0px;
    }
`;

const StyledReviewList = styled.div`
    max-height: ${(props) => (props.$show ? "300px" : "0px")};
    overflow-y: scroll;
    transition: all 0.5s;
`;

const StyledUserContainer = styled.div`
    text-align: center;
    h4 {
        font-size: 18px;
        margin-bottom: 8px;
    }
`;

const StyledReview = styled.div`
    width: 100%;
    display: flex;
    padding: 16px 8px;
    align-items: center;
    gap: 16px;
    p{
        min-width: 0;
        flex: 1;
        overflow-wrap: break-word;
    }
`;


const StyledUserImgContainer = styled(StyledImgContainer)`
    width: 80px;

    @media screen and (max-width: 540px) {
        width: 60px;
    }
`;

const StyledAddReviewInput = styled.textarea`
    width: 100%;
    height: 300px;
    padding: 16px;
`;

const StyledSubmitBtn = styled.button`
    align-self: flex-end;
    padding: 8px 16px;
    margin-top: 16px;
    font-size: 24px;
    line-height: 1;
    border: none;
    border-radius: 100px;
    color: #ffdd84;
    background-color: #8d5524;
`;
