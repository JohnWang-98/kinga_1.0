package com.thinker.kinga

import android.app.Service
import android.content.Intent
import android.os.IBinder
import com.facebook.react.ReactApplication
import com.facebook.react.bridge.ReactContext
import com.facebook.react.modules.core.DeviceEventManagerModule

class MyWidgetService : Service() {

    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        val action = intent?.action

        val reactContext = (application as ReactApplication).reactNativeHost.reactInstanceManager.currentReactContext

        reactContext?.let {
            when (action) {
                "BUTTON_1_CLICK" -> sendEvent(it, "ButtonClick", "button1")
                "BUTTON_2_CLICK" -> sendEvent(it, "ButtonClick", "button2")
                "BUTTON_3_CLICK" -> sendEvent(it, "ButtonClick", "button3")
            }
        }

        return START_NOT_STICKY
    }

    private fun sendEvent(reactContext: ReactContext, eventName: String, button: String) {
        reactContext
            .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
            .emit(eventName, button)
    }

    override fun onBind(intent: Intent?): IBinder? {
        return null
    }
}
