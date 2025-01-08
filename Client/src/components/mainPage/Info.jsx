import React from 'react';
import { useState, useEffect, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import ReactMarkdown from 'react-markdown';
import './info.css';


function formatBackendData(input) {
  // Format backend data with line breaks
  let formatted = input.replace(/:\s*/g, ':\n'); // Line break after `:`
  formatted = formatted.replace(/\s*=>/g, '\n=>'); // Line break before `=>`
  formatted = formatted.replace(/Ta có:/g, '\nTa có:').trim(); // Add space between sections
  return formatted;
}


function MyVerticallyCenteredModal(props) {
  return (
    <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Thành viên trong nhóm</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>22520929 - Đặng Thanh Ngân</p>
        <p>22520424 - Thái Đình Nhật Hiển</p>
        <p>22521272 - Nguyễn Hồng Phát</p>
        <p>22521373 - Phạm Thanh Thảo</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Đóng</Button>
      </Modal.Footer>
    </Modal>
  );
}


const Info = () => {
  const [giaThuyet, setGiaThuyet] = useState('');
  const [mucTieu, setMucTieu] = useState('');
  const [yeuCau, setYeuCau] = useState('');
  const [solution1, setSolution1] = useState(null);
  const [solution2, setSolution2] = useState(null);
  const [show, setShow] = useState(false);
  const [team, setTeam] = useState(false);
  const [selectedProblemType, setSelectedProblemType] = useState(1); // Store the selected problem type
  const solutionRef1 = useRef(null);
  const solutionRef2 = useRef(null);
  const [text, setText] = useState('');
  const textareaRef = useRef(null);

  useEffect(() => {
      if (textareaRef.current) {
          // Reset height to calculate the correct height for new content
          textareaRef.current.style.height = 'auto';
          // Adjust height based on scrollHeight
          textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      }
  }, [text]); // Trigger effect when text changes


  const handleStart1 = () => {
    setYeuCau('');
    if (selectedProblemType===1) {
      setSolution1(null);
    }
    else {
      setSolution2(null);
    }
  };

  const handleStart2 = () => {
    setGiaThuyet('');
    setMucTieu('');
    if (selectedProblemType===1) {
      setSolution1(null);
    }
    else {
      setSolution2(null);
    }
  };
 
  const handleSearch = async (e) => {
    e.preventDefault();

    // Determine problem type (1 for đoạn, tia, đường; 2 for tam giác)
    const problemType = selectedProblemType === 1 ? 1 : 2;
    let request = {}; // Initialize the request object

    if (problemType === 1) {
      // For đoạn, tia, đường problem, send only giaThuyet
      request = { problemType, text: yeuCau };
    } else {
      // For tam giác problem, send giaThuyet and mucTieu
      request = { problemType, giaThuyet, mucTieu };
    }

    try {
      const response = await fetch('http://localhost:5000/api/solve', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      if (response.ok) {
        const data = await response.json();
        if (problemType === 1) {
        setSolution1(data.solution);
      }
        else {
          setSolution2(data.solution);
        }
      } else {
        alert('Không thể giải bài toán. Vui lòng kiểm tra dữ liệu đầu vào!');
      }
    } catch (error) {
      console.error('Lỗi khi gọi API:', error);
      alert('Đã xảy ra lỗi khi xử lý yêu cầu.');
    }
  };

  useEffect(() => {
    if (solution1 && solutionRef1.current) {
      solutionRef1.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [solution1]);

  useEffect(() => {
    if (solution2 && solutionRef2.current) {
      solutionRef2.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [solution2]);

  return (
    <div className='info'>
      {/* Header */}
      <div className='bar'>
        <img src='Logo_Gr.svg' alt='' />
        <p>Contact us</p>
        <p>About</p>
        <p>Help</p>
        <button onClick={() => setTeam((prev) => !prev)}>Nhóm 10</button>
        <MyVerticallyCenteredModal show={team} onHide={() => setTeam(false)} />
      </div>

      {/* Main Content */}
      <div className='main'>

        {/* Conditionally render content based on problem type */}

          <div className="logo">
            <img src='Logo_Gr.svg' alt='' />
            <div className="button-group">
              {/* Buttons to select the problem type */}
              <Button
                  className={`button-type ${selectedProblemType === 1 ? 'active' : ''}`}
                  onClick={() => setSelectedProblemType(1)}
              >
                  Giải bài toán đoạn, tia, đường
              </Button>
              <Button
                  className={`button-type ${selectedProblemType === 2 ? 'active' : ''}`}
                  onClick={() => setSelectedProblemType(2)}
              >
                  Giải bài toán trong tam giác
              </Button>
            </div>
          </div>


        {selectedProblemType ===1 && (
          <>
          <div className="logo">
            <img className='line' src='DuongThang.png' alt='Duong Thang' />
          </div>

          <div className="search">
            <Form onSubmit={handleSearch}>
              <textarea className='text-doan'
                value={yeuCau}
                ref={textareaRef}
                onChange={(e) =>  {setText(e.target.value); setYeuCau(e.target.value)}}
                placeholder="Nhập thông tin bài toán..."
              />
                <div className="center-button">
                  <Button className='restart' variant="primary" type="reset" onClick={handleStart1}>
                    Nhập lại
                  </Button>
                  <Button className='submit' variant="primary" type="submit">
                    Giải
                  </Button>
              </div>
            </Form>
            
          </div>
            {solution1 && (
            <div ref={solutionRef1} className="result">
                <ReactMarkdown>{solution1}</ReactMarkdown>
            </div>
            )}
          </>
        )}

        {selectedProblemType === 2 && (
          <>
          <div className="logo">
            <img className='rectangle' src='TamGiac.png' alt='Tam Giac' />
          </div>
          <div className="search">
          <Form onSubmit={handleSearch}>
            <Form.Group className="mb-2" controlId="formGiaThuyet">
              <Form.Label>Giả thuyết</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setGiaThuyet(e.target.value)}
                value={giaThuyet}
                placeholder="Nhập biến giả thuyết..."
              />
              <Form.Text className="text-muted">Ví dụ: A, B</Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formMucTieu">
              <Form.Label>Mục tiêu</Form.Label>
              <Form.Control
                type="text"
                value={mucTieu}
                onChange={(e) => setMucTieu(e.target.value)}
                placeholder="Nhập biến mục tiêu..."
              />
              <Form.Text className="text-muted">Ví dụ: C</Form.Text>
            </Form.Group>

            <div className="center-button">
              <Button className='restart' variant="primary" type="reset" onClick={handleStart2}>
                Nhập lại
              </Button>
              <Button className='submit' variant="primary" type="submit">
                Giải
              </Button>
            </div>

          </Form>


          </div>
                  {/* Solution Display */}

          {solution2 && (
            <div ref={solutionRef2} className="result">
              <pre>{formatBackendData(solution2)}</pre>
            </div>
          )}

        </> )}


      </div>
      </div>
  );
};

export default Info;
