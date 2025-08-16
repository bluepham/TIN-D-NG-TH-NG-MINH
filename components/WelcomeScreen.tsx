import React from 'react';

interface WelcomeScreenProps {
    onStart: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
    return (
        <div className="text-center p-8 bg-white rounded-2xl shadow-xl animate-fade-in-down">
            <div className="w-24 h-24 mx-auto mb-6 text-5xl flex items-center justify-center bg-blue-500 text-white rounded-full shadow-lg">
                <i className="fa-solid fa-wallet"></i>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 mb-4">
                Trải nghiệm Tín dụng Thông minh
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-4">
                Chào mừng bạn đến với mô phỏng về Dịch vụ Tín dụng! Hãy cùng tìm hiểu về cách hoạt động của các khoản vay, trách nhiệm tài chính và cách đưa ra quyết định thông minh để bảo vệ bản thân.
            </p>
            <p className="text-sm text-slate-500 italic mb-8">
                Nội dung được thiết kế bởi Cô Nguyễn Thị Nhi, giáo viên môn Giáo dục Kinh tế và Pháp luật.
            </p>
            <button
                onClick={onStart}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-3 px-8 rounded-full text-lg hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-105 shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-300"
            >
                Bắt đầu khám phá
            </button>
        </div>
    );
};

export default WelcomeScreen;