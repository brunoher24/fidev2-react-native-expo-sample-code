export const createRandomId = (
    {charsNbr = 20, hasMin = true, hasMaj=true, hasNum=true, specialChars = [], firstChar = ''}
    : {
        charsNbr: number, 
        hasMin?: boolean, 
        hasMaj?: boolean, 
        hasNum?: boolean, 
        specialChars?: string[], 
        firstChar?: string
    }) => {
    let result = firstChar;
    const characters = '';
    const charactersMin = 'abcdefghijklmnopqrstuvwxyz';
    const charactersMaj = charactersMin.toUpperCase();
    const numbers = '0123456789';
    const special = specialChars.join('');
    let charactersList = characters;
    if (hasMin) charactersList += charactersMin;
    if (hasMaj) charactersList += charactersMaj;
    if (hasNum) charactersList += numbers;
    if (special) charactersList += special;
    const charactersLength = charactersList.length;
    for (let i = 0; i < charsNbr; i++) {
        result += charactersList.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}