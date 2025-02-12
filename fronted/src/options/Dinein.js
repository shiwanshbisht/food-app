import React, { useState } from 'react'

export const Dinein = () => {
    const [name, setName] = useState('');
    return (
        <>
            <div className="contactinfo">
                <input
                    required={true}
                    placeholder="Name"
                    onChange={(e) => {
                        setName(e.target.value);
                    }}
                />
                <input
                    type="number"
                    required={true}
                    placeholder="Mobile Number"
                    onChange={(e) => {
                        setName(e.target.value);
                    }}
                />
                <input
                    type="number"
                    required={true}
                    placeholder="Table No."
                    onChange={(e) => {
                        setName(e.target.value);
                    }}
                />
                

            </div>
        </>
    )
}
