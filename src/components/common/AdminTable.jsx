import React from "react";
import StyledTableContainer from "./StyledTableContainer";
import PropTypes from "prop-types";

const AdminTable = ({ headers, datas, dataLoaded, handleClickRow }) => {
    const renderTableData = (data) => {
        return headers.map((header, index) => {
            return (
                <td
                    key={index}
                    onClick={
                        handleClickRow
                            ? () => handleClickRow(data.id)
                            : undefined
                    }
                >
                    {React.isValidElement(data[header.key])
                        ? data[header.key]
                        : `${data[header.key]}${data[header.unitSymbol] || ""}`}
                </td>
            );
        });
    };

    return (
        <StyledTableContainer>
            <table>
                <tbody>
                    <tr>
                        {headers.map((header) => {
                            return <td key={header.key}>{header.label}</td>;
                        })}
                    </tr>
                    {dataLoaded &&
                        datas.map((data) => {
                            return (
                                <tr key={data.id}>{renderTableData(data)}</tr>
                            );
                        })}
                </tbody>
            </table>
        </StyledTableContainer>
    );
};

AdminTable.propTypes = {
    headers: PropTypes.arrayOf(PropTypes.object).isRequired,
    datas: PropTypes.arrayOf(PropTypes.object).isRequired,
    handleClickRow: PropTypes.func,
    dataLoaded: PropTypes.bool,
};

export default AdminTable;
