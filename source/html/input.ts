export function inputNumber(cb: (value: number) => any): HTMLInputElement
{
    const input = document.createElement("input")
    input.type = "number"
    input.addEventListener("change",() => cb(input.valueAsNumber))
    return input
}

export namespace inputNumber
{
    export function setValue(input: HTMLInputElement,value: number): HTMLInputElement
    {
        input.valueAsNumber = value
        return input
    }
}

export function inputBoolean(cb: (value: boolean) => any): HTMLInputElement
{
    const input = document.createElement("input")
    input.type = "checkbox"
    input.addEventListener("change",() => cb(input.checked))
    return input
}

export namespace inputBoolean
{
    export function setValue(input: HTMLInputElement,value: boolean): HTMLInputElement
    {
        input.checked = value
        return input
    }
}

export function inputFile(accept: string,cb: (files: FileList) => any): HTMLInputElement
{
    const input = document.createElement("input")
    input.type = "file"
    input.accept = accept
    input.addEventListener("change",() => {if(input.files !== null) cb(input.files)})
    return input
}

export function inputFiles(accept: string,cb: (files: FileList) => any): HTMLInputElement
{
    const input = inputFile(accept,cb)
    input.multiple = true
    return input
}