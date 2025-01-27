import { useNavigate } from "react-router"
import StyledBlurBackGround from "../common/StyledBlurBackground";
import styled from "styled-components";
import PropTypes from "prop-types";

const ReviewSuccessContent = ({toggleShow}) => {
    return (
        <>
            <StyledTextSection>
                <h3>Review Success!!</h3>
            </StyledTextSection>
            <StyledButtonSection>
                <button onClick={toggleShow}>Ok</button>
            </StyledButtonSection>
        </>
    )
}

ReviewSuccessContent.propTypes = {
    toggleShow: PropTypes.func.isRequired,
}

const ReviewfailedContent = ({tryAgin, toggleShow}) => {
    return (
        <>
            <StyledTextSection>
                <h3>Review failed!!</h3>
            </StyledTextSection>
            <StyledButtonSection>
                <button onClick={toggleShow}>cancel</button>
                <button onClick={tryAgin}>Try again!</button>
            </StyledButtonSection>
        </>
    )
}

ReviewfailedContent.propTypes = {
    toggleShow: PropTypes.func.isRequired,
    tryAgin: PropTypes.func.isRequired,
}

const UnsingInContent = ({toggleShow}) => {
    const navigate = useNavigate()
    const goLoginPage = () => navigate("/account/login");

    return (
        <>
            <StyledTextSection>
                <h3>Review failed! You should sing in.</h3>
            </StyledTextSection>
            <StyledButtonSection>
                <button onClick={toggleShow}>cancel</button>
                <button onClick={goLoginPage}>Go login page</button>
            </StyledButtonSection>
        </>
    )
}

UnsingInContent.propTypes = {
    toggleShow: PropTypes.func.isRequired,
}

const ReviewTipBox = ({ show, reviewStatus, toggleShow, tryAgin}) => {

    const handler = {
        0: <ReviewSuccessContent toggleShow={toggleShow}/>,
        1: <ReviewfailedContent toggleShow={toggleShow} tryAgin={tryAgin}/>,
        2: <UnsingInContent toggleShow={toggleShow}/>,
    }


    return (
        <StyledReviewTipBoxBackGround $show={show} $zindex={99}>
            <StyledReviewTipBox>
                {
                    handler[reviewStatus] || <h3>ERROR</h3>
                }


            </StyledReviewTipBox>
        </StyledReviewTipBoxBackGround>
    )
}

ReviewTipBox.propTypes = {
    show: PropTypes.bool.isRequired,
    reviewStatus: PropTypes.number.isRequired,
    toggleShow: PropTypes.func.isRequired,
    tryAgin: PropTypes.func.isRequired,
}

export default ReviewTipBox
const StyledReviewTipBoxBackGround = styled(StyledBlurBackGround)`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px;
`

const StyledReviewTipBox = styled.div`
    width: 100%;
    max-width: 600px;
    height: 350px;
    border-radius: 20px;
    background-color: #c68642;
    box-shadow: rgba(0, 0, 0, 0.6) 0px 5px 15px;


    div{
        padding: 16px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    button{
        flex: 1;
        font-size: 24px;
        border-radius: 20px;
        padding: 16px 8px;
        align-items: end;

        @media screen and (max-width: 540px){
            font-size: 18px;
            padding: 16px 4px;
        }
    }

    h3{
        font-size: 24px;
        text-align: center;
    }


`
const StyledTextSection = styled.div`
    height: 80%;
`


const StyledButtonSection = styled.div`
    gap: 8px;
    height: 20%;
`


