import { div } from "./html/utilities"

namespace Mouse
{
    let data: IData = {x: 0,y: 0,xFactor: 0,yFactor: 0}
    const cbs = {
        move: [] as Array<MoveCallback>
    }
    export interface IData
    {
        x: number
        y: number
        xFactor: number
        yFactor: number
    }
    export type MoveCallback = (data: IData) => any
    export function getData(): IData
    export function getData(key: keyof IData): number
    export function getData(key?: keyof IData): IData | number
    {
        if(key !== undefined)
            return data[key]
        return data
    }
    export function init(): void
    {
        window.addEventListener("mousemove",ev =>
        {
            data.x = ev.x
            data.y = ev.y
            data.xFactor = ((data.x / innerWidth) * 2) - 1
            data.yFactor = ((data.y / innerHeight) * 2) - 1
            cbs.move.forEach(cb => cb(data))
        })
    }
    export function onMove(cb: MoveCallback): void
    {
        cbs.move.push(cb)
    }
    export function Display(): HTMLDivElement
    {
        const pos = document.createElement("p")
        const factor = document.createElement("p")
        onMove(data =>
        {
            pos.textContent = `Mouse Position = (${data.x},${data.y})`
            factor.textContent = `Mouse DIP = (${data.xFactor.toPrecision(2)},${data.yFactor.toPrecision(2)})`
        })
        return div(
            pos,
            factor
        )
    }
}

export default Mouse