export function image(src: string): HTMLImageElement
{
    const img = new Image
    img.src = src
    return img
}

let labelIndex = 0n

export function label(name: string,content: string,input: HTMLInputElement): HTMLDivElement
{
    const label = document.createElement("label")
    label.htmlFor = input.name = input.id = `${name}-${labelIndex++}`
    label.textContent = content
    return div(label,input)
}

export type HTMLElementAppendParameters = Parameters<Element["append"]>

export function div(...nodes: HTMLElementAppendParameters): HTMLDivElement
{
    const div = document.createElement("div")
    div.append(...nodes)
    return div
}

export function addElementClassName<T extends HTMLElement>(elm: T,...classNames: Array<string>): T
{
    elm.classList.add(...classNames)
    return elm
}

export function setElementId<T extends HTMLElement>(elm: T,id: string): T
{
    elm.id = id
    return elm
}

export function element<T extends keyof HTMLElementTagNameMap>(type: T,...nodes: HTMLElementAppendParameters): HTMLElementTagNameMap[T]
{
    const elm = document.createElement(type)
    elm.append(...nodes)
    return elm
}