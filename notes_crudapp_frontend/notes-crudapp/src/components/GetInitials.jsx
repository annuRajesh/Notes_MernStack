const GetInitials=(name)=>{
const initials=name.split(' ').map(words=>words[0].toUpperCase()).join('')
return initials
}
export default GetInitials