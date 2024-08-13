const validateEmail=(email)=>{
    const pattern=/^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return pattern.test(email)
}
const passwordValidate=(password)=>{
    if(password.lenght>=8)
    {
        const pattern=/^[A-Z]/
        return pattern.test(password)
    }

}
export default validateEmail; 
