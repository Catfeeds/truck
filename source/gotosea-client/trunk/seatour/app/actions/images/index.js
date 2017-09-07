export const actionTypes = {
	REMOVE_IMAGE_BY_INDEX : '/app/actions/images/remove_by_index',
	LOAD_IMAGE : '/app/actions/images/concat',
}

export function removeImageByIndex( index ){
	return {
		data : index,
		type : actionTypes.REMOVE_IMAGE_BY_INDEX,
	}
}

export function loadImage( images = [] ){
	return {
		data : images,
		type : actionTypes.LOAD_IMAGE,
	}
}