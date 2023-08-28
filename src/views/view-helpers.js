import { GET_ALL_THEME_EL } from '../helpers'
// General functions
/**
 * given the old theme and new theme numbers this function will iterate through an array consisting of all elements that contain theme classes and will change those classes to achieve the desired outcome
 * @param {number} newTheme a number starting from 1 representing the new theme
 * @param {number} oldTheme a number starting from 1 representing the old theme
 */
export function changeTheme(newTheme, oldTheme) {
  const themeElements = GET_ALL_THEME_EL().forEach((el) => {
    const newClassList = Array.from(el.classList).map((className) => {
      if (!className.includes(`theme-${oldTheme}`)) return className
      return className.replace(oldTheme, newTheme)
    })
    el.classList = newClassList.join(' ')
    console.log(el.classList)
  })
}
export function listenToOnload() {
  window.addEventListener('load')
}
