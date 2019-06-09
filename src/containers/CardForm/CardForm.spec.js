import React from 'react'
import { shallow } from 'enzyme'
import { CardForm } from './CardForm.js'


const sum = (a,b) => {
  return a + b
}

describe('CardForm container', () => {
  /*const props = { // описываем props
    news: {
      data: [],
      isLoading: false,
      errorMsg: null,
    },
    // функция получения новостей onGetNews. Ее содержимое тестировать не нужно.
    // Но нам потребуется протестировать, что функция была вызвана в componentDidMount
    onGetNews: () => {},*/

    it('first test', () => {
      expect(sum(1,2)).toEqual(3)
    })

  })

  
  
 