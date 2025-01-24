import { useParams } from "react-router";
import AdminLayout from "../../components/layout/AdminLayout";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_HOST } from "../../constants";
import styled from "styled-components";
import GoBackButton from "../../components/common/GoBackButton";
import StyledImgContainer from "../../components/common/StyledImgContainer";
import { v4 as uuidv4 } from "uuid";
import PropTypes from "prop-types";

const ProductInfInput = ({
    text,
    inputType,
    inputValue,
    inputName,
    handleChange,
}) => {
    return (
        <StyledProductInfInput>
            <h3>{text}:</h3>
            <input
                type={inputType || "text"}
                value={inputValue}
                name={inputName}
                onChange={handleChange}
            />
        </StyledProductInfInput>
    );
};

ProductInfInput.propTypes = {
    text: PropTypes.string,
    handleChange: PropTypes.func.isRequired,
    inputValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    inputName: PropTypes.string.isRequired,
    inputType: PropTypes.string,
}

const ProductTextArea = ({ text, inputValue, inputName, handleChange }) => {
    return (
        <StyledProductTextArea>
            <h3>{text}:</h3>
            <textarea
                type="text"
                value={inputValue}
                name={inputName}
                onChange={handleChange}
            />
        </StyledProductTextArea>
    );
};

ProductTextArea.propTypes = {
    text: PropTypes.string,
    handleChange: PropTypes.func.isRequired,
    inputValue: PropTypes.string.isRequired,
    inputName: PropTypes.string.isRequired,
}

const AdminProduct = () => {
    const { productId } = useParams();
    const [productInf, setProductInf] = useState({
        id: "",
        name: "",
        price: "",
        stock: "",
        des: "",
        detail: "",
        img: [],
    });
    useEffect(() => {
        const fectchProductData = async () => {
            try {
                const { data: productData } = await axios.get(
                `${API_HOST}/products/${productId}`
                );
                console.log(productData);
                const updateProductInf = {
                id: productData.id,
                name: productData.name,
                price: productData.price,
                stock: productData.stock,
                des: productData.des,
                detail: productData.detail,
                img: productData.img,
                };
                setProductInf(updateProductInf);
            } catch (err) {
                console.error(err);
            }
        };

        fectchProductData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductInf((prevData) => {
            const updateData = {
                ...prevData,
                [name]: value,
            };
            return updateData;
        });
    };

    const handleSave = async () => {
        try {
            const patchData = productInf;
            const patchRes = await axios.patch(
                `${API_HOST}/products/${productId}`,
                patchData
            );
            console.log(patchRes);
        } catch (err) {
            console.error(err);
        }
    };
    return (
        <AdminLayout>
            <StyledAdminProduct>
                <GoBackButton />
                <h3>ProductID: {productId}</h3>
                <ProductInfInput
                    text="Product name"
                    inputName="name"
                    handleChange={handleChange}
                    inputValue={productInf.name}
                />
                <ProductInfInput
                    text="Product Price"
                    inputType="number"
                    inputName="price"
                    handleChange={handleChange}
                    inputValue={productInf.price}
                />
                <ProductInfInput
                    text="Stock"
                    inputType="number"
                    inputName="stock"
                    handleChange={handleChange}
                    inputValue={productInf.stock}
                />
                <ProductTextArea
                    text="Des"
                    inputName="des"
                    handleChange={handleChange}
                    inputValue={productInf.des}
                />
                <ProductTextArea
                    text="Detail"
                    inputName="detail"
                    handleChange={handleChange}
                    inputValue={productInf.detail}
                />
                <StyledProductContainer>
                <h3>img:</h3>
                <div>
                    {productInf.img.map((imgUrl) => {
                    return (
                        <StyledImgContainer key={uuidv4()} $imgUrl={imgUrl}>
                            <div></div>
                        </StyledImgContainer>
                    );
                    })}
                </div>
                <button>add img</button>
                </StyledProductContainer>
                <StyledSaveButton onClick={handleSave}>Save</StyledSaveButton>
            </StyledAdminProduct>
        </AdminLayout>
    );
};

export default AdminProduct;

const StyledAdminProduct = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  h3 {
    font-size: 24px;
    white-space: nowrap;
  }
`;

const StyledProductInfInput = styled.div`
  width: 100%;
  max-width: 800px;
  display: flex;
  gap: 8px;
  input {
    flex: 1;
    min-width: 0;
    padding: 8px;
    font-size: 20px;
    border: none;
    outline: none;
    border-radius: 4px;
  }

  @media screen and (max-width: 540px) {
    flex-wrap: wrap;

    h3 {
      width: 100%;
    }

    input {
      flex: none;
      width: 100%;
    }
  }
`;

const StyledProductTextArea = styled.div`
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;

  textarea {
    width: 100%;
    height: 100px;
    min-width: 0;
    padding: 8px;
    font-size: 18px;
    border: none;
    outline: none;
    border-radius: 4px;
  }
`;

const StyledProductContainer = styled.div`
  max-width: 800px;

  display: flex;
  flex-direction: column;
  gap: 16px;

  & > div {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  button {
    width: 100px;
    padding: 8px;
    border-radius: 10px;
    align-self: end;
  }

  ${StyledImgContainer} {
    flex: 0 0 90px;
    border: 3px #5a3616 solid;
    border-radius: 20px;
  }
`;

const StyledSaveButton = styled.button`
  margin-top: 32px;
  width: 300px;
  border-radius: 20px;
  padding: 8px;
  font-size: 24px;
  align-self: center;
`;
