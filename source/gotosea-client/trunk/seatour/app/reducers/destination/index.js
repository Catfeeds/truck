import { actionTypes } from 'actions/destination'

export default function( state = [], action ){

	switch( action.type ){
		case actionTypes.LOAD:
			return action.data
		default:
			return state
	}
}