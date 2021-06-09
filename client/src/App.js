import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Input, Alert } from "reactstrap";

function App() {
  const [ques, setQues] = useState([]);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const refresh = async () => {
      const { data } = await axios.get("http://localhost:8000/get");
      console.log(data);
      if (data.success) {
        setQues(data.data);
      }
    };
    refresh();
  }, []);

  const submitHandler = async (e, id) => {
    e.preventDefault();

    const inputValue = document.getElementById(`${id}`).value;
    console.log(inputValue);

    const body = {
      id,
      answer: inputValue.toLowerCase(),
    };

    const { data } = await axios.post("http://localhost:8000/check", body);
    console.log(data);
    if (data.success) {
      const question = ques.find((i) => i._id === id);
      question.correct = true;
      question.submitted = true;
      let newQues = ques.map((i) => (i._id === id ? question : i));
      setQues(newQues);
      setCounter(counter + 1);
    } else {
      const question = ques.find((i) => i._id === id);
      question.submitted = true;
      let newQues = ques.map((i) => (i._id === id ? question : i));
      setQues(newQues);
      setCounter(counter + 1);
    }

    // console.log("counter", counter);
  };

  return (
    <div
      className="accordion accordion-flush container m-5"
      id="accordionExample"
      style={{ backgroundColor: "aliceblue", padding: 36 }}
    >
      {ques.map((element, index) => (
        <div className="accordion-item" key={element._id}>
          <h2 className="accordion-header" id={`heading-${element._id}`}>
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={`#collapse-${element._id}`}
              aria-expanded="true"
              aria-controls={`collapse-${element._id}`}
            >
              Question #{index + 1}
            </button>
          </h2>
          <div
            id={`collapse-${element._id}`}
            className={`accordion-collapse collapse ${
              index === 0 ? "show" : ""
            }`}
            aria-labelledby={`heading-${element._id}`}
          >
            <div className="accordion-body">
              <form onSubmit={(e) => submitHandler(e, element._id)}>
                <h4 className="m-3">{element.question}</h4>
                <div className="m-3 w-50">
                  <Input
                    className="mb-2"
                    id={element._id}
                    type="text"
                    placeholder="Answer.."
                  />
                  <Button
                    color="success"
                    type="submit"
                    disabled={element.submitted}
                  >
                    submit
                  </Button>
                </div>
                {element.submitted ? (
                  element.correct ? (
                    <>
                      <div>
                        <Alert color="success">Your amswer is correct</Alert>
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <Alert color="danger">Your answer is incorrect</Alert>
                      </div>
                    </>
                  )
                ) : (
                  ""
                )}
              </form>
            </div>
          </div>
        </div>
      ))}
      {console.log("c", counter)}
      {counter === ques.length ? (
        <>
          <Alert className="mt-5" color="warning">
            COMPLETED!
          </Alert>
        </>
      ) : (
        ""
      )}
    </div>
  );
}

export default App;
