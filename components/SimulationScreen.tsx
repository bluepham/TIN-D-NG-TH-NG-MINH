import React, { useState } from 'react';

export interface SimulationChoice {
  label: string;
  value: string | number;
}

export interface SimulationInput {
  label: string;
  type: 'number';
  key: string;
}

export interface SimulationScenario {
  title: string;
  icon: React.ReactNode;
  description: string;
  themeColor: 'blue' | 'green' | 'purple' | 'yellow';
  choices?: {
    label: string;
    key: string;
    options: SimulationChoice[];
  };
  inputs: SimulationInput[];
  calculateResult: (values: { [key: string]: string | number }) => React.ReactNode;
}

interface SimulationScreenProps {
    scenario: SimulationScenario;
    onBack: () => void;
}

const themeClasses = {
    blue: {
        text: 'text-blue-800',
        button: 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-300',
        ring: 'focus:ring-blue-500 focus:border-blue-500',
    },
    green: {
        text: 'text-green-800',
        button: 'bg-green-600 hover:bg-green-700 focus:ring-green-300',
        ring: 'focus:ring-green-500 focus:border-green-500',
    },
    purple: {
        text: 'text-purple-800',
        button: 'bg-purple-600 hover:bg-purple-700 focus:ring-purple-300',
        ring: 'focus:ring-purple-500 focus:border-purple-500',
    },
    yellow: {
        text: 'text-yellow-800',
        button: 'bg-yellow-500 hover:bg-yellow-600 focus:ring-yellow-300',
        ring: 'focus:ring-yellow-500 focus:border-yellow-500',
    }
};

const SimulationScreen: React.FC<SimulationScreenProps> = ({ scenario, onBack }) => {
    const [values, setValues] = useState<{ [key: string]: string | number }>(() => {
        const initial: { [key: string]: string | number } = {};
        if (scenario.choices) {
            initial[scenario.choices.key] = scenario.choices.options[0].value;
        }
        scenario.inputs.forEach(input => {
            initial[input.key] = '';
        });
        return initial;
    });
    const [result, setResult] = useState<React.ReactNode | null>(null);

    const handleValueChange = (key: string, value: string | number) => {
        const inputConfig = scenario.inputs.find(i => i.key === key);
        if (inputConfig?.type === 'number') {
            const numericValue = String(value).replace(/[^0-9]/g, '');
            const formattedValue = numericValue ? new Intl.NumberFormat('vi-VN').format(Number(numericValue)) : '';
            setValues(prev => ({ ...prev, [key]: formattedValue }));
        } else {
             setValues(prev => ({ ...prev, [key]: value }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const valuesForCalc = { ...values };
        scenario.inputs.forEach(input => {
            if (input.type === 'number' && typeof valuesForCalc[input.key] === 'string') {
                valuesForCalc[input.key] = Number(String(values[input.key]).replace(/\./g, ''));
            }
        });
        setResult(scenario.calculateResult(valuesForCalc));
    };
    
    const currentTheme = themeClasses[scenario.themeColor];

    return (
        <div className="p-6 md:p-8 bg-white rounded-2xl shadow-xl w-full animate-fade-in">
            <div className="flex items-center gap-4 mb-4">
                <div className="flex-shrink-0">{scenario.icon}</div>
                <div>
                    <h1 className={`text-3xl font-bold ${currentTheme.text}`}>{scenario.title}</h1>
                    <p className="text-slate-600">{scenario.description}</p>
                </div>
            </div>
            
            <div className="border-t border-slate-200 my-6"></div>

            <div className="grid md:grid-cols-2 gap-8">
                <form onSubmit={handleSubmit} className="space-y-4">
                    {scenario.choices && (
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">{scenario.choices.label}</label>
                            <select
                                value={values[scenario.choices.key]}
                                onChange={(e) => handleValueChange(scenario.choices!.key, e.target.value)}
                                className={`w-full p-2 border border-slate-300 rounded-md shadow-sm ${currentTheme.ring}`}
                            >
                                {scenario.choices.options.map(opt => (
                                    <option key={opt.label} value={opt.value}>{opt.label}</option>
                                ))}
                            </select>
                        </div>
                    )}

                    {scenario.inputs.map(input => (
                        <div key={input.key}>
                            <label htmlFor={input.key} className="block text-sm font-medium text-slate-700 mb-1">{input.label}</label>
                            <input
                                id={input.key}
                                type="text"
                                inputMode="numeric"
                                value={values[input.key]}
                                onChange={(e) => handleValueChange(input.key, e.target.value)}
                                required
                                className={`w-full p-2 border border-slate-300 rounded-md shadow-sm ${currentTheme.ring}`}
                                placeholder="Nhập số..."
                            />
                        </div>
                    ))}

                    <button type="submit" className={`w-full text-white font-semibold py-2 px-4 rounded-lg transition-colors focus:outline-none focus:ring-4 ${currentTheme.button}`}>
                        Xem kết quả
                    </button>
                </form>

                <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                    {result ? (
                         <div className="animate-fade-in-fast">{result}</div>
                    ) : (
                        <div className="flex items-center justify-center h-full text-slate-500">
                            <p>Kết quả mô phỏng sẽ hiển thị ở đây.</p>
                        </div>
                    )}
                </div>
            </div>

            <button onClick={onBack} className="mt-8 text-blue-600 hover:underline font-semibold">
                &larr; Quay lại Menu
            </button>
        </div>
    );
};

export default SimulationScreen;