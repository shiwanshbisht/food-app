import React, { useState } from 'react'

export const Delivery = () => {
    const [name , setName] = useState("");
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
                    type="string"
                    required={true}
                    placeholder="Address"
                    onChange={(e) => {
                        setName(e.target.value);
                    }}
                />
                

            </div>
        </>
  )
}
