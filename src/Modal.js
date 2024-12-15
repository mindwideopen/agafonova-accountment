import React, { useState } from "react";
import "./Modal.css";

export const Modal = ({ isOpen, onClose, onConfirm, drink, additions }) => {
    const [selectedType, setSelectedType] = useState(null);
    const [selectedVolume, setSelectedVolume] = useState(null);
    const [selectedAdditions, setSelectedAdditions] = useState([]);

    const toggleAddition = (addition) => {
        setSelectedAdditions((prevAdditions) =>
            prevAdditions.some((add) => add.id === addition.id)
                ? prevAdditions.filter((add) => add.id !== addition.id)
                : [...prevAdditions, addition]
        );
    };

    const handleConfirm = () => {
        if (!selectedType || !selectedVolume) {
            alert("Пожалуйста, выберите для кого и объем напитка!");
            return;
        }

        onConfirm(selectedType, selectedVolume, selectedAdditions);
        setSelectedType(null);
        setSelectedVolume(null);
        setSelectedAdditions([]);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h3>Настройка для {drink.name}</h3>
                <h4>Выберите для кого:</h4>
                <div className="type-options">
                    <button
                        className={`type-button ${
                            selectedType === "floors" ? "selected" : ""
                        }`}
                        onClick={() => setSelectedType("floors")}
                    >
                        Для Этажей
                    </button>
                    <button
                        className={`type-button ${
                            selectedType === "all" ? "selected" : ""
                        }`}
                        onClick={() => setSelectedType("all")}
                    >
                        Для Всех
                    </button>
                </div>
                <h4>Выберите объем:</h4>
                <div className="volume-options">
                    <button
                        className={`volume-button ${selectedVolume === "M" ? "selected" : ""}`}
                        onClick={() => setSelectedVolume("M")}
                    >
                        M
                    </button>
                    <button
                        className={`volume-button ${selectedVolume === "L" ? "selected" : ""}`}
                        onClick={() => setSelectedVolume("L")}
                    >
                        L
                    </button>
                </div>
                <h4>Добавки:</h4>
                <div className="additions-options">
                    {additions.map((addition) => (
                        <button
                            key={addition.id}
                            className={`addition-button ${
                                selectedAdditions.some((add) => add.id === addition.id)
                                    ? "selected"
                                    : ""
                            }`}
                            onClick={() => toggleAddition(addition)}
                        >
                            {addition.name} (+${addition.price})
                        </button>
                    ))}
                </div>
                <div className="modal-actions">
                    <button className="confirm-button" onClick={handleConfirm}>
                        Подтвердить
                    </button>
                    <button className="cancel-button" onClick={onClose}>
                        Отмена
                    </button>
                </div>
            </div>
        </div>
    );
};


