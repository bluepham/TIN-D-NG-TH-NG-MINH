
import React, { useState } from 'react';
import { ShieldIcon } from './Icons';

type FeedbackType = 'correct' | 'incorrect' | 'neutral' | null;

const FinalScenarioScreen: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const [feedback, setFeedback] = useState<{ type: FeedbackType, text: string } | null>(null);

    const handleChoice = (type: FeedbackType, text: string) => {
        setFeedback({ type, text });
    };

    const options = [
        { 
            text: "Đồng ý vay vì đang rất cần tiền", 
            feedbackType: 'incorrect', 
            feedbackText: "Sai! Đây là lựa chọn nguy hiểm nhất. Vay tín dụng đen sẽ đẩy bạn vào vòng xoáy nợ nần với lãi suất cắt cổ và các hình thức đòi nợ bất hợp pháp." 
        },
        { 
            text: "Từ chối thẳng thừng và bỏ đi", 
            feedbackType: 'neutral', 
            feedbackText: "Khá tốt, nhưng có thể tốt hơn. Việc từ chối là đúng, nhưng cần cảnh giác và có biện pháp bảo vệ bản thân xa hơn." 
        },
        { 
            text: "Từ chối, không cung cấp thông tin cá nhân và báo cho người thân/cơ quan chức năng", 
            feedbackType: 'correct', 
            feedbackText: "Chính xác! Đây là cách xử lý thông minh và an toàn nhất. Bạn vừa bảo vệ được bản thân, vừa giúp cảnh báo cho cộng đồng." 
        }
    ];

    return (
        <div className="p-6 md:p-8 bg-white rounded-2xl shadow-xl w-full text-center animate-fade-in">
            <div className="flex justify-center mb-4">
                <ShieldIcon />
            </div>
            <h1 className="text-3xl font-bold text-slate-800 mb-2">Tình huống cuối: Tín dụng đen</h1>
            <p className="text-slate-600 max-w-2xl mx-auto mb-6">
                Một người lạ mặt tiếp cận và mời bạn vay một khoản tiền lớn với thủ tục cực kỳ đơn giản, chỉ cần CMND/CCCD, không cần chứng minh thu nhập. Họ nói sẽ có tiền ngay trong 5 phút. <strong>Bạn sẽ làm gì?</strong>
            </p>

            <div className="space-y-4 max-w-lg mx-auto">
                {options.map((opt, index) => (
                     <button
                        key={index}
                        onClick={() => handleChoice(opt.feedbackType as FeedbackType, opt.feedbackText)}
                        className="w-full text-left p-4 border-2 border-slate-300 rounded-lg hover:bg-slate-100 hover:border-blue-500 transition-colors"
                    >
                        {opt.text}
                    </button>
                ))}
            </div>

            {feedback && (
                <div className={`mt-6 p-4 rounded-lg animate-fade-in-fast ${
                    feedback.type === 'correct' ? 'bg-green-100 border-green-500 text-green-800' :
                    feedback.type === 'incorrect' ? 'bg-red-100 border-red-500 text-red-800' :
                    'bg-yellow-100 border-yellow-500 text-yellow-800'
                } border-l-4`}>
                    <p className="font-semibold">{feedback.text}</p>
                </div>
            )}
             <button onClick={onBack} className="mt-8 text-blue-600 hover:underline font-semibold">
                &larr; Quay lại Menu
            </button>
        </div>
    );
};

export default FinalScenarioScreen;
