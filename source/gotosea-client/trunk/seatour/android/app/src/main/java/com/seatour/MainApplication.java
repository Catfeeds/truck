package com.seatour;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.beefe.picker.PickerViewPackage;
import com.reactnative.ivpusic.imagepicker.PickerPackage;
import cn.reactnative.modules.qq.QQPackage;
import com.dskj.dscj.aliyunoss.aliyunossPackage;
import com.theweflex.react.WeChatPackage;
import com.imagepicker.ImagePickerPackage;
import com.cboy.rn.splashscreen.SplashScreenReactPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.lwansbrough.RCTCamera.RCTCameraPackage;
import org.lovebing.reactnative.baidumap.BaiduMapPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.payment.alipay.AlipayPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
          new PickerPackage(),
          new PickerViewPackage(),
          new QQPackage(),
          new aliyunossPackage(),
          new ImagePickerPackage(),
          new SplashScreenReactPackage(),
          new RCTCameraPackage(),
          new WeChatPackage(),
          new AlipayPackage(),
          new BaiduMapPackage(getApplicationContext()),
          new LinearGradientPackage()
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
