import React, { useRef, useState } from "react";
import "./expressionTree.css";
import { clearCanvas, generateTree } from "../utils/canvas";
import SweetAlert2 from "react-sweetalert2";

const ExpressionTree = () => {
  const [isClicked, setClicked] = useState(false);
  const [data, setData] = useState("");
  const [swalProps, setSwalProps] = useState({});
  const canvasRef = useRef(null);
  const canvasContainerRef = useRef(null);
  const scrollTo = useRef(null);
  const scrollBack = useRef(null);

  const displayError = (msg) => {
    let swalProp = {
      show: true,
      icon: "error",
      title: "Invalid expression",
      html: `
          <div style="font-size:1.0em;text-align: left;margin:0px 0px 0px 60px;">
          ${
            msg
              ? msg
              : ` - You may only use these brackets ( ). <br/>
              - Use * for multiplication and / for division. <br/>
              - Valid operators and operands are:<br/>
              <div style="margin-left: 10px;">
                  <i>Operators</i>: <b>[+ - * / ]</b><br/>
                  <i>Operands</i>: Any alphabetic letter.
              </div>`
          }
             
          </div>
      `,
      footer:
        '<a href="https://github.com/lnogueir/expression-tree-gen">Learn more</a>',
      didClose: () => {
        setSwalProps({});
      },
    };
    setSwalProps(swalProp);
  };

  const handleGenerate = () => {
    if (data) {
      generateTree(
        data,
        canvasRef.current,
        canvasContainerRef.current,
        (err) => {
          if (err) {
            displayError();
          } else {
            scrollTo.current.scrollIntoView({ behavior: "smooth" });
            setClicked(true);
          }
        }
      );
    } else {
      displayError("Please write any expression.");
    }
  };

  const handleClear = () => {
    scrollBack.current.scrollIntoView({ behavior: "smooth" });
    setData("");
    setClicked(false);
    clearCanvas(canvasRef.current.getContext("2d"), canvasRef.current);
  };

  return (
    <>
      <div
        ref={scrollBack}
        className="contact-section"
        style={{ height: isClicked ? "37vh" : "100vh" }}
      >
        <div ref={scrollTo} className="inner-width">
          <h1>Expression Tree Generator</h1>
          <div className="inner-input-container" style={{ textAlign: "left" }}>
            <span>Write Expression:</span>
            <input
              type="text"
              className="name"
              id="expression-input"
              value={data}
              onChange={(e) => {
                setData(e.target.value);
              }}
              placeholder="ex. (a / b)*(x + y) "
            />
          </div>

          <div className="buttons">
            <button id="generate-tree" onClick={handleGenerate}>
              Generate
            </button>
            <button id="clear-tree" onClick={handleClear}>
              Clear
            </button>
          </div>
        </div>
      </div>
      <div ref={canvasContainerRef} id="canvas-container">
        <canvas ref={canvasRef}></canvas>
      </div>

      <SweetAlert2 {...swalProps} />
    </>
  );
};

export default ExpressionTree;
