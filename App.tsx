import React, { useState } from 'react';
import { Screen } from './types';
import WelcomeScreen from './components/WelcomeScreen';
import SimulationScreen from './components/SimulationScreen';
import { SimulationScenario } from './components/SimulationScreen';
import GameScreen from './components/GameScreen';
import FinalScenarioScreen from './components/FinalScenarioScreen';
import { BankIcon, TradeIcon, ConsumerIcon, GovernmentIcon, ShieldIcon, GameIcon } from './components/Icons';

const App: React.FC = () => {
    const [screen, setScreen] = useState<Screen>(Screen.Welcome);
    const [score, setScore] = useState<number>(0);

    const bankLoanScenario: SimulationScenario = {
        title: "Vay ngân hàng",
        icon: <BankIcon />,
        description: "Mô phỏng quá trình vay vốn từ ngân hàng để mua sắm hoặc đầu tư. Hãy chọn hình thức vay và nhập số tiền bạn cần.",
        themeColor: 'blue',
        choices: {
            label: "Hình thức vay",
            key: 'type',
            options: [
                { label: "Vay mua nhà (Lãi suất ~9.5%/năm)", value: 0.095 },
                { label: "Vay mua xe (Lãi suất ~11%/năm)", value: 0.11 },
                { label: "Vay tiêu dùng (Lãi suất ~18%/năm)", value: 0.18 }
            ]
        },
        inputs: [
            { label: "Số tiền vay (VNĐ)", type: 'number', key: 'amount' },
            { label: "Thời hạn trả nợ (tháng)", type: 'number', key: 'term' }
        ],
        calculateResult: (values: { [key: string]: string | number }) => {
            const amount = Number(values.amount) || 0;
            const term = Number(values.term) || 1;
            const interestRate = Number(values.type) || 0.18; // Lãi suất hàng năm
            const monthlyInterest = amount * (interestRate / 12);
            const principalPerMonth = amount / term;
            const totalMonthly = monthlyInterest + principalPerMonth;
            const totalRepayment = totalMonthly * term;

            return (
                <div className="text-left space-y-2">
                    <h3 className="font-bold text-lg text-blue-800">Kết quả tính toán:</h3>
                    <p><strong>Số tiền trả hàng tháng (ước tính):</strong> {totalMonthly.toLocaleString('vi-VN', { maximumFractionDigits: 0 })} VNĐ</p>
                    <p><strong>Tổng số tiền phải trả sau {term} tháng:</strong> {totalRepayment.toLocaleString('vi-VN', { maximumFractionDigits: 0 })} VNĐ</p>
                    <p className="font-bold mt-4 text-amber-800">Trách nhiệm của bạn:</p>
                    <ul className="list-disc list-inside">
                        <li>Trả nợ đúng hạn hàng tháng.</li>
                        <li>Sử dụng vốn vay đúng mục đích đã cam kết.</li>
                        <li>Thông báo cho ngân hàng khi có thay đổi về tài chính cá nhân.</li>
                    </ul>
                    <p className="text-xs text-slate-500 pt-2">Lưu ý: Lãi suất chỉ mang tính tham khảo cho mục đích mô phỏng và có thể thay đổi theo thời điểm.</p>
                </div>
            );
        }
    };

    const tradeCreditScenario: SimulationScenario = {
        title: "Mua chịu giữa doanh nghiệp (Tín dụng thương mại)",
        icon: <TradeIcon />,
        description: "Bạn là chủ một cửa hàng bán lẻ, đang cần nhập hàng từ nhà cung cấp và muốn trả tiền sau.",
        themeColor: 'green',
        choices: {
            label: "Loại hàng hóa",
            key: 'type',
            options: [
                { label: "Hàng tiêu dùng nhanh", value: 0.05 },
                { label: "Hàng điện tử", value: 0.1 },
                { label: "Vật liệu xây dựng", value: 0.15 }
            ]
        },
        inputs: [
            { label: "Giá trị lô hàng (VNĐ)", type: 'number', key: 'amount' },
            { label: "Thời hạn trả nợ (ngày)", type: 'number', key: 'term' }
        ],
        calculateResult: (values: { [key: string]: string | number }) => {
            const amount = Number(values.amount) || 0;
            const term = Number(values.term) || 30;
            const riskFactor = Number(values.type) || 0.1;
            const lateFee = amount * riskFactor;

            return (
                <div className="text-left space-y-3">
                    <h3 className="font-bold text-lg text-green-800">Phân tích Rủi ro & Lợi ích:</h3>
                    <div>
                        <h4 className="font-semibold text-green-700">Lợi ích:</h4>
                        <ul className="list-disc list-inside">
                            <li>Linh hoạt dòng tiền, không cần trả tiền ngay.</li>
                            <li>Nắm bắt cơ hội kinh doanh khi có hàng bán ngay lập tức.</li>
                            <li>Xây dựng mối quan hệ tốt với nhà cung cấp nếu trả đúng hạn.</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold text-red-700">Rủi ro:</h4>
                        <ul className="list-disc list-inside">
                            <li>Nếu trả trễ hạn ({term} ngày), có thể bị phạt: <span className="font-bold">{lateFee.toLocaleString('vi-VN')} VNĐ</span>.</li>
                            <li>Ảnh hưởng đến uy tín kinh doanh.</li>
                            <li>Có thể bị nhà cung cấp ngừng cấp hàng trong tương lai.</li>
                        </ul>
                    </div>
                </div>
            );
        }
    };
    
    const consumerLoanScenario: SimulationScenario = {
        title: "Vay tiêu dùng cá nhân",
        icon: <ConsumerIcon />,
        description: "Bạn cần một khoản tiền để giải quyết nhu cầu cá nhân. Hãy lựa chọn mục đích và số tiền vay.",
        themeColor: 'purple',
        choices: {
            label: "Mục đích vay",
            key: 'purpose',
            options: [
                { label: "Mua sắm đồ gia dụng", value: 'shopping' },
                { label: "Thanh toán học phí", value: 'education' },
                { label: "Du lịch", value: 'travel' }
            ]
        },
        inputs: [
            { label: "Số tiền vay (VNĐ)", type: 'number', key: 'amount' },
            { label: "Kỳ hạn vay (tháng)", type: 'number', key: 'term' }
        ],
        calculateResult: (values: { [key: string]: string | number }) => {
            const amount = Number(values.amount) || 0;
            const term = Number(values.term) || 1;
            const monthlyPayment = (amount * 1.2) / term; // Giả định lãi suất + gốc là 120%

            return (
                <div className="text-left space-y-3">
                    <h3 className="font-bold text-lg text-purple-800">Kết quả & Cảnh báo:</h3>
                    <p><strong>Số tiền trả góp hàng tháng (ước tính):</strong> {monthlyPayment.toLocaleString('vi-VN', { maximumFractionDigits: 0 })} VNĐ</p>
                    <div className="p-3 bg-red-100 border-l-4 border-red-500 text-red-700">
                        <h4 className="font-bold">Cảnh báo quan trọng!</h4>
                        <p>Việc trả nợ trễ hạn dù chỉ một ngày có thể ảnh hưởng tiêu cực đến điểm tín dụng của bạn. Điểm tín dụng xấu sẽ khiến bạn khó vay vốn trong tương lai.</p>
                    </div>
                </div>
            );
        }
    };

    const governmentBondScenario: SimulationScenario = {
        title: "Tham gia chính sách tín dụng nhà nước",
        icon: <GovernmentIcon />,
        description: "Bạn là sinh viên và muốn vay vốn ưu đãi từ ngân hàng chính sách xã hội để trang trải học phí.",
        themeColor: 'yellow',
        choices: {
            label: "Gói vay",
            key: 'package',
            options: [
                { label: "Vay vốn học tập", value: 'study' },
                { label: "Vay vốn khởi nghiệp", value: 'startup' }
            ]
        },
        inputs: [
            { label: "Số tiền vay (VNĐ)", type: 'number', key: 'amount' },
        ],
        calculateResult: (values: { [key: string]: string | number }) => {
            const amount = Number(values.amount) || 0;
            const interestRate = 0.066; // 6.6%/năm

            return (
                <div className="text-left space-y-3">
                    <h3 className="font-bold text-lg text-yellow-800">Thông tin gói vay ưu đãi:</h3>
                    <p><strong>Lãi suất ưu đãi:</strong> {interestRate * 100}%/năm.</p>
                    <p><strong>Ân hạn trả nợ:</strong> Thường được ân hạn trong suốt quá trình học, chỉ bắt đầu trả sau khi ra trường 1 năm.</p>
                    <h4 className="font-bold mt-4 text-blue-800">Quản lý mục tiêu sử dụng tiền:</h4>
                     <ul className="list-disc list-inside">
                        <li>Bạn phải cam kết sử dụng số tiền {amount.toLocaleString('vi-VN')} VNĐ đúng mục đích (trả học phí, mua dụng cụ học tập).</li>
                        <li>Việc lạm dụng vốn vay có thể dẫn đến việc thu hồi khoản vay và xử lý theo quy định.</li>
                    </ul>
                </div>
            );
        }
    };

    const MenuScreen = () => (
        <div className="text-center animate-fade-in">
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-2">Chọn một tình huống</h1>
            <p className="text-slate-600 mb-8">Hãy khám phá các loại hình tín dụng khác nhau.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <MenuCard icon={<BankIcon/>} title="Vay Ngân Hàng" onClick={() => setScreen(Screen.BankLoan)} className="bg-blue-100/60 hover:bg-blue-200/60" />
                <MenuCard icon={<TradeIcon/>} title="Tín Dụng Thương Mại" onClick={() => setScreen(Screen.TradeCredit)} className="bg-green-100/60 hover:bg-green-200/60" />
                <MenuCard icon={<ConsumerIcon/>} title="Vay Tiêu Dùng" onClick={() => setScreen(Screen.ConsumerLoan)} className="bg-purple-100/60 hover:bg-purple-200/60" />
                <MenuCard icon={<GovernmentIcon/>} title="Tín Dụng Nhà Nước" onClick={() => setScreen(Screen.GovernmentBond)} className="bg-yellow-100/60 hover:bg-yellow-200/60" />
                <MenuCard icon={<GameIcon/>} title="Trò Chơi Ghép Thẻ" onClick={() => setScreen(Screen.Game)} className="bg-indigo-100/60 hover:bg-indigo-200/60" />
                <MenuCard icon={<ShieldIcon/>} title="Tình Huống Tín Dụng Đen" onClick={() => setScreen(Screen.FinalScenario)} className="bg-red-100/60 hover:bg-red-200/60" />
            </div>
        </div>
    );

    const MenuCard: React.FC<{ icon: React.ReactNode, title: string, onClick: () => void, className?: string }> = ({ icon, title, onClick, className }) => (
        <button onClick={onClick} className={`p-6 rounded-2xl shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 flex flex-col items-center justify-center space-y-3 text-center ${className}`}>
            {icon}
            <h3 className="text-xl font-semibold text-slate-700">{title}</h3>
        </button>
    );

    const renderScreen = () => {
        switch (screen) {
            case Screen.Welcome:
                return <WelcomeScreen onStart={() => setScreen(Screen.Menu)} />;
            case Screen.Menu:
                return <MenuScreen />;
            case Screen.BankLoan:
                return <SimulationScreen scenario={bankLoanScenario} onBack={() => setScreen(Screen.Menu)} />;
            case Screen.TradeCredit:
                return <SimulationScreen scenario={tradeCreditScenario} onBack={() => setScreen(Screen.Menu)} />;
            case Screen.ConsumerLoan:
                return <SimulationScreen scenario={consumerLoanScenario} onBack={() => setScreen(Screen.Menu)} />;
            case Screen.GovernmentBond:
                return <SimulationScreen scenario={governmentBondScenario} onBack={() => setScreen(Screen.Menu)} />;
            case Screen.Game:
                 return <GameScreen score={score} setScore={setScore} onBack={() => setScreen(Screen.Menu)} />;
            case Screen.FinalScenario:
                return <FinalScenarioScreen onBack={() => setScreen(Screen.Menu)} />;
            default:
                return <WelcomeScreen onStart={() => setScreen(Screen.Menu)} />;
        }
    };
    
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 font-sans">
            <div className="w-full max-w-4xl mx-auto">
                {renderScreen()}
            </div>
        </div>
    );
};

export default App;