const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const { OpenAI } = require('openai');  // Import OpenAI from the updated SDK
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const mapleScriptPath = path.join(__dirname, 'geometry/solver.mpl');
const textPath = 'C:/Users/mt200/OneDrive/Desktop/KnowledgeBase/DoAn/Maple/problem.txt';

// Configure OpenAI API client
const openai = new OpenAI({
    apiKey: "",
});

app.post('/api/solve', async (req, res) => {
    try {
        const { problemType, giaThuyet, mucTieu, text } = req.body;
        console.log(problemType);
        if (problemType === 2) {
            const parts = giaThuyet.split(", ");
            const variables = [];
            const values = [];

            parts.forEach((part) => {
                const [variable, value] = part.split(" = ");
                if (variable && value) {
                    variables.push(variable.trim());
                    values.push(value.trim());
                } else {
                    console.error(`Invalid format for part: "${part}"`);
                }
            });

            const result = [variables, values];

            const mapleCodeTamGiac = `
            restart;
            read("C:/Users/mt200/OneDrive/Desktop/KnowledgeBase/Maple/newcode/MangTinhToan.m"):
            with(MangTinhToan):
            DetailSolution("C:/Users/mt200/OneDrive/Desktop/KnowledgeBase/Maple/newcode/TAM_GIAC.txt",[${result[0]}],{${mucTieu}}, [${result[1]}]);
            `;

            fs.writeFileSync(mapleScriptPath, mapleCodeTamGiac);

            const mapleCommand = `cmaple -q ${mapleScriptPath}`;
            exec(mapleCommand, { maxBuffer: 1024 * 1024 * 10 }, async (error, stdout, stderr) => {
                    res.json({ solution: stdout });
            });
        } else {
            fs.writeFileSync(textPath, text);

            const mapleCommand = `cmaple -q ${mapleScriptPath}`;
            exec(mapleCommand, { maxBuffer: 1024 * 1024 * 10 }, async (error, stdout, stderr) => {
                if (error) {
                    console.error(`Execution error: ${error}`);
                    return res.status(500).json({ error: 'Maple execution failed' });
                }
                const mapleCodeDoan = `
                read("C:/Users/mt200/OneDrive/Desktop/KnowledgeBase/DoAn/Maple/CONet_Solver.m");
                with(CONet_Solver):
                Set_Onet("problem.txt");
                SolverGiaTri(Paras_CONet, Objs_CONet, Otypes_CONet, Facts_CONet, Fkinds_CONet, Goals_CONet, Sol_CONet, Rule_Structs);
                `;
    
                fs.writeFileSync(mapleScriptPath, mapleCodeDoan);

                try {
                    console.log(stdout);
                    const response = await openai.chat.completions.create({
                        model: 'gpt-4',
                        messages: [
                            {
                                role: 'system',
                                content: `Bạn là trợ lý hữu ích định dạng các bài giải toán hình học thành Markdown. 
                                Chỉ hiện phần đã làm trong nội dung, không được thêm gì vào ouput ví dụ không thêm "Markdown".
                                Không được thêm nội dung, hay các bước khác trong bài mẫu. Bạn viết rõ công thức sử dụng sao cho dễ nhìn.
                                Một dòng không được dài khoảng 30 kí tự.
                                Mội số kí hiệu: DOAN là ĐOẠN, TIA là TIA, ĐƯỜNG là ĐƯỜNG. 
                                Ví dụ DOAN[A,B] =5  chuyển sang là AB = 5
                                ["TRUNGDIEM", D, DOAN[A,B]] sang là D là trung điểm đoạn AB.
                                ["THUOC", D, DOAN[A,B]] sang là D thuộc đoạn AB.
                                {["THUOC",M,TIA[O,x]],["THUOC",N,TIA[O,x]], ["<", DOAN[M,O], DOAN[N,O]]} sang là M thuộc tia OX, N thuộc tia OX, MN < MO.
                                {["DOINHAU",TIA[O,A],TIA[O,B]]} sang là tia OA và OB đối nhau.
                                {["THANGHANG", A, B, C]} sang là A, B, C la 3 điểm thẳng hàng.
                                Nếu như không có lời giải thì xuất ra xin lỗi chúng tôi không có lời giải cho bài toán trên
                            `,
                            },
                            {
                                role: 'user',
                                content: `Định dạng bài giải hình học sau sang Markdown: ${stdout}`,
                            },
                        ],
                    });

                    const formattedSolution = response.choices[0].message.content;
                    console.log(formattedSolution);
                    res.json({ solution: formattedSolution });
                } catch (apiError) {
                    console.error('LLM API Error:', apiError);
                    res.status(500).json({ error: 'Failed to format the solution using LLM.' });
                }
            });
        }
    } catch (error) {
        console.error('Unexpected Error:', error);
        res.status(500).json({ error: 'An unexpected error occurred.' });
    }
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
