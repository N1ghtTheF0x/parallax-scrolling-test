import Background from "./background"
import Canvas from "./canvas"
import { element } from "./html/utilities"
import Mouse from "./mouse"

class App
{
    public static readonly domElement = document.getElementById("app") as HTMLDivElement
    public readonly canvas = new Canvas(App.WIDTH,App.HEIGHT)
    private _curTime = 0
    private _lastTime = 0
    public get delta(): number
    {
        return this._curTime - this._lastTime
    }
    public get deltaTime(): number
    {
        return this.delta/App.TIME_FACTOR
    }
    public constructor()
    {
        App.domElement.append(
            element("h1","Parallax Scrolling Test"),
            element("p","this is a website for testing parallex scrolling"),
            this.canvas.domElement,
            Canvas.Options(this.canvas),
            Mouse.Display(),
            Background.Holder()
        )
    }
    private _input(): void
    {

    }
    private _update(): void
    {
        Background.getBackgrounds().forEach(bg => bg.update(this))
    }
    private _draw(): void
    {
        this.canvas.ctx.clearRect(0,0,this.canvas.width,this.canvas.height)
        Background.getBackgrounds().forEach(bg => bg.render(this))
    }
    private _loop(time: number): void
    {
        this._lastTime = this._curTime
        this._curTime = time
        this._input()
        this._update()
        this._draw()
        requestAnimationFrame(this._loop.bind(this))
    }
    public start(): void
    {
        requestAnimationFrame(this._loop.bind(this))
    }
}

namespace App
{
    export const TIME_FACTOR = 1000
    export const WIDTH = 1920, HEIGHT = 1080
}

export default App