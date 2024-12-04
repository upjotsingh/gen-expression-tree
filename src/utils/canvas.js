import { infixToPostfix } from "./infixToPostfix"
import { constructTree, drawTree, setCoordinates } from "./tree"

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
            }
        } else {
            error(true)
        }

    } else {
        error(true)
    }
}
