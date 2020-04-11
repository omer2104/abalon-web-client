export const AppRoutes = {
    startPage: '/',
    abalonGamePage: '/game',
    abalonGamePageWithAI: '/game-ai'
}


/**
 * 
 * @param {Object} obj 
 * @param {Object} prototype 
 * @returns {Object}
 */
export const objectShallowClone = (obj, prototype = Object.prototype) => {
    const copyObj = Object.create(prototype)
    Object.assign(copyObj, obj)

    return copyObj
}