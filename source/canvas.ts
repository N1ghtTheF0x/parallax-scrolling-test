import { inputNumber } from "./html/input"
import { div, image, label, setElementId } from "./html/utilities"

class Canvas
{
    public readonly domElement = document.createElement("canvas")
    public readonly ctx: CanvasRenderingContext2D
    public get width(): number {return this.domElement.width}
    public get height(): number {return this.domElement.height}
    public set width(v: number) {this.domElement.width = v}
    public set height(v: number) {this.domElement.height = v}
    public constructor(width: number,height: number)
    {
        this.domElement.width = width,this.domElement.height = height
        const ctx = this.domElement.getContext("2d")
        if(ctx === null)
        {
            alert("This browser is outdated!")
            throw new Error("couldn't get 2D context")
        }
        ctx.imageSmoothingEnabled = false
        this.ctx = ctx
    }
}

namespace Canvas
{
    export function Options(canvas: Canvas): HTMLDivElement
    {
        return setElementId(
            div(
                label("canvas-width","Output Width",inputNumber.setValue(inputNumber(v => canvas.width = v),canvas.width)),
                label("canvas-height","Output Height",inputNumber.setValue(inputNumber(v => canvas.height = v),canvas.height))
            ),
            "canvas-options"
        )
    }
    export function toImage(source: CanvasImageSource): HTMLImageElement
    {
        const [width,height] = Canvas.getImageSourceSize(source)
        const canvas = new Canvas(width,height)
        canvas.ctx.drawImage(source,0,0)
        return image(canvas.domElement.toDataURL("image/png"))
    }
    export function getImageSourceSize(source: CanvasImageSource): [number,number]
    {
        if("width" in source && "height" in source)
        {
            if(typeof source.width == "number" && typeof source.height == "number")
                return [source.width,source.height]
            if(typeof source.width != "number" && typeof source.height != "number")
                return [source.width.baseVal.value,source.width.baseVal.value]
            return [NaN,NaN]
        }
        return [source.displayWidth,source.displayHeight]
    }
}

export default Canvas