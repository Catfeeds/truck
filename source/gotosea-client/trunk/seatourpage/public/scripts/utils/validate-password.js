//强：字母+数字+特殊字符 
var goodRegx = /^(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&*]+$)(?![a-zA-z\d]+$)(?![a-zA-z!@#$%^&*]+$)(?![\d!@#$%^&*]+$)[a-zA-Z\d!@#$%^&*]+$/,
	//中：字母+数字，字母+特殊字符，数字+特殊字符
	normalRegx = /^(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&*]+$)[a-zA-Z\d!@#$%^&*]+$/,
	//弱：纯数字，纯字母，纯特殊字符
	badRegx = /^(?:\d+|[a-zA-Z]+|[!@#$%^&*]+)$/,
	GOOD_PASSWORD_STATE = 1,
	NORMAL_PASSWORD_STATE = 2,
	BADREGX_PASSWORD_STATE = 3,
	ERROR_PASSWORD_STATE = 0;

function checkPassword( password ){
	if( goodRegx.test( password ) )
		return GOOD_PASSWORD_STATE;
	else if( normalRegx.test( password ) )
		return NORMAL_PASSWORD_STATE;
	else if( badRegx.test( password ) )
		return BADREGX_PASSWORD_STATE;
	else
		return ERROR_PASSWORD_STATE;
}

export default checkPassword;