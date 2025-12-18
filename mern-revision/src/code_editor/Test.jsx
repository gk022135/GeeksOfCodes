import React, { useState } from 'react';
import { ChevronDown, Play, RotateCcw } from 'lucide-react';

export default function LeetCodeEditor() {
    const [selectedLanguage, setSelectedLanguage] = useState('javascript');
    const [code, setCode] = useState(`function twoSum(nums, target) {
    // Write your solution here
    
}`);
    const [output, setOutput] = useState('');
    const [testResults, setTestResults] = useState([]);

    const languages = [
        { id: 'javascript', name: 'JavaScript', icon: 'JS' },
        { id: 'python', name: 'Python', icon: 'Py' },
        { id: 'java', name: 'Java', icon: 'Ja' },
        { id: 'cpp', name: 'C++', icon: 'C++' }
    ];

    const problem = {
        title: "1. Two Sum",
        difficulty: "Easy",
        description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
        constraints: [
            "2 ≤ nums.length ≤ 10⁴",
            "-10⁹ ≤ nums[i] ≤ 10⁹",
            "-10⁹ ≤ target ≤ 10⁹",
            "Only one valid answer exists."
        ],
        examples: [
            {
                input: "nums = [2,7,11,15], target = 9",
                output: "[0,1]",
                explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]."
            },
            {
                input: "nums = [3,2,4], target = 6",
                output: "[1,2]",
                explanation: "Because nums[1] + nums[2] == 6, we return [1, 2]."
            },
            {
                input: "nums = [3,3], target = 6",
                output: "[0,1]",
                explanation: "Because nums[0] + nums[1] == 6, we return [0, 1]."
            }
        ]
    };

    const testCases = [
        { nums: [2, 7, 11, 15], target: 9, expected: [0, 1] },
        { nums: [3, 2, 4], target: 6, expected: [1, 2] },
        { nums: [3, 3], target: 6, expected: [0, 1] }
    ];

    const runCode = () => {
        try {
            const results = [];
            let allPassed = true;

            for (let i = 0; i < testCases.length; i++) {
                const testCase = testCases[i];
                
                try {
                    const func = new Function('nums', 'target', `
                        ${code}
                        return twoSum(nums, target);
                    `);
                    
                    const result = func(testCase.nums, testCase.target);
                    const passed = JSON.stringify(result) === JSON.stringify(testCase.expected);
                    
                    results.push({
                        case: i + 1,
                        input: `nums = [${testCase.nums.join(',')}], target = ${testCase.target}`,
                        expected: JSON.stringify(testCase.expected),
                        output: JSON.stringify(result),
                        passed
                    });
                    
                    if (!passed) allPassed = false;
                } catch (err) {
                    results.push({
                        case: i + 1,
                        input: `nums = [${testCase.nums.join(',')}], target = ${testCase.target}`,
                        expected: JSON.stringify(testCase.expected),
                        output: `Error: ${err.message}`,
                        passed: false
                    });
                    allPassed = false;
                }
            }

            setTestResults(results);
            setOutput(allPassed ? '✅ All test cases passed!' : '❌ Some test cases failed');
        } catch (error) {
            setOutput(`❌ Error: ${error.message}`);
            setTestResults([]);
        }
    };

    const resetCode = () => {
        setCode(`function twoSum(nums, target) {
    // Write your solution here
    
}`);
        setOutput('');
        setTestResults([]);
    };

    return (
        <div className="flex h-screen bg-zinc-900 text-white">
            {/* Left Panel - Problem Description */}
            <div className="w-1/2 border-r border-zinc-800 overflow-y-auto">
                <div className="p-6 space-y-6">
                    {/* Problem Header */}
                    <div>
                        <h1 className="text-2xl font-bold mb-2">{problem.title}</h1>
                        <span className="inline-block px-3 py-1 text-xs font-medium bg-green-900 text-green-300 rounded-full">
                            {problem.difficulty}
                        </span>
                    </div>

                    {/* Description */}
                    <div>
                        <p className="text-gray-300 leading-relaxed">{problem.description}</p>
                    </div>

                    {/* Examples */}
                    <div className="space-y-4">
                        {problem.examples.map((example, idx) => (
                            <div key={idx} className="bg-zinc-800 rounded-lg p-4 space-y-2">
                                <div className="font-semibold text-sm text-gray-400">Example {idx + 1}:</div>
                                <div className="space-y-1">
                                    <div className="font-mono text-sm">
                                        <span className="text-gray-400">Input:</span> <span className="text-white">{example.input}</span>
                                    </div>
                                    <div className="font-mono text-sm">
                                        <span className="text-gray-400">Output:</span> <span className="text-white">{example.output}</span>
                                    </div>
                                    {example.explanation && (
                                        <div className="text-sm text-gray-400 mt-2">
                                            <span className="font-semibold">Explanation:</span> {example.explanation}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Constraints */}
                    <div>
                        <h3 className="font-semibold mb-3 text-gray-300">Constraints:</h3>
                        <ul className="space-y-2">
                            {problem.constraints.map((constraint, idx) => (
                                <li key={idx} className="text-sm text-gray-400 font-mono">• {constraint}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Right Panel - Code Editor */}
            <div className="w-1/2 flex flex-col">
                {/* Language Selector */}
                <div className="border-b border-zinc-800 p-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        {languages.map((lang) => (
                            <button
                                key={lang.id}
                                onClick={() => setSelectedLanguage(lang.id)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                    selectedLanguage === lang.id
                                        ? 'bg-zinc-700 text-white'
                                        : 'text-gray-400 hover:text-white hover:bg-zinc-800'
                                }`}
                            >
                                {lang.name}
                            </button>
                        ))}
                    </div>
                    <button
                        onClick={resetCode}
                        className="flex items-center gap-2 px-3 py-2 text-sm text-gray-400 hover:text-white transition-colors"
                    >
                        <RotateCcw size={16} />
                        Reset
                    </button>
                </div>

                {/* Code Editor */}
                <div className="flex-1 bg-zinc-950">
                    <textarea
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        className="w-full h-full bg-zinc-950 text-white font-mono text-sm p-4 resize-none focus:outline-none"
                        spellCheck="false"
                    />
                </div>

                {/* Run Button */}
                <div className="border-t border-zinc-800 p-4">
                    <button
                        onClick={runCode}
                        className="flex items-center gap-2 bg-green-600 hover:bg-green-500 transition-colors px-6 py-2 rounded-lg font-medium"
                    >
                        <Play size={18} />
                        Run Code
                    </button>
                </div>

                {/* Output Panel */}
                <div className="border-t border-zinc-800 bg-zinc-900 p-4 max-h-64 overflow-y-auto">
                    <div className="font-semibold mb-3 text-gray-300">Test Results:</div>
                    {output && (
                        <div className={`mb-4 p-3 rounded-lg ${output.includes('✅') ? 'bg-green-900/30 text-green-300' : 'bg-red-900/30 text-red-300'}`}>
                            {output}
                        </div>
                    )}
                    {testResults.length > 0 && (
                        <div className="space-y-3">
                            {testResults.map((result) => (
                                <div key={result.case} className={`p-3 rounded-lg border ${result.passed ? 'border-green-700 bg-green-900/20' : 'border-red-700 bg-red-900/20'}`}>
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className={`font-semibold ${result.passed ? 'text-green-400' : 'text-red-400'}`}>
                                            {result.passed ? '✓' : '✗'} Test Case {result.case}
                                        </span>
                                    </div>
                                    <div className="text-sm space-y-1 font-mono">
                                        <div className="text-gray-400">Input: {result.input}</div>
                                        <div className="text-gray-400">Expected: {result.expected}</div>
                                        <div className={result.passed ? 'text-green-300' : 'text-red-300'}>
                                            Output: {result.output}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}