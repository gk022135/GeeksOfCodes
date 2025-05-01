import React, { useState } from 'react';
import Editor from '@monaco-editor/react';

export default function Code_editor() {
    const [code, setCode] = useState('');
    const [output, setOutput] = useState('');

    const handleEditorChange = (value) => {
        setCode(value);
    };

    const compileCode = () => {
        try {
            // Capture console.log outputs
            const originalConsoleLog = console.log;
            let logOutput = "";

            console.log = (...args) => {
                logOutput += args.join(" ") + "\n";
            };

            const result = new Function(code)(); // Executes user code

            console.log = originalConsoleLog; // Restore original console.log

            // Prefer log output if available
            setOutput(logOutput || String(result));
        } catch (error) {
            setOutput(`❌ Error: ${error.message}`);
        }
    };


    return (
        <div className="max-w-4xl mx-auto mt-12 p-6 bg-zinc-900 rounded-2xl shadow-2xl border border-zinc-800 space-y-6">
            <div className="text-white text-xl font-semibold">Code Editor</div>

            <Editor
                height="400px"
                width="100%"
                theme="vs-dark"
                language="javascript"
                value={code}
                onChange={handleEditorChange}
                className="rounded-md overflow-hidden"
            />

            <div className="flex justify-between items-center">
                <button
                    onClick={compileCode}
                    className="bg-green-600 hover:bg-green-500 transition-colors duration-300 text-white font-semibold px-6 py-2 rounded-lg shadow"
                >
                    Compile
                </button>
                <p className="text-gray-400 text-sm">* Output will appear below</p>
            </div>

            <div>
                <label className="text-white font-medium">Output:</label>
                <textarea
                    value={output}
                    readOnly
                    className="w-full mt-2 bg-zinc-800 text-green-400 font-mono p-4 rounded-lg resize-none border border-zinc-700 focus:outline-none"
                    style={{ height: "120px" }}
                />
            </div>
        </div>

    );
}