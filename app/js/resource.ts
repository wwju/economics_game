/// <reference path="../../typings/index.d.ts" />
/// <reference path="./stock.d.ts" />
/// <reference path="./initial_state.d.ts" />
/// <reference path="./planet.d.ts" />
/// <reference path="./resource.d.ts" />

import { create, getResourceById, getStockById } from './db'
import { clone } from 'lodash'

export const ResourceTypes = ['food', 'machines', 'energy']

const initialState: Resource = {
  amount: 10,
  buyPrice: 1,
  sellPrice: 2
}

export const update = (state: State, resourceId: number, amount: number) => {
  let resource: Resource = getResourceById(state, resourceId)
  let newAmount = resource.amount + amount
  if (newAmount < 0) newAmount = 0
  resource.amount = newAmount
  resource.buyPrice = getBuyPrice(newAmount)
  resource.sellPrice = getSellPrice(newAmount)
}

const getBuyPrice = (amount: number) => {
  if (!amount) amount = 1
  return Math.round(100 / amount)
}

const getSellPrice = (amount: number) => {
  if (!amount) amount = 1
  return Math.round(120 / amount)
}

export const transaction = (state: State, leftResourceId: number, rightResourceId: number, amount: number): boolean => {
  let leftResource: Resource = getResourceById(state, leftResourceId)
  let rightResource: Resource = getResourceById(state, rightResourceId)
  let newLeftAmount = leftResource.amount + amount
  let newRightAmount = rightResource.amount - amount
  if ((newLeftAmount >= 0) && (newRightAmount >= 0)) {
    update(state, leftResourceId, amount)
    update(state, rightResourceId, -amount)
    return true
  } else {
    return false
  }
}

export const getResource = (state, stockId: number, resourceName: string): Resource => {
  let stock: Stock = getStockById(state, stockId)
  return getResourceById(state, stock[`${resourceName}ResourceId`])
}

export default (state: State): number => {
  let resource: Resource = clone(initialState)
  resource.buyPrice = getBuyPrice(resource.amount)
  resource.sellPrice = getSellPrice(resource.amount)
  return create(state, 'resources', resource)
}
