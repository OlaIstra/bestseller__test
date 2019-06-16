import React from 'react'
import styled, {css} from 'styled-components'

export default styled.button`
    padding: 10px;
    
    &::focus {
        outline: none;
    }
    
    &::active {
        box-shadow: inset hoff voff blur #000;
    }

    &[disabled] {
        cursor: not-allowed;
        background-color: #cccccc !important;
    }
    
    ${props => props.primary 
        && css`
            min-width: 150px;
            min-height: 50px;
        
            background: black;
            color: #ffffff;
        
            font-size: 20px;
            border: none;  
        `
    }    
`




