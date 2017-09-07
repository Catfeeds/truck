import React, { Component } from 'react';
import {
    Text,
    TextInput,
    View,
    StyleSheet,
    Image,
    Alert,
    BackAndroid,
    ToastAndroid,
    Platform,
    PixelRatio,
    TouchableOpacity,
    ViewPropTypes,
} from 'react-native';
import _styles from 'components/commonStyles'
import Slot from './component/slot'
import ListSection from './component/ListSection'
import ListComment from './component/ListComment'
import Tabs from 'react-native-tabs'
import {Actions, Scene, Router, ActionConst} from 'react-native-router-flux'
import ImagePicker1 from 'react-native-image-picker'
import ImagePicker2 from 'react-native-image-crop-picker'
import { connect } from 'react-redux'
import { loadImage } from 'actions/images'
import PropTypes from 'prop-types'
import Tool from 'utils/tool'
import Loading from 'components/common/loading'
import { Geolocation } from 'react-native-baidu-map'

const selectedImage = [
    {
        init : require("../../images/community/btn_Ok_grey_n.png"),
        selected : require("../../images/community/btn_Ok_blue_s.png")
    },
    {
        init : require("../../images/community/btn_xuanze_n.png"),
        selected : require("../../images/community/btn_xuanze_s.png")
    },
]
const publicOptions = [
    {
        text: "海钓",
        value : 1,
    },
    {
        text: "海岛游",
        value: 2,
    }]

