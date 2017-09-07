package com.seatour.wxapi;

import android.app.Activity;
import android.os.Bundle;
import com.theweflex.react.WeChatModule;
/**
 * Created by linjunwen on 2017/5/17.
 */

public class WXPayEntryActivity extends Activity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        WeChatModule.handleIntent(getIntent());
        finish();
    }
}
