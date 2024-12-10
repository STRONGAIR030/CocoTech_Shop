import { useState } from "react"
import styled, { css } from "styled-components"

const AdSection = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const adList = [
        {id: 1, name: "yee1"},
        {id: 2, name: "yee2"},
        {id: 3, name: "yee3"},
        {id: 4, name: "yee4"},
        {id: 5, name: "yee5"},
    ]

    const handleRight = () => {
        setCurrentIndex(prevIndex => prevIndex == adList.length - 1 ? 0 : prevIndex + 1)
    }

    const handleLeft = () => {
        setCurrentIndex(prevIndex => prevIndex == 0 ? adList.length - 1 : prevIndex - 1)
    }


    return (
        <StyledAdSection>
            <SyledAdBanner>
                <StyledArrow onClick={handleLeft} $direction={"<"}>
                    {"<"}
                </StyledArrow>
                <StyledAdContainer $currentIndex={currentIndex}>    
                    {
                        adList.map((Ad) => {
                            return (
                                <StyledAd key={Ad.id}>
                                    {Ad.name}
                                </StyledAd>
                            )
                        })
                    }
                </StyledAdContainer>
                <StyledListDisplayerContainer>
                    {
                        adList.map((Ad) => {
                            return (
                                <StyledListDisplayer onClick={() =>{setCurrentIndex(Ad.id - 1)}} key={Ad.id} $isShow={currentIndex == Ad.id - 1}/>
                            )
                        })
                    }
                </StyledListDisplayerContainer>

                <StyledArrow onClick={handleRight} $direction={">"}> 
                    {">"}
                </StyledArrow>
            </SyledAdBanner>
        </StyledAdSection>
    )
}

export default AdSection

const StyledAdSection = styled.section`
    padding: 32px 0px;
    height: 300px;
`

const SyledAdBanner = styled.div`
    width: 70%;
    height: 100%;
    margin: 0 auto;
    border: 1px solid black;
    overflow: hidden;
    
    &:hover{
        button{
            opacity: 1;
        }
    }
`

const StyledAdContainer = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    transform: translateX(${props => props.$currentIndex && props.$currentIndex * -100}%);
    transition: all 0.5s;

`

const StyledAd = styled.div`
    flex: 0 0 100%;
    border: 5px solid black;
`
const StyledListDisplayerContainer = styled.div`
    display: flex;
    position: absolute;
    bottom: 10px;
    left: 50%;
    gap: 16px;
    transform: translateX(-50%);

`

const StyledListDisplayer = styled.div`
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: ${props => props.$isShow ? "#8D5524" : "#ffffff4d"};
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
    opacity: 0;
    z-index: 10;
    ${props => props.$direction === '<' ?
                        css`left: 0px;` :
                        props.$direction == '>' ?
                        css`right: 0px;` :
                        ""
    }
    transition: all 0.5s;
    @media screen and (max-width: 746px){
        opacity: 1;
    }
`

