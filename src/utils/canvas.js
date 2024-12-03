import { infixToPostfix } from "./infixToPostfix"
import { constructTree, drawTree, setCoordinates } from "./tree"


const SAMPLE_EXPRESSIONS = [
    '(a + b)*c - (x - y)/z',
    '(a * b) - c + z / x',
    'x - y + (c / (a + b))',
    '(a / y) + b - (c * x)',
    '(a - b) * (c + d) / z',
    '(a * b) - (x / y)'
]

export const clearCanvas = (c, canvas) => {
    c.clearRect(0, 0, canvas.width, canvas.height)
}

export const generateTree = (exp, canvasRef, canvasContainerRef, error) => {
    var c = canvasRef.getContext("2d");
    var expression = exp
    if (typeof expression !== 'undefined' && null != expression) {
        expression = expression.replace(/\s+/g, '')
        expression = expression.toLowerCase()
        var postfix = infixToPostfix(expression);
        if (null !== postfix) {
            try {
                var root = constructTree(postfix)
                setCoordinates(root)
                clearCanvas(c, canvasRef)
                canvasRef.height = canvasContainerRef.offsetHeight;
                canvasRef.width = canvasContainerRef.offsetWidth;
                drawTree(root, c)
                error(false)
            } catch (e) {
                error(true)
                // displayErrorMessage(e)
            }
        } else {
            // displayErrorMessage('Postfix')
            error(true)
        }

    } else {
        // displayErrorMessage('Exp')
        error(true)
    }
}

function displayErrorMessage(err) {
    console.log('Error', err)
    // Swal.fire({
    //     icon: 'error',
    //     title: 'Invalid expression',
    //     html: `
    //         <div style="font-size:1.1em;text-align: left;margin:0px 0px 0px 60px;">
    //             - You may only use these brackets ( ). <br/>
    //             - Use * for multiplication and / for division. <br/>
    //             - Valid operators and operands are:<br/>
    //             <div style="margin-left: 10px;">
    //                 <i>Operators</i>: <b>[+ - * / ]</b><br/>
    //                 <i>Operands</i>: Any alphabetic letter.
    //             </div>
    //         </div>
    //     `,
    //     footer: '<a href="https://github.com/lnogueir/expression-tree-gen">Learn more</a>'
    // })
}
