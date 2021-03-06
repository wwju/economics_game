import { assign } from 'lodash'

let id = 1

export const getById = (state: State, name: string, id: number) => {
  return state[name][id]
}

export const getStockById = (state: State, stockId: number): Stock => {
  return getById(state, 'stocks', stockId)
}

export const getCamera = (state: State): THREE.Camera => {
  return state.threeObjects.camera
}

export const getRenderer = (state: State): THREE.Renderer => {
  return state.threeObjects.renderer
}

export const getScene = (state: State): THREE.Scene => {
  return state.threeObjects.scene
}

export const getResourceById = (state: State, resourceId: number): Resource => {
  return getById(state, 'resources', resourceId)
}

export const create = (state: State, name: string, initialState: any): number => {
  state[name][++id] = assign({}, initialState)
  return id
}

export const createThreeObj = (state: State, name: string, obj: any): any => {
  state.threeObjects[name] = obj
  return obj
}
