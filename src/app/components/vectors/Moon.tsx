import React from "react";

const Moon = ({size} : {size: number}) => {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            width={size}
            height={size}
            viewBox="0 0 36 36"
            fill='none'
        >
            <path
                fill='#8FBFFA'
                d='M35.844 18.5c0-9.578-7.766-17.344-17.344-17.344-9.578 0-17.344 7.766-17.344 17.344 0 9.578 7.766 17.344 17.344 17.344 9.578 0 17.344-7.766 17.344-17.344Z'
            />
            <path
                fill='#2859C5'
                fillRule='evenodd'
                d='M25.438 12.334c.716 0 1.302-.839.804-1.352A10.76 10.76 0 0 0 18.5 7.709c-5.96 0-10.792 4.832-10.792 10.792S12.54 29.292 18.5 29.292c3.037 0 5.78-1.254 7.741-3.273.5-.513-.087-1.352-.803-1.352a6.167 6.167 0 0 1 0-12.333Z'
                clipRule='evenodd'
            />
        </svg>
    );
};

export default Moon;
