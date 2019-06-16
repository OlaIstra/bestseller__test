import React from 'react'
import styled, {css} from 'styled-components'

export default styled.label`
    width:100%;
    
    ${props => props.toShow
    && css`
        ::before {
            content: "\\2714";
            color: transparent;
            display: inline-block;
            border: 1px solid #000;
            font-size: 12px;
            line-height: 15px;
            margin: -5px 5px 0 0;
            height: 15px;
            width: 15px;
            text-align: center;
            vertical-align: middle;
            transition: color ease .3s;
            }
        `
    }
    ${props => props.toChecked
    && css`
        ::before {
            color: white;
            background-color: #0c7b0cc4;
            border: 1px solid #0c7b0cc4;
            }
        `
    }   
`
