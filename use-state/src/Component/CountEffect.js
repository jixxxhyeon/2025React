import {useState, useEffect} from 'react';

export default function CountEffect(){

    console.log ("CountEffect rendered !");
    const [count, setCount] = useState(0);
    const [calculation, setCalculation] = useState(0);

    useEffect(
        () => {
            console.log('count changed');
            setCalculation((t) => count * 2);
        }, [count]
    );

    return(
        <>
            <p>count : {count}</p>
            <p>calculation : {calculation}</p>
            <button onClick={() => setCount((c) => c + 1)}>Count Effect [+]</button>
        </>
    );
}