import type App from "./app"
import Canvas from "./canvas"
import { inputBoolean, inputFiles, inputNumber } from "./html/input"
import { addElementClassName, div, label, setElementId } from "./html/utilities"
import Mouse from "./mouse"

class Background
{
    private _x = 0
    private _y = 0
    public targetWidth = 0
    public targetHeight = 0
    public centerX = 0
    public centerY = 0
    public offsetX = 0
    public offsetY = 0
    public addX = 0
    public addY = 0
    public mouseX = 0
    public mouseY = 0
    public tile = false
    public get width(): number {return this.getSize()[0]}
    public get height(): number {return this.getSize()[1]}
    public get x(): number
    {
        return (this._x + this.offsetX + (Mouse.getData("xFactor") * this.mouseX)) - this.centerX
    }
    public get y(): number
    {
        return (this._y + this.offsetY + (Mouse.getData("yFactor") * this.mouseY)) - this.centerY
    }
    public static async load(image: ImageBitmapSource): Promise<Background>
    {
        return new this(await createImageBitmap(image))
    }
    public constructor(public image: CanvasImageSource)
    {
        this.targetWidth = this.width
        this.targetHeight = this.height
        this.centerX = this._x = this.width/2
        this.centerY = this._y = this.height/2
    }
    public getSize(): [number,number]
    {
        return Canvas.getImageSourceSize(this.image)
    }
    public update(app: App): void
    {
        this._x += this.addX * app.deltaTime
        if(this._x < -this.width)
            this._x = app.canvas.width + this.width
        if(this._x > app.canvas.width + this.width)
            this._x = -this.width

        this._y += this.addY * app.deltaTime
        if(this._y < -this.height)
            this._y = app.canvas.height + this.height
        if(this._y > app.canvas.height + this.height)
            this._y = -this.height
    }
    public render(app: App): void
    {
        const canvas = app.canvas
        const ctx = canvas.ctx
        const x = this.x % canvas.width
        const y = this.y % canvas.height
        ctx.drawImage(this.image,x,y,this.targetWidth,this.targetHeight)
    }
}

namespace Background
{
    export const BACKGROUNDS_ID = "backgrounds"
    export const BACKGROUND_EDITORS_ID = "background-editors"
    export const BACKGROUND_EDITOR_CLASSNAME = "background-editor"
    export const BACKGROUND_IMAGE_CLASSNAME = "background-image"
    let backgrounds: Array<Background> = []
    export function getBackgrounds(): Array<Background>
    {
        return backgrounds
    }
    export function Holder(): HTMLDivElement
    {
        const editors = setElementId(div(),BACKGROUND_EDITORS_ID)
        async function __setup_editors__(list: FileList): Promise<void>
        {
            editors.innerHTML = ""
            backgrounds = []
            for(const file of list)
            {
                const bg = await Background.load(file)
                backgrounds.push(bg)
                editors.append(Editor(bg))
            }
        }
        return setElementId(
            div(
                inputFiles("image/*",__setup_editors__),
                editors
            ),
            BACKGROUNDS_ID
        )
    }
    export function Editor(bg: Background): HTMLDivElement
    {
        return addElementClassName(div(
            addElementClassName(Canvas.toImage(bg.image),BACKGROUND_IMAGE_CLASSNAME),
            label("background-width","Width",inputNumber.setValue(inputNumber(v => bg.targetWidth = v),bg.targetWidth)),
            label("background-height","Height",inputNumber.setValue(inputNumber(v => bg.targetHeight = v),bg.targetHeight)),
            label("background-offset-x","X Offset",inputNumber.setValue(inputNumber(v => bg.offsetX = v),bg.offsetX)),
            label("background-offset-y","Y Offset",inputNumber.setValue(inputNumber(v => bg.offsetY = v),bg.offsetY)),
            //label("background-add-x","X Add",inputNumber.setValue(inputNumber(v => bg.addX = v),bg.addX)),
            //label("background-add-Y","Y Add",inputNumber.setValue(inputNumber(v => bg.addY = -v),-bg.addY)),
            label("background-mouse-x","X Mouse Modifier",inputNumber.setValue(inputNumber(v => bg.mouseX = v),bg.mouseX)),
            label("background-mouse-y","Y Mouse Modifier",inputNumber.setValue(inputNumber(v => bg.mouseY = v),bg.mouseY)),
            //label("background-tile","Tile?",inputBoolean.setValue(inputBoolean(v => bg.tile = v),bg.tile))
        ),BACKGROUND_EDITOR_CLASSNAME)
    }
}

export default Background