package com.Programing;
import android.os.Bundle; // needed for onCreate method
import com.facebook.react.ReactActivity;
import com.facebook.react.ReactRootView;

import com.facebook.react.ReactActivityDelegate;
import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;


public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */

   

@Override
protected ReactActivityDelegate createReactActivityDelegate() {
  return new ReactActivityDelegate(this, getMainComponentName()) {
    @Override
    protected ReactRootView createRootView() {
      return new 
        RNGestureHandlerEnabledRootView(MainActivity.this);
    }
  };
}
   
  @Override
  protected String getMainComponentName() {
    return "Programing";
    
  }




}




