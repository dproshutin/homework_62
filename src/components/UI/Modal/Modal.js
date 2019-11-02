import React from 'react';
import './Modal.css';
import Backdrop from "../Backdrop/Backdrop";
import Button from "../Button/Button";

const Modal = props => {
    const buttons = props.array.map((item, index) => {
        return (
            <Button
                key={index}
                btnType={item.type}
                click={item.closed}
                value={item.label}
            />
        );
    });
    return (
        <>
            <Backdrop
                show={props.show}
                clicked={props.closed}
            />
            <div className="Modal"
                 style={{
                     opacity: props.show ? 1 : 0,
                     transform: props.show ? "translateY(0)" : "translateY(-100vh)"
                 }}
            >
                <div className="ModalTitleWrapper">
                    <h3>{props.title}</h3>
                    <Button
                        btnType={props.btnType}
                        click={props.closed}
                        value={props.value}
                    />
                </div>
                {props.children}
                {buttons}
            </div>
        </>
    );
};

export default Modal;