
import React, { useState, useEffect } from 'react';
import { GameCard } from '../types';

const initialCards: Omit<GameCard, 'id' | 'isFlipped' | 'isMatched'>[] = [
    { matchId: 1, type: 'term', content: 'Tín dụng ngân hàng' },
    { matchId: 1, type: 'example', content: 'Vay tiền mua nhà, trả góp hàng tháng.' },
    { matchId: 2, type: 'term', content: 'Điểm tín dụng' },
    { matchId: 2, type: 'example', content: 'Thước đo độ tin cậy tài chính của bạn.' },
    { matchId: 3, type: 'term', content: 'Tín dụng thương mại' },
    { matchId: 3, type: 'example', content: 'Mua hàng hóa, trả tiền sau cho nhà cung cấp.' },
    { matchId: 4, type: 'term', content: 'Lãi suất' },
    { matchId: 4, type: 'example', content: 'Chi phí bạn phải trả cho việc vay tiền.' },
    { matchId: 5, type: 'term', content: 'Tín dụng đen' },
    { matchId: 5, type: 'example', content: 'Vay tiền với lãi suất cực cao và bất hợp pháp.' },
];

const shuffleArray = <T,>(array: T[]): T[] => {
    return array.sort(() => Math.random() - 0.5);
};

interface GameScreenProps {
    score: number;
    setScore: React.Dispatch<React.SetStateAction<number>>;
    onBack: () => void;
}

const GameScreen: React.FC<GameScreenProps> = ({ score, setScore, onBack }) => {
    const [cards, setCards] = useState<GameCard[]>([]);
    const [selectedCards, setSelectedCards] = useState<GameCard[]>([]);

    useEffect(() => {
        const gameCards = shuffleArray(initialCards).map((card, index) => ({
            ...card,
            id: index,
            isFlipped: false,
            isMatched: false,
        }));
        setCards(gameCards);
    }, []);

    const handleCardClick = (clickedCard: GameCard) => {
        if (selectedCards.length === 2 || clickedCard.isFlipped) return;

        const newCards = cards.map(card =>
            card.id === clickedCard.id ? { ...card, isFlipped: true } : card
        );
        setCards(newCards);
        setSelectedCards([...selectedCards, clickedCard]);
    };

    useEffect(() => {
        if (selectedCards.length === 2) {
            const [first, second] = selectedCards;
            if (first.matchId === second.matchId) {
                // Match
                setScore(prev => prev + 10);
                setTimeout(() => {
                    const newCards = cards.map(card =>
                        card.matchId === first.matchId ? { ...card, isMatched: true } : card
                    );
                    setCards(newCards);
                    setSelectedCards([]);
                }, 500);
            } else {
                // No match
                setTimeout(() => {
                    const newCards = cards.map(card =>
                        card.id === first.id || card.id === second.id ? { ...card, isFlipped: false } : card
                    );
                    setCards(newCards);
                    setSelectedCards([]);
                }, 1000);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedCards]);

    const allMatched = cards.length > 0 && cards.every(c => c.isMatched);

    return (
        <div className="p-6 md:p-8 bg-white rounded-2xl shadow-xl w-full text-center animate-fade-in">
            <h1 className="text-3xl font-bold text-slate-800 mb-2">Trò chơi Ghép thẻ Tín dụng</h1>
            <p className="text-slate-600 mb-4">Ghép đúng thuật ngữ với ví dụ của nó. Điểm của bạn: <span className="font-bold text-blue-600">{score}</span></p>

            {allMatched ? (
                 <div className="text-center py-10">
                    <h2 className="text-2xl font-bold text-green-600">Chúc mừng! Bạn đã hoàn thành!</h2>
                    <p className="text-slate-700">Bạn đã hiểu rõ hơn về các khái niệm tín dụng.</p>
                </div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                    {cards.map(card => (
                        <div key={card.id} className="perspective-1000" onClick={() => handleCardClick(card)}>
                            <div className={`w-full h-36 relative transition-transform duration-700 transform-style-preserve-3d ${card.isFlipped ? 'rotate-y-180' : ''}`}>
                                {/* Card Front (Hidden) */}
                                <div className={`absolute w-full h-full backface-hidden rounded-lg p-2 flex items-center justify-center text-center cursor-pointer ${card.isMatched ? 'bg-green-200' : 'bg-blue-200'} border-2 ${card.type === 'term' ? 'border-blue-500' : 'border-green-500'} rotate-y-180`}>
                                    <p className="text-sm font-semibold text-slate-800">{card.content}</p>
                                </div>
                                {/* Card Back (Visible) */}
                                <div className={`absolute w-full h-full backface-hidden rounded-lg flex items-center justify-center cursor-pointer ${card.isMatched ? 'opacity-0' : 'bg-blue-500 hover:bg-blue-600'}`}>
                                    <i className="fa-solid fa-question text-white text-3xl"></i>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            
            <button onClick={onBack} className="mt-8 text-blue-600 hover:underline font-semibold">
                &larr; Quay lại Menu
            </button>
        </div>
    );
};

export default GameScreen;
