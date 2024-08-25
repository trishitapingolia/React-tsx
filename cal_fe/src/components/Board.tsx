import { useEffect, useState } from 'react';
import Buttons from './Buttons'
import axios from 'axios';
import { Modal } from 'react-bootstrap';

const Board = () => {
    const [show, setShow] = useState(false);
    const [value, setValue] = useState<string>("");
    const [result, setResult] = useState<number | null>(null);
    const [history, setHistory] = useState<{ expression: string; result: number }[]>([]);

    const handleHistory = (op: string) => {
        setShow(true);
    }
    const handleClose = () => setShow(false);

    const handleBackspace = (op: string) => {
        setValue(value.slice(0, -1));
    }

    const handleClick = (op: string | number) => {
        if (op === '=') {
            calculateExpression(value);
        } else if (op === 'AC') {
            setResult(null);
            setValue("");
        }else if (op === '+/-') {
            setValue((prev)=>'-'+prev);
        } else {
            setValue(value + op.toString());
        }
    };

    // get the result
    const calculateExpression = async (expression: string) => {
        try {
            console.log(expression);
            const response = await axios.post('http://localhost:3000/calculation', { expression });
            setResult(response.data.result);
            setValue("");
            fetchHistory();
        } catch (error) {
            console.error('Error calculating expression:', error);
        }
    };

    // calculation history
    const fetchHistory = async () => {
        try {
            const response = await axios.get('http://localhost:3000/calculation/history');
            setHistory(response.data);
        } catch (error) {
            console.error('Error fetching history:', error);
        }
    };

    useEffect(() => {
        fetchHistory();
    }, []);

    return (
        <div className='cal d-flex flex-column justify-content-center align-items-center bg-white' style={{ width: "300px", height: "480px", borderRadius: "10px" }}>
            <textarea
                className='text-white text-end pt-5 pe-2 rounded-3'
                style={{ width: "250px", height: "100px", fontSize: "40px", backgroundColor: "gray", overflow: "hidden", resize: "none", cursor: "default" }}
                value={value || result?.toString() || ""}
                readOnly
            />
            <div>
                <Buttons op={'AC'} onClick={handleClick} />
                <Buttons op={'/'} onClick={handleClick} />
                <Buttons op={'+/-'} onClick={handleClick} />
                <Buttons op={'<'} onClick={handleBackspace} />
            </div>
            <div>
                <Buttons op={7} onClick={handleClick} />
                <Buttons op={8} onClick={handleClick} />
                <Buttons op={9} onClick={handleClick} />
                <Buttons op={'+'} onClick={handleClick} />
            </div>  
            <div>
                <Buttons op={4} onClick={handleClick} />
                <Buttons op={5} onClick={handleClick} />
                <Buttons op={6} onClick={handleClick} />
                <Buttons op={'-'} onClick={handleClick} />
            </div>
            <div>
                <Buttons op={1} onClick={handleClick} />
                <Buttons op={2} onClick={handleClick} />
                <Buttons op={3} onClick={handleClick} />
                <Buttons op={'x'} onClick={handleClick} />
            </div>
            <div>
                <Buttons op={'0'} onClick={handleClick} />
                <Buttons op={'.'} onClick={handleClick} />
                <Buttons op={'='} onClick={handleClick} />
                <Buttons op={"H"} onClick={handleHistory} />
            </div>


            
            <Modal size='lg' show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                    <strong>History</strong>
                    </Modal.Header>
                    <Modal.Body>
                        {history.map((item, index) => (
                            <div key={index}>{index+1}: {item.expression}, Result: {item.result}</div>
                        ))}
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default Board