import React from "react";
import { render } from "../../utils/test-utils";
import "jest-dom/extend-expect";
import Login from "./Login";
import userEvent from "@testing-library/user-event"
import {fireEvent} from "@testing-library/react"




describe('Login', () =>{
    const username = "instructor@bu.edu"
    const pwd = "instructor"
    it("renders with redux", async()=>{
        const {getByTestId} = render(<Login/>)
        expect (await getByTestId('form')).toBeInTheDocument();})
    it('check if the form is valid', async() => {
        const {getByTestId}= render(<Login/>)
        expect (await getByTestId('form')).toBeInvalid()
    })
    it("Correct input", async()=>{
        const utils = render(<Login/>)
        const input = utils.getByLabelText('text-input')
        
        fireEvent.change(input,{target:{value: 'instructor@bu.edu'}})
        expect(input.value).toBe('instructor@bu.edu')
    })
})


