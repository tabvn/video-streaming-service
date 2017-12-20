import styled from "styled-components";
import {dangerColor} from "../theme";

export const FormSuccessMessage = styled.p`
    border: 1px solid rgba(0, 0 ,0, 0.06);
    padding: 8px;
    
`
export const FormErrorMessage = styled.p`
    border: 1px solid ${dangerColor};
    padding: 8px;
    
`
export const Form = styled.form`
    padding: 20px 0;
    max-width: 300px;
`
export const FormItem = styled.div `
    margin-bottom: 15px;
    display: flex;
    flex-direction: column;
`
export const FormLabel = styled.label `

       font-weight: 600;
`
export const FormInput = styled.input `
      border: 1px solid rgba(0,0,0.06);
      padding: 5px 15px;
    
`

export const FormAction = styled.div `

    
`

export const FormSubmit = styled.button `
        
        border: 1px solid rgba(0, 0, 0.06);
        padding: 5px 15px;
        background: #FFF;
        font-weight: 600;

`