class DynamicPublish extends React.Component {
    constructor(props) {
        super(props);
        this.maxWritableNumber = 140
        this.submitable = false
        this.state = {
            tabIndex : 0,
            address : "",
            publicOption : 0,
            content : "",
            writableNumber : this.maxWritableNumber,
            uploadLoading : false,
        };
    }
    handleOnRight = ()=>{
        this.updateImages()
    }
    Title( props ){
        let {
            disabled
        } = props,
        style = {};
        if( disabled ) style = { opacity: 0.3 }
        return <Text style = { style }>发布</Text>
    }
    componentDidMount(){
    	Actions.refresh({
    		hideNavBar : false,
			onRight : function(){},
            rightTitle : <this.Title disabled = { true }/>,
            leftButtonImage : require('../../images/btn_back.png'),
            onLeft : () => Actions.pop(),
    	})
    }
    handleAddressSelected(){
        if( this.state.address )
            this.setState({ address : "" })
        else
            this.loadCurrentAddress()
    }
    handlePublicOptionSelected( index ){
        this.setState({ publicOption : index })
    }
    handleSelectPhotoes( images ){
        this.props.dispatch( loadImage( images ) )
    }
    /**
     * 更新右上角的发布按钮状态
     */
    componentDidUpdate(){
        let {
            images,
        } = this.props,
        {
            content,
        } = this.state,
        noEmpty = /\S+/.test( content ) || images.length !== 0;

        //内容不为空 并且 当前按钮不能点击的情况下才进行更新（添加可点击操作）
        if( noEmpty && !this.submitable ){
            this.submitable = true
            Actions.refresh({
                rightTitle : <this.Title/>,
                onRight : this.handleOnRight,
            })
        //内容为空。并且 当前按钮可以点击的情况下才进行更新（撤销可点击操作）
        }else if( !noEmpty && this.submitable ){
            this.submitable = false
            Actions.refresh({
                rightTitle : <this.Title disabled = { true }/>,
                onRight : function(){},
            })
        }
    }
    /**
     * 获取用户当前位置
     * 使用原生Geolocation对象获取经纬度
     * 使用react-native-baidu-map库逆地理编码获取具体位置名称
     */
    loadCurrentAddress(){
        navigator.geolocation.getCurrentPosition( data => {
            let {
                    latitude,
                    longitude,
                } = data.coords;
            Geolocation.reverseGeoCode( latitude, longitude ).then( info => {
                let {
                    province,
                    city,
                    district,
                    streetName,
                    address,
                } = info;
                this.setState({ address : `${province}${city}${district}${streetName}${address}`})
            })
        })
    }
    handleChange( text ){
        this.setState({ content : text, writableNumber : parseInt( this.maxWritableNumber - text.length )  })
    }
    updateImages(){
        let {
            images,
        } = this.props,
        params = {},
        promise;

        if( images.length > 0 ){
            // images.forEach( ( v, k ) => {
            //     params[`image_${ k }`] = { uri : v.path, type : v.mime, filename: v.filename }
            // })
            let body = new FormData();
            images.forEach( v => body.append("file", { uri : v.path, type : v.mime, name: v.filename }))
            this.setState({ uploadLoading : true })
            promise = Tool.post(`${ config.ajaxPath }/rest/post/upload`, body )
        }else{
            promise = Promise.resolve([])
        }
        promise.catch( e => this.setState({ uploadLoading : false }))
        .then( images => {
            this.setState({ uploadLoading : false })
            return this.handleSubmit( Array.isArray( images ) || [] )
        })
    }
    handleSubmit( images ){
        let {
            content,
            address,
            publicOption,
        } = this.state;
        console.info( {
            content,
            postLocation : address,
            businessUnitId : publicOptions[ publicOption ].value,
            attachmentDtos : images,
        })

        return Tool.post(`${ config.ajaxPath }/rest/post`,{
            content,
            postLocation : address,
            businessUnitId : publicOptions[ publicOption ].value,
            attachmentDtos : images,
        }, 3)
        .then( () => this.setState({ uploadLoading : false } ) )
        .catch( () => this.setState( { uploadLoading : false } ) )
        .then( () => Actions.activityPublishSucc() )
    }
    render() {
			let {
                address,
                publicOption,
                content,
                writableNumber,
                uploadLoading,
            } = this.state,
            _address;

        if( address ){
            _address = (
                <View style = { styles.addrDetail }>
                    <Text style = { styles.addrName }>{ address }</Text>
                    <TouchableOpacity onPress = { () => this.loadCurrentAddress() }>
                        <Image style = {{ marginRight : 5 }} source = { require("../../images/community/btn_REPEAT-1.png") }/>
                    </TouchableOpacity>
                </View>
            )
        }

        return (
        	<View style = { styles.container }>
                <View style = { styles.inputWrap }>
                    <TextInput onChangeText = { text => this.handleChange( text ) } value = { content } textAlignVertical = "top" underlineColorAndroid="transparent" placeholderTextColor = { _styles.descTextColor.color } multiline maxLength = { 140 } style = { styles.input } placeholder = "说一下此刻心情"></TextInput>
                    {/* _photoes */}
                    <ImagePreview takePicture = { true } maxLength = { 9 } rowNumber = { 4 } imageOnPress = { index => Actions.gallery({ galleryIndex : index, deletable : true }) } onChange = { images => this.handleSelectPhotoes( images ) } photoes = { this.props.images }/>
                    <View style = {{ justifyContent:"flex-start", alignItems:"flex-end", paddingRight: 15 }}>
                        <Text style = { Object.assign({},_styles.descTextColor,_styles.fontSize)}>还剩{ writableNumber }个字符</Text>
                    </View>
                </View>
                <TouchableOpacity onPress = { () => this.handleAddressSelected() } style = { styles.currentAddress }>
                    <Image source = { address ? selectedImage[0].selected : selectedImage[0].init }/>
                    <Text style = { styles.address }>当前位置</Text>
                </TouchableOpacity>
                { _address }
                <View style = { styles.publicText }>
                    <Text style = {[ _styles.fontSize, _styles.textColor ]}>发布至</Text>
                    {
                        publicOptions.map( ( v, k ) => {
                            return (
                                <TouchableOpacity onPress = { () => this.handlePublicOptionSelected( k )} key = { `po_${k}` } style = { styles.publicOption }>
                                    <Image source = { publicOption === k ? selectedImage[1].selected : selectedImage[1].init }/>
                                    <Text style = {[ { marginLeft: 5 }, _styles.fontSize, _styles.textColor ]}>{ v.text }</Text>
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>
                { uploadLoading && <Loading visible/> }
        	</View>
        )
    }
}

export class ImagePreview extends React.Component{
    constructor(props){
        super( props )
    }
    static propTypes = {
        maxLength : PropTypes.number,
        rowNumber : PropTypes.number,
        takePicture : PropTypes.bool,
        imageStyle : Image.propTypes.style,
        style : ViewPropTypes.style,
        imageOnPress : PropTypes.func
    }
    static defaultProps = {
        maxLength : 9,
        rowNumber : 4,
        imageOnPress : function(){}
    }
    catchPicture() {
        let {
                photoes,
                onChange,
                maxLength,
            } = this.props,
            photoLen = photoes.length,
            options = {
                title: '选择要上传的照片',
                allowsEditing : true,
                takePhotoButtonTitle : null,
                chooseFromLibraryButtonTitle : null,
                cancelButtonTitle : "取消",
                customButtons: [
                    { name: 'takePhoto', title: '拍照' },
                    { name: 'choosePhoto', title: '从手机相册选择' },
                ],
                storageOptions: {
                    skipBackup: true,
                    path: 'images'
                }
            };

        ImagePicker1.showImagePicker(options, (response) => {
            let promise
            // console.log('Response = ', response);
            switch( response.customButton ){
                case "takePhoto":
                    promise = ImagePicker2.openCamera({
                        compressImageQuality : 0.5,
                    })
                    break;
                case "choosePhoto":
                    promise = ImagePicker2.openPicker({
                        multiple : true,
                        maxFiles : maxLength - photoLen,
                    })
                    break;
            }
            promise && promise.then( images => typeof onChange === "function" && onChange( images )).catch( error => console.info( error ))
        })
    }
    render(){
        let {
                photoes,
                imageOnPress,
                rowNumber,
                maxLength,
                takePicture,
                imageStyle,
                style,
            } = this.props,
            _photoes = [],
            cursor = 0,
            len = photoes.length;
        while( cursor < len && maxLength > cursor ){
            _photoes.push( photoes.slice(cursor,( cursor += rowNumber )))
        }
        if( _photoes.length === 0 && takePicture ){
            _photoes.push([undefined])
        }else if( photoes.length < maxLength && takePicture ){
            _photoes[ _photoes.length - 1 ].push(undefined)
        }
        return <View>
            {
                _photoes.map( ( v1, k1 ) => {
                    return (
                        <View key = { `imageWrap_${ k1 }` } style = { [ styles.imageWrap, style ] }>
                            {
                                v1.map( ( v2, k2 ) => {
                                    if( !v2 ){
                                        return (
                                            <TouchableOpacity key = { `camera` } onPress = { () => this.catchPicture() } style = { [ styles.image, styles.addButton ] }>
                                                <Image source = { require("../../images/community/icon_add.png") }/>
                                            </TouchableOpacity>
                                        )
                                    }else{
                                        return (
                                            <TouchableOpacity key = { v2.path || `${ k1 }_${ k2 }` } onPress = { () => imageOnPress( k1 * rowNumber + k2 ) }>
                                                <Image style = { [ styles.image, imageStyle ] } source = {{ uri: v2.path || v2 }}/>
                                            </TouchableOpacity>
                                        )
                                    }
                                })
                            }
                        </View>
                    )
                })
            }
        </View>
    }
}

const styles = StyleSheet.create({
    container: Object.assign({},_styles.bgColor,{
        padding:10,
    }),
    inputWrap:Object.assign({},_styles.contentBorderColor,{
        borderWidth:1,
        padding:0,
        paddingTop:15,
        overflow:"hidden",
        borderRadius:5,
        paddingBottom:15,
        marginBottom:20,
    }),
    input:Object.assign({},_styles.textColor,_styles.fontSize,{
        height: 110,
        marginBottom: 15,
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop:0,
        paddingBottom:0,
    }),
    imageWrap:{
        flexDirection:"row",
        justifyContent:"flex-start",
        alignItems:"center",
    },
    image:{
        width:76,
        height:76,
        marginLeft:10,
        marginBottom:10,
    },
    addButton:Object.assign({},_styles.contentBorderColor,{
        justifyContent:"center",
        alignItems:"center",
        borderWidth:1,
    }),
    currentAddress:{
        flexDirection:"row",
        justifyContent:"flex-start",
        alignItems:"center",
    },
    address:Object.assign({},_styles.fontSize,_styles.textColor,{
        marginLeft:10,
    }),
    addrDetail : {
        marginTop:15,
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
    },
    addrName : Object.assign({},_styles.fontSize,_styles.descTextColor,{
        marginLeft: 28,
    }),
    publicText:{
        marginTop:30,
        flexDirection:"row",
        justifyContent:"flex-start",
        alignItems:"center",
    },
    publicOption:{
        marginLeft:15,
        flexDirection:"row",
        justifyContent:"flex-start",
        alignItems:"center",
    }
})

export default connect( state => ({
    images : state.images
}))(DynamicPublish)