import React, { useState, useEffect } from 'react';
import { Screen } from './types';
import WelcomeScreen from './components/WelcomeScreen';
import SimulationScreen from './components/SimulationScreen';
import { SimulationScenario, SimulationInput } from './components/SimulationScreen';
import GameScreen from './components/GameScreen';
import FinalScenarioScreen from './components/FinalScenarioScreen';
import { BankIcon, TradeIcon, ConsumerIcon, GovernmentIcon, ShieldIcon, GameIcon } from './components/Icons';

const App: React.FC = () => {
    const [screen, setScreen] = useState<Screen>(Screen.Welcome);
    const [score, setScore] = useState<number>(0);

    const bankLoanScenario: SimulationScenario = {
        title: "Vay ngân hàng",
        icon: <BankIcon />,
        description: "Dựa theo các trường hợp trong sách giáo khoa, hãy chọn một hình thức vay để mô phỏng.",
        themeColor: 'blue',
        choices: {
            label: "Hình thức vay",
            key: 'type',
            options: [
                { label: "Vay tín chấp (như Anh S mua xe)", value: 'unsecured' },
                { label: "Vay thế chấp (như Chị N sửa nhà)", value: 'secured' },
                { label: "Vay trả góp kinh doanh (như Anh H)", value: 'installment' }
            ]
        },
        inputs: [
            { label: "Số tiền vay (VNĐ)", type: 'number', key: 'amount' },
            { label: "Thời hạn vay (tháng)", type: 'number', key: 'term', relevantChoice: 'installment' }
        ],
        calculateResult: (values: { [key: string]: string | number }) => {
            const amount = Number(values.amount) || 0;
            const term = Number(values.term) || 12;

            switch(values.type) {
                case 'unsecured':
                    return (
                        <div className="text-left space-y-2">
                            <h3 className="font-bold text-lg text-blue-800">Kết quả: Vay Tín Chấp</h3>
                            <p>Đây là hình thức vay dựa hoàn toàn vào <strong className="text-blue-600">uy tín</strong> của người vay (thu nhập ổn định, lịch sử tín dụng tốt) mà không cần tài sản bảo đảm.</p>
                            <ul className="list-disc list-inside space-y-1">
                                <li><strong>Đặc điểm:</strong> Thủ tục đơn giản, giải ngân nhanh.</li>
                                <li><strong>Hạn chế:</strong> Số tiền vay thường không lớn, thời hạn vay ngắn và <strong className="text-red-600">lãi suất khá cao</strong> do rủi ro lớn hơn cho ngân hàng.</li>
                                <li><strong>Trách nhiệm:</strong> Phải cung cấp thông tin trung thực và trả nợ đúng hạn để giữ uy tín.</li>
                            </ul>
                        </div>
                    );
                case 'secured':
                    return (
                        <div className="text-left space-y-2">
                            <h3 className="font-bold text-lg text-blue-800">Kết quả: Vay Thế Chấp</h3>
                            <p>Đây là hình thức vay yêu cầu người vay phải có <strong className="text-blue-600">tài sản bảo đảm</strong> (như nhà đất, xe ô tô) với giá trị tương đương khoản vay.</p>
                             <ul className="list-disc list-inside space-y-1">
                                <li><strong>Đặc điểm:</strong> Có thể vay số tiền lớn, thời gian vay dài, lãi suất phù hợp hơn vay tín chấp.</li>
                                <li><strong>Hạn chế:</strong> Thủ tục phức tạp, mất nhiều thời gian thẩm định tài sản.</li>
                                <li><strong>Trách nhiệm:</strong> Nếu không thể trả nợ, bạn sẽ phải chuyển quyền sở hữu tài sản thế chấp cho ngân hàng để xử lý.</li>
                            </ul>
                        </div>
                    );
                case 'installment':
                    const monthlyInterestRate = 0.015; // 1.5%/tháng như trong sách
                    const principalPerMonth = amount / term;
                    const totalInterest = amount * term * monthlyInterestRate; // Lãi suất phẳng để đơn giản hoá
                    const totalRepayment = amount + totalInterest;
                    const totalMonthly = totalRepayment / term;
                     return (
                        <div className="text-left space-y-2">
                            <h3 className="font-bold text-lg text-blue-800">Kết quả: Vay Trả Góp</h3>
                            <p>Bạn sẽ trả nợ (cả gốc và lãi) theo các kỳ hạn đều đặn, thường là hàng tháng.</p>
                             <ul className="list-disc list-inside space-y-1">
                                <li><strong>Lãi suất tham khảo (như Anh H):</strong> {monthlyInterestRate*100}%/tháng.</li>
                                <li><strong>Số tiền trả hàng tháng (ước tính):</strong> {totalMonthly.toLocaleString('vi-VN', { maximumFractionDigits: 0 })} VNĐ</li>
                                <li><strong>Tổng số tiền phải trả sau {term} tháng:</strong> {totalRepayment.toLocaleString('vi-VN', { maximumFractionDigits: 0 })} VNĐ</li>
                                <li><strong>Trách nhiệm:</strong> Thanh toán đầy đủ và đúng hạn hàng tháng như đã thoả thuận.</li>
                            </ul>
                        </div>
                    );
                default: return null;
            }
        }
    };

    const tradeCreditScenario: SimulationScenario = {
        title: "Tín dụng thương mại",
        icon: <TradeIcon />,
        description: "Bạn là xí nghiệp B, mua nguyên vật liệu xây dựng chịu từ công ty A và sẽ thanh toán sau.",
        themeColor: 'green',
        inputs: [
            { label: "Giá trị lô hàng (VNĐ)", type: 'number', key: 'amount' },
            { label: "Thời hạn trả nợ (ngày)", type: 'number', key: 'term' }
        ],
        calculateResult: (values: { [key: string]: string | number }) => {
            const amount = Number(values.amount) || 0;
            const term = Number(values.term) || 30;
            const interestRate = 0.03; // Giả sử lãi suất cho TDTM là 3% cho kỳ hạn
            const interestCost = amount * interestRate;
            const totalPayment = amount + interestCost;

            return (
                <div className="text-left space-y-3">
                    <h3 className="font-bold text-lg text-green-800">Phân tích Tín dụng Thương mại:</h3>
                    <p>Đây là quan hệ tín dụng giữa các doanh nghiệp dưới hình thức mua bán chịu. Công ty A (bên bán) cấp tín dụng cho xí nghiệp B (bên mua).</p>
                    <ul className="list-disc list-inside">
                        <li><strong>Số vốn được cấp:</strong> {amount.toLocaleString('vi-VN')} VNĐ</li>
                        <li><strong>Chi phí sử dụng vốn (tiền lãi):</strong> {interestCost.toLocaleString('vi-VN')} VNĐ</li>
                        <li><strong>Tổng số tiền phải trả sau {term} ngày:</strong> {totalPayment.toLocaleString('vi-VN')} VNĐ</li>
                    </ul>
                    <h4 className="font-semibold text-blue-700 pt-2">Tiện ích:</h4>
                    <p>Giúp xí nghiệp B có nguyên vật liệu để sản xuất ngay cả khi chưa có đủ tiền, không làm gián đoạn kinh doanh và hạn chế giao dịch qua trung gian.</p>
                </div>
            );
        }
    };
    
    const consumerLoanScenario: SimulationScenario = {
        title: "Tín dụng tiêu dùng",
        icon: <ConsumerIcon />,
        description: "Mô phỏng các hình thức tín dụng phục vụ nhu cầu chi tiêu cá nhân như trong bài học.",
        themeColor: 'purple',
        choices: {
            label: "Chọn hình thức",
            key: 'type',
            options: [
                { label: "Mua trả góp xe máy (như Chị Y)", value: 'installment' },
                { label: "Sử dụng thẻ tín dụng (như Chị C)", value: 'credit_card' },
            ]
        },
        inputs: [
            { label: "Giá trị xe máy (VNĐ)", type: 'number', key: 'item_price', relevantChoice: 'installment' },
            { label: "Số tiền chi tiêu bằng thẻ (VNĐ)", type: 'number', key: 'spend_amount', relevantChoice: 'credit_card' },
            { label: "Hạn mức tín dụng của thẻ (VNĐ)", type: 'number', key: 'credit_limit', relevantChoice: 'credit_card' }
        ],
        calculateResult: (values: { [key: string]: string | number }) => {
            if (values.type === 'installment') {
                const itemPrice = Number(values.item_price) || 0;
                const downPaymentRate = 0.4; // Chị Y trả trước 40%
                const downPayment = itemPrice * downPaymentRate;
                const loanAmount = itemPrice - downPayment;
                const term = 12; // Giả sử trả trong 12 tháng
                const monthlyInterestRate = 0.03; // Lãi suất công ty tài chính thường cao
                const totalRepayment = loanAmount * (1 + monthlyInterestRate * term);
                const monthlyPayment = totalRepayment / term;
                return (
                    <div className="text-left space-y-2">
                         <h3 className="font-bold text-lg text-purple-800">Kết quả: Mua trả góp qua Công ty Tài chính</h3>
                         <p>Bạn mua một tài sản và trả dần giá trị của nó (cả gốc và lãi) trong nhiều kỳ.</p>
                         <ul className="list-disc list-inside space-y-1">
                             <li><strong>Giá xe:</strong> {itemPrice.toLocaleString('vi-VN')} VNĐ</li>
                             <li><strong>Trả trước (40%):</strong> {downPayment.toLocaleString('vi-VN')} VNĐ</li>
                             <li><strong>Số tiền vay công ty tài chính:</strong> {loanAmount.toLocaleString('vi-VN')} VNĐ</li>
                             <li><strong>Trả góp hàng tháng (ước tính):</strong> {monthlyPayment.toLocaleString('vi-VN', {maximumFractionDigits: 0})} VNĐ</li>
                             <li className="font-semibold text-red-600"><strong>So sánh:</strong> So với việc thanh toán hết một lần, hình thức này khiến bạn tốn thêm một khoản chi phí cho tiền lãi.</li>
                         </ul>
                    </div>
                );
            } else { // credit_card
                const spendAmount = Number(values.spend_amount) || 0;
                const creditLimit = Number(values.credit_limit) || 30000000;
                const cashbackRate = 0.06; // Hoàn tiền 6% như trong sách
                const cashback = spendAmount * cashbackRate;
                const interestRate = 0.3; // Lãi suất thẻ tín dụng rất cao, ~30%/năm
                const interestOwed = spendAmount * (interestRate/12);
                return (
                     <div className="text-left space-y-2">
                         <h3 className="font-bold text-lg text-purple-800">Kết quả: Sử dụng Thẻ tín dụng</h3>
                         <p>Đây là thẻ "chi tiêu trước, trả tiền sau" do ngân hàng cấp dựa trên tài chính và lịch sử tín dụng của bạn.</p>
                          <ul className="list-disc list-inside space-y-1">
                            <li><strong>Hạn mức thẻ:</strong> {creditLimit.toLocaleString('vi-VN')} VNĐ</li>
                            <li><strong>Đã chi tiêu:</strong> {spendAmount.toLocaleString('vi-VN')} VNĐ</li>
                            <li className="text-green-600"><strong>Lợi ích:</strong> Được hoàn lại {cashbackRate*100}% giá trị hóa đơn, tương đương {cashback.toLocaleString('vi-VN')} VNĐ. Thanh toán tiện lợi, an toàn.</li>
                            <li className="font-semibold text-amber-700"><strong>Nghĩa vụ:</strong> Phải hoàn trả đủ {spendAmount.toLocaleString('vi-VN')} VNĐ trong thời gian miễn lãi (thường là 40-45 ngày).</li>
                             <li className="font-bold text-red-600"><strong>Cảnh báo:</strong> Nếu không trả đúng hạn, bạn sẽ phải chịu mức lãi suất rất cao (khoảng {interestOwed.toLocaleString('vi-VN', {maximumFractionDigits: 0})} VNĐ/tháng) và bị ghi nhận điểm tín dụng xấu.</li>
                         </ul>
                    </div>
                );
            }
        }
    };

    const governmentBondScenario: SimulationScenario = {
        title: "Tín dụng nhà nước",
        icon: <GovernmentIcon />,
        description: "Nhà nước vừa là người đi vay (phát hành trái phiếu), vừa là người cho vay (thông qua ngân hàng chính sách).",
        themeColor: 'yellow',
        choices: {
            label: "Chọn hình thức",
            key: 'type',
            options: [
                { label: "Vay vốn sinh viên (như bạn A)", value: 'student_loan' },
                { label: "Đầu tư Trái phiếu Chính phủ", value: 'bond_investment' }
            ]
        },
        inputs: [
            { label: "Số tiền (VNĐ)", type: 'number', key: 'amount' },
        ],
        calculateResult: (values: { [key: string]: string | number }) => {
            const amount = Number(values.amount) || 0;
            if (values.type === 'student_loan') {
                 return (
                    <div className="text-left space-y-3">
                        <h3 className="font-bold text-lg text-yellow-800">Kết quả: Vay vốn sinh viên</h3>
                        <p>Đây là chương trình tín dụng của Nhà nước thông qua Ngân hàng Chính sách xã hội, hoạt động không vì mục đích lợi nhuận.</p>
                        <ul className="list-disc list-inside">
                            <li><strong>Mục đích:</strong> Hỗ trợ học sinh, sinh viên có hoàn cảnh khó khăn trang trải chi phí học tập.</li>
                            <li><strong>Lãi suất:</strong> Cực kỳ ưu đãi.</li>
                            <li><strong>Điều kiện:</strong> Phải thuộc đối tượng chính sách, có gia đình đứng ra bảo lãnh và được địa phương xác nhận.</li>
                            <li><strong>Nghĩa vụ:</strong> Trả nợ sau khi ra trường theo đúng thời gian quy định.</li>
                        </ul>
                    </div>
                );
            } else { // bond_investment
                const interestRate = 0.05; // Giả sử lãi suất trái phiếu 5%/năm
                const term = 5; // Kỳ hạn 5 năm
                const totalReturn = amount * (1 + interestRate * term);
                const profit = totalReturn - amount;
                return (
                     <div className="text-left space-y-3">
                        <h3 className="font-bold text-lg text-yellow-800">Kết quả: Đầu tư Trái phiếu Chính phủ</h3>
                        <p>Khi mua trái phiếu, bạn đang <strong className="text-yellow-700">cho Nhà nước vay tiền</strong> để đầu tư, xây dựng các công trình quan trọng.</p>
                         <ul className="list-disc list-inside">
                            <li><strong>Số vốn đầu tư:</strong> {amount.toLocaleString('vi-VN')} VNĐ</li>
                             <li><strong>Lợi nhuận (ước tính sau {term} năm):</strong> {profit.toLocaleString('vi-VN')} VNĐ</li>
                            <li><strong>Tổng nhận về:</strong> {totalReturn.toLocaleString('vi-VN')} VNĐ</li>
                            <li><strong>Đặc điểm:</strong> Kênh đầu tư an toàn, lãi suất hấp dẫn và ổn định, góp phần xây dựng đất nước.</li>
                        </ul>
                    </div>
                )
            }
        }
    };

    const MenuScreen = () => (
        <div className="text-center animate-fade-in">
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-2">Chọn một tình huống</h1>
            <p className="text-slate-600 mb-8">Hãy khám phá các loại hình tín dụng khác nhau.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <MenuCard icon={<BankIcon/>} title="Vay Ngân Hàng" onClick={() => setScreen(Screen.BankLoan)} className="bg-blue-100/60 hover:bg-blue-200/60" />
                <MenuCard icon={<TradeIcon/>} title="Tín Dụng Thương Mại" onClick={() => setScreen(Screen.TradeCredit)} className="bg-green-100/60 hover:bg-green-200/60" />
                <MenuCard icon={<ConsumerIcon/>} title="Tín Dụng Tiêu Dùng" onClick={() => setScreen(Screen.ConsumerLoan)} className="bg-purple-100/60 hover:bg-purple-200/60" />
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
    
    const [currentScenario, setCurrentScenario] = useState<SimulationScenario | null>(null);

    useEffect(() => {
        // A helper to pass the correct scenario object to the simulation screen
        switch (screen) {
            case Screen.BankLoan:
                setCurrentScenario(bankLoanScenario);
                break;
            case Screen.TradeCredit:
                setCurrentScenario(tradeCreditScenario);
                break;
            case Screen.ConsumerLoan:
                setCurrentScenario(consumerLoanScenario);
                break;
            case Screen.GovernmentBond:
                setCurrentScenario(governmentBondScenario);
                break;
            default:
                setCurrentScenario(null);
        }
    }, [screen]);


    const renderScreen = () => {
        if (currentScenario) {
            return <SimulationScreen scenario={currentScenario} onBack={() => setScreen(Screen.Menu)} />;
        }
        
        switch (screen) {
            case Screen.Welcome:
                return <WelcomeScreen onStart={() => setScreen(Screen.Menu)} />;
            case Screen.Menu:
                return <MenuScreen />;
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
