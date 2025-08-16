
import React, { useState, useEffect } from 'react';
import { GameCard } from '../types';

const initialCards: Omit<GameCard, 'id' | 'isMatched'>[] = [
    { matchId: 1, type: 'term', content: 'Vay tín chấp' },
    { matchId: 1, type: 'example', content: 'Anh S vay 10 triệu đồng mua xe máy chỉ dựa vào uy tín là công chức nhà nước, không cần tài sản thế chấp.' },
    { matchId: 2, type: 'term', content: 'Vay thế chấp' },
    { matchId: 2, type: 'example', content: 'Chị N phải dùng giấy chứng nhận quyền sử dụng đất làm tài sản đảm bảo để vay 300 triệu đồng sửa nhà.' },
    { matchId: 3, type: 'term', content: 'Tín dụng thương mại' },
    { matchId: 3, type: 'example', content: 'Doanh nghiệp xây dựng B mua chịu xi măng, gạch, cát từ doanh nghiệp vật liệu A và hẹn trả tiền sau.' },
    { matchId: 4, type: 'term', content: 'Mua trả góp qua công ty tài chính' },
    { matchId: 4, type: 'example', content: 'Chị Y trả trước 40% giá trị xe máy, phần còn lại vay từ một công ty tài chính liên kết với cửa hàng.' },
    { matchId: 5, type: 'term', content: 'Sử dụng thẻ tín dụng' },
    { matchId: 5, type: 'example', content: 'Chị C chi tiêu trước bằng thẻ, trả tiền sau trong 45 ngày để được miễn lãi và còn được hoàn 6% tiền mua sắm.' },
    { matchId: 6, type: 'term', content: 'Tín dụng Nhà nước' },
    { matchId: 6, type: 'example', content: 'Bạn A có hoàn cảnh khó khăn được vay vốn từ Ngân hàng Chính sách xã hội với lãi suất ưu đãi để đi học đại học.' },
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
    const [isGameFinished, setIsGameFinished] = useState(false);

    const setupGame = () => {
        const gameCards = shuffleArray(initialCards).map((card, index) => ({
            ...card,
            id: index,
            isMatched: false,
        }));
        setCards(gameCards);
        setSelectedCards([]);
        setIsGameFinished(false);
        setScore(0);
    };

    useEffect(() => {
        setupGame();
    }, []);

    const handleCardClick = (clickedCard: GameCard) => {
        if (selectedCards.length >= 2 || clickedCard.isMatched || selectedCards.find(c => c.id === clickedCard.id)) {
            return;
        }
        setSelectedCards([...selectedCards, clickedCard]);
    };

    useEffect(() => {
        if (selectedCards.length === 2) {
            const [first, second] = selectedCards;
            if (first.matchId === second.matchId) {
                // Match
                setScore(prev => prev + 10);
                setTimeout(() => {
                    setCards(prevCards =>
                        prevCards.map(card =>
                            card.matchId === first.matchId ? { ...card, isMatched: true } : card
                        )
                    );
                    setSelectedCards([]);
                }, 500);
            } else {
                // No match
                setTimeout(() => {
                    setSelectedCards([]);
                }, 1000);
            }
        }
    }, [selectedCards, setScore]);

    useEffect(() => {
        if (cards.length > 0 && cards.every(c => c.isMatched)) {
            setIsGameFinished(true);
        }
    }, [cards]);

    return (
        <div className="p-6 md:p-8 bg-white rounded-2xl shadow-xl w-full text-center animate-fade-in">
            <h1 className="text-3xl font-bold text-slate-800 mb-2">Trò chơi Ghép thẻ Tín dụng</h1>
            <p className="text-slate-600 mb-4">Chọn 1 thuật ngữ và 1 ví dụ tương ứng. Điểm của bạn: <span className="font-bold text-blue-600">{score}</span></p>

            {isGameFinished ? (
                 <div className="text-center py-10 animate-fade-in">
                    <h2 className="text-2xl font-bold text-green-600">Chúc mừng! Bạn đã hoàn thành!</h2>
                    <p className="text-slate-700 mb-6">Điểm cuối cùng của bạn là: <span className="font-bold text-blue-600">{score}</span></p>
                    <button
                        onClick={setupGame}
                        className="bg-indigo-600 text-white font-bold py-2 px-6 rounded-full hover:bg-indigo-700 transition-transform transform hover:scale-105 shadow-lg focus:outline-none focus:ring-4 focus:ring-indigo-300"
                    >
                        Chơi lại
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {cards.map(card => {
                        const isSelected = selectedCards.some(sc => sc.id === card.id);
                        const cardTypeClass = card.type === 'term' 
                            ? 'bg-blue-100 border-blue-400 hover:bg-blue-200' 
                            : 'bg-emerald-100 border-emerald-400 hover:bg-emerald-200';
                        const matchedClass = 'bg-slate-200 border-slate-300 text-slate-500 opacity-70 cursor-not-allowed';
                        const selectedClass = 'ring-4 ring-indigo-500 scale-105 shadow-lg';

                        return (
                            <button
                                key={card.id}
                                onClick={() => handleCardClick(card)}
                                disabled={card.isMatched}
                                className={`w-full h-40 p-3 flex items-center justify-center text-center rounded-lg border-2 shadow-sm transition-all duration-200 text-sm font-semibold text-slate-800 ${card.isMatched ? matchedClass : cardTypeClass} ${isSelected && !card.isMatched ? selectedClass : ''}`}
                            >
                                {card.content}
                            </button>
                        );
                    })}
                </div>
            )}
            
            <button onClick={onBack} className="mt-8 text-blue-600 hover:underline font-semibold">
                &larr; Quay lại Menu
            </button>
        </div>
    );
};

export default GameScreen;
