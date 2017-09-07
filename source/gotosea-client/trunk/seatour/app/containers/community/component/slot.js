import React from 'react'
import {View} from 'react-native'
import _styles from 'components/commonStyles'

export default ( props ) => (<View { ...props } style = { [ _styles.contentBgColor, { height:10 }, props.style ] }></View>)