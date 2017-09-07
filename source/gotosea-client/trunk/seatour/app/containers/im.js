/**
 * Created by linjw on 2017-08-17.
 */

import { NativeModules, NativeAppEventEmitter } from 'react-native';

const { IMMessageCenterManager } = NativeModules;

export function login(userName,psw) {
    return IMMessageCenterManager.login(userName,psw,()=>{
      console.log(99);
    });
}


export function loginOut(){
    IMMessageCenterManager.loginOut()
}

export function enterMessageMainWindow(){
    IMMessageCenterManager.enterMessageMainWindow()
}

export function enterChatWindow(userName,imageUrl){
    IMMessageCenterManager.enterChatWindow(userName,imageUrl)
}
