interface DesignDeviceItem {
  deviceRange: boolean | ((curWidth: number) => boolean)
  UIWidth: number
}

interface FlexibleOptions {
  rootValue: number
  designDevice: Array<DesignDeviceItem>
}

const defaultOptions: FlexibleOptions = {
  rootValue: 16,
  designDevice: [
    {
      deviceRange: (curWidth) => curWidth <= 375,
      UIWidth: 375,
    },
    {
      deviceRange: (curWidth) => curWidth > 375 && curWidth <= 1080,
      UIWidth: 1280,
    },
    {
      deviceRange: (curWidth) => curWidth >= 1080,
      UIWidth: 1920,
    },
  ],
}

function flexible(options?: FlexibleOptions ) {
  options = { ...defaultOptions, ...options }

  const { rootValue, designDevice } = options

  const docEl = document.documentElement

  const dpr = window.devicePixelRatio || 1

  // adjust body font size
  function setBodyFontSize() {
    if (document.body) {
      document.body.style.fontSize = rootValue * dpr + 'px'
    } else {
      document.addEventListener('DOMContentLoaded', setBodyFontSize)
    }
  }
  setBodyFontSize()

  // set 1rem = viewWidth / 375
  function setRemUnit() {
    const width = docEl.clientWidth
    const uiWidth =
      designDevice.find((item) => (typeof item.deviceRange === 'function' ? item.deviceRange(width) : item.deviceRange))
        ?.UIWidth || 375

    const rem = (docEl.clientWidth / uiWidth) * rootValue
    docEl.style.fontSize = rem + 'px'
  }

  setRemUnit()

  // detect 0.5px supports
  if (dpr >= 2) {
    const fakeBody = document.createElement('body')
    const testElement = document.createElement('div')
    testElement.style.border = '.5px solid transparent'
    fakeBody.appendChild(testElement)
    docEl.appendChild(fakeBody)
    if (testElement.offsetHeight === 1) {
      docEl.classList.add('hairlines')
    }
    docEl.removeChild(fakeBody)
  }

  // reset rem unit on page resize
  window.addEventListener('resize', setRemUnit)
  window.addEventListener('pageshow', function (e) {
    if (e.persisted) {
      setRemUnit()
    }
  })
}

export default flexible

export { flexible }
