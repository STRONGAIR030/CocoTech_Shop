const VeiwCustomerButton = ({handleClick}) => {
    return (
        <button onClick={() => {handleClick(customerId)}}>
            <StyledImgContainer $imgUrl="/img/veiw.svg">
                <div/>
            </StyledImgContainer>
        </button>
    )
}

export default VeiwCustomerButton