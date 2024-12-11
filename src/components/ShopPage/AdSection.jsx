import { useEffect, useState } from "react"
import styled, { css } from "styled-components"

const AdContainer = ({adList, currentIndex}) => {
    return(
        <StyledAdContainer $currentIndex={currentIndex}>    
        {
            adList.map((Ad) => {
                return (
                    <StyledAd key={Ad.id} $imgUrl={Ad.imgFile}>
                        {Ad.name}
                    </StyledAd>
                )
            })
        }
        </StyledAdContainer>
    )
}

const ListDisplayerContainer = ({adList, currentIndex, setCurrentIndex}) => {
    return (
        <StyledListDisplayerContainer>
        {
            adList.map((Ad) => {
                return (
                    <StyledListDisplayer onClick={() =>{setCurrentIndex(Ad.id - 1)}} key={Ad.id} $isShow={currentIndex == Ad.id - 1}/>
                )
            })
        }
        </StyledListDisplayerContainer>
    )
}

const AdSection = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const changeAd = () => {
            setCurrentIndex(prevIndex => prevIndex == adList.length - 1 ? 0 : prevIndex + 1)
        }
        const Interval = setInterval(changeAd, 5000);

        return () => {
            clearInterval(Interval)
        }
    }, [currentIndex])

    const adList = [
        {id: 1, name: "yee1", imgFile: "/img/hair3.png"},
        {id: 2, name: "yee2", imgFile: "/img/hair1.png"},
        {id: 3, name: "yee3", imgFile: "/img/hair2.png"},
        {id: 4, name: "yee4", imgFile: "/img/powerBank.png"},
        {id: 5, name: "yee5", imgFile: "/img/mic.png"},
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
                <AdContainer currentIndex={currentIndex} adList={adList}/>
                <ListDisplayerContainer currentIndex={currentIndex} adList={adList} setCurrentIndex={setCurrentIndex}/>
                <StyledArrow onClick={handleRight} $direction={">"}> 
                    {">"}
                </StyledArrow>
            </SyledAdBanner>
        </StyledAdSection>
    )
}

export default AdSection

const StyledAdSection = styled.section`
    padding: 32px 16px;
    height: 400px;

    @media screen and (max-width: 746px){
        height: 350px;
    }

    @media screen and (max-width: 540px){
        height: 300px;
    }

`

const SyledAdBanner = styled.div`
    max-width: 700px;
    height: 100%;
    margin: 0 auto;
    border-radius: 10px;
    border: 5px solid #8D5524;
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
    transition: all 0.3s;
`

const StyledAd = styled.div`
    flex: 0 0 100%;
    background-size: 700px;
    background-repeat: no-repeat;
    background-position: 50% 50%;
    ${props => props.$imgUrl && css`background-image: url(${props.$imgUrl});`}

    @media screen and (max-width: 540px){
        background-size: 500px;
    }

    @media screen and (max-width: 375px){
        background-size: 420px;
    }
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

    @media screen and (max-width: 746px){
        width: 10px;
        height: 10px;
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
        display: none;
    }
`

