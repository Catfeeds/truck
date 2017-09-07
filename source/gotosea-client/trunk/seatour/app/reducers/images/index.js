import { actionTypes } from 'actions/images'

export default function( state = [], action ){
	switch( action.type ){
		case actionTypes.LOAD_IMAGE:
			return Array.isArray( action.data ) ? action.data : []
		case actionTypes.REMOVE_IMAGE_BY_INDEX:
			let newState = state.slice()
			newState.splice( action.data, 1 )
			return newState
		default:
			return state
	}
}