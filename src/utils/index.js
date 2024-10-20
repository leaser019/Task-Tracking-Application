export function getInitials(fullName) {
 const names = fullName.split(' ')
 const initials = names.slice(0, 2).map(name => name[0].toUpperCase())
 const init = initials.join(' ')
 return init
}