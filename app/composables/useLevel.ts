
export const useLevel = () => { 
    const levelVal:Ref<number> = useState('levelVal', () => 33);
    return {levelVal}
}
