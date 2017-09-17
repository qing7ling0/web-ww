export const ReduxBegan = ({dispatch, getState}) => next => action => {
  if (action && action.state !== States.Padding) {
    dispatch({type:action.type, state:States.Padding})
  }
  next(action);
}

export const ReduxEnd = ({dispatch, getState}) => next => action => {
  if (action && action.state !== States.Padding) {
    action.state = States.Fulfilled
  }
  next(action);
}

export const States ={
  Padding: 1, // 进行中
  Fulfilled: 2 // 已完成
}