import styled from "styled-components";

const StyledTableContainer = styled.div`
    width: 100%;
    overflow: scroll;

    table,th,td{
        border-collapse: collapse;
        font-size: 24px;
        white-space: nowrap;
        text-align: center;
        
    }

    th,td{
        border-right: 2px black solid;
    }

    table{
        border: 2px outset black;
        border-radius: 20px;
        width: 100%;
        min-width: ${props => props.$minWidth || "700px"};
    }

    tr{
        height: 60px;
    }

    tr:nth-child(odd){
        background-color: #C68642;
    }
`

export default StyledTableContainer