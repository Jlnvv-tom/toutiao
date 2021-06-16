/**
 * 本地存储封装模块
 */
export const getItem = name => {
  const data = window.localStorage.getItem(name)
  // 把JSON.parse放到try-catch 中?
  // 因为data 可能不是JSON格式字符串
  try {
  //   尝试把data转为JavaScript对象
    return JSON.parse(data)
  } catch (err) {
    // data 不是JSON格式字符串，直接原样返回
    return data
  }
}

export const setItem = (name, value) => {
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(name, value)
}

export const removeItem = name => {
  window.localStorage.removeItem(name)
}
