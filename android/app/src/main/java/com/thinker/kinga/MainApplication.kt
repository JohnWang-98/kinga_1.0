package com.thinker.kinga

import android.app.Application
import com.facebook.react.PackageList
import com.facebook.react.ReactApplication
import com.facebook.react.ReactNativeHost
import com.facebook.soloader.SoLoader
import io.wazo.callkeep.RNCallKeepPackage
import com.swmansion.gesturehandler.RNGestureHandlerPackage
import com.facebook.react.defaults.DefaultReactNativeHost
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint
import com.facebook.react.ReactPackage

class MainApplication : Application(), ReactApplication {

    override val reactNativeHost: ReactNativeHost = object : DefaultReactNativeHost(this) {
        override fun getPackages(): List<ReactPackage> {
            val packages = PackageList(this).packages.toMutableList()
            // Manually added packages that are not autolinked
            return packages
        }

        override fun getJSMainModuleName(): String = "index"

        override fun getUseDeveloperSupport(): Boolean = BuildConfig.DEBUG

        override val isNewArchEnabled: Boolean = BuildConfig.IS_NEW_ARCHITECTURE_ENABLED
        override val isHermesEnabled: Boolean = BuildConfig.IS_HERMES_ENABLED
    }

    override fun onCreate() {
        super.onCreate()
        SoLoader.init(this, false)
        if (BuildConfig.IS_NEW_ARCHITECTURE_ENABLED) {
            // Load the native entry point for the New Architecture
            DefaultNewArchitectureEntryPoint.load()
        }
    }
}
