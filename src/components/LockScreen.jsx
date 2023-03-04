import React, { useState } from 'react'
import "stylesheets/LockScreen.scss";

const LockScreen = ({setLock}) => {
    const [code1, setCode1] = useState('')
    const [code2, setCode2] = useState('')
    const [code3, setCode3] = useState('')

    const [check, setCheck] = useState(false)
    const [helper, setHelper] = useState(false)

    const handleChange1 = (e) => {
        e.preventDefault()
        setCode1(e.target.value)

    }
    const handleChange2 = (e) => {
        e.preventDefault()
        setCode2(e.target.value)

    }
    const handleChange3 = (e) => {
        e.preventDefault()
        setCode3(e.target.value)

    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (code1 + code2 + code3 === '345') {
            setCheck(true);
            console.log('unlocked');
            localStorage.setItem('token', 'unlocked')
            setLock(false)
        }
        else {
            setHelper(true)
            setCode1('')
            setCode2('')
            setCode3('')
        }
    }

    return (
        <div className='screen' >
            {!helper ?
                <h1 className='text' >ENTER CODE</h1> :
                <h1 className='wrong' >WRONG CODE</h1>
            }
            <div>
                <input className='input' type="text" name="Code" id="field" placeholder='0' maxLength={1} value={code1} onChange={handleChange1} />
                <input className='input' type="text" name="Code" id="field" placeholder='0' maxLength={1} value={code2} onChange={handleChange2} />
                <input className='input' type="text" name="Code" id="field" placeholder='0' maxLength={1} value={code3} onChange={handleChange3} />
            </div>
            <button className='submit' type="submit" onClick={handleSubmit} >Submit</button>
        </div>
    )
}

export default LockScreen