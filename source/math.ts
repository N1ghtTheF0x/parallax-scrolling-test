export function clamp<T extends number | bigint>(val: T,min: T,max: T): T
{
    if(val < min)
        return min
    if(val > max)
        return max
    return val
}