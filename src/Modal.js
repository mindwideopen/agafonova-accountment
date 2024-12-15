import React, { useState } from "react";
import "./Modal.css";

export const Modal = ({ drink, addDrinkToCurrentOrder, closeModal, addOns }) => {
    const [size, setSize] = useState(null);
    const [type, setType] = useState(null);
    const [selectedAddOns, setSelectedAddOns] = useState([]);

    const toggleAddOn = (addOn) => {
        setSelectedAddOns((prev) =>
            prev.includes(addOn)
                ? prev.filter((item) => item !== addOn)
                : [...prev, addOn]
        );
    };

    const calculateTotalPrice = () => {
        if (!size || !type) return 0;

        const basePrice = drink.price[type][size];
        const addOnsPrice = selectedAddOns.reduce((total, addOn) => total + addOn.price, 0);

        return basePrice + addOnsPrice;
    };

    const handleAddDrink = () => {
        if (!size || !type) return;

        const totalPrice = calculateTotalPrice();
        const label = `${type === "floors" ? "Этажи" : "Все"}, ${size}`;

        addDrinkToCurrentOrder({
            ...drink,
            count: 1,
            size,
            type,
            totalPrice,
            addOnsPrice: totalPrice - drink.price[type][size],
            label,
        });

        closeModal();
    };

    return (
        <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h3>Выберите параметры для {drink.name}</h3>
                <div className="options">
                    <h4>Размер:</h4>
                    <button
                        className={`option-button ${size === "M" ? "selected" : ""}`}
                        onClick={() => setSize("M")}
                    >
                        M
                    </button>
                    <button
                        className={`option-button ${size === "L" ? "selected" : ""}`}
                        onClick={() => setSize("L")}
                    >
                        L
                    </button>
                </div>

                <div className="options">
                    <h4>Тип:</h4>
                    <button
                        className={`option-button ${type === "floors" ? "selected" : ""}`}
                        onClick={() => setType("floors")}
                    >
                        Для Этажей
                    </button>
                    <button
                        className={`option-button ${type === "all" ? "selected" : ""}`}
                        onClick={() => setType("all")}
                    >
                        Для всех
                    </button>
                </div>

                <div className="options">
                    <h4>Добавки:</h4>
                    {addOns.map((addOn) => (
                        <button
                            key={addOn.id}
                            className={`option-button ${selectedAddOns.includes(addOn) ? "selected" : ""}`}
                            onClick={() => toggleAddOn(addOn)}
                        >
                            {addOn.name} (+${addOn.price})
                        </button>
                    ))}
                </div>

                <div className="summary">
                    <p>Итоговая стоимость: ${calculateTotalPrice()}</p>
                </div>

                <div className="actions">
                    <button className="confirm-button" onClick={handleAddDrink}>
                        Добавить
                    </button>
                    <button className="cancel-button" onClick={closeModal}>
                        Отмена
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
