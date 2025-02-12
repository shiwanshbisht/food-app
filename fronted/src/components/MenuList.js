import React from 'react';

export const MenuList = () => {
    
    const hanldeSalade =() =>{

    }
    return (
        <div className="mx-5 gap: 5 flex  justify-between">
            <button onclick = {hanldeSalade}>
            <div className="explore-menu-list-item mb-4 w-1/4">
                <img className="w-auto  h-auto rounded-full" src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=2380&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Salad" />
                <p className="text-center mt-2">Salad</p>
            </div>
            </button>
            <div className="explore-menu-list-item mb-4 w-1/4">
                <img className="w-auto h-auto rounded-full" src="https://foodorder1702.netlify.app/assets/menu_2-6QL_uDtg.png" alt="Rolls" />
                <p className="text-center mt-2">Rolls</p>
            </div>
            <div className="explore-menu-list-item mb-4 w-1/4">
                <img className="w-auto h-auto rounded-full" src="https://foodorder1702.netlify.app/assets/menu_3-2xw_iDUH.png" alt="Deserts" />
                <p className="text-center mt-2">Deserts</p>
            </div>
            <div className="explore-menu-list-item mb-4 w-1/4">
                <img className="w-full h-auto rounded-full" src="https://foodorder1702.netlify.app/assets/menu_4-CpXAwO71.png" alt="Sandwich" />
                <p className="text-center mt-2">Sandwich</p>
            </div>
            <div className="explore-menu-list-item mb-4 w-1/4">
                <img className="w-full h-auto rounded-full" src="https://foodorder1702.netlify.app/assets/menu_5-BLqPAi9S.png" alt="Cake" />
                <p className="text-center mt-2">Cake</p>
            </div>
            <div className="explore-menu-list-item mb-4 w-1/4">
                <img className="w-full h-auto rounded-full" src="https://foodorder1702.netlify.app/assets/menu_6-BAKCTvIj.png" alt="Pure Veg" />
                <p className="text-center mt-2">Pure Veg</p>
            </div>
            <div className="explore-menu-list-item mb-4 w-1/4">
                <img className="w-full h-auto rounded-full" src="https://foodorder1702.netlify.app/assets/menu_7-Dbn_MJmR.png" alt="Pasta" />
                <p className="text-center mt-2">Pasta</p>
            </div>
            <div className="explore-menu-list-item mb-4 w-1/4 border-radious : 50%">
                <img className="w-full h-auto rounded-full" src="https://foodorder1702.netlify.app/assets/menu_8-D3TIbU8x.png" alt="Noodles" />
                <p className="text-center mt-2">Noodles</p>
            </div>
        </div>
    );
};


