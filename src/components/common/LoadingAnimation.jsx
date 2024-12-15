import styled from "styled-components";

const LoadingAnimation = () => {
    return (
        <StyledLoading></StyledLoading>
    )
}

export default LoadingAnimation

const StyledLoading = styled.div`
width: 100%;
height: 500px;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
flex-wrap: wrap;

&::before{
    content:"";
    width: 100px;
    height: 100px;
    margin-bottom: 24px;
    border-radius: 50%;
    border-top: 20px solid #8D5524;
    border-left: 20px solid #f0eef1;
    border-right: 20px solid #f0eef1;
    border-bottom: 20px solid #f0eef1;
    animation: LoadingCirleanimation 1.5s both infinite linear;
}

&::after{
    content:"";
    font-size: 32px;
    font-weight: 600;
    animation: Loadinganimation 2s both infinite linear;
}


@keyframes Loadinganimation{
    0%{
        content:"Loading."
    }
    30%{
        content:"Loading.."
    }
    50%{
        content:"Loading..."
    }
    80%{
        content:"Loading...."
    }
    100%{
        content:"Loading....."
    }
}

@keyframes LoadingCirleanimation{
    0%{
        transform: rotate(0deg)
    }
    100%{
        transform: rotate(360deg)
    }
}

`