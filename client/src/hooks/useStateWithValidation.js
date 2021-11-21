import  { useState, useCallback } from 'react';

export default function useStateWithValidation ( validationFunc,
     initialValue) {
         const [state, setState] = useState(initialValue);
         const [isValid, setIsvalid] = useState(() => validationFunc(state))

    const onChange = useCallback( nextState => {
        const value =
            typeof nextState ==='function' ? nextState(state) : nextState
        setState(value)
        setIsvalid(validationFunc(value))
    },
    [validationFunc, state])
    return [state, onChange, isValid]
}