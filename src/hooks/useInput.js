import { useState } from 'react'

export function useInput (initialState) {
    const [state, setState] = useState(initialState)

    const setInput = (event) => {
        setState(event.currentTarget.value);
    }

    return [state, setInput, setState]
}